import { Link } from '@tanstack/react-router';

export default function Component() {
    return (
        <div className="bg-dark">
            <div className="divider divider--left-down bg-primary" />

            <footer className="bg-primary text-light text-sm">
                <div className="flex justify-between py-7">
                    <div>
                        <ul className="flex space-x-8">
                            {[
                                {
                                    to: '/page/about',
                                    text: 'About',
                                },
                            ].map(({ to, text }) => (
                                <li key={to}>
                                    <Link className="link--opacity" to={to}>
                                        {text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex space-x-5">
                        <div>
                            <a className="link--opacity" href="https://www.thirstymachines.com/" target="_blank">
                                AI Sucks
                            </a>
                        </div>

                        <div className="text-neutral">|</div>

                        <div>
                            <a className="link--opacity" href="mailto:contact@6ix.video">
                                contact@6ix.video
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
