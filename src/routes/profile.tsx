import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignOutButton } from '@clerk/tanstack-react-start';

import { Auth } from '@/lib/auth';

import { get_profile } from '@/lib/user';

export const Route = createFileRoute('/profile')({
    component: Profile,
    beforeLoad: async () => {
        const { isAuthenticated } = await Auth();

        if (!isAuthenticated) throw redirect({ to: '/' });
    },
    loader: () => get_profile(),
});

function Profile() {
    return (
        <div>
            <section>
                <h1>Profile</h1>

                <div>set display name</div>
            </section>

            <section>
                <h1>Sign out</h1>

                <div>
                    <SignOutButton redirectUrl="/" />
                </div>
            </section>
        </div>
    );
}
