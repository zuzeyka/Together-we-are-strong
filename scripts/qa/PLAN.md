# QA tooling plan (2026-11-11)

Goal: `npm run qa` = build to a temp dir, serve with SPA fallback, drive headless Chromium over CDP,
run axe (light/dark, 390/1280), link/media/i18n/console checks and perf budgets; write QA.md.

- [x] 1. Install axe-core devDependency, verify node_modules/axe-core/axe.min.js
- [x] 2. Confirm `npx vite build --outDir <tmp>` works (3 s)
- [x] 3. Write scripts/qa/serve-and-run.mjs (server, CDP client, checks, report)
- [x] 4. Add `qa` script to package.json
- [x] 5. Run it (266 s, 50 routes, 100 loads), write QA.md (auto section between markers + hand-written findings)

Result 2026-11-11: exit 1 because of one serious axe issue (uk logo link label mismatch); 2 moderate;
0 broken links/media; 0 missing keys; 0 console errors; all budgets met. Details in QA.md.

Decisions:
- Out dir: `$QA_OUT_DIR`, default `$TMPDIR/twmp-qa/dist`; never `dist/`.
- Server mimics vercel.json: missing /media/ or /assets/ -> 404, other missing paths -> index.html.
  Text responses are gzipped so transferred bytes are realistic.
- Perf pass = 390 px, light, throttled (fast 4G: 150 ms RTT, 9 Mbps; CPU 4x), cache disabled.
  LCP/CLS read before scrolling. Same load then serves the 390 axe pass (light, then dark by
  emulated media + `dark` class). 1280 px is a second, unthrottled load per route.
- Reduced motion emulated so reveal transitions do not confuse color-contrast.
