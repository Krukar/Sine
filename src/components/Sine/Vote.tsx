import { useNavigate } from '@tanstack/react-router';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

import { add_anon_reaction } from '@/lib/reaction';
import { get_next_sine } from '@/lib/sine';

import type { SineSkeleton } from './Index';

export default function Component({ id }: { id: SineSkeleton['id'] }) {
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
        <div className="sine__vote">
            <div className="sine-vote">
                <div className="sine-vote__thumbs">
                    <button className="sine-thumbs" onClick={() => handle_click(-1)}>
                        <ThumbsDown />
                    </button>
                </div>

                <div className="sine-vote__thumbs">
                    <button className="sine-thumbs" onClick={() => handle_click(1)}>
                        <ThumbsUp />
                    </button>
                </div>
            </div>
        </div>
    );
}
