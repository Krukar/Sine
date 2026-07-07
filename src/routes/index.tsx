import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
    return (
        <div>
            <section>
                <h1>section h1</h1>

                <p>foobar text</p>
            </section>
        </div>
    );
}
