import { createFileRoute, notFound } from '@tanstack/react-router';

import { get_channel_sines } from '@/lib/channel';

import Channel from '@/components/Channel/Index';

export const Route = createFileRoute('/channel/$id')({
    component: Page,
    loader: async ({ params }) => {
        try {
            const ids = await get_channel_sines({ data: { type: params.id } });

            if (!ids.length) throw notFound();

            return { ids };
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            throw err;
        }
    },
});

function Page() {
    const { ids } = Route.useLoaderData();

    const channels = {
        sun: {
            description: 'Enjoy sunrise and sunset',
            links: [
                { key: 'youtube', href: 'https://www.youtube.com/@TorontoLive4k' },
                { key: 'facebook', href: 'https://www.facebook.com/TorontoLive4k' },
                { key: 'instagram', href: 'https://www.instagram.com/torontolive4k/' },
            ],
            title: 'TorontoLive4k',
        },
    };

    return (
        <section>
            <Channel ids={ids} />
        </section>
    );
}
