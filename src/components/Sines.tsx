import { Link } from '@tanstack/react-router';

import type { SineSkeleton } from './Sine/Index';

export default function Component({ items }: { items: { key: string; sines: SineSkeleton[]; title: string }[] }) {
    return (
        <div>
            <h1>Views from the 6ix</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9">
                {items.map(({ key, sines, title }) => (
                    <div key={key}>
                        <h2 className="mb-6 sm:text-center">{title}</h2>

                        <ul className="space-y-5">
                            {sines.map(({ creator, date, id, title }) => (
                                <li key={id}>
                                    <div className="flex items-center space-x-5">
                                        <div>
                                            <img className="size-8 md:size-lue rounded-full shadow-lg" alt={creator.name} src={creator.img} />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <div>
                                                <Link className="text-sm md:text-base font-bold link--primary" to="/" search={{ id, tag: key }}>
                                                    {title}
                                                </Link>
                                            </div>

                                            <div className="text-xs text-grey">{date}</div>
                                        </div>

                                        <div>vote</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
