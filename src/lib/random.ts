import { createServerFn } from '@tanstack/react-start';

import * as z from 'zod';

const temp_ids = ['0sBXLL', '2mstWy', 'bxah5P', 'NJcXbE'];

export const get_random_video_id = createServerFn({ method: 'POST' })
    .validator(z.object({ video_id: z.string() }))
    .handler(async ({ data }) => {
        const { video_id } = data;

        const filter = temp_ids.filter((e) => e !== video_id);

        if (filter.length === 0) return video_id;

        return filter[Math.floor(Math.random() * filter.length)];
    });
