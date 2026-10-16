import { createServerFn } from '@tanstack/react-start';
import { notFound } from '@tanstack/react-router';

import * as z from 'zod';

import { prisma } from '@/db';

import { env } from '@/env';

import type { SineSkeleton } from '@/components/Sine/Index';

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

// Claude wrote this
const get_votes = async (video_ids: string[]) => {
    const query = {
        by: 'video_id' as const,
        where: { video_id: { in: video_ids } },
        _sum: { value: true as const },
    };

    const [reaction_votes, anon_reaction_votes] = await Promise.all([
        prisma.reaction.groupBy(query),
        prisma.reactionAnon.groupBy(query),
    ]);

    const votes = new Map<string, number>();

    for (const vote of [...reaction_votes, ...anon_reaction_votes]) {
        const current_total = votes.get(vote.video_id) ?? 0;
        const vote_sum = vote._sum.value ?? 0;

        votes.set(vote.video_id, current_total + vote_sum);
    }

    return votes;
};

export const get_latest_sines = createServerFn({ method: 'GET' }).handler(async () => {
    const sines = await prisma.video.findMany({
        where: { deleted_at: null },
        orderBy: { created_at: 'desc' },
        take: 10,
        select: {
            created_at: true,
            id: true,
            title: true,
            tags: {
                select: { name: true },
                orderBy: { name: 'asc' },
            },
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

    if (sines.length === 0) throw notFound();

    const votes = await get_votes(sines.map(({ id }) => id));

    return sines.map(({ created_at, id, tags, title, user }) => ({
        created_at,
        id,
        tags: tags.map(({ name }) => name),
        title,
        user: generate_user(user),
        votes: votes.get(id) ?? 0,
    }));
});

export const get_next_sine_id = createServerFn({ method: 'POST' })
    .validator(
        z.object({
            current_id: z.string(),
            tag: z
                .string()
                .regex(/^[a-z0-9_]{3,128}$/)
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
                id: true,
                tags: {
                    select: { name: true },
                    orderBy: { name: 'asc' },
                },
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

        const { tags, title, user } = sine;

        return {
            creator: generate_user(user),
            id,
            tags: tags.map(({ name }) => name),
            title,
        };
    });
