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
        dateStyle: 'medium',
        timeZone: 'America/Toronto',
    }).format(new Date(created_at));

    return (
        <div className="sine__title">
            <div className="sine-title">
                <div>
                    <img className="sine-title__image" src={user.img} />
                </div>

                <div>
                    <div className="sine-title__heading">{title}</div>
                    <div className="sine-title__date">{date}</div>
                </div>
            </div>
        </div>
    );
}
