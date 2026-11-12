import { Link } from '@tanstack/react-router';

import type { ChannelSkeleton } from '@/lib/channel';

import Facebook from '@/components/SVGs/Facebook';
import Instagram from '@/components/SVGs/Instagram';
import YouTube from '@/components/SVGs/YouTube';

const get_social_icon = (key: string): React.ReactElement | null => {
    switch (key) {
        case 'facebook':
            return <Facebook />;

        case 'instagram':
            return <Instagram />;

        case 'youtube':
            return <YouTube />;

        default:
            return null;
    }
};

type ChannelItem = Omit<ChannelSkeleton, 'ids'> & { handle: string };

export default function Component({ items }: { items: ChannelItem[] }) {
    return (
        <div>
            <h1>Local Channels</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9">
                {items.map(({ description, handle, image, links, title }) => (
                    <div key={handle} className="flex items-center space-x-6">
                        <div>
                            <Link className="link--opacity" to="/channel/$handle" params={{ handle }} aria-label={title}>
                                <img alt={image.alt} className="size-19 rounded-full shadow-lg" src={image.src} />
                            </Link>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div>
                                    <Link className="heading text-xl link--primary" to="/channel/$handle" params={{ handle }} aria-label={title}>
                                        {title}
                                    </Link>
                                </div>

                                <div>
                                    <p className="text-sm">{description}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 mt-3">
                                {links.map(({ key, value }) => {
                                    const icon = get_social_icon(key);

                                    if (!icon) return null;

                                    return (
                                        <a key={key} className="size-7 link--primary" href={value} target="_blank" rel="noopener noreferrer" aria-label={key}>
                                            {icon}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
