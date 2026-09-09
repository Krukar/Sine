import Player from './Player';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

export type Sine = {
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

export default function Component({ created_at, height, id, title, user, width }: Sine) {
    const handle_click = async () => {
        // get a random video_id and then update the search nav
    };

    return (
        <div>
            <div className="flex flex-nowrap items-center space-x-7 lg:space-x-8 mb-8 lg:mb-9">
                <div>
                    <button className="thumbs" onClick={handle_click}>
                        <ThumbsDown />
                    </button>
                </div>

                <div className="aspect-video flex-1">
                    <Player
                        height={height}
                        src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${id}.mp4`}
                        width={width}
                    />
                </div>

                <div>
                    <button className="thumbs" onClick={handle_click}>
                        <ThumbsUp />
                    </button>
                </div>
            </div>

            <div>
                <div className="heading text-4xl lg:text-5xl">{title}</div>
            </div>
        </div>
    );
}
