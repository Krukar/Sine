import { useNavigate } from '@tanstack/react-router';

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
import { get_next_sine } from '@/lib/sine';

export default function Component({ created_at, height, id, title, user, width }: SineSkeleton) {
    const navigate = useNavigate();

    const handle_click = async (value: -1 | 1) => {
        // TODO: Handle success
        await add_anon_reaction({
            data: {
                video_id: id,
                value,
            },
        });

        const next_video_id = await get_next_sine({
            data: {
                current_video_id: id,
            },
        });

        if (!next_video_id) return;

        navigate({ to: '/', search: { id: next_video_id }, replace: true });
    };

    return (
        <div>
            <Player handle_click={handle_click} height={height} id={id} width={width} />

            <Details created_at={created_at} title={title} user={user} />
        </div>
    );
}
