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
