import { createServerFn } from '@tanstack/react-start';
import { auth } from '@clerk/tanstack-react-start/server';

export const Auth = createServerFn({ method: 'GET' }).handler(async () => {
    const { isAuthenticated } = await auth();

    return { isAuthenticated };
});
