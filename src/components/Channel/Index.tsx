import { useState } from 'react';

import Details from './Details';
import Player from './Player';

import type { ChannelSkeleton } from '@/lib/channel';

export default function Component({ description, image, ids, links, title }: ChannelSkeleton) {
    const [active, set_active] = useState<number>(0);

    const handle_end = () => {
        set_active((prev) => (prev + 1) % ids.length);
    };

    return (
        <div className="space-y-8">
            <Player id={ids[active]} handle_end={handle_end} />

            <Details description={description} image={image} links={links} title={title} />
        </div>
    );
}
