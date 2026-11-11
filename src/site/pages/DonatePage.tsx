import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, ChevronDown, CreditCard, Landmark, PiggyBank, ShieldCheck } from "lucide-react";
import { CopyField } from "@/components/ds";
import { DONATION_PRESETS, INSTAGRAM, MONOBANK_JAR, PAYMENT_QR, PAYPAL } from "@/content/campaigns";
import { ExternalLink, L, LogoMark, Section, linkButton, useLang, usePageMeta } from "@/site/ui";
import { cn } from "@/shared/lib/utils";

/** "Label: value" in the translations → value. */
const value = (s: string) => s.slice(s.indexOf(":") + 1).trim();

type Tab = "ua" | "eu";
const money = (n: number, tab: Tab) => (tab === "ua" ? `₴${n}` : `€${n}`);

/** Suggested amounts: a radio group (arrow keys move and select, one tab stop). */
const AmountPicker: React.FC<{ tab: Tab; selected: number | null; onSelect: (i: number) => void }> = ({ tab, selected, onSelect }) => {
    const { t } = useTranslation();
    const refs = useRef<(HTMLButtonElement | null)[]>([]);
    const focusable = selected ?? 0;
    const onKey = (e: React.KeyboardEvent, i: number) => {
        const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        const next = (i + step + DONATION_PRESETS.length) % DONATION_PRESETS.length;
        onSelect(next);
        refs.current[next]?.focus();
    };
    return (
        <div role="radiogroup" aria-labelledby="amount-label" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DONATION_PRESETS.map((p, i) => {
                const on = selected === i;
                return (
                    <button
                        key={p.key}
                        ref={(el) => (refs.current[i] = el)}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        tabIndex={i === focusable ? 0 : -1}
                        onClick={() => onSelect(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        className={cn(
                            "flex min-h-11 flex-col items-start gap-1 rounded-control border-2 p-3 text-left",
                            on ? "border-accent bg-accent text-accent-on" : "border-line bg-surface text-ink hover:border-primary"
                        )}
                    >
                        <span className="text-h3 font-semibold tabular">{money(tab === "ua" ? p.uah : p.eur, tab)}</span>
                        <span className={cn("text-caption", on ? "text-accent-on" : "text-muted")}>{t(`ui.donatePage.presets.${p.key}`)}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DonatePage: React.FC = () => {
    const { t } = useTranslation();
    const lang = useLang();
    usePageMeta(t("ui.donate.title"));
    const [tab, setTab] = useState<Tab>(lang === "uk" ? "ua" : "eu");
    const [preset, setPreset] = useState<number | null>(null);
    const copy = { copyLabel: t("ui.donate.copy"), copiedLabel: t("ui.donate.copied") };
    const tabs = [
        ["ua", t("ui.donate.tabUA")],
        ["eu", t("ui.donate.tabEU")],
    ] as const;
    const amount = preset === null ? null : tab === "ua" ? DONATION_PRESETS[preset].uah : DONATION_PRESETS[preset].eur;
    const faq = ["safe", "receipt", "companies", "where"] as const;

    return (
        <>
            <Section className="max-w-[880px]">
                <h1 className="text-h1 text-ink">{t("ui.donate.title")}</h1>
                <p className="mt-3 max-w-prose text-body text-muted">{t("ui.donate.lead")}</p>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
                    <div className="rounded-card border border-line bg-surface p-5 shadow-card md:p-6">
                        <div role="tablist" aria-label={t("ui.donate.title")} className="mb-5 inline-flex rounded-control bg-sunk p-1">
                            {tabs.map(([key, label]) => (
                                <button
                                    key={key}
                                    role="tab"
                                    type="button"
                                    id={`tab-${key}`}
                                    aria-selected={tab === key}
                                    aria-controls={`panel-${key}`}
                                    onClick={() => setTab(key)}
                                    className={cn("min-h-11 rounded-[6px] px-4 text-small font-semibold", tab === key ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink")}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <h2 id="amount-label" className="text-h3 text-ink">{t("ui.donatePage.amountTitle")}</h2>
                        <p className="mb-3 mt-1 text-small text-muted">{t("ui.donatePage.amountNote")}</p>
                        <AmountPicker tab={tab} selected={preset} onSelect={setPreset} />
                        <p aria-live="polite" className="mt-4 min-h-[1.6em] font-semibold text-ink">
                            {amount !== null && t("ui.donatePage.transfer", { amount: money(amount, tab) })}
                        </p>

                        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-2">
                            {amount !== null && <CopyField label={t(tab === "ua" ? "ui.donatePage.amountUAH" : "ui.donatePage.amountEUR")} value={String(amount)} {...copy} />}
                            {tab === "ua" ? (
                                <>
                                    <CopyField label={t("ui.donate.recipient")} value={value(t("donate.uah.recipient"))} {...copy} />
                                    <CopyField label={t("ui.donate.iban")} value={value(t("donate.uah.iban"))} {...copy} />
                                    <CopyField label={t("ui.donate.purpose")} value={value(t("donate.uah.purpose"))} {...copy} />
                                    <CopyField label={t("ui.donate.code")} value="44749163" {...copy} />
                                </>
                            ) : (
                                <>
                                    <CopyField label={t("ui.donate.recipient")} value={value(t("donate.eur.recipient"))} {...copy} />
                                    <CopyField label={t("ui.donate.account")} value={value(t("donate.eur.iban"))} {...copy} />
                                    <CopyField label={t("ui.donate.bank")} value={value(t("donate.eur.provider"))} {...copy} />
                                </>
                            )}
                            {/* Only shown once the founder supplies a real QR image (PAYMENT_QR in campaigns.ts). */}
                            {tab === "ua" && PAYMENT_QR && (
                                <figure className="mt-5 flex flex-col items-start gap-2">
                                    <img src={PAYMENT_QR} width={180} height={180} alt={t("ui.donatePage.qrAlt")} className="rounded-control border border-line bg-surface p-2" />
                                    <figcaption className="text-small text-muted">{t("ui.donatePage.qrCaption")}</figcaption>
                                </figure>
                            )}
                        </div>
                        <p className="mt-4 text-small text-muted">{t("ui.donate.thanks")}</p>
                        <L to="/donate/thanks" className={cn(linkButton.text, "mt-2")}>
                            {t("ui.donatePage.done")} <ArrowRight className="size-4" aria-hidden />
                        </L>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-card border border-line bg-surface p-5 shadow-card">
                            <CreditCard className="size-7 text-primary" aria-hidden />
                            <h2 className="mt-2 text-h3 text-ink">{t("ui.donate.paypalTitle")}</h2>
                            <p className="mt-1 text-small text-muted">{t("ui.donate.paypalText")}</p>
                            {preset !== null && (
                                <p className="mt-2 text-small font-semibold text-ink">{t("ui.donatePage.paypalAmount", { amount: `€${DONATION_PRESETS[preset].eur}` })}</p>
                            )}
                            <ExternalLink href={PAYPAL} className={cn(linkButton.donate, "mt-4 w-full")}>
                                {t("ui.donate.paypal")} <ArrowUpRight className="size-4" aria-hidden />
                            </ExternalLink>
                        </div>
                        {/* Only shown once the founder supplies the real jar link (MONOBANK_JAR in campaigns.ts). */}
                        {MONOBANK_JAR && (
                            <div className="rounded-card border border-line bg-surface p-5 shadow-card">
                                <PiggyBank className="size-7 text-primary" aria-hidden />
                                <h2 className="mt-2 text-h3 text-ink">{t("ui.donatePage.jarTitle")}</h2>
                                <p className="mt-1 text-small text-muted">{t("ui.donatePage.jarText")}</p>
                                <ExternalLink href={MONOBANK_JAR} className={cn(linkButton.outline, "mt-4 w-full")}>
                                    {t("ui.donatePage.jar")} <ArrowUpRight className="size-4" aria-hidden />
                                </ExternalLink>
                            </div>
                        )}
                        <div className="rounded-card border border-line bg-tint p-5">
                            <ShieldCheck className="size-7 text-primary" aria-hidden />
                            <h2 className="mt-2 text-h3 text-ink">{t("ui.donate.trustTitle")}</h2>
                            <div className="mt-3 flex items-center gap-3">
                                <LogoMark size={48} />
                                <p className="text-small text-ink">{t("ui.footer.legal")}</p>
                            </div>
                            <p className="mt-3 flex items-center gap-2 text-small text-muted">
                                <Landmark className="size-4" aria-hidden /> {t("ui.footer.code")}: <span className="tabular">44749163</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section tone="sunk" className="max-w-[880px]" labelledBy="faq-title">
                <h2 id="faq-title" className="text-h2 text-ink">{t("ui.donatePage.faqTitle")}</h2>
                <div className="mt-6 divide-y divide-line rounded-card border border-line bg-surface">
                    {faq.map((k) => (
                        <details key={k} className="group px-5">
                            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                                {t(`ui.donatePage.faq.${k}.q`)}
                                <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
                            </summary>
                            <p className="max-w-prose pb-4 text-body text-muted">{t(`ui.donatePage.faq.${k}.a`)}</p>
                            {k === "receipt" && (
                                <ExternalLink href={INSTAGRAM} className={cn(linkButton.text, "mb-3")}>
                                    {t("ui.donatePage.instagram")} <ArrowUpRight className="size-4" aria-hidden />
                                </ExternalLink>
                            )}
                            {k === "where" && (
                                <L to="/campaigns" className={cn(linkButton.text, "mb-3")}>
                                    {t("ui.donatePage.projects")} <ArrowRight className="size-4" aria-hidden />
                                </L>
                            )}
                        </details>
                    ))}
                </div>
            </Section>
        </>
    );
};

export default DonatePage;
