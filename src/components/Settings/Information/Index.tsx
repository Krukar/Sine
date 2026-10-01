import { useState } from 'react';

import Form from './Form';

import { update_settings } from '@/lib/user';

import type { User } from '@/lib/user';

export default function Component({
    area_code,
    drake_album,
    name,
    neighbourhood,
}: {
    area_code: User['settings']['area_code'];
    drake_album: User['settings']['drake_album'];
    name: User['settings']['name'];
    neighbourhood: User['settings']['neighbourhood'];
}) {
    const [data, set_data] = useState({
        area_code: area_code || '',
        drake_album: drake_album || '',
        name: name || '',
        neighbourhood: neighbourhood || '',
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
        <div>
            <h2 className="text-center">Your Info</h2>

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
    );
}
