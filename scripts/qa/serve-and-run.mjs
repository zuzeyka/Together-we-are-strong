#!/usr/bin/env node
// Repeatable quality checks for the TWMP site: accessibility (axe-core), links and media,
// translation keys, console errors and performance budgets (DESIGN_SYSTEM.md, "Budgets per page").
//
//   npm run qa                      build, serve, check every route in en + uk, update QA.md
//   npm run qa -- --no-build        reuse the last build in the out dir
//   npm run qa -- --only=donate     only routes whose path contains "donate"
//   npm run qa -- --no-report       don't touch QA.md (results still go to <out>/../qa-results.json)
//
// Env: QA_OUT_DIR (build output; default $TMPDIR/twmp-qa/dist, never dist/), CHROME (browser binary).
// Exit code 1 on serious/critical axe violations or broken internal links/media. Budget misses,
// missing translation keys and console errors are warnings.
// No dependencies beyond axe-core: the browser is driven over the Chrome DevTools Protocol with
// Node's built-in WebSocket, and the build is served by a tiny http server with SPA fallback.

import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

const OUT = path.resolve(process.env.QA_OUT_DIR || path.join(os.tmpdir(), "twmp-qa", "dist"));
if (OUT === path.join(ROOT, "dist") || OUT.startsWith(path.join(ROOT, "dist") + path.sep)) {
    console.error("QA_OUT_DIR must not be the shared dist/ folder");
    process.exit(2);
}
const RESULTS_JSON = path.join(path.dirname(OUT), "qa-results.json");
const REPORT = path.join(ROOT, "QA.md");

const BUDGET = { firstViewKB: 1500, jsGzKB: 150, imageKB: 300, cls: 0.1, lcpMs: 2500 };
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
// Fast-4G-like conditions for the performance pass (Lighthouse's mobile preset is slower still).
const THROTTLE = { latency: 150, downloadThroughput: (9e6 / 8) | 0, uploadThroughput: (1.5e6 / 8) | 0, cpu: 4 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kb = (b) => Math.round(b / 102.4) / 10;
const log = (...a) => console.log("[qa]", ...a);

// ---------------------------------------------------------------- source facts
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const CAMPAIGN_IDS = [...read("src/content/campaigns.ts").matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]);
const LANGS = ["en", "uk"];
const PAGES = ["", "/campaigns", ...CAMPAIGN_IDS.map((id) => `/campaigns/${id}`), "/donate", "/donate/thanks", "/about", "/help", "/volunteer"];
let ROUTES = LANGS.flatMap((l) => PAGES.map((p) => `/${l}${p}`));
if (opt("only")) ROUTES = ROUTES.filter((r) => r.includes(opt("only")));

const ROUTE_RE = new RegExp(
    `^/(?:(?:en|uk)(?:/(?:campaigns(?:/(?:${CAMPAIGN_IDS.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}))?|donate(?:/thanks)?|about|help|volunteer))?)?/?$`
);

function walk(dir, exts, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, exts, out);
        else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
    }
    return out;
}
const SRC_FILES = walk(path.join(ROOT, "src"), [".ts", ".tsx"]).map((f) => ({
    file: path.relative(ROOT, f),
    lines: fs.readFileSync(f, "utf8").split("\n"),
}));

/** file:line hints for a string that appears literally in src. */
function grepSrc(needle, max = 2) {
    const hits = [];
    if (!needle || needle.length < 4) return hits;
    for (const { file, lines } of SRC_FILES)
        lines.forEach((l, i) => {
            if (hits.length < max && l.includes(needle)) hits.push(`${file}:${i + 1}`);
        });
    return hits;
}
/** Best-effort source hint for an axe node, from its class list, id or aria-label. */
const I18N_BY_VALUE = new Map(); // translated string -> key, filled by checkI18n()
function hintFor(html, target = "") {
    if (/^(html|body)$/.test(target.trim())) return [];
    // aria-label / alt / title text -> translation key -> t("key") call site (most precise)
    for (const re of [/\baria-label="([^"]+)"/, /\balt="([^"]+)"/, /\btitle="([^"]+)"/]) {
        const key = I18N_BY_VALUE.get(re.exec(html)?.[1]);
        const h = key && grepSrc(`"${key}"`);
        if (h?.length) return h;
    }
    const cls = /class="([^"]+)"/.exec(html)?.[1]?.trim();
    if (cls) {
        const toks = cls.split(/\s+/);
        for (const n of [toks.length, 6, 4, 3, 2]) {
            if (n > toks.length) continue;
            for (let s = 0; s + n <= toks.length; s += Math.max(1, n)) {
                const h = grepSrc(toks.slice(s, s + n).join(" "));
                if (h.length) return h;
            }
        }
    }
    for (const re of [/\bid="([^"]+)"/, /\bhref="(\/[^"]+)"/, /\bsrc="([^"]+)"/]) {
        const v = re.exec(html)?.[1];
        const h = v && grepSrc(v);
        if (h?.length) return h;
    }
    return [];
}

// ---------------------------------------------------------------- translation keys
function checkI18n() {
    const merge = (a, b) => {
        const out = { ...a };
        for (const [k, v] of Object.entries(b)) {
            const p = out[k];
            out[k] = v && typeof v === "object" && !Array.isArray(v) && p && typeof p === "object" && !Array.isArray(p) ? merge(p, v) : v;
        }
        return out;
    };
    const flat = (o, pre = "", set = new Set()) => {
        for (const [k, v] of Object.entries(o)) {
            const key = pre ? `${pre}.${k}` : k;
            set.add(key);
            if (v && typeof v === "object") flat(v, key, set);
        }
        return set;
    };
    const keys = {};
    for (const l of LANGS) {
        const extras = fs.readdirSync(path.join(ROOT, "src/i18n/extra")).filter((f) => f.endsWith(`.${l}.json`)).sort();
        const merged = [JSON.parse(read(`src/i18n/${l}.json`)), ...extras.map((f) => JSON.parse(read(`src/i18n/extra/${f}`)))].reduce(merge);
        keys[l] = flat(merged);
        const vals = (o, pre = "") => { for (const [k, v] of Object.entries(o)) { const key = pre ? `${pre}.${k}` : k; if (typeof v === "string") I18N_BY_VALUE.set(v, key); else if (v && typeof v === "object") vals(v, key); } };
        vals(merged);
    }
    const has = (l, k) => keys[l].has(k) || keys[l].has(`${k}_one`) || keys[l].has(`${k}_other`);
    const used = []; // { key, where }
    const dynamic = [];
    for (const { file, lines } of SRC_FILES) {
        if (file.startsWith("src/i18n/")) continue;
        lines.forEach((line, i) => {
            const where = `${file}:${i + 1}`;
            for (const m of line.matchAll(/\bt\(\s*(["'])([^"'`]+?)\1/g)) used.push({ key: m[2], where });
            for (const m of line.matchAll(/\bi18nKey=(["'])([^"']+)\1/g)) used.push({ key: m[2], where });
            for (const m of line.matchAll(/\bt\(\s*`([^`]+)`/g)) {
                const tpl = m[1];
                if (/^projects\.\$\{\w+\}\.[\w-]+$/.test(tpl)) for (const id of CAMPAIGN_IDS) used.push({ key: tpl.replace(/\$\{\w+\}/, id), where });
                else dynamic.push({ key: tpl, where });
            }
        });
    }
    const missing = [];
    for (const { key, where } of used) for (const l of LANGS) if (!has(l, key)) missing.push({ key, lang: l, where });
    // Template keys: each must match at least one key in both languages, and the same number.
    for (const d of dynamic) {
        const re = new RegExp("^" + d.key.split(/\$\{[^}]+\}/).map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^.]+") + "$");
        const n = Object.fromEntries(LANGS.map((l) => [l, [...keys[l]].filter((k) => re.test(k)).length]));
        d.matches = n;
        for (const l of LANGS) if (!n[l]) missing.push({ key: d.key, lang: l, where: d.where });
        if (n.en !== n.uk) d.mismatch = true;
    }
    const uniq = new Map(missing.map((m) => [`${m.key}|${m.lang}`, m]));
    const parity = {
        enOnly: [...keys.en].filter((k) => !keys.uk.has(k)),
        ukOnly: [...keys.uk].filter((k) => !keys.en.has(k)),
    };
    return { usedCount: new Set(used.map((u) => u.key)).size, missing: [...uniq.values()], dynamic, parity };
}

// ---------------------------------------------------------------- build
function build() {
    log("building to", OUT);
    execFileSync("npx", ["vite", "build", "--outDir", OUT, "--emptyOutDir", "--logLevel", "warn"], { cwd: ROOT, stdio: "inherit" });
}
function buildJs() {
    const dir = path.join(OUT, "assets");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
    const html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
    const entry = [...html.matchAll(/(?:src|href)="\/assets\/([^"]+\.js)"/g)].map((m) => m[1]);
    const sizes = files.map((f) => {
        const buf = fs.readFileSync(path.join(dir, f));
        return { file: f, raw: buf.length, gz: zlib.gzipSync(buf, { level: 9 }).length, entry: entry.includes(f) };
    });
    sizes.sort((a, b) => b.gz - a.gz);
    return { files: sizes, entryGz: sizes.filter((s) => s.entry).reduce((a, s) => a + s.gz, 0), totalGz: sizes.reduce((a, s) => a + s.gz, 0) };
}
function bigMediaFiles() {
    const dir = path.join(OUT, "media");
    if (!fs.existsSync(dir)) return [];
    return walk(dir, [".avif", ".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"])
        .map((f) => ({ file: path.relative(OUT, f), size: fs.statSync(f).size }))
        .filter((f) => f.size > BUDGET.imageKB * 1024)
        .sort((a, b) => b.size - a.size);
}

// ---------------------------------------------------------------- static server (mimics vercel.json)
const TYPES = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
    ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
    ".avif": "image/avif", ".gif": "image/gif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
    ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json",
};
function serve() {
    const gzCache = new Map();
    const server = http.createServer((req, res) => {
        const url = new URL(req.url, "http://x");
        let rel = decodeURIComponent(url.pathname);
        let file = path.join(OUT, rel);
        if (!file.startsWith(OUT)) return res.writeHead(403).end();
        let ok = fs.existsSync(file) && fs.statSync(file).isFile();
        if (!ok) {
            // vercel.json: everything except /media/ and /assets/ is rewritten to the SPA shell.
            if (/^\/(media|assets)\//.test(rel)) return res.writeHead(404, { "content-type": "text/plain" }).end("not found");
            file = path.join(OUT, "index.html");
        }
        const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
        let body = fs.readFileSync(file);
        const headers = { "content-type": type, "cache-control": "no-store" };
        if (/^(text|application\/(json|xml|manifest))|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) {
            if (!gzCache.has(file)) gzCache.set(file, zlib.gzipSync(body));
            body = gzCache.get(file);
            headers["content-encoding"] = "gzip";
        }
        headers["content-length"] = body.length;
        res.writeHead(200, headers);
        res.end(req.method === "HEAD" ? undefined : body);
    });
    return new Promise((r) => server.listen(0, "127.0.0.1", () => r(server)));
}

// ---------------------------------------------------------------- CDP
function findChrome() {
    if (process.env.CHROME) return process.env.CHROME;
    const base = path.join(os.homedir(), ".cache/ms-playwright");
    if (fs.existsSync(base))
        for (const d of fs.readdirSync(base).filter((d) => d.startsWith("chromium-")).sort().reverse())
            for (const sub of ["chrome-linux64", "chrome-linux"]) {
                const p = path.join(base, d, sub, "chrome");
                if (fs.existsSync(p)) return p;
            }
    throw new Error("No Chromium found: set CHROME=/path/to/chrome");
}
async function launch() {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), "twmp-qa-chrome-"));
    const proc = spawn(findChrome(), ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
        "--disable-extensions", "--disable-background-networking", "--mute-audio", "--hide-scrollbars",
        "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
    const wsUrl = await new Promise((resolve, reject) => {
        let buf = "";
        const t = setTimeout(() => reject(new Error("Chromium did not start")), 20000);
        proc.stderr.on("data", (d) => {
            buf += d;
            const m = /DevTools listening on (ws:\/\/\S+)/.exec(buf);
            if (m) { clearTimeout(t); resolve(m[1]); }
        });
        proc.on("exit", (c) => reject(new Error(`Chromium exited (${c}): ${buf.slice(-500)}`)));
    });
    proc.stderr.resume();
    const ws = new WebSocket(wsUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
    let id = 0;
    const waits = new Map();
    const listeners = new Set();
    ws.onmessage = (m) => {
        const d = JSON.parse(m.data);
        if (d.id && waits.has(d.id)) {
            const w = waits.get(d.id);
            waits.delete(d.id);
            d.error ? w.reject(new Error(`${w.method}: ${d.error.message}`)) : w.resolve(d.result);
        } else if (d.method) for (const l of listeners) l(d);
    };
    const send = (method, params = {}, sessionId) =>
        new Promise((resolve, reject) => {
            const i = ++id;
            waits.set(i, { resolve, reject, method });
            ws.send(JSON.stringify({ id: i, method, params, ...(sessionId && { sessionId }) }));
        });
    const close = async () => {
        try { ws.close(); } catch {}
        proc.kill("SIGTERM");
        await Promise.race([new Promise((r) => proc.once("exit", r)), sleep(3000)]);
        if (proc.exitCode === null && proc.signalCode === null) proc.kill("SIGKILL");
        await sleep(200);
        fs.rmSync(profile, { recursive: true, force: true });
    };
    return { send, listeners, close, pid: proc.pid };
}

// Runs in the page before any script: LCP and CLS via PerformanceObserver.
const PERF_INIT = `(() => {
  const q = (window.__qa = { lcp: 0, lcpEl: "", cls: 0, shifts: [] });
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { q.lcp = e.startTime; const el = e.element;
      q.lcpEl = el ? (el.tagName.toLowerCase() + (el.currentSrc ? " " + el.currentSrc.replace(location.origin, "") : "") + (el.className && typeof el.className === "string" ? " ." + el.className.split(/\\s+/).slice(0, 4).join(".") : "")) : ""; } })
      .observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { q.cls += e.value;
      if (e.value > 0.01) q.shifts.push({ v: +e.value.toFixed(3), at: Math.round(e.startTime), src: (e.sources || []).map((s) => s.node ? (s.node.nodeName + (s.node.className && typeof s.node.className === "string" ? "." + s.node.className.split(/\\s+/).slice(0, 3).join(".") : "")) : "").filter(Boolean).slice(0, 3) }); } })
      .observe({ type: "layout-shift", buffered: true });
  } catch (e) {}
})();`;

const COLLECT_DOM = `(() => {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
  const links = [...document.querySelectorAll("a[href]")].map((a) => ({ href: a.getAttribute("href"), abs: a.href, text: (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 40) }));
  const media = [];
  for (const el of document.querySelectorAll("img, source, video[poster], link[rel~=icon], link[rel=apple-touch-icon], link[rel=preload][as=image]")) {
    const tag = el.tagName.toLowerCase();
    if (el.getAttribute("src")) media.push({ tag, url: abs(el.getAttribute("src")) });
    const set = el.getAttribute("srcset");
    if (set) for (const c of set.split(",")) { const u = c.trim().split(/\\s+/)[0]; if (u) media.push({ tag, url: abs(u) }); }
    if (el.getAttribute("poster")) media.push({ tag: "poster", url: abs(el.getAttribute("poster")) });
    if (tag === "link" && el.getAttribute("href")) media.push({ tag, url: abs(el.getAttribute("href")) });
  }
  const imgs = [...document.images].map((i) => ({ src: i.currentSrc || i.src, alt: i.getAttribute("alt"), complete: i.complete, w: i.naturalWidth }));
  return { links, media, imgs, title: document.title, lang: document.documentElement.lang, h1: document.querySelectorAll("h1").length };
})()`;

const SCROLL = `(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.9)) { scrollTo(0, y); await s(60); }
  scrollTo(0, document.documentElement.scrollHeight); await s(150); scrollTo(0, 0); await s(60); return true;
})()`;

const AXE_RUN = `axe.run(document, { runOnly: { type: "tag", values: ${JSON.stringify(AXE_TAGS)} }, resultTypes: ["violations"] })
  .then((r) => r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl,
    nodes: v.nodes.map((n) => ({ target: n.target.join(" "), html: n.html.slice(0, 400), summary: (n.failureSummary || "").slice(0, 400) })) })))`;

// ---------------------------------------------------------------- page driver
async function makePage(cdp) {
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const send = (m, p) => cdp.send(m, p, sessionId);
    let rec = null;
    cdp.listeners.add((d) => {
        if (d.sessionId !== sessionId || !rec) return;
        const p = d.params;
        switch (d.method) {
            case "Network.requestWillBeSent":
                if (p.request.url.startsWith("data:")) break;
                rec.inflight.add(p.requestId);
                rec.reqs.set(p.requestId, { url: p.request.url, type: p.type, phase: rec.phase, bytes: 0, status: 0, mime: "" });
                break;
            case "Network.responseReceived": {
                const r = rec.reqs.get(p.requestId);
                if (r) Object.assign(r, { status: p.response.status, mime: p.response.mimeType, type: p.type });
                break;
            }
            case "Network.loadingFinished": {
                rec.inflight.delete(p.requestId);
                const r = rec.reqs.get(p.requestId);
                if (r) { r.bytes = p.encodedDataLength; r.done = rec.phase; }
                break;
            }
            case "Network.loadingFailed": {
                rec.inflight.delete(p.requestId);
                const r = rec.reqs.get(p.requestId);
                if (r) { r.failed = p.canceled ? "" : p.errorText; r.done = rec.phase; }
                break;
            }
            case "Page.loadEventFired":
                rec.loaded = true;
                break;
            case "Runtime.consoleAPICalled":
                if (p.type === "error" || p.type === "assert")
                    rec.console.push(p.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300));
                break;
            case "Runtime.exceptionThrown":
                rec.console.push(("Uncaught " + (p.exceptionDetails.exception?.description || p.exceptionDetails.text)).slice(0, 300));
                break;
            case "Log.entryAdded":
                if (p.entry.level === "error") rec.console.push(`${p.entry.text}${p.entry.url ? " " + p.entry.url : ""}`.slice(0, 300));
                break;
        }
    });
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Log.enable");
    await send("Network.enable");
    await send("Network.setCacheDisabled", { cacheDisabled: true });
    await send("Page.addScriptToEvaluateOnNewDocument", { source: PERF_INIT });

    const evaluate = async (expression, awaitPromise = false) => {
        const r = await send("Runtime.evaluate", { expression, awaitPromise, returnByValue: true });
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
    };
    const idle = async (quietMs, timeoutMs) => {
        const start = Date.now();
        let quietSince = Date.now();
        while (Date.now() - start < timeoutMs) {
            await sleep(50);
            if (!rec.loaded || rec.inflight.size) quietSince = Date.now();
            else if (Date.now() - quietSince >= quietMs) return true;
        }
        return false;
    };
    const media = (dark, width) =>
        Promise.all([
            send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }, { name: "prefers-reduced-motion", value: "reduce" }] }),
            send("Emulation.setDeviceMetricsOverride", { width, height: width < 600 ? 844 : 900, deviceScaleFactor: width < 600 ? 2 : 1, mobile: width < 600 }),
        ]);
    const throttle = async (on) => {
        await send("Network.emulateNetworkConditions", on ? { offline: false, ...THROTTLE, cpu: undefined } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
        await send("Emulation.setCPUThrottlingRate", { rate: on ? THROTTLE.cpu : 1 });
    };
    return {
        send, evaluate, idle, media, throttle,
        start() { rec = { phase: "first", inflight: new Set(), reqs: new Map(), console: [], loaded: false }; return rec; },
        phase(p) { rec.phase = p; },
    };
}

// ---------------------------------------------------------------- per-route checks
async function checkRoute(page, origin, route, width, perf, axeSrc) {
    await page.media(false, width);
    await page.throttle(perf);
    await page.send("Page.navigate", { url: "about:blank" });
    await sleep(50);
    const rec = page.start();
    const t0 = Date.now();
    await page.send("Page.navigate", { url: origin + route });
    const settled = await page.idle(perf ? 600 : 300, perf ? 25000 : 12000);
    const out = { route, width, settled, loadMs: Date.now() - t0 };
    if (perf) {
        await sleep(300);
        const q = await page.evaluate("JSON.stringify(window.__qa || {})");
        Object.assign(out, JSON.parse(q));
        const first = [...rec.reqs.values()].filter((r) => r.done === "first");
        out.firstViewBytes = first.reduce((a, r) => a + r.bytes, 0);
        out.jsBytes = first.filter((r) => r.type === "Script").reduce((a, r) => a + r.bytes, 0);
        out.firstViewRequests = first.length;
    }
    await page.throttle(false);
    page.phase("scroll");
    let tt = Date.now();
    const lap = () => { const d = Date.now() - tt; tt = Date.now(); return d; };
    out.t = {};
    await page.evaluate(SCROLL, true);
    await page.idle(250, 8000);
    out.t.scroll = lap();
    const dom = await page.evaluate(COLLECT_DOM);
    const reqs = [...rec.reqs.values()];
    const images = reqs.filter((r) => r.type === "Image" || /^image\//.test(r.mime));
    const largest = images.reduce((m, r) => (r.bytes > (m?.bytes || 0) ? r : m), null);
    out.totalBytes = reqs.reduce((a, r) => a + r.bytes, 0);
    out.largestImage = largest ? { url: largest.url.replace(origin, ""), bytes: largest.bytes } : null;
    out.badRequests = reqs
        .filter((r) => r.failed || r.status >= 400 || ((r.type === "Image") && r.status === 200 && !/^image\//.test(r.mime)))
        .map((r) => ({ url: r.url.replace(origin, ""), status: r.status, mime: r.mime, failed: r.failed, type: r.type }));
    out.external = [...new Set(reqs.filter((r) => !r.url.startsWith(origin)).map((r) => r.url))];
    out.console = [...new Set(rec.console)];
    out.dom = dom;
    out.axe = {};
    lap();
    await page.evaluate(axeSrc);
    out.t.inject = lap();
    out.axe.light = await page.evaluate(AXE_RUN, true);
    out.t.axeLight = lap();
    await page.media(true, width);
    await page.evaluate(`document.documentElement.classList.add("dark")`);
    await sleep(150);
    out.axe.dark = await page.evaluate(AXE_RUN, true);
    out.t.axeDark = lap();
    return out;
}

// ---------------------------------------------------------------- report
function mdEscape(s) {
    return String(s ?? "").replace(/\|/g, "\\|").replace(/</g, "&lt;").replace(/\n/g, " ");
}
function buildReport(R) {
    const L = [];
    const s = R.summary;
    L.push(`_Generated by \`npm run qa\` on ${R.date} (${R.durationS} s, ${R.loads} page loads, Chromium ${R.browser}, axe-core ${R.axeVersion})._`, "");
    L.push("### Summary", "");
    L.push(`| Check | Result |`, `|---|---|`);
    L.push(`| Routes | ${R.routes.length} (en + uk) at 390 and 1280 px, light and dark |`);
    L.push(`| axe violations (unique rule + element) | critical ${s.axe.critical}, serious ${s.axe.serious}, moderate ${s.axe.moderate}, minor ${s.axe.minor} |`);
    L.push(`| Broken internal links | ${s.brokenLinks} |`);
    L.push(`| Broken media (status or content type) | ${s.brokenMedia} |`);
    L.push(`| Translation keys used in src | ${R.i18n.usedCount}; missing ${R.i18n.missing.length}; en-only ${R.i18n.parity.enOnly.length}, uk-only ${R.i18n.parity.ukOnly.length} |`);
    L.push(`| Routes with console errors | ${s.consoleRoutes} |`);
    L.push(`| Build JS (gzip) | entry ${kb(R.js.entryGz)} KB, all chunks ${kb(R.js.totalGz)} KB (budget ${BUDGET.jsGzKB} KB per page) |`);
    L.push(`| Budget misses | ${s.budgetMisses} (warnings) |`);
    L.push(`| Exit | ${s.fail ? "**fail** (serious/critical axe or broken links)" : "pass"} |`, "");

    L.push("### Per route", "");
    L.push(`Perf columns come from the 390 px light load with cache disabled, Fast-4G-like throttling (${THROTTLE.latency} ms RTT, 9 Mbps, CPU ${THROTTLE.cpu}x). "First view" = bytes until the network is idle, before scrolling. LCP and CLS are read before any scroll. axe = unique violations over all four modes as critical/serious/moderate/minor.`, "");
    L.push("| Route | First view KB | JS gz KB | Largest image KB | LCP s | CLS | axe c/s/m/mi | Console | Bad links |", "|---|---:|---:|---|---:|---:|---|---:|---:|");
    for (const r of R.routes) {
        const p = r.perf || {};
        const miss = (v, lim) => (v > lim ? ` ⚠` : "");
        const img = p.largestImage ? `${kb(p.largestImage.bytes)}${miss(p.largestImage.bytes, BUDGET.imageKB * 1024)}` : "–";
        L.push(`| ${r.route} | ${kb(p.firstViewBytes || 0)}${miss(p.firstViewBytes, BUDGET.firstViewKB * 1024)} | ${kb(p.jsBytes || 0)}${miss(p.jsBytes, BUDGET.jsGzKB * 1024)} | ${img} | ${((p.lcp || 0) / 1000).toFixed(2)}${miss(p.lcp, BUDGET.lcpMs)} | ${(p.cls || 0).toFixed(3)}${miss(p.cls, BUDGET.cls)} | ${r.axeCounts.critical}/${r.axeCounts.serious}/${r.axeCounts.moderate}/${r.axeCounts.minor} | ${r.console.length} | ${r.brokenLinks.length} |`);
    }
    L.push("", "⚠ = over budget.", "");

    L.push("### Accessibility violations", "");
    if (!R.axeIssues.length) L.push("None.", "");
    for (const v of R.axeIssues) {
        L.push(`#### [${v.impact}] ${v.id}: ${mdEscape(v.help)}`, "");
        L.push(`${v.instances} element(s) on ${v.routes} route(s); modes: ${v.modes.join(", ")}. [rule](${v.helpUrl})`, "");
        for (const n of v.samples) {
            L.push(`- \`${mdEscape(n.target)}\`${n.hint.length ? ` → ${n.hint.join(", ")}` : ""} (e.g. ${n.where})`);
            if (n.summary) L.push(`  - ${mdEscape(n.summary.replace(/^Fix (any|all) of the following:\s*/i, ""))}`);
        }
        L.push("");
    }

    L.push("### Links and media", "");
    if (!R.brokenLinks.length && !R.brokenMedia.length) L.push("No broken internal links or media.", "");
    for (const b of R.brokenLinks) L.push(`- Broken link \`${mdEscape(b.href)}\` ("${mdEscape(b.text)}") on ${b.on.slice(0, 4).join(", ")}${b.on.length > 4 ? ` +${b.on.length - 4}` : ""}${b.hint.length ? ` → ${b.hint.join(", ")}` : ""}`);
    for (const b of R.brokenMedia) L.push(`- Broken media \`${mdEscape(b.url)}\` (${b.why}) on ${b.on.slice(0, 4).join(", ")}${b.on.length > 4 ? ` +${b.on.length - 4}` : ""}${b.hint.length ? ` → ${b.hint.join(", ")}` : ""}`);
    if (R.external.length) L.push("", `External requests made by pages (not checked): ${R.external.slice(0, 10).map((u) => `\`${u}\``).join(", ")}`);
    L.push(`- Media variants checked: ${R.mediaChecked} unique URLs.`);
    if (R.bigMedia.length) {
        L.push(`- Files in media/ over ${BUDGET.imageKB} KB (served only if a page asks for that width): ${R.bigMedia.length}`);
        for (const f of R.bigMedia.slice(0, 15)) L.push(`  - ${f.file} ${kb(f.size)} KB`);
        if (R.bigMedia.length > 15) L.push(`  - … +${R.bigMedia.length - 15} more`);
    }
    L.push("");

    L.push("### Translations", "");
    if (!R.i18n.missing.length) L.push("Every literal key used in src exists in both languages.");
    for (const m of R.i18n.missing) L.push(`- Missing \`${m.key}\` in **${m.lang}** (used at ${m.where})`);
    const dyn = [...new Map(R.i18n.dynamic.map((d) => [d.key, d])).values()];
    if (dyn.length) L.push(`- Template keys (checked by pattern, en/uk matches): ${dyn.map((d) => `\`${d.key}\` ${d.matches.en}/${d.matches.uk}${d.mismatch ? " ⚠" : ""}`).join(", ")}`);
    const par = (list, l) => list.length && L.push(`- Keys only in ${l} (${list.length}): ${list.slice(0, 20).map((k) => `\`${k}\``).join(", ")}${list.length > 20 ? " …" : ""}`);
    par(R.i18n.parity.enOnly, "en");
    par(R.i18n.parity.ukOnly, "uk");
    L.push("");

    L.push("### Console errors", "");
    if (!R.consoleIssues.length) L.push("None.");
    for (const c of R.consoleIssues) L.push(`- \`${mdEscape(c.msg)}\` on ${c.on.slice(0, 4).join(", ")}${c.on.length > 4 ? ` +${c.on.length - 4}` : ""}`);
    L.push("");

    L.push("### Performance budgets", "");
    if (!R.budgetIssues.length) L.push("All routes within budget.");
    for (const b of R.budgetIssues) L.push(`- ${b}`);
    L.push("", "Largest JS chunks (gzip): " + R.js.files.slice(0, 5).map((f) => `${f.file} ${kb(f.gz)} KB${f.entry ? " (entry)" : ""}`).join(", "), "");
    return L.join("\n");
}

function writeReport(md) {
    const START = "<!-- qa:auto:start -->", END = "<!-- qa:auto:end -->";
    let doc = fs.existsSync(REPORT) ? fs.readFileSync(REPORT, "utf8") : `# QA report\n\nRun \`npm run qa\` to refresh the generated section.\n\n${START}\n${END}\n`;
    if (!doc.includes(START)) doc += `\n${START}\n${END}\n`;
    doc = doc.slice(0, doc.indexOf(START) + START.length) + "\n" + md + "\n" + doc.slice(doc.indexOf(END));
    fs.writeFileSync(REPORT, doc);
}

// ---------------------------------------------------------------- main
async function main() {
    const t0 = Date.now();
    if (!flag("no-build")) build();
    const axePath = path.join(ROOT, "node_modules/axe-core/axe.min.js");
    if (!fs.existsSync(axePath)) throw new Error("axe-core missing: npm install -D axe-core");
    const axeSrc = fs.readFileSync(axePath, "utf8");
    const axeVersion = /axe v([\d.]+)/.exec(axeSrc)?.[1];
    const i18n = checkI18n();
    const js = buildJs();

    const server = await serve();
    const origin = `http://127.0.0.1:${server.address().port}`;
    log("serving", OUT, "at", origin);
    let cdp;
    const cleanup = async () => {
        if (cdp) await cdp.close().catch(() => {});
        cdp = null;
        server.close();
        server.closeAllConnections?.();
    };
    const onSig = () => cleanup().then(() => process.exit(130));
    process.once("SIGINT", onSig);
    process.once("SIGTERM", onSig);

    const results = [];
    let browser = "";
    try {
        cdp = await launch();
        browser = (await cdp.send("Browser.getVersion")).product;
        log(browser, "pid", cdp.pid, "—", ROUTES.length, "routes");
        const page = await makePage(cdp);
        for (const route of ROUTES) {
            const t = Date.now();
            const mobile = await checkRoute(page, origin, route, 390, true, axeSrc);
            const desk = await checkRoute(page, origin, route, 1280, false, axeSrc);
            results.push({ route, mobile, desk });
            log(route.padEnd(36), `${((Date.now() - t) / 1000).toFixed(1)} s`, `fv ${kb(mobile.firstViewBytes)} KB`, `lcp ${(mobile.lcp / 1000).toFixed(2)} s`, `cls ${mobile.cls.toFixed(3)}`,
                `axe ${["light", "dark"].map((m) => mobile.axe[m].length + desk.axe[m].length).join("/")}`, mobile.settled ? "" : "(not idle)");
        }
    } finally {
        await cleanup();
    }

    // ---- media URLs seen in the DOM (all srcset candidates, not just the fetched one)
    const mediaOn = new Map();
    for (const r of results) for (const run of [r.mobile, r.desk]) for (const m of run.dom.media) if (m.url.startsWith(origin)) {
        const u = m.url.replace(origin, "");
        if (!mediaOn.has(u)) mediaOn.set(u, new Set());
        mediaOn.get(u).add(r.route);
    }
    // the server is closed; check the files on disk with the same rules as the server
    const brokenMedia = [];
    for (const [u, on] of mediaOn) {
        const rel = decodeURIComponent(new URL(u, "http://x").pathname);
        const f = path.join(OUT, rel);
        const exists = fs.existsSync(f) && fs.statSync(f).isFile();
        const type = TYPES[path.extname(f).toLowerCase()] || "";
        let why = "";
        if (!exists) why = /^\/(media|assets)\//.test(rel) ? "404" : "missing: served as index.html (text/html)";
        else if (!/^(image\/|font\/)/.test(type) && !/\.(ico)$/.test(rel)) why = `content type ${type}`;
        if (why) brokenMedia.push({ url: u, why, on: [...on], hint: grepSrc(rel) });
    }
    // fetched requests that failed or came back as non-images
    for (const r of results) for (const run of [r.mobile, r.desk]) for (const b of run.badRequests) {
        if (!/^\//.test(b.url)) continue;
        const why = b.failed ? b.failed : b.status >= 400 ? String(b.status) : `content type ${b.mime}`;
        const ex = brokenMedia.find((m) => m.url === b.url);
        if (ex) { if (!ex.on.includes(r.route)) ex.on.push(r.route); continue; }
        brokenMedia.push({ url: b.url, why: `${why} (${b.type})`, on: [r.route], hint: grepSrc(new URL(b.url, "http://x").pathname) });
    }

    // ---- links
    const linkMap = new Map();
    for (const r of results) for (const run of [r.mobile, r.desk]) for (const a of run.dom.links) {
        if (!a.abs.startsWith(origin)) continue;
        const p = new URL(a.abs).pathname;
        if (ROUTE_RE.test(p)) continue;
        // static files that exist are fine (e.g. a PDF)
        if (path.extname(p) && fs.existsSync(path.join(OUT, decodeURIComponent(p)))) continue;
        const k = a.href;
        if (!linkMap.has(k)) linkMap.set(k, { href: a.href, text: a.text, on: [], hint: grepSrc(a.href.split("?")[0]) });
        if (!linkMap.get(k).on.includes(r.route)) linkMap.get(k).on.push(r.route);
    }
    const brokenLinks = [...linkMap.values()];

    // ---- axe aggregation
    const IMP = ["critical", "serious", "moderate", "minor"];
    const rules = new Map();
    const routes = results.map((r) => {
        const seen = new Set();
        const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
        for (const [run, w] of [[r.mobile, 390], [r.desk, 1280]])
            for (const mode of ["light", "dark"])
                for (const v of run.axe[mode]) {
                    if (!rules.has(v.id)) rules.set(v.id, { id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, nodes: new Map(), routes: new Set(), modes: new Set() });
                    const rule = rules.get(v.id);
                    rule.routes.add(r.route);
                    rule.modes.add(`${mode} ${w}`);
                    for (const n of v.nodes) {
                        const key = `${v.id}|${n.target}`;
                        // normalise the route-specific part of a target for de-duplication across routes
                        const nk = n.target.replace(/\/(en|uk)\b/g, "/:lang");
                        if (!rule.nodes.has(nk)) rule.nodes.set(nk, { ...n, where: `${r.route} ${mode} ${w}`, hint: hintFor(n.html, n.target) });
                        if (!seen.has(key)) { seen.add(key); counts[v.impact] = (counts[v.impact] || 0) + 1; }
                    }
                }
        const linksHere = brokenLinks.filter((b) => b.on.includes(r.route));
        return {
            route: r.route, axeCounts: counts, brokenLinks: linksHere,
            console: [...new Set([...r.mobile.console, ...r.desk.console])],
            perf: { ...r.mobile, dom: undefined, axe: undefined, largestImage: [r.mobile.largestImage, r.desk.largestImage].filter(Boolean).sort((a, b) => b.bytes - a.bytes)[0] || null },
        };
    });
    const axeIssues = [...rules.values()]
        .map((r) => ({ ...r, routes: r.routes.size, modes: [...r.modes].sort(), instances: r.nodes.size, samples: [...r.nodes.values()].slice(0, 6), nodes: undefined }))
        .sort((a, b) => IMP.indexOf(a.impact) - IMP.indexOf(b.impact) || b.routes - a.routes);
    const axeSum = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const r of rules.values()) axeSum[r.impact] += r.nodes.size;

    // ---- console
    const consoleMap = new Map();
    for (const r of routes) for (const c of r.console) {
        const k = c.replace(/http:\/\/127\.0\.0\.1:\d+/g, "");
        if (!consoleMap.has(k)) consoleMap.set(k, []);
        consoleMap.get(k).push(r.route);
    }
    const consoleIssues = [...consoleMap].map(([msg, on]) => ({ msg, on }));

    // ---- budgets
    const budgetIssues = [];
    for (const r of routes) {
        const p = r.perf;
        if (p.firstViewBytes > BUDGET.firstViewKB * 1024) budgetIssues.push(`${r.route}: first view ${kb(p.firstViewBytes)} KB > ${BUDGET.firstViewKB} KB`);
        if (p.jsBytes > BUDGET.jsGzKB * 1024) budgetIssues.push(`${r.route}: JS ${kb(p.jsBytes)} KB gzip > ${BUDGET.jsGzKB} KB`);
        if (p.largestImage && p.largestImage.bytes > BUDGET.imageKB * 1024) budgetIssues.push(`${r.route}: image ${p.largestImage.url} ${kb(p.largestImage.bytes)} KB > ${BUDGET.imageKB} KB`);
        if (p.lcp > BUDGET.lcpMs) budgetIssues.push(`${r.route}: LCP ${(p.lcp / 1000).toFixed(2)} s > ${BUDGET.lcpMs / 1000} s (LCP element: ${p.lcpEl || "?"})`);
        if (p.cls > BUDGET.cls) budgetIssues.push(`${r.route}: CLS ${p.cls.toFixed(3)} > ${BUDGET.cls}${p.shifts?.length ? ` (shifts: ${p.shifts.map((s) => `${s.v}@${s.at}ms ${s.src.join(" ")}`).join("; ")})` : ""}`);
        if (!p.settled) budgetIssues.push(`${r.route}: network never went idle during the first view (timeout)`);
    }
    if (js.entryGz > BUDGET.jsGzKB * 1024) budgetIssues.push(`entry JS ${kb(js.entryGz)} KB gzip > ${BUDGET.jsGzKB} KB`);

    const fail = axeSum.critical + axeSum.serious > 0 || brokenLinks.length > 0 || brokenMedia.length > 0;
    const R = {
        date: new Date().toISOString().slice(0, 16).replace("T", " "), durationS: Math.round((Date.now() - t0) / 1000), loads: results.length * 2,
        browser, axeVersion, routes, axeIssues, brokenLinks, brokenMedia, i18n, js, bigMedia: bigMediaFiles(), mediaChecked: mediaOn.size,
        external: [...new Set(results.flatMap((r) => [...r.mobile.external, ...r.desk.external]))], consoleIssues, budgetIssues,
        summary: { axe: axeSum, brokenLinks: brokenLinks.length, brokenMedia: brokenMedia.length, consoleRoutes: routes.filter((r) => r.console.length).length, budgetMisses: budgetIssues.length, fail },
    };
    fs.writeFileSync(RESULTS_JSON, JSON.stringify({ ...R, raw: results.map((r) => ({ ...r, mobile: { ...r.mobile, dom: undefined }, desk: { ...r.desk, dom: undefined } })) }, null, 1));
    if (!flag("no-report")) writeReport(buildReport(R));

    log(`done in ${R.durationS} s — axe critical ${axeSum.critical}, serious ${axeSum.serious}, moderate ${axeSum.moderate}, minor ${axeSum.minor}; ` +
        `broken links ${brokenLinks.length}, broken media ${brokenMedia.length}; missing i18n ${i18n.missing.length}; console ${R.summary.consoleRoutes} routes; budget misses ${budgetIssues.length}`);
    log("results:", RESULTS_JSON, flag("no-report") ? "" : `report: ${REPORT}`);
    process.exitCode = fail ? 1 : 0;
}

main().catch((e) => {
    console.error("[qa] error:", e);
    process.exitCode = 2;
});
