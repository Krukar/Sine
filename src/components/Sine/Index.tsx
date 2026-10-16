import Player from './Player';

export type SineSkeleton = {
    creator: {
        id: string;
        img: string;
        name: string;
    };
    id: string;
    tags: string[];
    title: string;
};

export default function Component({ creator, id, tags, title }: SineSkeleton) {
    return (
        <div className="sine">
            <Player creator={creator} id={id} tags={tags} title={title} />
        </div>
    );
}
