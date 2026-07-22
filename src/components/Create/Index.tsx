import { useState } from 'react';

import Form from './Form';

import { preload, transcode } from '@/lib/transcode';

export default function Component() {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [error, set_error] = useState<string | null>(null);

    // When the form input changes that means you need to reset the error
    const handle_change = () => {
        set_error(null);

        set_is_loading(false);
    };

    const handle_submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            set_error(null);

            set_is_loading(true);

            const data = new FormData(e.currentTarget);

            const file = data.get('file');

            if (!(file instanceof File) || file.size === 0) {
                throw new Error('Please select a video.');
            }

            const blob = await transcode(file);

            // handle creation
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            if (err instanceof Error) {
                set_error(err.message);
            }
        } finally {
            set_is_loading(false);
        }
    };

    return (
        <div>
            <Form handle_change={handle_change} handle_submit={handle_submit} is_loading={is_loading} />
        </div>
    );
}
