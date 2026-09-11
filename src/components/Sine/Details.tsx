import type { SineSkeleton } from './Index';

export default function Component({
    created_at,
    title,
    user,
}: {
    created_at: SineSkeleton['created_at'];
    title: SineSkeleton['title'];
    user: SineSkeleton['user'];
}) {
    const date = new Intl.DateTimeFormat('en-CA', {
        dateStyle: 'short',
        timeZone: 'America/Toronto',
    }).format(new Date(created_at));

    return (
        <div className="space-y-6">
            <div className="heading text-3xl lg:text-5xl">{title}</div>

            <div className="flex space-x-6 items-center justify-center">
                <div>
                    <img className="size-lue rounded-full" src={user.img} />
                </div>

                <div>
                    <div className="text-sm font-bold">{user.name}</div>

                    <div className="text-xs">{date}</div>
                </div>
            </div>
        </div>
    );
}
