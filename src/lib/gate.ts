import { createServerFn } from '@tanstack/react-start';
import { timingSafeEqual } from 'node:crypto';

import * as z from 'zod';

import { env } from '@/env';

export const verify_gate_code = createServerFn({ method: 'POST' })
    .validator(z.object({ attempt: z.string() }))
    .handler(async ({ data }) => {
        const attempt = Buffer.from(data.attempt.toLowerCase().trim());
        const code = Buffer.from(env.GATE_CODE.toLowerCase());

        const valid = attempt.length === code.length && timingSafeEqual(attempt, code);

        return { valid };
    });
