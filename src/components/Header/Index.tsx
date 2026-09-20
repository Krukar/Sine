import { Link } from '@tanstack/react-router';

// import Auth from './Auth';
import Banner from './Banner';
import Horn from './Horn';

export default function Component() {
    return (
        <div className="bg-dark">
            <Banner />

            <header className="bg-primary text-light shadow-lg">
                <div className="flex justify-between items-center py-6">
                    <div className="flex-1 flex translate-y-5">
                        <Horn />
                    </div>

                    <div>
                        <div className="translate-y-5">
                            <Link className="heading text-3xl lg:text-4xl tracking-widest link--dark" to="/">
                                6ine
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
