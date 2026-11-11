import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, CalendarHeart, Car, Clock, HeartHandshake, Instagram, Languages, Laptop, Package, ShieldCheck } from "lucide-react";
import { INSTAGRAM } from "@/content/campaigns";
import MessageTemplate from "@/site/MessageTemplate";
import { cn } from "@/shared/lib/utils";
import { ExternalLink, L, Section, SectionHead, linkButton, usePageMeta } from "@/site/ui";

/*
 * TODO(form): there is no contact email or form backend yet; the founder will supply them.
 * When a volunteer sign-up form exists, set VOLUNTEER_FORM_URL (or swap in a <form> component).
 * Until then people apply by Instagram DM, so nothing on the page points nowhere.
 */
const VOLUNTEER_FORM_URL: string | null = null;

const WAYS = [
    ["driving", Car],
    ["packing", Package],
    ["translating", Languages],
    ["events", CalendarHeart],
    ["design", Laptop],
] as const;

const ASKS = [
    ["reliable", ShieldCheck],
    ["time", Clock],
    ["care", HeartHandshake],
] as const;

const APPLY = ["write", "chat", "start"] as const;

const VolunteerPage: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta(t("ui.volunteerPage.title"));

    const instagramButton = (label: string, className?: string) => (
        <ExternalLink href={INSTAGRAM} className={cn(linkButton.primary, "min-h-14 px-8 text-[1.0625rem]", className)}>
            <Instagram className="size-5" aria-hidden /> {label}
        </ExternalLink>
    );

    return (
        <>
            <section className="bg-bg" aria-labelledby="vol-title">
                <div className="mx-auto max-w-container px-4 py-12 md:px-6 md:py-20">
                    <div className="max-w-prose animate-rise">
                        <p className="text-small font-semibold uppercase tracking-wide text-primary">{t("ui.volunteerPage.eyebrow")}</p>
                        <h1 id="vol-title" className="mt-3 text-display text-ink">{t("ui.volunteerPage.title")}</h1>
                        <p className="mt-5 text-body text-muted md:text-[1.1875rem]">{t("ui.volunteerPage.lead")}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            {instagramButton(t("ui.volunteerPage.cta"))}
                            {VOLUNTEER_FORM_URL && (
                                <ExternalLink href={VOLUNTEER_FORM_URL} className={linkButton.outline}>{t("ui.volunteerPage.form")}</ExternalLink>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Section tone="sunk" labelledBy="ways">
                <SectionHead id="ways" title={t("ui.volunteerPage.ways.title")} lead={t("ui.volunteerPage.ways.lead")} />
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {WAYS.map(([key, Icon]) => (
                        <li key={key} className="flex gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
                            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
                                <Icon className="size-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="text-h3 text-ink">{t(`ui.volunteerPage.ways.items.${key}.title`)}</h3>
                                <p className="mt-1 text-small text-muted">{t(`ui.volunteerPage.ways.items.${key}.text`)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section labelledBy="asks">
                <SectionHead id="asks" title={t("ui.volunteerPage.asks.title")} lead={t("ui.volunteerPage.asks.lead")} />
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ASKS.map(([key, Icon]) => (
                        <li key={key} className="flex flex-col gap-3 border-l-4 border-primary pl-5">
                            <Icon className="size-7 text-primary" aria-hidden />
                            <h3 className="text-h3 text-ink">{t(`ui.volunteerPage.asks.items.${key}.title`)}</h3>
                            <p className="text-body text-muted">{t(`ui.volunteerPage.asks.items.${key}.text`)}</p>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section tone="sunk" labelledBy="apply">
                <SectionHead id="apply" title={t("ui.volunteerPage.apply.title")} lead={t("ui.volunteerPage.apply.lead")} />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <ol className="flex flex-col gap-5">
                            {APPLY.map((key, i) => (
                                <li key={key} className="flex gap-4">
                                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-on tabular" aria-hidden>
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-h3 text-ink">
                                            <span className="sr-only">{t("ui.about.how.step", { n: i + 1 })} </span>
                                            {t(`ui.volunteerPage.apply.steps.${key}.title`)}
                                        </h3>
                                        <p className="mt-1 text-body text-muted">{t(`ui.volunteerPage.apply.steps.${key}.text`)}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        {instagramButton(t("ui.volunteerPage.cta"), "self-start")}
                    </div>
                    <MessageTemplate
                        title={t("ui.volunteerPage.apply.templateTitle")}
                        text={t("ui.volunteerPage.apply.template")}
                        copyLabel={t("ui.helpPage.copy")}
                        copiedLabel={t("ui.helpPage.copied")}
                    />
                </div>
            </Section>

            <Section labelledBy="companies-title" id="companies">
                <div className="flex flex-col gap-8 rounded-card border border-line bg-surface p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-10">
                    <div className="flex max-w-prose gap-4">
                        <Building2 className="size-8 shrink-0 text-primary" aria-hidden />
                        <div>
                            <h2 id="companies-title" className="text-h2 text-ink">{t("ui.volunteerPage.companies.title")}</h2>
                            <p className="mt-3 text-body text-muted">{t("ui.volunteerPage.companies.text")}</p>
                            <ul className="mt-4 flex list-disc flex-col gap-1 pl-5 text-body text-muted">
                                {(t("ui.volunteerPage.companies.items", { returnObjects: true }) as string[]).map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 md:items-end">
                        <ExternalLink href={INSTAGRAM} className={linkButton.outline}>
                            <Instagram className="size-5" aria-hidden /> {t("ui.volunteerPage.companies.cta")}
                        </ExternalLink>
                        <L to="/about#partners" className={linkButton.text}>{t("ui.volunteerPage.companies.partners")}</L>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default VolunteerPage;
