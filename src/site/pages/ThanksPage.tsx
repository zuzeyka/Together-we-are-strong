import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, Check, Facebook, HeartHandshake, Link2, MessageCircle, Send, Twitter } from "lucide-react";
import { INSTAGRAM, SITE_URL } from "@/content/campaigns";
import { ExternalLink, L, Section, linkButton, useLang, usePageMeta } from "@/site/ui";
import { cn } from "@/shared/lib/utils";

/** Copy text: the async clipboard first, then the old textarea trick for older or locked-down browsers. */
const copyText = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            ta.remove();
            return ok;
        } catch {
            return false;
        }
    }
};

const ThanksPage: React.FC = () => {
    const { t } = useTranslation();
    const lang = useLang();
    usePageMeta(t("ui.thanks.title"));
    const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

    const url = `${SITE_URL}/${lang}`;
    const u = encodeURIComponent(url);
    const text = encodeURIComponent(t("ui.thanks.shareText"));
    const shares = [
        { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${text}`, Icon: Send },
        { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: Facebook },
        { name: "WhatsApp", href: `https://wa.me/?text=${text}%20${u}`, Icon: MessageCircle },
        { name: "X", href: `https://x.com/intent/tweet?url=${u}&text=${text}`, Icon: Twitter },
    ];
    const steps = ["receive", "spend", "report"] as const;

    const onCopy = async () => {
        setCopied((await copyText(url)) ? "ok" : "fail");
        setTimeout(() => setCopied("idle"), 2500);
    };

    return (
        <>
            <Section className="max-w-[880px]">
                <HeartHandshake className="size-10 text-primary" aria-hidden />
                <h1 className="mt-3 text-h1 text-ink">{t("ui.thanks.title")}</h1>
                <p className="mt-3 max-w-prose text-body text-muted">{t("ui.thanks.lead")}</p>

                <h2 className="mt-12 text-h2 text-ink">{t("ui.thanks.nextTitle")}</h2>
                <ol className="mt-6 grid gap-4 sm:grid-cols-3">
                    {steps.map((k, i) => (
                        <li key={k} className="rounded-card border border-line bg-surface p-5 shadow-card">
                            <span className="inline-flex size-9 items-center justify-center rounded-full bg-tint font-semibold text-primary tabular" aria-hidden>
                                {i + 1}
                            </span>
                            <h3 className="mt-3 text-h3 text-ink">{t(`ui.thanks.steps.${k}.title`)}</h3>
                            <p className="mt-1 text-small text-muted">{t(`ui.thanks.steps.${k}.text`)}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section tone="tint" className="max-w-[880px]" labelledBy="share-title">
                <h2 id="share-title" className="text-h2 text-ink">{t("ui.thanks.shareTitle")}</h2>
                <p className="mt-3 max-w-prose text-body text-muted">{t("ui.thanks.shareLead")}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                    {shares.map(({ name, href, Icon }) => (
                        <li key={name}>
                            <ExternalLink href={href} className={cn(linkButton.outline, "w-full bg-surface px-4")}>
                                <Icon className="size-5" aria-hidden /> {name} <ArrowUpRight className="size-4" aria-hidden />
                            </ExternalLink>
                        </li>
                    ))}
                    <li className="col-span-2 sm:col-span-1">
                        <button type="button" onClick={onCopy} className={cn(linkButton.outline, "w-full bg-surface px-4")}>
                            {copied === "ok" ? <Check className="size-5" aria-hidden /> : <Link2 className="size-5" aria-hidden />}
                            <span aria-live="polite">{copied === "ok" ? t("ui.thanks.copied") : t("ui.thanks.copyLink")}</span>
                        </button>
                    </li>
                </ul>
                {copied === "fail" && (
                    <p className="mt-3 text-small text-muted">
                        {t("ui.thanks.copyFailed")} <span className="select-all font-mono text-ink">{url}</span>
                    </p>
                )}
            </Section>

            <Section className="max-w-[880px]" labelledBy="more-title">
                <h2 id="more-title" className="text-h2 text-ink">{t("ui.thanks.moreTitle")}</h2>
                <p className="mt-3 max-w-prose text-body text-muted">{t("ui.thanks.moreLead")}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <L to="/campaigns" className={linkButton.primary}>
                        {t("ui.thanks.projects")} <ArrowRight className="size-4" aria-hidden />
                    </L>
                    <ExternalLink href={INSTAGRAM} className={linkButton.outline}>
                        {t("ui.thanks.instagram")} <ArrowUpRight className="size-4" aria-hidden />
                    </ExternalLink>
                </div>
            </Section>
        </>
    );
};

export default ThanksPage;
