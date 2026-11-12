import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import { prisma } from '@/db';

// Temp data
const channels = {
    sun: {
        description: 'Enjoy sunrise and sunset',
        image: {
            alt: 'Channel logo',
            src: 'https://yt3.googleusercontent.com/1PixVpyfDL061EiidxmOMiIVFqoQTXwqEES0UQ3A3hEirxEz300tuFgK1_juf-eJql01_3kVWQ=s160-c-k-c0x00ffffff-no-rj',
        },
        links: [
            { key: 'youtube', value: 'https://www.youtube.com/@TorontoLive4k' },
            { key: 'facebook', value: 'https://www.facebook.com/TorontoLive4k' },
            { key: 'instagram', value: 'https://www.instagram.com/torontolive4k/' },
        ],
        title: 'TorontoLive4k',
    },
};

export type ChannelSkeleton = {
    description: string;
    image: {
        alt: string;
        src: string;
    };
    ids: string[];
    links: {
        key: string;
        value: string;
    }[];
    title: string;
};

export const get_channels = createServerFn({ method: 'GET' }).handler(async () => {
    // For now only the sun channel is exposed
    return [{ handle: 'sun', ...channels.sun }];
});

export const get_channel_by_handle = createServerFn({ method: 'GET' })
    .validator(z.object({ handle: z.string().trim().min(1) }))
    .handler(async ({ data }): Promise<ChannelSkeleton> => {
        const { handle } = data;

        if (handle !== 'sun') throw notFound();

        const results = await prisma.video.findMany({
            where: {
                deleted_at: null,
                tags: { some: { name: { in: ['sunrise', 'sunset'] } } },
            },
            orderBy: [{ created_at: 'desc' }, { id: 'asc' }],
            select: { id: true },
        });

        return { ...channels[handle], ids: results.map(({ id }) => id) };
    });
