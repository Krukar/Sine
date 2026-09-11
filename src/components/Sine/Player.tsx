import Video from './Video';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

import type { SineSkeleton } from './Index';

export default function Component({
    handle_click,
    height,
    id,
    width,
}: {
    handle_click: Function;
    height: SineSkeleton['height'];
    id: SineSkeleton['id'];
    width: SineSkeleton['width'];
}) {
    return (
        <div className="flex flex-nowrap items-center space-x-7 lg:space-x-8 mb-8 lg:mb-9">
            <div>
                <button className="thumbs" onClick={() => handle_click(-1)}>
                    <ThumbsDown />
                </button>
            </div>

            <div className="aspect-video flex-1">
                <Video height={height} src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`} width={width} />
            </div>

            <div>
                <button className="thumbs" onClick={() => handle_click(1)}>
                    <ThumbsUp />
                </button>
            </div>
        </div>
    );
}
