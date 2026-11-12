# Together We Made Power: redesign and speed plan

Written 2026-11-10. The style rules are in `DESIGN_SYSTEM.md`.

## Why
The user's foundation site (`~/Projects/Claude/Together-we-are-strong/`, live at https://www.twmp.com.ua/, React 18 + Vite + Tailwind + shadcn on Vercel, EN/UK) feels slow and looks weak. Research this session (three parallel agents) found the following.

**Why it's slow (media, not code):**
- JS is only 114 KB.
- Opening the home page downloads about 155 MB:
  - a 100 MB, 153 s HEVC background video (Firefox and many Chromes can't play HEVC)
  - 30 card photos totalling 49 MB, shown at about 288 px
  - a 3.3 MB partner logo
- Campaign pages load whole galleries at full size (up to 308 MB).
- `public/` is 1.14 GB: 293 of 329 images are over 2000 px.
- Nothing is cached (`max-age=0` even for hashed assets), and an unused Rubik font blocks rendering.

**Why it looks weak:**
- Grey-dark only, with flag blue on dark at 2.24:1 and white on yellow at 1.33:1 (both fail WCAG).
- Three fonts, about 10 animations on nearly every element, and hover-only descriptions (invisible on phones).
- Raw bank details as text, a fake "QR" (it links to Instagram), dead Help buttons.
- No footer, contacts, reports or campaign status.
- Three different names (TWMP / Together We Made Power / Together We Are Strong).

**What good charity sites do:** Donate always in reach; payment details as copy buttons and QR; a clear "where the money goes"; a trust block near every ask; dignified documentary photos; calm palettes with one accent.

**User decisions:** light and dark mode (light by default, follows the phone setting); the font is **Onest**.

**Outcome:** two documents written into the project now, then the work in phases (each phase needs the user's go).

## Phases
Each phase is one PR and starts only on the go-ahead.

### Phase 0: Speed first, no visual change (biggest win, about 1 day)
1. Media pipeline script, `scripts/optimize-media.mjs` with sharp and ffmpeg:
   - images → AVIF/WebP/JPEG at 480/960/1600 px (long edge at most 1600)
   - videos → H.264 720p at most, plus posters
   - output to `public/media/`, plus a manifest that is also used to count gallery items (fixes the "10 vs 4 images" bug)
   - The originals move out of the repo to an archive folder (needs the user's OK).
2. Background video → a 10–15 s, 720p loop (under 3 MB) with a poster image, or a still photo. `preload="none"`.
3. Home cards: `<picture>` + srcset, `loading="lazy"`, width/height. Partner logo `gastroFamily.webp` resized; `logo.svg` stripped of its embedded PNG.
4. Campaign galleries: thumbnails first, full image only when opened; videos `preload="none"`.
5. `vercel.json`: `/assets/*` → `public, max-age=31536000, immutable`; `/media/*` → 30 days. Remove the Rubik link.
6. Lazy-load the campaign and bank-details routes; split the i18n JSON per language.
7. Delete the 2 unused photos and fix the MedicalAid count.
8. **Expected:** home page about 155 MB → under 2 MB; `public/` 1.1 GB → under 150 MB.

### Phase 1: Design system in code (about 1 day)
- Tokens in `src/index.css` (light plus `.dark` and `prefers-color-scheme`).
- `tailwind.config.js` mapping, the Onest font files, and the base components (Button, Card, Chip, ProgressBar, CopyField, LanguageSwitch, ThemeToggle).
- Remove leftover Vite template CSS (`src/App.css`), unused keyframes and broken classes (`text-typography-primary`, `font-monserrat`).

### Phase 2: Information architecture and pages (2–3 days)
Routes: `/:lang/` home, `/:lang/campaigns`, `/:lang/campaigns/:id`, `/:lang/donate`, `/:lang/reports`, `/:lang/about`, `/:lang/help` and `/:lang/volunteer` (forms or mailto until a backend exists).

**Home order:**
1. Hero: one sentence of mission, Donate and "See campaigns".
2. Active campaigns with progress.
3. Impact numbers, dated.
4. "Where the money goes".
5. A story.
6. Partners: a static grid.
7. Team: a short line per person.
8. Get help / volunteer.
9. Footer.

**Donate page:**
- Tabs "In Ukraine" (Monobank jar, UAH IBAN, NBU payment QR) and "International" (EUR IBAN/SWIFT, PayPal).
- Copy buttons on every field, the purpose of payment ready to copy.
- Concrete preset amounts ("₴500 = …").
- A thank-you page with share buttons.

### Phase 3: Trust and content (ongoing; needs the user's material)
- Legal details and EDRPOU, monthly reports (PDF) with "last updated", campaign status and goals, consented stories, real alt texts, and a fixed name.
- Meta description, Open Graph image per page, favicon set.

### Phase 4: Quality gates
- Lighthouse CI or PageSpeed with an API key on every deploy (the budgets above).
- axe accessibility check.
- Link and image check (no missing media).
- Optional: move big history files to Git LFS (the `.git` folder is 2 GB; rewriting history needs a separate OK).

## Files involved (later phases)
- `src/index.css`, `tailwind.config.js`, `index.html`, `src/App.css` (delete), `src/App.tsx` (routes)
- `src/components/**` (Navbar, Top, Team, Projects, Stats, About, Partners, Help, donate/*, projects/ProjectPage.tsx)
- `src/i18n/{en,uk}.json`, `vercel.json`, new `scripts/optimize-media.mjs`, `public/` → `public/media/`

## Verification
- **Phase 0:** before/after page weight (DevTools network or `curl` on the Vercel preview), plus PageSpeed mobile with an API key, or local Lighthouse. Budgets met; the hero video plays in Firefox.
- **Phase 1–2:**
  - a visual check in both modes and both languages at 360 and 1280 px
  - keyboard-only walk-through
  - the axe scan has no serious issues
  - contrast checked with the token table
  - every copy button works on the phone
- **Throughout:** `npm run build` and lint pass. Don't run `npm install` on the shared folder (README warning): install in a non-shared clone or check `node_modules` afterwards.


## Status
| Phase | Status |
|---|---|
| 0 Speed first | done 2026-11-10 on branch `perf/phase-0` (not merged or deployed yet); see below |
| 1 Design system in code | done 2026-11-10 on branch `design/phase-1` (based on phase 0); see below |
| 2 Information architecture and pages | done, live on main since 2026-11-11 |
| 3 Trust and content | not started; needs material from the foundation |
| 4 Quality gates | not started |

## Phase 0 result (2026-11-10)
- `scripts/optimize_media.py` builds `public/media/`:
  - photos as AVIF + WebP at 480/960/1600 px, with camera metadata (including any GPS) removed
  - videos as 720p H.264 under 5 MB each, with poster frames
  - the logo as PNG/WebP
  - a manifest, `src/media-manifest.json`
- The originals moved out of the repo to `~/Archive/twmp-media-originals-2026-11-10/` (348 files, 1.2 GB; checked identical before removing).
- `Picture` component (`src/components/Picture.tsx`): `<picture>` with srcset/sizes, lazy loading, width/height. Used by the team and campaign cards, partner logos, logo, QR and galleries.
- Campaign galleries come from the files on disk, not the `image-count` keys, which fixes MedicalAid (4 real photos, not 10). Thumbnails are small; videos show a poster and load only when opened.
- Hero: a still poster loads first (preloaded). The 15 s, 2.4 MB clip plays only on fast connections and when reduced motion is off.
- `vercel.json`:
  - `/assets/*` cached for a year (immutable), `/media/*` for 30 days
  - missing media now return 404 instead of the HTML page
- `index.html`:
  - The Rubik font link is removed.
  - The title and meta description now use the legal name, Together We Made Power.
  - The PNG favicon comes from the logo.
- The campaign and bank-details pages are lazy routes. The `projects` component name is fixed (2 lint errors that were already there).
- **Measured:**
  - home page if fully scrolled: about 155 MB → about 1.7 MB (desktop) / 3.7 MB (phone, 3× screen); first screen under 0.5 MB
  - `public/` 1.14 GB → 191 MB
  - no video over 5 MB
- **Not done:** splitting the translation files per language (about 30 KB saving, deferred to Phase 2 with the `/:lang` routes); Lighthouse scores (downloading Lighthouse was blocked here; run PageSpeed on the Vercel preview).

## Phase 1 result (2026-11-10)
- **Tokens** in `src/index.css`: light by default, `.dark` follows the phone; values as in DESIGN_SYSTEM.md, written as RGB channels so Tailwind opacity works. `tailwind.config.js` maps the new names (`bg`, `surface`, `sunk`, `tint`, `ink`, `muted`, `primary`, `accent`, `success`, `danger`, `line`), and the old names point at them until Phase 2.
- **Theme:**
  - `index.html` applies the theme before the first paint, so there's no flash.
  - The sun/moon switch in the header remembers only a real tap.
  - `theme-color` meta for both modes.
- **Font:**
  - Onest is self-hosted: 4 WOFF2 subsets, 88 KB, OFL licence in `public/fonts/`, the Latin file preloaded, and an Arial fallback resized to match.
  - Poppins and Montserrat (fontsource) are removed.
- **Motion:**
  - The ten animations are now one 0.35 s fade/rise.
  - `useInView` fires once, so sections no longer hide again when scrolled away.
  - `prefers-reduced-motion` turns motion off.
- **Accessibility:**
  - focus ring on everything, and the one `focus:outline-none` removed
  - `<html lang>` follows the language
  - The EN/УК switch is one segmented control with `aria-pressed`.
  - 44 px touch targets on buttons and switches
- **Building blocks:**
  - `ui/button.tsx` variants: default, donate, outline, ghost, link
  - `ds/` Card, Chip, ProgressBar, CopyField, ThemeToggle (used in Phase 2)
- **Colour sweep:**
  - every hard-coded white, black, gray and gradient class replaced, and yellow text removed (it fails on light backgrounds)
  - The help section now has ink text on yellow; it was white on yellow at 1.33:1.
  - Partner logos sit on navy tiles, so white logos stay visible.
  - The hero text has side padding on phones.
- **Removed:** the Vite template `App.css` (purple glow) and the hover zooms.
- **Checked:** build and lint (0 errors); screenshots of the whole home page in light and dark at 1280 px, the phone home page, and the dark bank-details page.
- **Left for Phase 2:**
  - campaign cards are a third of the width on phones, and descriptions only show on hover
  - the partner marquee
  - the old class names
  - the per-language routes and translation files

## Phase 2 plan (2026-11-11)
**Why now:** on the preview the user found the logo shown as a bare circle (the web copies were cut from a picture inside `logo.svg`, which holds only the ring) and white text on yellow. They asked for a full redesign with strict rules.

**Fixed first:** the logo is rendered from the SVG with `rsvg-convert`, giving the whole mark.

**New structure** (`/:lang` routes, `en` | `uk`; old URLs redirect):
- `/:lang`, home:
  1. **Hero:** split layout, real photo, short mission, Donate + "See campaigns"
  2. **Impact strip:** 4 numbers
  3. **What we help with:** 6 areas
  4. **Latest campaigns:** 6 cards + "All campaigns"
  5. **Donate teaser**
  6. **Partners:** static grid
  7. **Team:** 12, compact, roles visible
  8. **Get help / volunteer**
  9. **Footer**
- `/:lang/campaigns`: all 18 campaigns.
- `/:lang/campaigns/:id`: cover, story, a gallery grid with a viewer, highlights, impact, Donate.
- `/:lang/donate`:
  - tabs "In Ukraine (UAH)" and "International (EUR)" plus PayPal
  - a copy button on every detail
  - the legal details as a trust block

**Content:** campaign covers move from code into `src/content/campaigns.ts`. New UI strings live under `ui.*` in `en.json` and `uk.json`.

**Optimization:** routes lazy-loaded, translations loaded per language, the hero image preloaded, no video on the home page.

**Rules:** `scripts/check-design.mjs` enforces DESIGN_SYSTEM.md "Strict rules". The old Tailwind aliases are removed.

### Phase 2 result (2026-11-11)
- **Logo:** rendered in full from the SVG and always shown on a white disc.
- **New site** in `src/site/` (Layout, ui, CampaignCard, pages/):
  - routes: `/:lang`, `/:lang/campaigns`, `/:lang/campaigns/:id`, `/:lang/donate`; old URLs (`/Grooming`, `/bank-details`) redirect
  - Old `src/components/{about,donate,help,projects,team,…}` removed.
- **Data:** campaigns and partners in `src/content/campaigns.ts`; new strings under `ui.*` in both languages.
- **Per-language translation chunks:** en 9 KB, uk 12 KB gzip. Main JS about 87 KB gzip.
- **Removed dependencies:** embla, cva, radix slot, language detector.
- **Bug fixed:** `vite.config.ts` `base: "./"` broke nested URLs (blank pages); it is now `/`.
- **`npm run check:design`** runs in `npm run build`.
- **Checked:** headless screenshots of EN light and UK dark at 1280 and 390 px; home, donate and a campaign page.
- **Not built yet** (needs the foundation's material): reports, campaign goals and progress, a contact email, a Monobank jar and an NBU QR. Help and volunteer go to Instagram for now.

## Phase 2b–4 plan: "final version for review" (2026-11-11)
The user asked for every step that doesn't need the foundation to be done now. The founder will be asked for the links and form details. **No merge into main until the user says so.**

Work is split into four parallel agents, each with its own files.

**Shared setup (done by the lead first):**
- Translations per area in `src/i18n/extra/<area>.<lang>.json`, deep-merged by the loader.
- Routes and stub pages: `/about`, `/help`, `/volunteer`, `/donate/thanks`.
- `MobileDonateBar` mounted in the layout.

| # | Agent | Owns | Status |
|---|---|---|---|
| A | About, Help and Volunteer pages; nav | `site/pages/{About,Help,Volunteer}Page.tsx`, `i18n/extra/pages.*.json` | done |
| B | Donate extras: preset amounts, thank-you page with share, sticky bottom Donate bar on phones | `site/pages/{DonatePage,ThanksPage}.tsx`, `site/MobileDonateBar.tsx`, `i18n/extra/donate.*.json` | done |
| C | Copy and SEO: one name; meta, Open Graph, hreflang, canonical; icons; sitemap and robots; better photo alts | `index.html`, `public/{icons,og,robots.txt,sitemap.xml}`, `site/ui.tsx` (`usePageMeta`), `i18n/{en,uk}.json`, `scripts/make_og.py` | done |
| D | Quality checks: axe accessibility scan, link and media check, a performance budget | `scripts/qa/*`, `package.json` scripts | done |
| — | Lead: merge, build, screenshots, push the preview | | done |

**Later, needs the foundation:** reports, project goals, contact email, Monobank jar, payment QR, a real help/volunteer form, and stories.

### Phase 2b–4 result (2026-11-11)
- **New pages:**
  - About, Help and Volunteer, each with a copyable message template
  - Donate: amount presets (₴/€), FAQ, thank-you page with share buttons
  - a sticky Donate bar on phones
- **Copy:** one name everywhere; EN and UK fixes; 18 cover alts written from the photos.
- **Meta:** per-page title, description, canonical, hreflang and Open Graph.
  - `scripts/prerender-meta.mjs` (part of the build) writes `dist/<lang>/<route>/index.html` with those tags, so link previews work without JavaScript.
  - Vercel serves those files before its SPA rewrite.
- **Icons and robots:** a vector `icon.svg`, favicon, maskable icons, a manifest, OG images (`scripts/make_og.py`), and `sitemap.xml` (48 URLs) plus `robots.txt`.
- **QA:** `npm run qa` (`scripts/qa/`) builds outside `dist/` and checks 50 routes × (390 / 1280) × (light / dark).
  - Last run: axe 0 issues; links, media and i18n 0 broken; budgets all met (first view 0.2–0.54 MB, LCP ≤ 1.36 s, CLS ≤ 0.035).
- **Fixed during review:**
  - `cn()` dropped the custom text sizes (tailwind-merge was not configured), so headings rendered small.
  - Tall sections stayed invisible on phones (fade-in threshold).
  - Header logo label; projects page `h1`; mobile bar landmark.
- **Media:** 44 files over 300 KB re-encoded. Seven WebP fallbacks of very grainy photos are still 0.32–0.68 MB, used only in the full-screen viewer by browsers without AVIF.
- **Waiting on the foundation:**
  - `MONOBANK_JAR` and `PAYMENT_QR` (`src/content/campaigns.ts`), shown only once set
  - `HELP_FORM_URL` / `VOLUNTEER_FORM_URL` (Help and Volunteer pages)
  - a contact email
  - reports, project goals, stories
- **Content questions for the owner:** Russian spellings Dmitry / Andrey / Danil vs Dmytro / Andrii / Danylo; Grooming is "dog grooming" in UK only.
- **Next:** the user reviews the preview, then says whether to merge phase-0 → 1 → 2 into main.

## Phase 5: hero video and moving partners (2026-11-12, branch `design/hero-video`)
The founder liked the old video at the top and the moving partner logos, and asked for both back (animated).

| Step | What | Status |
|---|---|---|
| V1 | **Home hero:** full-width background video (the 15 s, 720p, 2.4 MB clip from Phase 0), muted, looping, playsInline, poster first. Text on a navy scrim (`.on-photo`), Donate + "See our projects" | done 2026-11-12 |
| V2 | **Video safety:** pause/play button (WCAG 2.2.2). Reduced motion or Save-Data → poster only, no video download. The video loads after first paint (`preload="none"`, starts when in view). The poster is preloaded on home pages only (prerender-meta) | done 2026-11-12 |
| P1 | **Partners marquee:** seamless loop (list ×2, translate −50 %), faded edges, pauses on hover/focus, pause button. Reduced motion → the static grid. Used on home and About | done 2026-11-12 |
| R | **DESIGN_SYSTEM rule 7:** amended. Both exceptions are allowed only with a pause control and a reduced-motion fallback | done 2026-11-12 |
| Q | build, `npm run qa`, `npm run qa:nav`, screenshots, push a preview; merge only on the user's OK | done 2026-11-12 |

**Result:** with motion, the video plays and the marquee moves. With reduced motion, no video is requested and partners show as a grid (checked with CDP). `npm run qa`: 0 axe issues, budgets met (home first view ~240 KB, LCP ≤ 1.24 s). `qa:nav` passes. Waiting for the user's review before merging.
