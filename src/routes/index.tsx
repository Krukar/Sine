import { createFileRoute } from '@tanstack/react-router';

import { get_channels } from '@/lib/channel';
import { get_neighbourhood_sines, get_sine_by_id } from '@/lib/sine';

import * as z from 'zod';

import Channels from '@/components/Channels';
import Sine from '@/components/Sine/Index';
import Sines from '@/components/Sines';

export const Route = createFileRoute('/')({
    component: Page,
    validateSearch: z.object({
        id: z.string().length(6).optional(),
    }),
    loaderDeps: ({ search }) => ({ id: search.id }),
    loader: async ({ deps }) => {
        try {
            const { id } = deps;

            const [channels, items, sine] = await Promise.all([get_channels(), get_neighbourhood_sines(), get_sine_by_id({ data: { id: id || 'SwuFvx' } })]);

            return { channels, items, sine };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Page() {
    const { channels, items, sine } = Route.useLoaderData();

    return (
        <div>
            <section>
                <Sine {...sine} />
            </section>

            <section>
                <Sines items={items} />
            </section>

            {/* <section>Some kind of divider goes here tbd</section> */}

            <section>
                <Channels items={channels} />
            </section>
        </div>
    );
}
