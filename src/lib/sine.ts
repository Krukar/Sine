import { createServerFn } from '@tanstack/react-start';
import { notFound } from '@tanstack/react-router';

import { auth } from '@clerk/tanstack-react-start/server';

import { prisma } from '@/db';

import { env } from '@/env';

import * as z from 'zod';

import type { SineSkeleton } from '@/components/Sine/Index';

const format_date = (created_at: Date): string => {
    const date = new Intl.DateTimeFormat('en-CA', {
        dateStyle: 'medium',
        timeZone: 'America/Toronto',
    }).format(new Date(created_at));

    return date;
};

const generate_user = (user: {
    id: string;
    settings: {
        avatar_url: string | null;
        name: string | null;
    } | null;
}) => ({
    id: user.id,
    img: user.settings?.avatar_url || env.VITE_DEFAULT_AVATAR_URL,
    name: user.settings?.name || env.VITE_DISPLAY_NAME,
});

export const get_next_sine_id = createServerFn({ method: 'POST' })
    .validator(
        z.object({
            current_id: z.string(),
            tag: z
                .string()
                .min(3)
                .max(128)
                .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                .optional(),
        }),
    )
    .handler(async ({ data }): Promise<string> => {
        const { current_id, tag } = data;

        if (tag) {
            const tagged = await prisma.$queryRaw<{ id: string }[]>`
                SELECT v.id
                FROM videos v
                JOIN tags t ON t.video_id = v.id
                WHERE t.name = ${tag}
                AND v.deleted_at IS NULL
                AND v.id <> ${current_id}
                ORDER BY random()
                LIMIT 1
            `;

            if (tagged.length === 0) throw new Error(`Could not find sine with tag: ${tag}`);

            return tagged[0].id;
        }

        const any = await prisma.$queryRaw<{ id: string }[]>`
            SELECT v.id
            FROM videos v
            WHERE v.deleted_at IS NULL
            AND v.id <> ${current_id}
            ORDER BY random()
            LIMIT 1
        `;

        if (any.length === 0) throw new Error('Could not find next sine');

        return any[0].id;
    });

export const get_sine_by_id = createServerFn({ method: 'POST' })
    .validator(z.object({ id: z.string() }))
    .handler(async ({ data }): Promise<SineSkeleton> => {
        const { id } = data;

        const sine = await prisma.video.findFirst({
            where: { id, deleted_at: null },
            select: {
                created_at: true,
                id: true,
                title: true,
                user: {
                    select: {
                        id: true,
                        settings: {
                            select: { avatar_url: true, name: true },
                        },
                    },
                },
            },
        });

        if (!sine) throw notFound();

        const { created_at, title, user } = sine;

        return {
            creator: generate_user(user),
            date: format_date(created_at),
            id,
            title,
        };
    });

export const get_neighbourhood_sines = createServerFn({ method: 'GET' }).handler(async (): Promise<{ key: string; sines: SineSkeleton[]; title: string }[]> => {
    const results = [
        { key: 'old-toronto', title: 'Old Toronto' },
        { key: 'scarborough', title: 'Scarborough' },
        { key: 'etobicoke', title: 'Etobicoke' },
        { key: 'york', title: 'York' },
        { key: 'east-york', title: 'East York' },
        { key: 'north-york', title: 'North York' },
    ].map(async ({ key, title }) => {
        const results = await prisma.video.findMany({
            where: {
                deleted_at: null,
                tags: { some: { name: key } },
            },
            orderBy: { created_at: 'desc' },
            take: 6,
            select: {
                created_at: true,
                id: true,
                title: true,
                user: {
                    select: {
                        id: true,
                        settings: {
                            select: { avatar_url: true, name: true },
                        },
                    },
                },
            },
        });

        return {
            key,
            sines: results.map(({ created_at, id, title, user }) => ({ creator: generate_user(user), date: format_date(created_at), id, title })),
            title,
        };
    });

    const neighbourhoods = await Promise.all(results);

    const { userId: clerk_id } = await auth();

    // If they are not logged in return the neighbourhoods
    if (!clerk_id) return neighbourhoods;

    // If they are logged in get their settings
    const user = await prisma.user.findUnique({
        where: { clerk_id },
        select: { settings: { select: { neighbourhood: true } } },
    });

    const home = user?.settings?.neighbourhood;

    // If they don't have a neighbourhood set
    if (!home) return neighbourhoods;

    // Move their neighbourhood to the front, keep the rest in original order
    return neighbourhoods.sort((a, b) => Number(b.key === home) - Number(a.key === home));
});
