import Details from './Details';
import Player from './Player';

export type SineSkeleton = {
    created_at: Date;
    height: number;
    id: string;
    title: string;
    user: {
        img: string;
        name: string;
    };
    width: number;
};

import { add_anon_reaction } from '@/lib/reaction';

export default function Component({ created_at, height, id, title, user, width }: SineSkeleton) {
    const handle_click = async (value: -1 | 1) => {
        await add_anon_reaction({
            data: {
                video_id: id,
                value,
            },
        });
    };

    return (
        <div>
            <Player handle_click={handle_click} height={height} id={id} width={width} />

            <Details created_at={created_at} title={title} user={user} />
        </div>
    );
}
