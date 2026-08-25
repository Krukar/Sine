import { useEffect, useState } from 'react';

import Feed from './Feed';

import { get_feed } from '@/lib/feed';

import type { feed_item } from '@/lib/feed';

export default function Component() {
    const [items, set_items] = useState<null | feed_item[]>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const feed = await get_feed();

                set_items(feed);
            } catch (err) {
                console.log('err', err);
            }
        };

        load();
    }, []);

    return (
        <div className="py-4 bg-light">
            <Feed items={items} />
        </div>
    );
}
