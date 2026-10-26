import { createServerFn } from '@tanstack/react-start';
import { timingSafeEqual } from 'node:crypto';

import { prisma } from '@/db';

import * as z from 'zod';

import { env } from '@/env';

export const verify_gate_code = createServerFn({ method: 'POST' })
    .validator(z.object({ attempt: z.string().max(32) }))
    .handler(async ({ data }) => {
        const attempt = Buffer.from(data.attempt.toLowerCase().trim());
        const code = Buffer.from(env.GATE_CODE.toLowerCase());

        const valid = attempt.length === code.length && timingSafeEqual(attempt, code);

        if (!valid) await prisma.attempt.create({ data: { guess: data.attempt } }).catch(() => {});

        return { valid };
    });
