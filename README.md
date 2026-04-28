# Tim Heuer's Blog

Personal blog at [timheuer.com/blog](https://timheuer.com/blog), built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Project Structure

```text
/
├── public/          # Static assets (images, CNAME, robots.txt)
├── src/
│   ├── components/  # Astro components
│   ├── content/
│   │   └── posts/   # Blog posts (Markdown)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes (index, categories, feeds, etc.)
│   └── styles/      # SCSS stylesheets
├── astro.config.mjs
└── package.json
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the build locally before deploying   |

## Deployment

The site is automatically built and deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml` on push to `main`.
