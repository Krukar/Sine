import { createPlayer, videoFeatures } from '@videojs/react';
import { MinimalVideoSkin, Video } from '@videojs/react/video';

import '@videojs/react/video/minimal-skin.css';

const { Player } = createPlayer({ features: videoFeatures });

export type VideoSkeleton = {
    height: number;
    src: string;
    width: number;
};

export default function Component({ src }: VideoSkeleton) {
    return (
        <Player>
            <MinimalVideoSkin>
                <Video autoPlay loop muted playsInline src={src} />
            </MinimalVideoSkin>
        </Player>
    );
}
