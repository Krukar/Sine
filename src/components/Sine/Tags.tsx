import type { SineSkeleton } from './Index';

export default function Component({ items }: { items: SineSkeleton['tags'] }) {
    return (
        <div className="sine-tags">
            <div>Tags: </div>

            <div className="sine-tags__items">{items.join(', ')}</div>
        </div>
    );
}
