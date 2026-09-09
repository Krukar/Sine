import { createFileRoute } from '@tanstack/react-router';

import * as z from 'zod';

import { get_random_sine, get_sine_by_id } from '@/lib/sine';

export const Route = createFileRoute('/')({
    component: Home,
    validateSearch: z.object({
        id: z
            .string()
            .regex(/^[A-Za-z0-9_-]{6}$/)
            .optional()
            .catch(undefined),
    }),
    loaderDeps: ({ search }) => ({ id: search.id }),
    loader: ({ deps }) => (deps.id ? get_sine_by_id({ data: { id: deps.id } }) : get_random_sine()),
});

import Sine from '@/components/Sine/Index';

function Home() {
    const sine = Route.useLoaderData();

    if (!sine) throw new Error('Failed to load sine.');

    return (
        <div>
            <section>
                <Sine {...sine} />
            </section>
        </div>
    );
}
