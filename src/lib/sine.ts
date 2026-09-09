import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

import type { Sine } from '@/components/Sine/Index';

export const placeholder_sine: Sine = {
    created_at: new Date('2026-09-01T00:00:00Z'),
    height: 1280,
    id: 'NJcXbE',
    title: 'Vines from The 6',
    user: {
        img: 'https://d3j2vjabzyd1kj.cloudfront.net/avatars/placeholder.jpg',
        name: 'batcomputer',
    },
    width: 720,
};

export const get_sine_by_id = createServerFn({ method: 'POST' })
    .validator(z.object({ id: z.string() }))
    .handler(async ({ data }) => {
        console.log(data);

        return placeholder_sine;
    });

export const get_random_sine = createServerFn({ method: 'GET' }).handler(async () => {
    return placeholder_sine;
});
