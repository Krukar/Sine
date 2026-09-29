// import Username from './forms/Username';

import type { User } from '@/lib/user';

export type SettingsSkeleton = {
    user: User;
};

export default function Component({ user }: SettingsSkeleton) {
    return (
        <div className="settings">
            <div>
                <ul className="divide-neutral divide-y">
                    <li className="flex justify-between items-center py-7">
                        <div>What do they call you in Toronto?</div>
                        <div>{user.name}</div>
                    </li>
                    <li className="flex justify-between items-center py-7">
                        <div>What neighbourhood are you from?</div>
                        <div>{user.name}</div>
                    </li>
                    <li className="flex justify-between items-center py-7">
                        <div>What's your area code?</div>
                        <div>{user.name}</div>
                    </li>
                    <li className="flex justify-between items-center py-7">
                        <div>What's your favourite Drake album'?</div>
                        <div>{user.name}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
