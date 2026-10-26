import { createFileRoute } from '@tanstack/react-router';

import { get_neighbourhood_sines, get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

import Sine from '@/components/Sine/Index';
import Sines from '@/components/Sines';

export const Route = createFileRoute('/')({
    component: Home,
    notFoundComponent: () => <div>oops</div>,
    validateSearch: z.object({
        id: z.string().length(6).optional(),
        tag: z
            .string()
            .min(3)
            .max(128)
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .optional(),
    }),
    loaderDeps: ({ search }) => ({ id: search.id, tag: search.tag }),
    loader: async ({ deps }) => {
        try {
            const { id } = deps;

            const [items, sine] = await Promise.all([get_neighbourhood_sines(), get_sine_by_id({ data: { id: id || 'SwuFvx' } })]);

            return { items, sine };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Home() {
    const { items, sine } = Route.useLoaderData();

    return (
        <div>
            <section>
                <Sine {...sine} />
            </section>

            <section>
                <Sines items={items} />
            </section>
        </div>
    );
}
