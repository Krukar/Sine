import { createServerFn } from '@tanstack/react-start';

import { auth, clerkClient } from '@clerk/tanstack-react-start/server';

import { prisma } from '@/db';

import { nanoid } from 'nanoid';

const get_or_create_user = (clerk_id: string) =>
    prisma.user.upsert({
        where: { clerk_id },
        create: { id: nanoid(12), clerk_id },
        update: {},
        select: { id: true },
    });

export const update_avatar = createServerFn({ method: 'POST' })
    .validator((data: FormData) => {
        if (!(data instanceof FormData)) throw new Error('Invalid form data');

        const file = data.get('avatar');

        if (!(file instanceof File)) throw new Error('No file');

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Invalid file type');

        if (file.size > 4 * 1024 * 1024) throw new Error('File too large');

        return { file };
    })
    .handler(async ({ data }): Promise<{ avatar_url: string }> => {
        const { userId } = await auth();

        if (!userId) throw new Error('Unauthorized');

        const { id } = await get_or_create_user(userId);

        const response = await clerkClient().users.updateUserProfileImage(userId, { file: data.file });

        const { imageUrl: avatar_url } = response;

        await prisma.user.update({
            where: { id },
            data: {
                settings: {
                    upsert: {
                        create: { avatar_url },
                        update: { avatar_url },
                    },
                },
            },
        });

        return { avatar_url };
    });
