import { Show, SignInButton, UserButton } from '@clerk/tanstack-react-start';

// import { Link } from '@tanstack/react-router';

export default function Component() {
    return (
        <div className="auth flex items-center space-x-7">
            <Show when="signed-in">
                <UserButton />
                {/* <Link to="/create" className="button--light">
                    Create
                </Link> */}
            </Show>
            <Show when="signed-out">
                <SignInButton />
            </Show>
        </div>
    );
}
