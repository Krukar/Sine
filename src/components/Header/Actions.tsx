import { Link } from '@tanstack/react-router';

import { useAuth0Context } from '@/auth/auth0';

import User from '@/svgs/User';

export default function Component() {
    const { isAuthenticated, isLoading, login } = useAuth0Context();

    if (isLoading) return null;

    if (isAuthenticated)
        return (
            <div className="flex items-center space-x-6 lg:space-x-7">
                <div className="flex items-center">
                    <Link
                        className="inline-block h-7.5 link--dark"
                        to="/dashboard"
                    >
                        <User />
                    </Link>
                </div>

                <div>
                    <Link className="button--light" to="/upload">
                        Upload
                    </Link>
                </div>
            </div>
        );

    return (
        <div>
            <button className="button--light" onClick={() => login()}>
                Login
            </button>
        </div>
    );
}
