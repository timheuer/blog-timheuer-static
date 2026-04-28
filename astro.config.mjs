// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://timheuer.com',
    base: '/blog',
    output: 'static',
    integrations: [sitemap()],
    markdown: {
        shikiConfig: {
            theme: 'github-light',
        },
    },
    redirects: {
        '/blog/default.aspx': '/blog/',
        '/blog/contact.aspx': '/blog/contact',
        '/blog/archives.aspx': '/blog/categories',
        '/blog/search.aspx': '/blog/',
    },
});
