import Mail from './SVGs/Mail';

export default function Component() {
    return (
        <div className="bg-dark">
            <div className="divider divider--left-down bg-primary" />

            <footer className="bg-primary text-light text-sm">
                <div className="py-7 md:flex md:justify-between space-y-7 md:space-y-0">
                    <div>
                        <ul className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:divide-x sm:divide-neutral">
                            <li className="sm:px-7 sm:first:pl-0">
                                <a className="link--opacity" href="/page/about">
                                    About
                                </a>
                            </li>
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
