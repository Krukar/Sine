import { Controls, FullscreenButton, MuteButton } from '@videojs/react';

import Maximize from '@/components/SVGs/Maximize';
import Minimize from '@/components/SVGs/Minimize';
import Volume from '@/components/SVGs/Volume';
import Mute from '@/components/SVGs/Mute';

export default function Component() {
    return (
        <Controls.Root>
            <Controls.Content>
                <Controls.Group className="flex justify-end space-x-5 lg:space-x-6" aria-label="Player controls">
                    <MuteButton
                        render={(props, state) => (
                            <button {...props} className="channel-button">
                                {state.muted ? <Mute /> : <Volume />}
                            </button>
                        )}
                    />

                    <FullscreenButton
                        render={(props, state) => (
                            <button {...props} className="channel-button">
                                {state.fullscreen ? <Minimize /> : <Maximize />}
                            </button>
                        )}
                    />
                </Controls.Group>
            </Controls.Content>
        </Controls.Root>
    );
}
