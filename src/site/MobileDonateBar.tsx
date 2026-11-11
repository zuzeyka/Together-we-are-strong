import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { L, linkButton } from "@/site/ui";
import { cn } from "@/shared/lib/utils";

/* Sticky Donate bar on phones (below `sm`). DESIGN_SYSTEM.md: one yellow action per screen, so the bar
 * hides while another yellow Donate link in the page is on screen (the hero's #hero-donate and any other
 * bg-accent link to /donate), and it never appears on the donate pages themselves.
 * Room for it: the `has-mobile-bar` class on <html> (rule at the end of src/index.css) pads the page and
 * sets scroll-padding-bottom, so neither the last content nor a focused element hides under it. */

const ROOT_CLASS = "has-mobile-bar";
const OTHER_DONATE = '#hero-donate, main a.bg-accent[href$="/donate"]';

const MobileDonateBar: React.FC = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const onDonate = /\/donate(\/thanks)?\/?$/.test(pathname);
    const [otherVisible, setOtherVisible] = useState(false);

    // Reserve the space on every page that can show the bar (no layout jump when it slides in).
    useEffect(() => {
        if (onDonate) return;
        const root = document.documentElement;
        root.classList.add(ROOT_CLASS);
        return () => root.classList.remove(ROOT_CLASS);
    }, [onDonate]);

    // Watch the page's own yellow Donate links; pages load lazily, so re-scan when <main> changes.
    useEffect(() => {
        setOtherVisible(false);
        if (onDonate || typeof IntersectionObserver === "undefined") return;
        const seen = new Map<Element, boolean>();
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => seen.set(e.target, e.isIntersecting));
            setOtherVisible([...seen.values()].some(Boolean));
        });
        const scan = () => {
            document.querySelectorAll(OTHER_DONATE).forEach((el) => {
                if (!seen.has(el)) {
                    seen.set(el, false);
                    io.observe(el);
                }
            });
            for (const el of seen.keys()) {
                if (!el.isConnected) {
                    io.unobserve(el);
                    seen.delete(el);
                }
            }
        };
        scan();
        const main = document.getElementById("main");
        const mo = main ? new MutationObserver(scan) : null;
        if (main && mo) mo.observe(main, { childList: true, subtree: true });
        return () => {
            io.disconnect();
            mo?.disconnect();
        };
    }, [pathname, onDonate]);

    if (onDonate) return null;
    const hidden = otherVisible;

    return (
        <aside
            aria-label={t("ui.mobileBar.donate")}
            className={cn(
                "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 pt-3 shadow-card transition-transform duration-200 sm:hidden",
                hidden ? "invisible translate-y-full" : "translate-y-0"
            )}
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
            <L to="/donate" className={cn(linkButton.donate, "w-full")}>
                {t("ui.mobileBar.donate")}
            </L>
        </aside>
    );
};

export default MobileDonateBar;
