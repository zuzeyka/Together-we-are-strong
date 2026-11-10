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
| 0 Speed first | not started |
| 1 Design system in code | not started |
| 2 Information architecture and pages | not started |
| 3 Trust and content | not started; needs material from the foundation |
| 4 Quality gates | not started |
