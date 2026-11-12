// After `vite build`: write dist/<lang>/<route>/index.html for every page, with that page's
// title, description, canonical, hreflang and Open Graph tags already in the HTML.
// Link-preview crawlers (Telegram, Facebook, WhatsApp) don't run JavaScript, so without this
// every shared link would show the home page's preview. The app still sets the same tags at runtime
// (usePageMeta in src/site/ui.tsx); keep the two in step.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.twmp.com.ua";
const DIST = process.argv[2] ?? "dist";
const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const merge = (a, b) => {
    const out = { ...a };
    for (const [k, v] of Object.entries(b)) out[k] = v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" ? merge(out[k], v) : v;
    return out;
};
const strings = Object.fromEntries(
    ["en", "uk"].map((l) => [l, readdirSync("src/i18n/extra").filter((f) => f.endsWith(`.${l}.json`)).reduce((acc, f) => merge(acc, read(join("src/i18n/extra", f))), read(`src/i18n/${l}.json`))])
);
const get = (o, path) => path.split(".").reduce((x, k) => (x == null ? x : x[k]), o);
const ids = [...readFileSync("src/content/campaigns.ts", "utf8").matchAll(/id: "(\w+)", cover: "([^"]+)"/g)].map((m) => ({ id: m[1], cover: m[2] }));
const manifest = read("src/media-manifest.json");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Page title source per route (same text the page shows as its heading).
const TITLE = { campaigns: "ui.projects.title", donate: "ui.donate.title", about: "ui.nav.about", help: "ui.nav.help", volunteer: "ui.nav.volunteer" };
const routes = [
    { rest: "", key: "home" },
    ...Object.keys(TITLE).map((k) => ({ rest: `/${k}`, key: k })),
    { rest: "/donate/thanks", key: "thanks", noindex: true },
    ...ids.map(({ id, cover }) => ({ rest: `/campaigns/${id}`, key: "campaign", id, cover })),
];

const template = readFileSync(join(DIST, "index.html"), "utf8");
const stripped = template
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta (?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)"[^>]*>/g, "")
    .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, "");

let n = 0;
for (const lang of ["en", "uk"]) {
    const s = strings[lang];
    const t = (k) => get(s, k) ?? "";
    const site = t("ui.meta.siteName");
    for (const r of routes) {
        const name = r.id ? t(`projects.${r.id}.title`) : t(`ui.meta.pages.${r.key}.title`) || (TITLE[r.key] ? t(TITLE[r.key]) : "") || (r.key === "thanks" ? t("ui.thanks.title") : "");
        const full = name && r.key !== "home" ? `${name} · ${site}` : `${site} · ${t("ui.meta.tagline")}`;
        const desc = (r.id && t(`projects.${r.id}.description`)) || t(`ui.meta.pages.${r.key}.description`) || t("ui.meta.description");
        let image = r.key === "home" || r.key === "donate" ? `/og/${r.key}-${lang}.png` : "/og/default.png";
        let size = [1200, 630];
        if (r.cover && manifest.images[r.cover]) {
            const info = manifest.images[r.cover];
            const w = info.widths.at(-1);
            image = `/media${r.cover.replace(/\.[^.]+$/, "")}-${w}.webp`;
            size = [w, Math.round((info.h * w) / info.w)];
        }
        const url = `${SITE}/${lang}${r.rest}`;
        const tags = [
            `<title>${esc(full)}</title>`,
            `<meta name="description" content="${esc(desc)}" />`,
            r.noindex ? `<meta name="robots" content="noindex, follow" />` : `<link rel="canonical" href="${url}" />`,
            ...(r.noindex ? [] : [...["en", "uk"].map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}${r.rest}" />`), `<link rel="alternate" hreflang="x-default" href="${SITE}/en${r.rest}" />`]),
            `<meta property="og:type" content="${r.id ? "article" : "website"}" />`,
            `<meta property="og:site_name" content="${esc(site)}" />`,
            `<meta property="og:title" content="${esc(name || full)}" />`,
            `<meta property="og:description" content="${esc(desc)}" />`,
            `<meta property="og:url" content="${url}" />`,
            `<meta property="og:locale" content="${lang === "uk" ? "uk_UA" : "en_US"}" />`,
            `<meta property="og:locale:alternate" content="${lang === "uk" ? "en_US" : "uk_UA"}" />`,
            `<meta property="og:image" content="${SITE}${image}" />`,
            `<meta property="og:image:width" content="${size[0]}" />`,
            `<meta property="og:image:height" content="${size[1]}" />`,
            `<meta property="og:image:alt" content="${esc(r.id ? name : t("ui.meta.imageAlt"))}" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta name="twitter:title" content="${esc(name || full)}" />`,
            `<meta name="twitter:description" content="${esc(desc)}" />`,
            `<meta name="twitter:image" content="${SITE}${image}" />`,
        ];
        // The home hero's video poster is that page's largest paint: fetch it early, on home pages only.
        if (r.key === "home") tags.unshift(`<link rel="preload" as="image" href="/media/mainVideo-poster.webp" fetchpriority="high" />`);
        const html = stripped.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace("</head>", `        ${tags.join("\n        ")}\n    </head>`);
        const dir = join(DIST, lang, r.rest);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), html);
        n++;
    }
}
console.log(`prerendered meta for ${n} pages`);
