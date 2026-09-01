'use client';

import { useState } from 'react';

import Player from './Player';

import ThumbsDown from '@/components/SVGs/ThumbsDown';
import ThumbsUp from '@/components/SVGs/ThumbsUp';

import { get_random_video_id } from '@/lib/random';

export default function Component({ initial_video_id }: { initial_video_id?: string }) {
    const [video_id, set_video_id] = useState<string>(initial_video_id || 'NJcXbE');

    const handle_click = async () => {
        const next_video_id = await get_random_video_id({ data: { video_id: video_id } });

        set_video_id(next_video_id);
    };

    return (
        <div>
            <div className="flex flex-wrap lg:flex-nowrap lg:items-center lg:space-x-8 mb-8">
                <div className="w-full lg:w-auto lg:flex-1">
                    <div className="aspect-video">
                        <Player src={`https://d3j2vjabzyd1kj.cloudfront.net/videos/${video_id}.mp4`} />
                    </div>
                </div>

                <div className="lg:order-first">
                    <button className="thumbs" onClick={handle_click}>
                        <ThumbsDown />
                    </button>
                </div>

                <div className="">
                    <button className="thumbs" onClick={handle_click}>
                        <ThumbsUp />
                    </button>
                </div>
            </div>

            <div>user and info</div>
        </div>
    );
}
