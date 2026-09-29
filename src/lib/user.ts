import { createServerFn } from '@tanstack/react-start';

import { auth } from '@clerk/tanstack-react-start/server';

import { prisma } from '@/db';

import { nanoid } from 'nanoid';

export type User = {
    id: string;
    img: string;
    name: string;
    neighbourhood: 'old_toronto' | 'etobicoke' | 'north_york' | 'scarborough' | 'york' | 'east_york' | null;
};

const get_or_create_user = (clerk_id: string) =>
    prisma.user.upsert({
        where: { clerk_id },
        create: { id: nanoid(12), clerk_id },
        update: {},
        select: { id: true },
    });

export const get_profile = createServerFn({ method: 'GET' }).handler(async () => {
    const { userId } = await auth();

    if (!userId) throw new Error('Unauthorized');

    const { id } = await get_or_create_user(userId);

    const user = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
            settings: {
                select: { name: true, avatar_url: true, neighbourhood: true },
            },
            videos: {
                where: { deleted_at: null },
                orderBy: { created_at: 'desc' },
                select: { id: true, title: true },
            },
            reactions: {
                where: { video: { deleted_at: null } },
                orderBy: { updated_at: 'desc' },
                select: { value: true, video: { select: { id: true, title: true } } },
            },
        },
    });

    return {
        user: {
            id,
            img: user.settings?.avatar_url || '',
            name: user.settings?.name || 'Drake #1 Fan',
            neighbourhood: user.settings?.neighbourhood,
        },
    };
});

export const get_user_id = createServerFn({ method: 'GET' }).handler(async (): Promise<string | null> => {
    const { userId: clerk_id } = await auth();

    if (!clerk_id) return null;

    const user = await prisma.user.findUnique({
        where: { clerk_id },
        select: { id: true },
    });

    return user?.id ?? null;
});
