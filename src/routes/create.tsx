import { createFileRoute, redirect } from '@tanstack/react-router';
import { Auth } from '@/lib/auth';

import Create from '@/components/Create/Index';

export const Route = createFileRoute('/create')({
    beforeLoad: async () => {
        const { isAuthenticated } = await Auth();

        if (!isAuthenticated) {
            throw redirect({ to: '/' });
        }

        return { isAuthenticated };
    },
    component: Page,
});

function Page() {
    return (
        <section>
            <Create />
        </section>
    );
}
