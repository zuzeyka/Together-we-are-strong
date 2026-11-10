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
| 2 Information architecture and pages | not started |
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
