import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

import type { SineSkeleton } from '@/components/Sine/Index';

export const get_sine_by_id = createServerFn({ method: 'POST' })
    .validator(z.object({ id: z.string() }))
    .handler(async ({ data }): Promise<SineSkeleton | null> => {
        const { id } = data;

        const sine = await prisma.video.findFirst({
            where: { id, deleted_at: null },
            select: {
                created_at: true,
                height: true,
                id: true,
                title: true,
                width: true,
                user: {
                    select: { id: true, username: true, avatar_url: true },
                },
            },
        });

        if (!sine) return null;

        const { created_at, height, title, width, user } = sine;

        return {
            created_at,
            height,
            id,
            title,
            user: {
                img: user.avatar_url || '/logo512.png',
                name: user.username || 'Drake #1 Fan',
            },
            width,
        };
    });

export const get_next_sine = createServerFn({ method: 'POST' })
    .validator(z.object({ current_video_id: z.string() }))
    .handler(async ({ data }): Promise<SineSkeleton['id'] | null> => {
        const { current_video_id } = data;

        const rows = await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM videos
            WHERE deleted_at IS NULL
              AND id IS DISTINCT FROM ${current_video_id ?? null}
            ORDER BY random()
            LIMIT 1
        `;

        return rows[0]?.id ?? null;
    });
