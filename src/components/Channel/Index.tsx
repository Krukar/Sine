import { useState } from 'react';

import Player from './Player';

import Facebook from '@/components/SVGs/Facebook';
import Instagram from '@/components/SVGs/Instagram';
import YouTube from '@/components/SVGs/YouTube';

const socials = [
    { label: 'YouTube', href: 'https://www.youtube.com/@TorontoLive4k', Icon: YouTube },
    { label: 'Facebook', href: 'https://www.facebook.com/TorontoLive4k', Icon: Facebook },
    { label: 'Instagram', href: 'https://www.instagram.com/torontolive4k/', Icon: Instagram },
];

export type ChannelSkeleton = {
    ids: string[];
};

export default function Component({ ids }: ChannelSkeleton) {
    const [active, set_active] = useState<number>(0);

    const handle_end = () => {
        set_active((prev) => (prev + 1) % ids.length);
    };

    return (
        <div className="space-y-8">
            <Player id={ids[active]} handle_end={handle_end} />

            <div className="flex items-center space-x-7">
                <div>
                    <img
                        className="size-20 rounded-full shadow-lg"
                        src="https://yt3.googleusercontent.com/1PixVpyfDL061EiidxmOMiIVFqoQTXwqEES0UQ3A3hEirxEz300tuFgK1_juf-eJql01_3kVWQ=s160-c-k-c0x00ffffff-no-rj"
                    />
                </div>

                <div className="space-y-5">
                    <div>
                        <div>
                            <div className="heading text-xl ">TorontoLive4k</div>
                        </div>

                        <div>
                            <p className="text-sm">Enjoy sunrise and sunset</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-3">
                        {socials.map(({ label, href, Icon }) => (
                            <a key={label} className="size-7 link--primary" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
