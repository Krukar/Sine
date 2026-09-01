import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

export default function Component({ user_id, video_id }: { user_id: string; video_id: string }) {
    return (
        <div className="flex justify-center items-center space-x-7">
            <div>
                <button className="thumbs">
                    <ThumbsDown />
                </button>
            </div>

            <div>
                <button className="thumbs">
                    <ThumbsUp />
                </button>
            </div>
        </div>
    );
}
