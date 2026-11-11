// Click-through check: npm run qa:nav  (needs `npx vite preview --port 4173` running; CH = Chromium binary).
// Opens /en and moves between pages and both languages the way a visitor does, inside one page load.
// Fails if a page ends up without content or the console shows an error. `npm run qa` loads every page
// fresh and can't catch this: on 2026-11-11 an effect returning window.scrollTo()'s Promise blanked
// every page after the first click.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

const base = process.argv[2] ?? "http://localhost:4173";
const profile = mkdtempSync(tmpdir() + "/qa-nav-");
const chrome = spawn(process.env.CH, ["--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=9334", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0, bad = 0;
const waits = new Map(), logs = [];
const send = (method, params = {}) => new Promise((res) => { const i = ++id; waits.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result?.value;

const STATE = `({
  path: location.pathname,
  mainText: (document.querySelector("main")?.innerText || "").length,
  h1: document.querySelector("h1")?.innerText,
})`;

try {
  let target;
  for (let t = 0; t < 50 && !target; t++) {
    await sleep(200);
    try { target = (await (await fetch("http://127.0.0.1:9334/json")).json()).find((x) => x.type === "page"); } catch {}
  }
  ws = new WebSocket(target.webSocketDebuggerUrl);
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && waits.has(d.id)) { waits.get(d.id)(d.result); waits.delete(d.id); }
    if (d.method === "Runtime.exceptionThrown") logs.push("exception " + JSON.stringify(d.params.exceptionDetails).slice(0, 300));
    if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") logs.push("error " + d.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 300));
  };
  await new Promise((r) => (ws.onopen = r));
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.navigate", { url: base + "/en" });
  await sleep(3000);

  const state = async (label) => {
    const v = await ev(STATE);
    const ok = v && v.mainText > 0 && v.h1;
    if (!ok) bad++;
    console.log(ok ? "ok   " : "EMPTY", label.padEnd(16), JSON.stringify(v));
  };
  const click = async (sel) => {
    const found = await ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); el?.click(); return !!el; })()`);
    if (!found) { logs.push("missing element " + sel); bad++; }
    await sleep(2500);
  };

  await state("home");
  await click('header nav a[href="/en/campaigns"]'); await state("→ projects");
  await click('header button[lang="uk"]'); await state("→ uk");
  await click('header nav a[href="/uk/about"]'); await state("→ about");
  await click('header nav a[href="/uk/help"]'); await state("→ help");
  await click('header nav a[href="/uk/campaigns"]'); await state("→ projects");
  await click('main a[href^="/uk/campaigns/"]'); await state("→ one project");
  await click('header button[lang="en"]'); await state("→ en");
  await click('header a[href="/en/donate"]'); await state("→ donate");

  console.log(logs.join("\n") || "no console errors");
  if (bad || logs.length) process.exitCode = 1;
} finally {
  chrome.kill();
  setTimeout(() => rmSync(profile, { recursive: true, force: true }), 500);
}
