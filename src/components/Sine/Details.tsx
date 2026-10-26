import type { SineSkeleton } from './Index';

export default function Component({ creator, date, title }: { creator: SineSkeleton['creator']; date: SineSkeleton['date']; title: SineSkeleton['title'] }) {
    return (
        <div className="sine-details">
            <div>
                <img className="sine-details__image" src={creator.img} />
            </div>

            <div>
                <div className="sine-details__title">{title}</div>

                <div className="sine-details__date">{date}</div>
            </div>
        </div>
    );
}
