import { Show, SignInButton, useUser } from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';

function Profile() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <Link to="/profile" className="block size-8 overflow-hidden rounded-full">
            <img src={user.imageUrl} alt="" className="size-full object-cover" />
        </Link>
    );
}

export default function Component() {
    return (
        <div className="auth flex items-center space-x-7">
            <Show when="signed-in">
                <Profile />
            </Show>
            <Show when="signed-out">
                <SignInButton />
            </Show>
        </div>
    );
}
