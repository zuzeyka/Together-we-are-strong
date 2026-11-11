import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { CopyField } from "@/components/ds";
import { PAYPAL } from "@/content/campaigns";
import { ExternalLink, LogoMark, Section, linkButton, useLang, usePageMeta } from "@/site/ui";
import { cn } from "@/shared/lib/utils";

/** "Label: value" in the translations → value. */
const value = (s: string) => s.slice(s.indexOf(":") + 1).trim();

const DonatePage: React.FC = () => {
    const { t } = useTranslation();
    const lang = useLang();
    usePageMeta(t("ui.donate.title"));
    const [tab, setTab] = useState<"ua" | "eu">(lang === "uk" ? "ua" : "eu");
    const copy = { copyLabel: t("ui.donate.copy"), copiedLabel: t("ui.donate.copied") };
    const tabs = [
        ["ua", t("ui.donate.tabUA")],
        ["eu", t("ui.donate.tabEU")],
    ] as const;

    return (
        <Section className="max-w-[880px]">
            <h1 className="text-h1 text-ink">{t("ui.donate.title")}</h1>
            <p className="mt-3 max-w-prose text-body text-muted">{t("ui.donate.lead")}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="rounded-card border border-line bg-surface p-5 shadow-card md:p-6">
                    <div role="tablist" aria-label={t("ui.donate.title")} className="mb-4 inline-flex rounded-control bg-sunk p-1">
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
                    {tab === "ua" ? (
                        <div role="tabpanel" id="panel-ua" aria-labelledby="tab-ua">
                            <CopyField label={t("ui.donate.recipient")} value={value(t("donate.uah.recipient"))} {...copy} />
                            <CopyField label={t("ui.donate.iban")} value={value(t("donate.uah.iban"))} {...copy} />
                            <CopyField label={t("ui.donate.purpose")} value={value(t("donate.uah.purpose"))} {...copy} />
                            <CopyField label={t("ui.donate.code")} value="44749163" {...copy} />
                        </div>
                    ) : (
                        <div role="tabpanel" id="panel-eu" aria-labelledby="tab-eu">
                            <CopyField label={t("ui.donate.recipient")} value={value(t("donate.eur.recipient"))} {...copy} />
                            <CopyField label={t("ui.donate.account")} value={value(t("donate.eur.iban"))} {...copy} />
                            <CopyField label={t("ui.donate.bank")} value={value(t("donate.eur.provider"))} {...copy} />
                        </div>
                    )}
                    <p className="mt-4 text-small text-muted">{t("ui.donate.thanks")}</p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
                        <CreditCard className="size-7 text-primary" aria-hidden />
                        <h2 className="mt-2 text-h3 text-ink">{t("ui.donate.paypalTitle")}</h2>
                        <p className="mt-1 text-small text-muted">{t("ui.donate.paypalText")}</p>
                        <ExternalLink href={PAYPAL} className={cn(linkButton.donate, "mt-4 w-full")}>
                            {t("ui.donate.paypal")}
                        </ExternalLink>
                    </div>
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
    );
};

export default DonatePage;
