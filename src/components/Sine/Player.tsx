import Video from './Video';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

import type { SineSkeleton } from './Index';

export default function Component({
    dimensions,
    handle_click,
    id,
    title,
}: {
    dimensions: SineSkeleton['dimensions'];
    handle_click: Function;
    id: SineSkeleton['id'];
    title: SineSkeleton['title'];
}) {
    return (
        <div className="flex flex-nowrap items-center space-x-7 lg:space-x-8 mb-8 lg:mb-9">
            <div>
                <button className="thumbs" onClick={() => handle_click(-1)}>
                    <ThumbsDown />
                </button>
            </div>

            <div className="aspect-video flex-1">
                <Video dimensions={dimensions} id={id} title={title} />
            </div>

            <div>
                <button className="thumbs" onClick={() => handle_click(1)}>
                    <ThumbsUp />
                </button>
            </div>
        </div>
    );
}
