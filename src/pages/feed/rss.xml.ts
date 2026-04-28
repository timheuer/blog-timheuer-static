import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const posts = await getCollection('posts', ({ data }) => !data.draft);
    const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 20);

    return rss({
        title: 'Tim Heuer',
        description: 'The web site and blog of Tim Heuer, Program Manager for .NET',
        site: context.site,
        items: sorted.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description || '',
            link: `/blog/${post.data.slug}/`,
            categories: post.data.categories,
        })),
    });
}
