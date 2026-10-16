import { Link } from '@tanstack/react-router';

import type { Sine } from '@/lib/sine';

export default function Component({ items }: { items: Sine[] }) {
    return (
        <ul className="">
            {items.map(({ created_at, id, tags, title, user }) => {
                return (
                    <li key={id}>
                        <div>
                            <Link className="" to="/" search={{ id }}>
                                {title}
                            </Link>
                        </div>

                        {/* <div>rank</div> */}
                    </li>
                );
            })}
        </ul>
    );
}

{
    /* <div className="flex">
                            <div className="hidden xs:block">
                                <img className="size-9 rounded-full shadow-lg" src={user.img} />
                            </div>

                            <div className="flex-1">
                                <Link className="text-lg link--primary" to="/" search={{ id }}>
                                    {title}
                                </Link>
                            </div>

                            <div className="bg-red-500">votes</div>
                        </div> */
}
{
    /* <div className="flex items-center space-x-6">
                            <div>
                               
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <div>
                                        
                                    </div>

                                    <div className="text-xs">{date}</div>
                                </div>

                                {tags && (
                                    <div className="flex space-x-4 text-xs">
                                        <div>Tags:</div>

                                        <div className="flex space-x-3">
                                            {tags.map((tag, i) => (
                                                <div key={tag}>
                                                    <Link className="link--primary" to="/" search={{ tag }}>
                                                        {tag}
                                                    </Link>

                                                    {i < tags.length - 1 && <span>,</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-red-500 flex-1">vote</div>
                        </div> */
}
