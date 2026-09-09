import { createFileRoute } from '@tanstack/react-router';
import { SignOutButton } from '@clerk/tanstack-react-start';

export const Route = createFileRoute('/profile')({ component: Profile });

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
