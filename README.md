# mybeer.recipes website

The marketing site for [mybeer.recipes](https://mybeer.recipes), built with
[Hugo](https://gohugo.io) and [Tailwind CSS](https://tailwindcss.com), and
served by GitHub Pages from `docs/`.

## Editing content

Page copy lives in Markdown front matter under `content/`:

| Page | File |
| --- | --- |
| Home | `content/_index.md` |
| Pricing (tiers, FAQ) | `content/pricing.md` |
| Support | `content/support.md` |
| Developers, Data API | `content/developers.md`, `content/data-api.md` |
| Blog posts | `content/blog/*.md` (remove `draft: true` to publish) |
| Legal documents, imprint | `content/legal/` |
| Beta sign-up | `content/beta.md` |

Site-wide settings (web app URL, email, analytics ID, form endpoints, menus)
are in `config.yaml`. Photos go in `assets/images/` and are resized and
converted to WebP at build time. Icons are Material Symbols SVGs in
`assets/icons/`.

## Beta sign-ups

Until launch, `params.appURL` points every app link at `/beta/`. Its form
subscribes people to listmonk (`params.listmonk` in `config.yaml`). To also
store the brewer type, brewery name and devices, deploy the optional Worker in
`workers/beta-signup/`. See [LISTMONK.md](LISTMONK.md) for the listmonk setup.

## Building locally

Install [Hugo extended](https://github.com/gohugoio/hugo/releases) and the
[Tailwind CSS standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases)
(no Node.js needed), then run in two terminals:

```sh
tailwindcss -i assets/css/main.css -o assets/css/site.css --watch
hugo server
```

## Deploying

Pushing to `master` runs `.github/workflows/hugo.yml`, which builds the CSS and
the site and commits the result to `docs/`.
