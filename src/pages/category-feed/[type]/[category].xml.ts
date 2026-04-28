import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
    const posts = await getCollection('posts', ({ data }) => !data.draft);

    const categorySet = new Set<string>();
    for (const post of posts) {
        for (const cat of post.data.categories) {
            categorySet.add(cat.toLowerCase());
        }
    }

    const paths = [];
    for (const category of categorySet) {
        paths.push({ params: { type: 'rss', category } });
        paths.push({ params: { type: 'atom', category } });
    }

    return paths;
}

export async function GET(context: any) {
    const { type, category } = context.params;
    const posts = await getCollection('posts', ({ data }) => !data.draft);
    const siteUrl = context.site.href.replace(/\/$/, '');

    const filtered = posts
        .filter(p => p.data.categories.some((c: string) => c.toLowerCase() === category))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
        .slice(0, 20);

    if (type === 'rss') {
        return rss({
            title: `Tim Heuer - ${category}`,
            description: `Posts tagged with ${category}`,
            site: context.site,
            items: filtered.map((post) => ({
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description || '',
                link: `/blog/${post.data.slug}/`,
            })),
        });
    }

    // Atom format
    const entries = filtered.map(post => `
    <entry>
      <title>${escapeXml(post.data.title)}</title>
      <link href="${siteUrl}/blog/${post.data.slug}/" rel="alternate" type="text/html" />
      <id>${siteUrl}/blog/${post.data.slug}/</id>
      <published>${post.data.pubDate.toISOString()}</published>
      <updated>${(post.data.lastModified || post.data.pubDate).toISOString()}</updated>
      <summary>${escapeXml(post.data.description || '')}</summary>
    </entry>`).join('');

    const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Tim Heuer - ${escapeXml(category)}</title>
  <link href="${siteUrl}/blog/category-feed/atom/${category}/" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}/blog/" rel="alternate" type="text/html" />
  <id>${siteUrl}/blog/category/${category}/</id>
  <updated>${filtered[0]?.data.pubDate.toISOString() || new Date().toISOString()}</updated>
  ${entries}
</feed>`;

    return new Response(atom, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
