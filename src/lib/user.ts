import { createServerFn } from '@tanstack/react-start';

import { auth } from '@clerk/tanstack-react-start/server';

import { prisma } from '@/db';

import { nanoid } from 'nanoid';

import { z } from 'zod';

export type User = {
    id: string;
    settings: {
        area_code: '416' | '647' | '437' | '942' | null;
        avatar_url: string | null;
        drake_album:
            | 'Thank Me Later'
            | 'Take Care'
            | 'Nothing Was the Same'
            | 'Views'
            | 'Scorpion'
            | 'Certified Lover Boy'
            | 'Honestly, Nevermind'
            | 'For All the Dogs'
            | 'Iceman'
            | 'Maid of Honour'
            | 'Habibti'
            | null;
        name: string | null;
        neighbourhood: 'East York' | 'Etobicoke' | 'North York' | 'Old Toronto' | 'Scarborough' | 'York' | null;
    };
};

const get_or_create_user = (clerk_id: string) =>
    prisma.user.upsert({
        where: { clerk_id },
        create: { id: nanoid(12), clerk_id },
        update: {},
        select: { id: true },
    });

export const get_profile = createServerFn({ method: 'GET' }).handler(async (): Promise<{ user: User }> => {
    const { userId } = await auth();

    if (!userId) throw new Error('Unauthorized');

    const { id } = await get_or_create_user(userId);

    const user = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
            settings: {
                select: {
                    name: true,
                    avatar_url: true,
                    area_code: true,
                    drake_album: true,
                    neighbourhood: true,
                },
            },
            // videos: {
            //     where: { deleted_at: null },
            //     orderBy: { created_at: 'desc' },
            //     select: { id: true, title: true },
            // },
            // reactions: {
            //     where: { video: { deleted_at: null } },
            //     orderBy: { updated_at: 'desc' },
            //     select: { value: true, video: { select: { id: true, title: true } } },
            // },
        },
    });

    return {
        user: {
            id,
            settings: {
                // @ts-ignore
                area_code: user.settings?.area_code,
                avatar_url: user.settings?.avatar_url || null,
                // @ts-ignore
                drake_album: user.settings?.drake_album,
                name: user.settings?.name || null,
                // @ts-ignore
                neighbourhood: user.settings?.neighbourhood,
            },
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

export const update_settings = createServerFn({ method: 'POST' })
    .validator(
        z.object({
            area_code: z.enum(['416', '647', '437', '942']).nullable(),
            drake_album: z
                .enum([
                    'Thank Me Later',
                    'Take Care',
                    'Nothing Was the Same',
                    'Views',
                    'Scorpion',
                    'Certified Lover Boy',
                    'Honestly, Nevermind',
                    'For All the Dogs',
                    'Iceman',
                    'Maid of Honour',
                    'Habibti',
                ])
                .nullable(),
            name: z.string().trim().min(3).max(128),
            neighbourhood: z
                .enum(['East York', 'Etobicoke', 'North York', 'Old Toronto', 'Scarborough', 'York'])
                .nullable(),
        }),
    )
    .handler(async ({ data }): Promise<{ success: boolean }> => {
        const { userId } = await auth();

        if (!userId) throw new Error('Unauthorized');

        const { id } = await get_or_create_user(userId);

        await prisma.user.update({
            where: { id },
            data: {
                settings: {
                    upsert: {
                        create: data,
                        update: data,
                    },
                },
            },
        });

        return { success: true };
    });
