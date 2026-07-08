import { useEffect, useState } from 'react';

import Wrapper from './Wrapper';

export default function Component() {
    const [show_gate, set_show_gate] = useState<boolean>(false); // By default hide the gate to not annoy people

    useEffect(() => {
        const hide_gate = JSON.parse(localStorage.getItem('hide_gate') ?? 'false');

        // if hide_gate === true then they already answered correctly and you should hide it
        if (hide_gate) return;

        // if hide gate !== true then they haven't answered and you should show it
        set_show_gate(true);
    }, []);

    const handle_hide = () => {
        localStorage.setItem('hide_gate', JSON.stringify(true));

        set_show_gate(false);
    };

    if (!show_gate) return null;

    return <Wrapper handle_hide={handle_hide} />;
}
