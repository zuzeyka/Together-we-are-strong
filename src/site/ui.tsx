import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import useInView from "@/site/useInView";
import { isLang, type Lang } from "@/i18n/i18n";

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

/** Page title and description for the browser tab and search engines. */
export const usePageMeta = (title?: string) => {
    const { t } = useTranslation();
    useEffect(() => {
        const site = t("ui.hero.title");
        document.title = title ? `${title} · ${site}` : `${site} · ${t("ui.hero.eyebrow")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("ui.meta.description"));
    }, [title, t]);
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
    const [ref, seen] = useInView(0.1);
    return (
        <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-16 md:py-24")}>
            <div ref={ref} className={cn("mx-auto max-w-container px-4 md:px-6", seen ? "animate-rise" : "opacity-0", className)}>
                {children}
            </div>
        </section>
    );
};

export const SectionHead: React.FC<{ id: string; title: string; lead?: string; action?: React.ReactNode }> = ({ id, title, lead, action }) => (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-prose">
            <h2 id={id} className="text-h2 text-ink">
                {title}
            </h2>
            {lead && <p className="mt-3 text-body text-muted">{lead}</p>}
        </div>
        {action}
    </div>
);

/** The full logo on a white disc, so its black ring text stays readable in dark mode too. */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 48, className }) => (
    <span className={cn("logo-disc inline-flex shrink-0 items-center justify-center rounded-full", className)} style={{ width: size, height: size }}>
        <picture>
            <source type="image/webp" srcSet="/media/logo-64.webp 64w, /media/logo-192.webp 192w, /media/logo-512.webp 512w" sizes={`${size}px`} />
            <img src="/media/logo-192.png" width={size} height={size} alt="" className="h-full w-full" />
        </picture>
    </span>
);

export const ExternalLink: React.FC<{ href: string; className?: string; children: React.ReactNode }> = ({ href, className, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
