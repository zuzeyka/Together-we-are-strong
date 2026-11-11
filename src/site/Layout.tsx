import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Menu, X } from "lucide-react";
import { isLang, preferredLang } from "@/i18n/i18n";
import { INSTAGRAM, isCampaign } from "@/content/campaigns";
import ThemeToggle from "@/components/ds/ThemeToggle";
import { ExternalLink, L, LogoMark, linkButton, useLang } from "@/site/ui";
import { cn } from "@/shared/lib/utils";
import MobileDonateBar from "@/site/MobileDonateBar";

/** Everything under /:lang. An unknown first segment is an old URL (/Grooming, /bank-details). */
const Layout: React.FC = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (isLang(lang) && i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang);
    }, [lang, i18n]);
    // New page: start at the top; a #section link: scroll to it once it has rendered.
    useEffect(() => {
        if (!hash) return window.scrollTo(0, 0);
        const id = hash.slice(1);
        const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
        return () => clearTimeout(t);
    }, [pathname, hash]);

    if (!isLang(lang)) {
        const to = lang === "bank-details" ? "donate" : isCampaign(lang) ? `campaigns/${lang}` : "";
        return <Navigate to={`/${preferredLang()}/${to}`} replace />;
    }
    return (
        <div className="flex min-h-screen flex-col bg-bg text-ink">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2">
                {i18n.t("ui.skip")}
            </a>
            <Header />
            <main id="main" className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <MobileDonateBar />
        </div>
    );
};

const LanguageSwitch: React.FC = () => {
    const lang = useLang();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const go = (to: string) => navigate(pathname.replace(/^\/(en|uk)/, `/${to}`));
    return (
        <div role="group" aria-label={t("ui.lang")} className="inline-flex rounded-control border border-line p-1">
            {[
                ["en", "EN", "English"],
                ["uk", "УК", "Українська"],
            ].map(([code, label, name]) => (
                <button
                    key={code}
                    type="button"
                    lang={code}
                    title={name}
                    aria-pressed={lang === code}
                    onClick={() => go(code)}
                    className={cn("min-h-10 min-w-10 rounded-[6px] px-2 text-small font-semibold", lang === code ? "bg-accent text-accent-on" : "text-ink hover:bg-ink/10")}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

const Header: React.FC = () => {
    const { t } = useTranslation();
    const lang = useLang();
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => setOpen(false), [pathname]);
    const links = [
        { to: `/${lang}/campaigns`, label: t("ui.nav.projects") },
        { to: `/${lang}/about`, label: t("ui.nav.about") },
        { to: `/${lang}/help`, label: t("ui.nav.help") },
        { to: `/${lang}/volunteer`, label: t("ui.nav.volunteer") },
    ];
    const navLink = ({ isActive }: { isActive: boolean }) =>
        cn("rounded-control px-3 py-2 font-semibold hover:bg-ink/5", isActive && !pathname.endsWith(`/${lang}`) ? "text-primary" : "text-ink");
    return (
        <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-container items-center gap-3 px-4 md:h-20 md:px-6">
                <L to="/" className="flex items-center gap-3" aria-label={t("ui.nav.home")}>
                    <LogoMark size={44} />
                    <span className="hidden text-small font-bold leading-tight text-ink sm:block">
                        Together We
                        <br />
                        Made Power
                    </span>
                </L>
                <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} end className={navLink}>
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="ml-auto flex items-center gap-2 lg:ml-4">
                    <ThemeToggle />
                    <LanguageSwitch />
                    <L to="/donate" className={cn(linkButton.donate, "hidden min-h-11 sm:inline-flex")}>
                        {t("ui.nav.donate")}
                    </L>
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-control text-ink hover:bg-ink/10 lg:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? t("ui.nav.close") : t("ui.nav.menu")}
                        onClick={() => setOpen((o) => !o)}
                    >
                        {open ? <X aria-hidden /> : <Menu aria-hidden />}
                    </button>
                </div>
            </div>
            {open && (
                <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-surface px-4 pb-4 lg:hidden">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} className="flex min-h-12 items-center border-b border-line font-semibold text-ink">
                            {l.label}
                        </NavLink>
                    ))}
                    <L to="/donate" className={cn(linkButton.donate, "mt-4 w-full")}>
                        {t("ui.nav.donate")}
                    </L>
                </nav>
            )}
        </header>
    );
};

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="border-t border-line bg-sunk">
            <div className="mx-auto grid max-w-container gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
                <div className="flex items-start gap-4">
                    <LogoMark size={64} />
                    <div>
                        <p className="font-bold text-ink">Together We Made Power</p>
                        <p className="mt-1 text-small text-muted">{t("ui.footer.legal")}</p>
                        <p className="mt-1 text-small text-muted">
                            {t("ui.footer.code")}: <span className="tabular">44749163</span>
                        </p>
                    </div>
                </div>
                <nav aria-label="Footer" className="flex flex-col gap-2 text-small">
                    <L to="/campaigns" className="text-ink hover:text-primary">{t("ui.nav.projects")}</L>
                    <L to="/donate" className="text-ink hover:text-primary">{t("ui.nav.donate")}</L>
                    <L to="/about" className="text-ink hover:text-primary">{t("ui.nav.about")}</L>
                    <L to="/help" className="text-ink hover:text-primary">{t("ui.nav.help")}</L>
                    <L to="/volunteer" className="text-ink hover:text-primary">{t("ui.nav.volunteer")}</L>
                </nav>
                <div>
                    <p className="text-small font-semibold text-ink">{t("ui.footer.follow")}</p>
                    <ExternalLink href={INSTAGRAM} className={cn(linkButton.text, "mt-2")}>
                        <Instagram className="size-5" aria-hidden /> @twmp.foundation
                    </ExternalLink>
                </div>
            </div>
            <p className="border-t border-line px-4 py-4 text-center text-caption text-muted">
                {t("ui.footer.rights", { year: new Date().getFullYear() })}
            </p>
        </footer>
    );
};

export default Layout;
