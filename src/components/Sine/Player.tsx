import { createPlayer, Container, videoFeatures } from '@videojs/react';
import { Video } from '@videojs/react/video';

import Controls from './Controls';
import Details from './Details';
import Vote from './Vote';

import type { SineSkeleton } from './Index';

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

export default function Component({
    creator,
    date,
    id,
    title,
}: {
    creator: SineSkeleton['creator'];
    date: SineSkeleton['date'];
    id: SineSkeleton['id'];
    title: SineSkeleton['title'];
}) {
    return (
        <Player>
            <Container className="sine__container">
                <Video autoPlay className="sine__video" loop muted playsInline title={title} src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`} />

                <div className="sine__top">
                    <Details creator={creator} date={date} title={title} />

                    <Controls />
                </div>

                <div className="sine__bottom">
                    <Vote id={id} />
                </div>
            </Container>
        </Player>
    );
}

export { usePlayer };
