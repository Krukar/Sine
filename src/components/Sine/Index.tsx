import Player from './Player';

import type { SineSkeleton } from '@/lib/sine';

export default function Component({ date, creator, id, title }: SineSkeleton) {
    return (
        <div className="sine">
            <Player creator={creator} date={date} id={id} title={title} />
        </div>
    );
}
