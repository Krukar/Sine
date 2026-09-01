import { useState } from 'react';

import { verify_gate_code } from '@/lib/gate';

import Form from './Form';

import Building from '@/assets/img/building.jpg';

export default function Component({ handle_hide }: { handle_hide: Function }) {
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

            const attempt = data.get('attempt') as string;

            const { valid } = await verify_gate_code({ data: { attempt } });

            if (valid) {
                handle_hide();

                return;
            }

            set_error("Wrong. You're not from Toronto.");
        } catch (err) {
            if (import.meta.env.DEV) console.log(err);

            if (err instanceof Error) {
                set_error(err.message);
            }
        } finally {
            set_is_loading(false);
        }
    };

    let error_class_name = 'error';

    error_class_name += error ? ' opacity-100' : ' opacity-0';

    return (
        <div className="fixed inset-0 z-10 bg-light">
            <div className="h-full flex justify-center items-center">
                <section>
                    <div className="max-w-130 mx-auto space-y-8">
                        <div>
                            <img alt="The Roger's Centre" src={Building} />
                        </div>

                        <div className="space-y-7">
                            <Form handle_change={handle_change} handle_submit={handle_submit} is_loading={is_loading} />

                            <div className={error_class_name}>
                                <div>{error}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
