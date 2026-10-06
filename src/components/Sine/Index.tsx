import Player from './Player';

import type { Sine } from '@/lib/sine';

export type SineSkeleton = {
    created_at: Sine['created_at'];
    id: Sine['id'];
    tag: string | undefined;
    title: Sine['title'];
    user: Sine['user'];
};

export default function Component({ created_at, id, tag, title, user }: SineSkeleton) {
    return (
        <div className="sine">
            <Player created_at={created_at} id={id} tag={tag} title={title} user={user} />
        </div>
    );
}
