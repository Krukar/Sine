import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        CLERK_SECRET_KEY: z.string().min(1),
    },

    clientPrefix: 'VITE_',

    client: {
        VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    },

    /**
     * Merge process.env in: Vite only exposes VITE_-prefixed vars on
     * import.meta.env, so server-only vars (DATABASE_URL, CLERK_SECRET_KEY)
     * must come from process.env.
     */
    runtimeEnv: { ...process.env, ...import.meta.env },

    emptyStringAsUndefined: true,
});
