import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Analytics } from '@vercel/analytics/react';

import { ClerkProvider } from '@clerk/tanstack-react-start';

import appCss from '@/assets/styles/index.css?url';

import Footer from '@/components/Footer';
import Gate from '@/components/Gate/Index';
import Header from '@/components/Header/Index';

import { env } from '#/env';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Sine',
            },
            {
                name: 'description',
                content: 'Vines from the 6ix',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>

            <body className="custom-scrollbar">
                <ClerkProvider publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
                    <div className="wrapper">
                        <Header />

                        <main className="main">{children}</main>

                        <Footer />
                    </div>

                    <Gate />

                    <Analytics debug={false} />

                    <TanStackDevtools
                        config={{
                            position: 'bottom-right',
                        }}
                        plugins={[
                            {
                                name: 'Tanstack Router',
                                render: <TanStackRouterDevtoolsPanel />,
                            },
                        ]}
                    />
                </ClerkProvider>
                <Scripts />
            </body>
        </html>
    );
}
