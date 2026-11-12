import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import useInView from "@/site/useInView";
import { LANGS, isLang, type Lang } from "@/i18n/i18n";

/* Small shared pieces for every page (DESIGN_SYSTEM.md, "Strict rules"). */

export const useLang = (): Lang => {
    const { lang } = useParams();
    return isLang(lang) ? lang : "en";
};

/** A link inside the site, in the current language: <L to="/donate">. */
export const L: React.FC<{ to: string; className?: string; children: React.ReactNode; "aria-label"?: string }> = ({ to, ...rest }) => {
    const lang = useLang();
    return <Link to={`/${lang}${to === "/" ? "" : to.replace(/^\/#/, "#")}`} {...rest} />;
};

const SITE = "https://www.twmp.com.ua";

export type PageMetaOptions = {
    /** Search/share snippet; default: ui.meta.pages.<route>.description, else ui.meta.description. */
    description?: string;
    /** Share image, a site path ("/og/home-en.png") or a full URL; default: per route, else /og/default.png. */
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    /** The path after /:lang ("/campaigns/STELP"); default: the current URL's. */
    path?: string;
    type?: "website" | "article";
    /** Keep the page out of search results (thanks page, unknown URLs). */
    noindex?: boolean;
};

type RouteKey = "home" | "campaigns" | "campaign" | "donate" | "thanks" | "about" | "help" | "volunteer" | "notFound";
const routeKey = (rest: string): RouteKey => {
    if (rest === "") return "home";
    if (rest === "/campaigns") return "campaigns";
    if (/^\/campaigns\/[^/]+$/.test(rest)) return "campaign";
    if (rest === "/donate") return "donate";
    if (rest === "/donate/thanks") return "thanks";
    if (rest === "/about" || rest === "/help" || rest === "/volunteer") return rest.slice(1) as RouteKey;
    return "notFound";
};

const upsert = (selector: string, make: () => HTMLElement, attr: string, value: string | null) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (value === null) return el?.remove();
    if (!el) {
        el = make();
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
};
const meta = (key: string, value: string | null) => {
    const attr = key.startsWith("og:") ? "property" : "name";
    const make = () => {
        const el = document.createElement("meta");
        el.setAttribute(attr, key);
        return el;
    };
    upsert(`meta[${attr}="${key}"]`, make, "content", value);
};
const link = (rel: string, href: string | null, hreflang?: string) =>
    upsert(
        hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`,
        () => {
            const el = document.createElement("link");
            el.rel = rel;
            if (hreflang) el.hreflang = hreflang;
            return el;
        },
        "href",
        href
    );

/**
 * Title, description, canonical URL, hreflang alternates, Open Graph and Twitter tags for the
 * current page. `usePageMeta(title?)` alone gives sensible per-route defaults (from ui.meta.pages);
 * pass options to override the description, share image or path.
 */
export const usePageMeta = (title?: string, options: PageMetaOptions = {}) => {
    const { t } = useTranslation();
    const lang = useLang();
    const { pathname } = useLocation();
    const { description, image, imageWidth, imageHeight, imageAlt, path, type, noindex } = options;
    useEffect(() => {
        const rest = (path ?? pathname.replace(/^\/[^/]+/, "")).replace(/\/+$/, "");
        const key = routeKey(rest);
        const page = (k: string) => t(`ui.meta.pages.${key}.${k}`, { defaultValue: "" }) as string;
        const site = t("ui.meta.siteName");
        const name = title || page("title");
        const fullTitle = name && key !== "home" ? `${name} · ${site}` : `${site} · ${t("ui.meta.tagline")}`;
        const hide = noindex ?? (key === "thanks" || key === "notFound");
        // An explicit noindex means "this URL isn't a real page" (unknown campaign): no route snippet.
        const desc = description || (noindex ? "" : page("description")) || t("ui.meta.description");
        const ownImage = image ?? (key === "home" || key === "donate" ? `/og/${key}-${lang}.png` : "/og/default.png");
        const abs = (p: string) => (/^https?:/.test(p) ? p : SITE + p);
        const url = `${SITE}/${lang}${rest}`;

        document.title = fullTitle;
        meta("description", desc);
        meta("robots", hide ? "noindex, follow" : null);
        // Pages kept out of search get no canonical or language alternates.
        link("canonical", hide ? null : url);
        for (const l of LANGS) link("alternate", hide ? null : `${SITE}/${l}${rest}`, l);
        link("alternate", hide ? null : `${SITE}/en${rest}`, "x-default");

        meta("og:type", type ?? (key === "campaign" && !hide ? "article" : "website"));
        meta("og:site_name", site);
        meta("og:title", name || fullTitle);
        meta("og:description", desc);
        meta("og:url", url);
        meta("og:locale", lang === "uk" ? "uk_UA" : "en_US");
        meta("og:locale:alternate", lang === "uk" ? "en_US" : "uk_UA");
        meta("og:image", abs(ownImage));
        meta("og:image:width", imageWidth ? String(imageWidth) : image ? null : "1200");
        meta("og:image:height", imageHeight ? String(imageHeight) : image ? null : "630");
        meta("og:image:alt", imageAlt || (image ? name || site : t("ui.meta.imageAlt")));
        meta("twitter:card", "summary_large_image");
        meta("twitter:title", name || fullTitle);
        meta("twitter:description", desc);
        meta("twitter:image", abs(ownImage));
    }, [title, description, image, imageWidth, imageHeight, imageAlt, path, type, noindex, pathname, lang, t]);
};

type Tone = "bg" | "sunk" | "tint";
const tones: Record<Tone, string> = { bg: "bg-bg", sunk: "bg-sunk", tint: "bg-tint" };

/** One page section: the standard padding and width, a tone, and a calm one-time fade-in. */
export const Section: React.FC<{ id?: string; tone?: Tone; className?: string; children: React.ReactNode; labelledBy?: string }> = ({
    id,
    tone = "bg",
    className,
    children,
    labelledBy,
}) => {
    const [ref, seen] = useInView(0); // any pixel on screen: very tall sections (all projects on a phone) must still appear
    return (
        <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-16 md:py-24")}>
            <div ref={ref} className={cn("mx-auto max-w-container px-4 md:px-6", seen ? "animate-rise" : "opacity-0", className)}>
                {children}
            </div>
        </section>
    );
};

export const SectionHead: React.FC<{ id: string; title: string; lead?: string; action?: React.ReactNode; level?: 1 | 2 }> = ({
    id,
    title,
    lead,
    action,
    level = 2,
}) => {
    const H = level === 1 ? "h1" : "h2";
    return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-prose">
            <H id={id} className={cn(level === 1 ? "text-h1" : "text-h2", "text-ink")}>
                {title}
            </H>
            {lead && <p className="mt-3 text-body text-muted">{lead}</p>}
        </div>
        {action}
    </div>
    );
};

/** The full logo on a white disc, so its black ring text stays readable in dark mode too. */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 48, className }) => (
    <span className={cn("logo-disc inline-flex shrink-0 items-center justify-center rounded-full", className)} style={{ width: size, height: size }}>
        <picture>
            <source type="image/webp" srcSet="/media/logo-64.webp 64w, /media/logo-192.webp 192w, /media/logo-512.webp 512w" sizes={`${size}px`} />
            <img src="/media/logo-192.png" width={size} height={size} alt="" className="h-full w-full" />
        </picture>
    </span>
);

export const ExternalLink: React.FC<{ href: string; className?: string; children: React.ReactNode; tabIndex?: number }> = ({
    href,
    className,
    children,
    tabIndex,
}) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} tabIndex={tabIndex}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
    </a>
);

/** Button-styled links: "donate" is the one yellow action per screen. */
export const linkButton = {
    donate: "inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-accent px-6 font-semibold text-accent-on hover:bg-accent-hover",
    primary: "inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-primary px-6 font-semibold text-primary-on hover:bg-primary-hover",
    outline: "inline-flex min-h-12 items-center justify-center gap-2 rounded-control border-2 border-primary px-6 font-semibold text-primary hover:bg-primary/10",
    text: "inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline",
};
