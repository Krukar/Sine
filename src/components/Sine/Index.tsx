'use client';

import Player from './Player';

import Controls from './Controls';

export default function Component() {
    // get video if no video then get of the day/random
    const user_id = 'DZX7BQ';
    const video_id = 'NJcXbE';

    return (
        <div>
            <div className="mb-8">
                <Player src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${video_id}.mp4`} />
            </div>

            <div>
                <Controls user_id={user_id} video_id={video_id} />
            </div>
        </div>
    );
}
