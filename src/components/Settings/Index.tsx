import { useState } from 'react';

import Form from './Form';

import { update_settings } from '@/lib/user';

import type { User } from '@/lib/user';

export type SettingsSkeleton = {
    user: User;
};

export default function Component({ user }: SettingsSkeleton) {
    const [data, set_data] = useState({
        area_code: user.settings.area_code || '',
        drake_album: user.settings.drake_album || '',
        name: user.settings.name || '',
        neighbourhood: user.settings.neighbourhood || '',
    });

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: string, value: string) =>
        set_data((prev) => ({
            ...prev,
            [key]: value,
        }));

    const handle_submit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (is_loading) return;

        set_is_loading(true);

        await update_settings({
            data: {
                area_code: (data.area_code as User['settings']['area_code']) || null,
                drake_album: (data.drake_album as User['settings']['drake_album']) || null,
                neighbourhood: (data.neighbourhood as User['settings']['neighbourhood']) || null,
                name: data.name,
            },
        });

        set_is_loading(false);
    };

    return (
        <div className="settings">
            <div className="space-y-7">
                <Form
                    area_code={data.area_code}
                    drake_album={data.drake_album}
                    handle_change={handle_change}
                    handle_submit={handle_submit}
                    is_loading={is_loading}
                    name={data.name}
                    neighbourhood={data.neighbourhood}
                />
            </div>
        </div>
    );
}
