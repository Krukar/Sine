import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

import Sine from '@/components/Sine/Index';

function Home() {
    return (
        <section>
            <Sine />
        </section>
    );
}
