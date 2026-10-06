import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

export type Sine = {
    created_at: Date;
    id: string;
    title: string;
    user: {
        img: string | null;
    };
};

export const get_sine_by_id = createServerFn({ method: 'POST' })
    .validator(z.object({ id: z.string() }))
    .handler(async ({ data }): Promise<Sine | null> => {
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
                            select: { avatar_url: true },
                        },
                    },
                },
            },
        });

        if (!sine) return null;

        const { created_at, title, user } = sine;

        return {
            created_at,
            id,
            title,
            user: {
                img: user.settings?.avatar_url || '/logo512.png',
            },
        };
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
    .handler(async ({ data }): Promise<Sine['id']> => {
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
