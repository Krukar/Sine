import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import ClerkProvider from '../integrations/clerk/provider';

import appCss from '@/assets/styles/index.css?url';

import Footer from '@/components/Footer';
import Header from '@/components/Header/Index';

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
                <ClerkProvider>
                    <Header />

                    <main>{children}</main>

                    <Footer />

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
