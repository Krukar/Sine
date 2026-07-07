import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

import Player from '#/components/Player';

function Home() {
    return (
        <section>
            <Player src="https://d3j2vjabzyd1kj.cloudfront.net/videos/ttc.mp4" />
        </section>
    );
}
