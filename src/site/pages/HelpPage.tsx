import React from "react";
import { useTranslation } from "react-i18next";
import { Accessibility, Baby, Check, Dog, Home as HomeIcon, Instagram, ShieldCheck } from "lucide-react";
import { INSTAGRAM } from "@/content/campaigns";
import MessageTemplate from "@/site/MessageTemplate";
import { cn } from "@/shared/lib/utils";
import { ExternalLink, L, Section, SectionHead, linkButton, usePageMeta } from "@/site/ui";

/*
 * TODO(form): there is no contact email or form backend yet; the founder will supply them.
 * When a request form exists, set HELP_FORM_URL (or swap in a <form> component) and show it
 * next to the Instagram button below. Until then the page only offers Instagram DM, so
 * nothing on the page points nowhere.
 */
const HELP_FORM_URL: string | null = null;

const WHO = [
    ["displaced", HomeIcon],
    ["disabilities", Accessibility],
    ["mothers", Baby],
    ["animals", Dog],
] as const;

const CHECKLIST = ["name", "city", "family", "need", "contact"] as const;
const NEXT = ["read", "clarify", "plan", "deliver"] as const;

const InstagramButton: React.FC<{ label: string; className?: string }> = ({ label, className }) => (
    <ExternalLink href={INSTAGRAM} className={cn(linkButton.primary, "min-h-14 px-8 text-[1.0625rem]", className)}>
        <Instagram className="size-5" aria-hidden /> {label}
    </ExternalLink>
);

const HelpPage: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta(t("ui.helpPage.title"));

    return (
        <>
            <section className="bg-bg" aria-labelledby="help-page-title">
                <div className="mx-auto max-w-container px-4 py-12 md:px-6 md:py-20">
                    <div className="max-w-prose animate-rise">
                        <p className="text-small font-semibold uppercase tracking-wide text-primary">{t("ui.helpPage.eyebrow")}</p>
                        <h1 id="help-page-title" className="mt-3 text-display text-ink">{t("ui.helpPage.title")}</h1>
                        <p className="mt-5 text-body text-muted md:text-[1.1875rem]">{t("ui.helpPage.lead")}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <InstagramButton label={t("ui.help.cta")} />
                            {HELP_FORM_URL && (
                                <ExternalLink href={HELP_FORM_URL} className={linkButton.outline}>{t("ui.helpPage.form")}</ExternalLink>
                            )}
                        </div>
                        <p className="mt-4 text-small text-muted">{t("ui.helpPage.handle")}</p>
                    </div>
                </div>
            </section>

            <Section tone="sunk" labelledBy="who">
                <SectionHead id="who" title={t("ui.helpPage.who.title")} lead={t("ui.helpPage.who.lead")} />
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {WHO.map(([key, Icon]) => (
                        <li key={key} className="flex gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
                            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
                                <Icon className="size-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="text-h3 text-ink">{t(`ui.helpPage.who.items.${key}.title`)}</h3>
                                <p className="mt-1 text-small text-muted">{t(`ui.helpPage.who.items.${key}.text`)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="mt-8 max-w-prose text-body text-muted">{t("ui.helpPage.who.note")}</p>
            </Section>

            <Section labelledBy="write">
                <SectionHead id="write" title={t("ui.helpPage.write.title")} lead={t("ui.helpPage.write.lead")} />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <ul className="flex flex-col gap-4">
                        {CHECKLIST.map((key) => (
                            <li key={key} className="flex gap-3">
                                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-on">
                                    <Check className="size-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-semibold text-ink">{t(`ui.helpPage.write.items.${key}.title`)}</p>
                                    <p className="text-small text-muted">{t(`ui.helpPage.write.items.${key}.text`)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <MessageTemplate
                        title={t("ui.helpPage.write.templateTitle")}
                        text={t("ui.helpPage.write.template")}
                        copyLabel={t("ui.helpPage.copy")}
                        copiedLabel={t("ui.helpPage.copied")}
                    />
                </div>
            </Section>

            <Section tone="sunk" labelledBy="next">
                <SectionHead id="next" title={t("ui.helpPage.next.title")} />
                <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {NEXT.map((key, i) => (
                        <li key={key} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card">
                            <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-on tabular" aria-hidden>
                                {i + 1}
                            </span>
                            <h3 className="text-h3 text-ink">
                                <span className="sr-only">{t("ui.about.how.step", { n: i + 1 })} </span>
                                {t(`ui.helpPage.next.steps.${key}.title`)}
                            </h3>
                            <p className="text-body text-muted">{t(`ui.helpPage.next.steps.${key}.text`)}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section labelledBy="privacy">
                <div className="flex flex-col gap-8 rounded-card border border-line bg-surface p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-10">
                    <div className="flex max-w-prose gap-4">
                        <ShieldCheck className="size-8 shrink-0 text-primary" aria-hidden />
                        <div>
                            <h2 id="privacy" className="text-h2 text-ink">{t("ui.helpPage.privacy.title")}</h2>
                            <p className="mt-3 text-body text-muted">{t("ui.helpPage.privacy.text")}</p>
                        </div>
                    </div>
                    <InstagramButton label={t("ui.help.cta")} className="self-start md:self-center" />
                </div>
                <p className="mt-8 text-body text-muted">
                    {t("ui.helpPage.volunteerNote")}{" "}
                    <L to="/volunteer" className={linkButton.text}>{t("ui.helpPage.volunteerLink")}</L>
                </p>
            </Section>
        </>
    );
};

export default HelpPage;
