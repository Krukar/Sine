import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

import { get_user_id } from './user';

export const add_anon_reaction = createServerFn({ method: 'POST' })
    .validator(z.object({ video_id: z.string().length(6), value: z.union([z.literal(-1), z.literal(1)]) }))
    .handler(async ({ data }): Promise<{ success: boolean }> => {
        try {
            const { video_id, value } = data;

            const user_id = await get_user_id();

            // If they are not logged in count it as an anon reaction
            if (!user_id) {
                await prisma.reactionAnon.create({
                    data: { video_id, value },
                });

                return { success: true };
            }

            await prisma.reaction.upsert({
                where: { user_id_video_id: { user_id, video_id } },
                create: { user_id, video_id, value },
                update: { value },
            });

            return { success: true };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            return { success: false };
        }
    });

export const add_reaction = createServerFn({ method: 'POST' });
