import type { ReactElement } from 'react';

import Facebook from '@/components/SVGs/Facebook';
import Instagram from '@/components/SVGs/Instagram';
import YouTube from '@/components/SVGs/YouTube';

import type { ChannelSkeleton } from '@/lib/channel';

const get_social_icon = (key: string): ReactElement | null => {
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

export default function Component({
    description,
    image,
    links,
    title,
}: {
    description: ChannelSkeleton['description'];
    image: ChannelSkeleton['image'];
    links: ChannelSkeleton['links'];
    title: ChannelSkeleton['title'];
}) {
    return (
        <div className="flex items-center space-x-6">
            <div>
                <img alt={image.alt} className="size-19 rounded-full shadow-lg" src={image.src} />
            </div>

            <div className="space-y-5">
                <div>
                    <div>
                        <div className="heading text-xl ">{title}</div>
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
    );
}
