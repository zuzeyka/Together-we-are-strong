import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGS = ["en", "uk"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (s: string | undefined): s is Lang => !!s && (LANGS as readonly string[]).includes(s);

/** The language a first visit should get: a remembered choice, else the browser's, else English. */
export const preferredLang = (): Lang => {
    try {
        const saved = localStorage.getItem("lang");
        if (isLang(saved ?? undefined)) return saved as Lang;
    } catch {
        /* storage blocked */
    }
    return navigator.languages?.some((l) => /^(uk|ru)\b/i.test(l)) ? "uk" : "en";
};

// Each language is its own chunk: a visitor downloads only the one they read.
// src/i18n/extra/<area>.<lang>.json files are deep-merged on top (one file per site area).
type Json = Record<string, unknown>;
const extras = {
    en: import.meta.glob<{ default: Json }>("./extra/*.en.json"),
    uk: import.meta.glob<{ default: Json }>("./extra/*.uk.json"),
};
const merge = (a: Json, b: Json): Json => {
    const out: Json = { ...a };
    for (const [k, v] of Object.entries(b)) {
        const prev = out[k];
        out[k] = v && typeof v === "object" && !Array.isArray(v) && prev && typeof prev === "object" && !Array.isArray(prev) ? merge(prev as Json, v as Json) : v;
    }
    return out;
};
const base: Record<Lang, () => Promise<{ default: Json }>> = {
    en: () => import("./en.json"),
    uk: () => import("./uk.json"),
};
const load: Record<Lang, () => Promise<{ default: object }>> = Object.fromEntries(
    (Object.keys(base) as Lang[]).map((l) => [
        l,
        async () => {
            const parts = await Promise.all([base[l](), ...Object.values(extras[l]).map((f) => f())]);
            return { default: parts.map((p) => p.default).reduce(merge) };
        },
    ])
) as Record<Lang, () => Promise<{ default: object }>>;

i18n.use(initReactI18next)
    .use({
        type: "backend",
        read(lng: string, _ns: string, cb: (err: unknown, data: object | null) => void) {
            (load[isLang(lng) ? lng : "en"])().then((m) => cb(null, m.default), (e) => cb(e, null));
        },
    })
    .init({
        lng: preferredLang(),
        fallbackLng: false,
        supportedLngs: [...LANGS],
        load: "languageOnly",
        interpolation: { escapeValue: false },
        react: { useSuspense: true },
    });

// <html lang> follows the language, for screen readers, hyphenation and search engines.
i18n.on("languageChanged", (lng) => {
    document.documentElement.setAttribute("lang", lng);
    try {
        localStorage.setItem("lang", lng);
    } catch {
        /* storage blocked */
    }
});

export default i18n;
