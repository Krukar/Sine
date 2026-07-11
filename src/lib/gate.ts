import { createServerFn } from '@tanstack/react-start';
import { timingSafeEqual } from 'node:crypto';

import { env } from '@/env';

export const verify_gate_code = createServerFn({ method: 'POST' })
    .validator((attempt: string) => attempt)
    .handler(async ({ data }) => {
        const attempt = Buffer.from(data.toLowerCase().trim());
        const code = Buffer.from(env.GATE_CODE.toLowerCase());

        const valid = attempt.length === code.length && timingSafeEqual(attempt, code);

        return { valid };
    });
