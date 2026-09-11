import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

export const add_anon_reaction = createServerFn({ method: 'POST' })
    .validator(z.object({ video_id: z.string().length(6), value: z.union([z.literal(-1), z.literal(1)]) }))
    .handler(async ({ data }): Promise<{ success: boolean }> => {
        try {
            const { video_id, value } = data;

            await prisma.reactionAnon.create({
                data: { video_id, value },
            });

            return { success: true };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            return { success: false };
        }
    });
