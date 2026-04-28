# Writing a New Blog Post

## 1. Create a Markdown file

Add a new `.md` file in `astro-blog/src/content/posts/`. The filename can be anything descriptive (e.g. `my-new-post.md`) — the `slug` in frontmatter controls the URL.

## 2. Add frontmatter

Every post needs YAML frontmatter at the top:

```markdown
---
title: "Your Post Title"
slug: "2026/04/28/your-post-slug"
pubDate: 2026-04-28
description: "A brief summary for SEO and RSS feeds"
categories:
  - dotnet
  - aspnetcore
draft: false
---

Your post content here in **Markdown**.
```

### Required fields

| Field | Description |
|-------|-------------|
| `title` | The post title displayed on the page and in feeds |
| `slug` | URL path after `/blog/` — use `YYYY/MM/DD/short-name` format to match existing posts |
| `pubDate` | Publication date (`YYYY-MM-DD`) |

### Optional fields

| Field | Default | Description |
|-------|---------|-------------|
| `description` | `""` | Short summary for `<meta>` tags, RSS, and social sharing |
| `categories` | `[]` | Array of category tags |
| `lastModified` | — | Date the post was last updated |
| `draft` | `false` | Set to `true` to exclude from production builds |

## 3. Preview locally

```bash
cd astro-blog
npm run dev
```

Visit `http://localhost:4321/blog/{your-slug}/`. Changes hot-reload automatically.

## 4. Build and verify

```bash
npm run build
npm run preview
```

The `preview` command serves the production build at `http://localhost:4321/blog/` — this is what GitHub Pages will serve.

## 5. Publish

Commit and push to `main`. The GitHub Actions workflow automatically builds and deploys to GitHub Pages.

## Tips

- **Images**: Place images in `astro-blog/public/images/` and reference them as `/blog/images/your-image.png` in Markdown.
- **Drafts**: Set `draft: true` to keep a post out of listings and feeds while you work on it. Draft posts are still accessible by direct URL in dev mode.
- **Categories**: Use lowercase, hyphenated names. Browse existing categories at `/blog/categories/` to stay consistent.
- **Code blocks**: Use fenced code blocks with a language identifier for syntax highlighting (e.g. ` ```csharp`).
- **Legacy URLs**: Old ASP.NET-style URLs (`/blog/archive/YYYY/MM/DD/slug.aspx`) automatically redirect to the new URL via generated redirect pages.
