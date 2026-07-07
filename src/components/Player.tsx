'use client';

import '@videojs/react/video/minimal-skin.css';
import { createPlayer, videoFeatures } from '@videojs/react';
import { MinimalVideoSkin, Video } from '@videojs/react/video';

const Player = createPlayer({ features: videoFeatures });

export type VideoSkeleton = {
    src: string;
};

export default function Component({ src }: VideoSkeleton) {
    return (
        <Player.Provider>
            <MinimalVideoSkin>
                <Video src={src} playsInline />
            </MinimalVideoSkin>
        </Player.Provider>
    );
}
