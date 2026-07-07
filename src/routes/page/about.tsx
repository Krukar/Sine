import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/page/about')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <section>
            <h1>About</h1>

            <div className="text-center">
                <p>Vine but for Toronto.</p>
            </div>
        </section>
    );
}
