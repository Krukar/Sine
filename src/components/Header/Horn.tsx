import { useRef } from 'react';

import Drake from '@/assets/img/drake.png';

export default function Component() {
    const ref = useRef<HTMLAudioElement>(null);

    const handle_click = () => {
        if (!ref.current) return;

        const instance = ref.current.cloneNode() as HTMLAudioElement;

        instance.play();
    };

    return (
        <div className="horn">
            <audio ref={ref} src="/audio/horn.mp3" preload="auto" />

            <button onClick={handle_click}>
                <img alt="Drake's head" className="size-8 lg:size-lue" src={Drake} />
            </button>
        </div>
    );
}
