import { Link } from '@tanstack/react-router';

// import Auth from './Auth';
import Banner from './Banner';

import Drake from '@/assets/img/drake.png';

export default function Component() {
    return (
        <div className="bg-dark">
            <Banner />

            <header className="bg-primary text-light shadow-lg">
                <div className="flex justify-between items-center py-6">
                    <div className="flex-1 flex translate-y-5">
                        <div className="header__icon">
                            <img alt="Drake's head" className="size-8 lg:size-lue" src={Drake} />
                        </div>
                    </div>

                    <div>
                        <div className="translate-y-5">
                            <Link className="heading text-3xl lg:text-4xl tracking-widest link--dark" to="/">
                                6INE
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end">{/* <Auth /> */}</div>
                </div>
            </header>

            <div className="divider divider--right-up bg-primary" />
        </div>
    );
}
