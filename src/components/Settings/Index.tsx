import Avatar from './Avatar/Index';
import Information from './Information/Index';

import type { User } from '@/lib/user';

export default function Component({ user }: { user: User }) {
    return (
        <div className="space-y-9 md:space-y-0 md:flex md:space-x-10">
            <div className="md:w-1/2">
                <Information
                    area_code={user.settings.area_code}
                    drake_album={user.settings.drake_album}
                    name={user.settings.name}
                    neighbourhood={user.settings.neighbourhood}
                />
            </div>

            <div className="md:w-1/2">
                <Avatar avatar_url={user.settings.avatar_url} />
            </div>
        </div>
    );
}
