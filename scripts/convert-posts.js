#!/usr/bin/env node
/**
 * Converts XML blog posts from the ASP.NET blog to Markdown files
 * with YAML frontmatter for Astro content collections.
 *
 * Usage: node scripts/convert-posts.js [--posts-dir path] [--output-dir path]
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXml = promisify(parseString);

const POSTS_DIR = process.argv.includes('--posts-dir')
    ? process.argv[process.argv.indexOf('--posts-dir') + 1]
    : join(import.meta.dirname, '..', '..', 'timheuerblog', 'wwwroot', 'Posts');

const OUTPUT_DIR = process.argv.includes('--output-dir')
    ? process.argv[process.argv.indexOf('--output-dir') + 1]
    : join(import.meta.dirname, '..', 'src', 'content', 'posts');

function escapeYamlString(str) {
    if (!str) return '""';
    // If it contains special chars, wrap in double quotes and escape inner quotes
    if (/[:#\[\]{}&*!|>'"`,@%\\]/.test(str) || str.trim() !== str) {
        return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    return '"' + str.replace(/"/g, '\\"') + '"';
}

function formatDate(dateStr) {
    if (!dateStr) return null;
    // Input format: "2017-11-02 21:34:45"
    const d = new Date(dateStr.replace(' ', 'T') + 'Z');
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
}

function sanitizeSlug(slug) {
    if (!slug) return null;
    // Remove any leading/trailing whitespace
    return slug.trim().toLowerCase();
}

async function convertPost(xmlPath) {
    const xml = readFileSync(xmlPath, 'utf-8');
    let parsed;
    try {
        parsed = await parseXml(xml);
    } catch (e) {
        console.error(`Failed to parse ${xmlPath}: ${e.message}`);
        return null;
    }

    const post = parsed.post;
    if (!post) {
        console.error(`No <post> element in ${xmlPath}`);
        return null;
    }

    const getText = (field) => {
        const val = post[field];
        if (!val) return '';
        if (Array.isArray(val)) return val[0] || '';
        return val;
    };

    const title = getText('title');
    const slug = sanitizeSlug(getText('slug'));
    const pubDate = formatDate(getText('pubDate'));
    const lastModified = formatDate(getText('lastModified'));
    const excerpt = getText('excerpt');
    const content = getText('content');
    const isPublished = getText('ispublished') === 'true';

    // Extract categories
    let categories = [];
    if (post.categories && post.categories[0] && post.categories[0].category) {
        categories = post.categories[0].category
            .map(c => (typeof c === 'string' ? c : c._ || '').trim())
            .filter(Boolean);
    }

    if (!slug) {
        console.warn(`Skipping ${xmlPath}: no slug`);
        return null;
    }

    // Build frontmatter
    const lines = [
        '---',
        `title: ${escapeYamlString(title)}`,
        `slug: ${escapeYamlString(slug)}`,
        `pubDate: ${pubDate || new Date().toISOString()}`,
    ];
    if (lastModified) {
        lines.push(`lastModified: ${lastModified}`);
    }
    if (excerpt) {
        lines.push(`description: ${escapeYamlString(excerpt)}`);
    }
    if (categories.length > 0) {
        lines.push(`categories:`);
        for (const cat of categories) {
            lines.push(`  - ${escapeYamlString(cat)}`);
        }
    } else {
        lines.push(`categories: []`);
    }
    lines.push(`draft: ${!isPublished}`);
    lines.push('---');
    lines.push('');
    lines.push(content);
    lines.push('');

    return {
        slug,
        content: lines.join('\n'),
    };
}

async function main() {
    console.log(`Reading posts from: ${POSTS_DIR}`);
    console.log(`Writing to: ${OUTPUT_DIR}`);

    if (!existsSync(POSTS_DIR)) {
        console.error(`Posts directory not found: ${POSTS_DIR}`);
        process.exit(1);
    }

    mkdirSync(OUTPUT_DIR, { recursive: true });

    const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.xml'));
    console.log(`Found ${files.length} XML files`);

    let converted = 0;
    let skipped = 0;
    const slugsSeen = new Set();

    for (const file of files) {
        const result = await convertPost(join(POSTS_DIR, file));
        if (!result) {
            skipped++;
            continue;
        }

        // Handle duplicate slugs by appending the file ID
        let finalSlug = result.slug;
        if (slugsSeen.has(finalSlug)) {
            const id = basename(file, '.xml');
            finalSlug = `${finalSlug}-${id}`;
            console.warn(`Duplicate slug "${result.slug}" in ${file}, using "${finalSlug}"`);
        }
        slugsSeen.add(finalSlug);

        const outPath = join(OUTPUT_DIR, `${finalSlug}.md`);
        writeFileSync(outPath, result.content, 'utf-8');
        converted++;
    }

    console.log(`Done! Converted: ${converted}, Skipped: ${skipped}`);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
