import { createFileRoute, notFound } from '@tanstack/react-router';

import { get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

import Sine from '@/components/Sine/Index';

export const Route = createFileRoute('/')({
    component: Home,
    validateSearch: z.object({
        id: z.string().length(6).optional(),
        tag: z
            .string()
            .regex(/^[a-z0-9_]{3,128}$/)
            .optional(),
    }),
    loaderDeps: ({ search }) => ({ id: search.id, tag: search.tag }),
    loader: async ({ deps }) => {
        try {
            const { id, tag } = deps;

            const sine = await get_sine_by_id({ data: { id: id || 'SwuFvx' } });

            return { sine, tag };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw notFound();
        }
    },
});

function Home() {
    const { sine, tag } = Route.useLoaderData();

    if (!sine) throw new Error('Failed to load sine.');

    return (
        <div>
            <section>
                <Sine {...sine} tag={tag} />
            </section>
        </div>
    );
}
