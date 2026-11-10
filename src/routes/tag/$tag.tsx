import { createFileRoute, notFound } from '@tanstack/react-router';

import { get_random_sine, get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

import Sine from '@/components/Sine/Index';

export const Route = createFileRoute('/tag/$tag')({
    component: Tag,
    validateSearch: z.object({
        id: z.string().length(6).optional(),
    }),
    loaderDeps: ({ search }) => ({ id: search.id }),
    loader: async ({ deps, params }) => {
        try {
            const { id } = deps;

            // if ID then get that sine
            if (id) {
                const sine = await get_sine_by_id({ data: { id } });

                if (!sine) throw notFound();

                return { sine };
            }

            // if no ID then get a random sine via that tag
            const { tag } = params;

            const random_id = await get_random_sine({ data: { tag } });

            if (!random_id) throw notFound();

            const sine = await get_sine_by_id({ data: { id: random_id } });

            return { sine };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Tag() {
    const { sine } = Route.useLoaderData();

    return (
        <section>
            <Sine {...sine} />
        </section>
    );
}
