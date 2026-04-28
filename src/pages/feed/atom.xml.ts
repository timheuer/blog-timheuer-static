import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const posts = await getCollection('posts', ({ data }) => !data.draft);
    const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 20);
    const siteUrl = context.site.href.replace(/\/$/, '');

    const entries = sorted.map(post => `
    <entry>
      <title>${escapeXml(post.data.title)}</title>
      <link href="${siteUrl}/blog/${post.data.slug}/" rel="alternate" type="text/html" />
      <id>${siteUrl}/blog/${post.data.slug}/</id>
      <published>${post.data.pubDate.toISOString()}</published>
      ${post.data.lastModified ? `<updated>${post.data.lastModified.toISOString()}</updated>` : `<updated>${post.data.pubDate.toISOString()}</updated>`}
      <author><name>Tim Heuer</name></author>
      <summary>${escapeXml(post.data.description || '')}</summary>
      ${post.data.categories.map(c => `<category term="${escapeXml(c)}" />`).join('\n      ')}
    </entry>`).join('');

    const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Tim Heuer</title>
  <subtitle>The web site and blog of Tim Heuer, Program Manager for .NET</subtitle>
  <link href="${siteUrl}/blog/feed/atom/" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}/blog/" rel="alternate" type="text/html" />
  <id>${siteUrl}/blog/</id>
  <updated>${sorted[0]?.data.pubDate.toISOString() || new Date().toISOString()}</updated>
  <author><name>Tim Heuer</name></author>
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
