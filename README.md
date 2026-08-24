# Pombo Docs

Documentation for [Pombo](https://pombo.cc) — an open-source gateway to decentralized communications. Live at **[docs.pombo.cc](https://docs.pombo.cc)**, built with [Docusaurus](https://docusaurus.io/).

## Contributing

Found a mistake, something outdated, or a topic that deserves a better explanation? Contributions are welcome.

- All content lives in [`docs/`](docs/) as plain Markdown — most fixes are a one-file edit.
- For small corrections, editing the file directly on GitHub and opening a pull request is enough.
- New pages must be added to the sidebar in [`sidebars.js`](sidebars.js).
- Please keep the docs' tone: factual, honest about limitations, and verified against how Pombo actually behaves.

## Running locally

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
```

`npm run build` produces the static site in `build/` and fails on any broken internal link — run it before opening a PR.

## Deployment

Pushes to `main` are built and deployed automatically to docs.pombo.cc by the GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Contributors don't need to do anything — merged changes go live in a couple of minutes.

## Links

- App: [app.pombo.cc](https://app.pombo.cc)
- Source: [github.com/Pombo-app/Pombo](https://github.com/Pombo-app/Pombo)
- X: [@app_Pombo](https://x.com/app_Pombo)
