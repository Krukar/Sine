import { useState } from 'react';

import { useNavigate, useParams } from '@tanstack/react-router';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

import { add_anon_reaction } from '@/lib/reaction';
import { get_random_sine } from '@/lib/sine';

import type { SineSkeleton } from './Index';

import { usePlayer } from './Player';

export default function Component({ id }: { id: SineSkeleton['id'] }) {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const navigate = useNavigate();

    const { tag } = useParams({ strict: false });

    const muted = usePlayer((s) => s.muted);
    const toggle_muted = usePlayer((s) => s.toggleMuted);

    const handle_click = async (value: -1 | 1) => {
        set_is_loading(true);

        try {
            // TODO: Handle success
            await add_anon_reaction({
                data: {
                    video_id: id,
                    value,
                },
            });

            const next_video_id = await get_random_sine({ data: { tag } });

            if (!next_video_id) return;

            if (muted) toggle_muted();

            navigate({ to: '.', search: { id: next_video_id }, replace: true });
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);
        } finally {
            set_is_loading(false);
        }
    };

    return (
        <div className="sine-vote">
            <div className="sine-vote__thumbs">
                <button className="sine-thumbs" disabled={is_loading} onClick={() => handle_click(-1)}>
                    <ThumbsDown />
                </button>
            </div>

            <div className="sine-vote__thumbs">
                <button className="sine-thumbs" disabled={is_loading} onClick={() => handle_click(1)}>
                    <ThumbsUp />
                </button>
            </div>
        </div>
    );
}
