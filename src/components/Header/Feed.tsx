import { useEffect, useState } from 'react';

import type { feed_item } from '@/lib/feed';

export default function Component({ items }: { items: feed_item[] | null }) {
    const [i, set_i] = useState<number>(0);

    useEffect(() => {
        if (!items || items.length < 2) return;

        const interval = setInterval(() => {
            set_i((current) => {
                let next = Math.floor(Math.random() * (items.length - 1));

                if (next >= current) next += 1;

                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [items]);

    return (
        <div className="text-xs text-center">
            {!items ? (
                <div>Loading</div>
            ) : (
                <a className="link--primary" href={items[i].link} target="_blank">
                    {items[i].title}
                </a>
            )}
        </div>
    );
}
