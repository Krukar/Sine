import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

export const get_channel_sines = createServerFn({ method: 'GET' })
    .validator(z.object({ type: z.string().optional() }))
    .handler(async ({ data }): Promise<string[]> => {
        const { type } = data;

        if (type === 'sun') {
            const results = await prisma.video.findMany({
                where: {
                    deleted_at: null,
                    tags: { some: { name: { in: ['sunrise', 'sunset'] } } },
                },
                orderBy: [{ created_at: 'desc' }, { id: 'asc' }],
                select: { id: true },
            });

            return results.map(({ id }) => id);
        }

        const results = await prisma.$queryRaw<{ id: string }[]>`
            SELECT v.id
            FROM videos v
            WHERE v.deleted_at IS NULL
            ORDER BY random()
            LIMIT 6
        `;

        return results.map(({ id }) => id);
    });
