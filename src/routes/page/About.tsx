import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/page/About')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <section>
            <h1>About</h1>

            <p>Vine but for Toronto.</p>
        </section>
    );
}
