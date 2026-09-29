import Mail from './SVGs/Mail';

export default function Component() {
    return (
        <div className="bg-dark">
            <div className="divider divider--left-down bg-primary" />

            <footer className="bg-primary text-light text-sm">
                <div className="py-7 md:flex md:justify-between space-y-7 md:space-y-0">
                    <div>
                        <ul className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:divide-x sm:divide-neutral">
                            {[
                                { href: 'https://www.oliviachow.ca/', text: 'Vote Chow' },
                                { href: 'https://stopthedatacentre.ca/', text: 'Stop Data Centers' },
                                { href: 'https://protestdougford.com/', text: 'Protest Ford' },
                                { href: 'https://claude.ai/', text: 'Claude is OK' },
                            ].map(({ href, text }) => (
                                <li key={href} className="sm:px-7 sm:first:pl-0">
                                    <a className="link--opacity" href={href} target="_blank">
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="size-7">
                            <Mail />
                        </div>

                        <a className="link--opacity" href="mailto:contact@6ix.video">
                            contact@6ix.video
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
