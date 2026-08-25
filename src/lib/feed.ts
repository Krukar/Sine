import { createServerFn } from '@tanstack/react-start';

import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});

export type feed_item = { link: string; title: string };

export const get_feed = createServerFn({ method: 'GET' }).handler(async (): Promise<feed_item[] | null> => {
    try {
        const res = await fetch('https://rss.cbc.ca/lineup/canada-toronto.xml');

        if (!res.ok) throw new Error(`CBC failed: ${res.status}`);

        const xml = await res.text();
        const parsed = parser.parse(xml);

        const items = parsed.rss.channel.item.map(({ link, title }: { link: string; title: string }) => ({
            link,
            title,
        }));

        return items;
    } catch (err) {
        console.log('err', err);

        return null;
    }
});
