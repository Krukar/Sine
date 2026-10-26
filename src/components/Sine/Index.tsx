import Player from './Player';

export type SineSkeleton = {
    creator: {
        id: string;
        img: string;
        name: string;
    };
    date: string;
    id: string;
    title: string;
};

export default function Component({ date, creator, id, title }: SineSkeleton) {
    return (
        <div className="sine">
            <Player creator={creator} date={date} id={id} title={title} />
        </div>
    );
}
