import { createPlayer, Container, videoFeatures } from '@videojs/react';
import { Video } from '@videojs/react/video';

import Controls from './Controls';
import Details from './Details';
import Vote from './Vote';

import type { SineSkeleton } from './Index';

const { Player } = createPlayer({ features: videoFeatures });

export default function Component({
    created_at,
    id,
    title,
    user,
}: {
    created_at: SineSkeleton['created_at'];
    id: SineSkeleton['id'];
    title: SineSkeleton['title'];
    user: SineSkeleton['user'];
}) {
    return (
        <Player>
            <Container className="sine__container">
                <Video
                    autoPlay
                    className="sine__video"
                    loop
                    muted
                    playsInline
                    title={title}
                    src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`}
                />

                <Details created_at={created_at} title={title} user={user} />

                <Vote id={id} />

                <Controls />
            </Container>
        </Player>
    );
}
