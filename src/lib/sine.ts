import { createServerFn } from '@tanstack/react-start';
import { notFound } from '@tanstack/react-router';

import { auth } from '@clerk/tanstack-react-start/server';

import { prisma } from '@/db';

import { env } from '@/env';

import * as z from 'zod';

export type SineSkeleton = {
    creator: {
        id: string;
        img: string;
        name: string;
    };
    date: string;
    id: string;
    title: string;
};

/* ====================
    Private Functions
==================== */
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

/* ====================
    Public Functions
==================== */
export const get_random_sine = createServerFn({ method: 'GET' })
    .validator(
        z
            .object({
                tag: z
                    .string()
                    .min(3)
                    .max(128)
                    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                    .optional(),
            })
            .optional(),
    )
    .handler(async ({ data }): Promise<string | null> => {
        if (data?.tag) {
            const { tag } = data;

            const results = await prisma.$queryRaw<{ id: string }[]>`
                SELECT v.id
                FROM videos v
                JOIN tags t ON t.video_id = v.id
                WHERE t.name = ${tag}
                AND v.deleted_at IS NULL
                ORDER BY random()
                LIMIT 1
            `;

            return results[0]?.id ?? null;
        }

        const results = await prisma.$queryRaw<{ id: string }[]>`
                SELECT v.id
                FROM videos v
                WHERE v.deleted_at IS NULL
                ORDER BY random()
                LIMIT 1
            `;

        return results[0]?.id ?? null;
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
