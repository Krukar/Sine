import { useState } from 'react';

import Form from './Form';

export default function Component() {
    return (
        <section>
            <h1>Coming Soon</h1>
        </section>
    );

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
