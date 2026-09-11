import { createFileRoute } from '@tanstack/react-router';

import { get_sine_by_id } from '#/lib/sine';

export const Route = createFileRoute('/')({
    component: Home,
    loader: {
        handler: () => get_sine_by_id({ data: { id: 'NJcXbE' } }),
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
