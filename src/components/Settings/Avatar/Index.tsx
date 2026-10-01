import { useState } from 'react';

import Form from './Form';

import { update_avatar } from '@/lib/avatar';

export default function Component({ avatar_url }: { avatar_url: string | null }) {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [avatar, set_avatar] = useState(avatar_url);

    const handle_change: React.ChangeEventHandler<HTMLInputElement> = (_e) => {};

    const handle_submit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (is_loading) return;

        set_is_loading(true);

        try {
            const form = e.currentTarget;

            const data = new FormData(form);

            const { avatar_url } = await update_avatar({ data });

            set_avatar(avatar_url);

            form.reset();
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            if (err instanceof Error) {
                console.log('error', err);
            }
        } finally {
            set_is_loading(false);
        }
    };

    return (
        <div>
            <h2 className="text-center">Your Avatar</h2>

            <div className="space-y-7">
                <div>
                    {avatar && (
                        <img alt="User Avatar" className="size-11 mx-auto rounded-full shadow-lg" src={avatar} />
                    )}
                </div>

                <Form handle_change={handle_change} handle_submit={handle_submit} is_loading={is_loading} />
            </div>
        </div>
    );
}
