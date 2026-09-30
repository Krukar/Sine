import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignOutButton } from '@clerk/tanstack-react-start';

import { Auth } from '@/lib/auth';

import { get_profile } from '@/lib/user';

import Settings from '@/components/Settings/Index';

export const Route = createFileRoute('/profile')({
    component: Profile,
    beforeLoad: async () => {
        const { isAuthenticated } = await Auth();

        if (!isAuthenticated) throw redirect({ to: '/' });
    },
    loader: () => get_profile(),
});

function Profile() {
    const { user } = Route.useLoaderData();

    return (
        <div>
            <section>
                <h1>Settings</h1>

                <Settings user={user} />
            </section>

            <section>
                <h1>Sign Out</h1>

                <div>
                    <SignOutButton redirectUrl="/">
                        <button className="button--primary" type="button">
                            Now Leaving The 6ix
                        </button>
                    </SignOutButton>
                </div>
            </section>
        </div>
    );
}
