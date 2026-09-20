import { Controls, FullscreenButton, MuteButton } from '@videojs/react';

import Maximize from '@/components/SVGs/Maximize';
import Minimize from '@/components/SVGs/Minimize';
import Volume from '@/components/SVGs/Volume';
import Mute from '@/components/SVGs/Mute';

export default function Component() {
    return (
        <Controls.Root>
            <Controls.Content className="sine-controls">
                <Controls.Group className="sine-controls__group" aria-label="Player controls">
                    <MuteButton
                        render={(props, state) => (
                            <div className="sine-controls__control sine-controls__control--mute">
                                <button {...props} className="sine-controls__button">
                                    {state.muted ? <Mute /> : <Volume />}
                                </button>
                            </div>
                        )}
                    />

                    <FullscreenButton
                        render={(props, state) => (
                            <div className="sine-controls__control sine-controls__control--fullscreen">
                                <button {...props} className="sine-controls__button">
                                    {state.fullscreen ? <Minimize /> : <Maximize />}
                                </button>
                            </div>
                        )}
                    />
                </Controls.Group>
            </Controls.Content>
        </Controls.Root>
    );
}
