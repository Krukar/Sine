import { createPlayer, videoFeatures } from '@videojs/react';
import { MinimalVideoSkin, Video } from '@videojs/react/video';

import '@videojs/react/video/minimal-skin.css';
import type { SineSkeleton } from './Index';

const { Player } = createPlayer({ features: videoFeatures });

export default function Component({ id, title }: { id: SineSkeleton['id']; title: SineSkeleton['title'] }) {
    const src = `https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`;

    return (
        <Player>
            <MinimalVideoSkin>
                <Video autoPlay loop muted playsInline title={title} src={src} />

                <div className="sine__title">
                    <div className="heading">{title}</div>
                </div>
            </MinimalVideoSkin>
        </Player>
    );
}
