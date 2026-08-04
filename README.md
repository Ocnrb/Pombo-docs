# Pombo Docs

Documentation site for [Pombo](https://pombo.cc), built with [Docusaurus](https://docusaurus.io/). Served at **docs.pombo.cc**.

## Develop

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
```

All content lives in `docs/` as Markdown. The sidebar is explicit in `sidebars.js` — new pages must be added there. Branding (colors, Inter font) is in `src/css/custom.css`; site config in `docusaurus.config.js`.

## Build

```bash
npm run build      # outputs static site to build/
npm run serve      # preview the production build
```

`onBrokenLinks` is set to `throw`, so the build fails on any broken internal link.

## Deploy

Like the landing page, this deploys as a separate repo. The static output in `build/` can go to GitHub Pages or Vercel:

- **GitHub Pages:** push this folder to its own repo, publish `build/` (e.g. via the `gh-pages` branch or a Pages action running `npm run build`). `static/CNAME` already contains `docs.pombo.cc`.
- **DNS:** add a CNAME record for `docs.pombo.cc` pointing at the host, same as `pombo.cc`.
