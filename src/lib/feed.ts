import { createServerFn } from '@tanstack/react-start';

import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});

export type feed_item = { link: string; title: string };

export const get_feed = createServerFn({ method: 'GET' }).handler(async (): Promise<feed_item[] | null> => {
    try {
        if (import.meta.env.DEV)
            return [
                { link: '', title: 'Dev mode feed 1' },
                { link: '', title: 'Dev mode feed 2' },
            ];

        const res = await fetch('https://www.reddit.com/r/toronto.rss');

        const text = await res.text();

        const doc = parser.parse(text);

        const items = doc.feed.entry.map(({ link, title }: { link: { ['@_href']: string }; title: string }) => ({
            link: link['@_href'],
            title,
        }));

        return items;
    } catch (err) {
        console.log('err', err);

        return null;
    }
});
