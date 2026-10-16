import type { SineSkeleton } from './Index';

import Tags from './Tags';

export default function Component({
    creator,
    tags,
    title,
}: {
    tags: SineSkeleton['tags'];
    creator: SineSkeleton['creator'];
    title: SineSkeleton['title'];
}) {
    return (
        <div className="sine__details">
            <div className="sine-details">
                <div>
                    <img className="sine-details__image" src={creator.img} />
                </div>

                <div>
                    <div className="sine-details__heading">{title}</div>

                    <Tags items={tags} />
                </div>
            </div>
        </div>
    );
}
