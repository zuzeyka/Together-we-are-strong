# Together-we-are-strong

Website for a charity/mutual-aid foundation (campaign pages, team, donation
info) with English and Ukrainian translations.

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS + shadcn/ui components (`src/components/ui/`)
- `react-router-dom` for routing, `react-i18next` for translations
- Deployed on Vercel (see `vercel.json` for the SPA rewrite rule)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check (tsc) + production build
npm run preview   # preview the production build locally
npm run lint       # eslint over src/**/*.{ts,tsx}
```

> This repo lives on a VirtualBox shared folder in some environments. If
> `npm install` behaves oddly (missing/corrupted packages), re-run it and
> verify `node_modules` before trusting it.

## Routes

- `/` — home page (`src/components/Home.tsx`)
- `/:campaignId` — a single campaign's detail/gallery page
  (`src/components/projects/ProjectPage.tsx`)
- `/bank-details` — donation bank details (`src/components/donate/BankDetails.tsx`)

## Campaign content & media — read this before adding/editing a campaign

Each campaign has a folder under `public/projects/<campaignId>/` containing:

- Images named `0.jpg`, `1.jpg`, `2.jpg`, ... (sequential, zero-indexed)
- Videos named `video0.mp4`, `video1.mp4`, ...

The number of images/videos a campaign has is **not** derived from the
filesystem — it's hardcoded per campaign in the translation files
`src/i18n/en.json` and `src/i18n/uk.json`, under `"image-count"` and
`"video-count"` for each campaign entry. `ProjectPage.tsx` reads those counts
and generates the expected filenames.

**This means:** if you add, remove, or renumber files in
`public/projects/<campaignId>/`, you must update `image-count`/`video-count`
in **both** `en.json` and `uk.json` to match, or the gallery will either
break (missing image) or silently omit photos that exist on disk. There is
currently no validation that these stay in sync — double-check by hand.

## Known gaps / follow-ups

See `/srv/shared/reports/together-we-are-strong-optimization-report.md` for a
full optimization analysis (media size, git repo bloat, testing/CI gaps,
etc.) and a prioritized action plan.

## Photos and videos
Originals don't live in the repo. Put new ones in the originals archive (same folder layout as the old `public/`, e.g. `projects/<Campaign>/12.jpg`), then run `python3 scripts/optimize_media.py <archive folder>`. It writes the web versions to `public/media/` and updates `src/media-manifest.json`; galleries pick up new files by themselves. In code, show images with `<Picture src="/projects/X/1.jpg" alt="…" sizes="…" />`.
