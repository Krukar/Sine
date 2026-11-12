import { createPlayer, Container, videoFeatures } from '@videojs/react';
import { Video } from '@videojs/react/video';

import Controls from './Controls';

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

export default function Component({ id, handle_end }: { id: string; handle_end: () => void }) {
    return (
        <div>
            <Player>
                <Container className="relative bg-dark aspect-video">
                    <Video
                        autoPlay={true}
                        className="h-full w-full object-contain"
                        muted
                        onEnded={handle_end}
                        playsInline
                        preload="auto"
                        src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`}
                    />

                    <div className="absolute top-6 right-6 lg:top-7 lg:right-7">
                        <Controls />
                    </div>
                </Container>
            </Player>
        </div>
    );
}

export { usePlayer };
