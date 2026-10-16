import { createFileRoute } from '@tanstack/react-router';

import { get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

import Sine from '@/components/Sine/Index';
// import Sines from '@/components/Sines';

export const Route = createFileRoute('/')({
    component: Home,
    notFoundComponent: () => <div>oops</div>,
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
            const { id } = deps;

            const sine = await get_sine_by_id({ data: { id: id || 'SwuFvx' } });

            return { sine };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Home() {
    const { sine } = Route.useLoaderData();

    return (
        <div>
            <section>
                <Sine {...sine} />
            </section>

            {/* <section>
                <h1>Views from the 6ix</h1>

                <div>
                    <h2></h2>
                </div>
            </section> */}
        </div>
    );
}
