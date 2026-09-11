import { Show, SignInButton } from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';

import User from '@/components/SVGs/User';

export default function Component() {
    return (
        <div className="auth flex items-center space-x-7">
            <Show when="signed-in">
                <Link to="/profile" className="size-8 link--dark">
                    <User />
                </Link>
            </Show>

            <Show when="signed-out">
                <SignInButton />
            </Show>
        </div>
    );
}
