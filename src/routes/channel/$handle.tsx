import { createFileRoute } from '@tanstack/react-router';

import { get_channel_by_handle } from '@/lib/channel';

import Channel from '@/components/Channel/Index';

export const Route = createFileRoute('/channel/$handle')({
    component: Page,
    loader: async ({ params }) => {
        try {
            const channel = await get_channel_by_handle({ data: { handle: params.handle } });

            return { channel };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Page() {
    const { channel } = Route.useLoaderData();

    return (
        <section>
            <Channel {...channel} />
        </section>
    );
}
