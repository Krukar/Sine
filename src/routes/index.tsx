import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

import Player from '#/components/Player';

function Home() {
    return (
        <div>
            <section>
                <Player src="https://d3j2vjabzyd1kj.cloudfront.net/videos/qzaqNSCB7R7q.mp4" />
            </section>
        </div>
    );
}
