# WORKLOG

## 2026-11-10: redesign concept and speed plan
- Audit:
  - The home page downloads about 155 MB: a 100 MB HEVC background video and 49 MB of card photos. `public/` is 1.14 GB, and nothing is cached.
  - Contrast fails: blue on dark 2.24, white on yellow 1.33. Three fonts, constant animation, no footer, contacts or reports.
- Decisions: light and dark mode, the Onest font, the concept "Warm hands, clear ledger".
- Written: `DESIGN_SYSTEM.md` (colour tokens checked for contrast, type, components, imagery, motion, accessibility and speed budgets) and `REDESIGN_PLAN.md` (phases 0–4, speed first). No code changed yet.

## 2026-11-10: Phase 0 (speed), branch perf/phase-0
- Media pipeline, `Picture` component, galleries from a manifest, a light hero, caching and a lazy route. Originals archived to `~/Archive/twmp-media-originals-2026-11-10/`.
- Home page about 155 MB → under 4 MB (first screen under 0.5 MB); `public/` 1.14 GB → 191 MB. Build and lint pass (0 errors).
- Next: push the branch for a Vercel preview, check it in Firefox and on a phone, then merge to main.

## 2026-11-10: Phase 1 (design system in code), branch design/phase-1
- Tokens for light and dark, the Onest font self-hosted, one calm animation, focus rings, `html lang`, a theme switch, the building blocks, and every hard-coded colour replaced. Details in REDESIGN_PLAN.md.
- Fixed along the way: sections hiding again when scrolled away (`useInView`); the theme switch pinning the theme on load.

## 2026-11-11: Phase 2 (branch design/phase-2)
- **The user reported** a logo shown as a bare circle and white text on yellow on the preview.
- **Fixed:** the logo is now rendered from the full SVG. The site has been rebuilt to the stricter rules (DESIGN_SYSTEM.md, "Strict rules"), enforced by `scripts/check-design.mjs`.
- See the REDESIGN_PLAN.md "Phase 2 result" section.
- **Next:** the user reviews the Vercel preview; then merge perf/phase-0 → design/phase-1 → design/phase-2 into main (needs the user's OK).

## 2026-11-11: Phase 2b–4 ("final version for review")
- Four parallel agents (pages, donate, copy/SEO, QA), then a lead merge and fixes. Details are in the REDESIGN_PLAN.md "Phase 2b–4 result" section.
- QA is clean: `npm run qa`.
- **Not merged:** the user reviews the preview first.

## 2026-11-11: blank page after the first click (fixed)
- **Report from the user:** switching language or opening another page showed an empty page until a reload.
- **Cause:** a Layout effect did `return window.scrollTo(0, 0)`. Newer Chrome returns a Promise from scrollTo, and React called it as the cleanup on the next route change and crashed.
- **Fix:** the effect now uses a plain statement.
- **Not caught by `npm run qa`,** which loads each page fresh. Added `npm run qa:nav` (`scripts/qa/nav.mjs`), which clicks through pages and both language switches.
