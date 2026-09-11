import { createFileRoute } from '@tanstack/react-router';

import { get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

export const Route = createFileRoute('/')({
    component: Home,
    validateSearch: z.object({ id: z.string().length(6).optional() }),
    loaderDeps: ({ search }) => ({ id: search.id }),
    loader: async ({ deps }) => {
        return get_sine_by_id({ data: { id: deps.id || 'NJcXbE' } });
    },
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
