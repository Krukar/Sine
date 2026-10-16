import { createPlayer, Container, videoFeatures } from '@videojs/react';
import { Video } from '@videojs/react/video';

import Controls from './Controls';
import Details from './Details';
import Vote from './Vote';

import type { SineSkeleton } from './Index';

const { Player } = createPlayer({ features: videoFeatures });

export default function Component({
    creator,
    id,
    tags,
    title,
}: {
    creator: SineSkeleton['creator'];
    id: SineSkeleton['id'];
    tags: SineSkeleton['tags'];
    title: SineSkeleton['title'];
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

                <Details creator={creator} tags={tags} title={title} />

                <Vote id={id} />

                <Controls />
            </Container>
        </Player>
    );
}
