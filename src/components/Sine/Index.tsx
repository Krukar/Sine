import Player from './Player';

export type SineSkeleton = {
    created_at: Date;
    id: string;
    title: string;
    user: {
        img: string;
        name: string;
    };
};

export default function Component({ created_at, id, title, user }: SineSkeleton) {
    return (
        <div className="sine">
            <Player created_at={created_at} id={id} title={title} user={user} />
        </div>
    );
}
