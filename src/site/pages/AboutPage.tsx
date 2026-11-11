import React from "react";
import { useTranslation } from "react-i18next";
import { Compass, HandHeart, Landmark, MessageCircle, PackageCheck, Search, Target, Truck } from "lucide-react";
import Picture from "@/components/Picture";
import { PARTNERS } from "@/content/campaigns";
import { EDRPOU, TEAM } from "@/content/team";
import { ExternalLink, L, Section, SectionHead, linkButton, usePageMeta } from "@/site/ui";

const STEPS = [
    ["request", MessageCircle],
    ["check", Search],
    ["collect", PackageCheck],
    ["deliver", Truck],
] as const;

const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta(t("ui.about.title"));

    return (
        <>
            {/* Intro: who we are, with a photo from a delivery. */}
            <section className="bg-bg" aria-labelledby="about-title">
                <div className="mx-auto grid max-w-container items-center gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-2">
                    <div className="animate-rise">
                        <p className="text-small font-semibold uppercase tracking-wide text-primary">{t("ui.about.eyebrow")}</p>
                        <h1 id="about-title" className="mt-3 text-display text-ink">{t("ui.about.title")}</h1>
                        <p className="mt-5 max-w-prose text-body text-muted md:text-[1.1875rem]">{t("ui.about.lead")}</p>
                    </div>
                    <div className="overflow-hidden rounded-card shadow-card">
                        <Picture
                            src="/DSC_3581.jpg"
                            alt={t("ui.about.photo")}
                            sizes="(min-width: 1024px) 580px, 100vw"
                            priority
                            className="aspect-[4/3] h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Mission and vision. */}
            <Section tone="sunk" labelledBy="mission">
                <SectionHead id="mission" title={t("ui.about.missionTitle")} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                        [Target, t("ui.about.missionLabel"), t("about.description")],
                        [Compass, t("ui.about.visionLabel"), t("about.vision")],
                    ].map(([Icon, title, text]) => {
                        const I = Icon as typeof Target;
                        return (
                            <div key={title as string} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card md:p-8">
                                <span className="inline-flex size-12 items-center justify-center rounded-full bg-tint text-primary">
                                    <I className="size-6" aria-hidden />
                                </span>
                                <h3 className="text-h3 text-ink">{title as string}</h3>
                                <p className="text-body text-muted">{text as string}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* Impact numbers: each says what it counts. */}
            <Section tone="tint" labelledBy="about-impact">
                <SectionHead id="about-impact" title={t("ui.impact.title")} lead={t("ui.impact.note")} />
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="border-l-4 border-primary pl-4">
                            <dt className="sr-only">{t(`stats.stat${n}.description`)}</dt>
                            <dd className="tabular text-h1 text-ink">{t(`stats.stat${n}.value`)}</dd>
                            <dd className="mt-1 text-small text-muted">{t(`stats.stat${n}.description`)}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            {/* How we work: from a request to a delivery. */}
            <Section labelledBy="how">
                <SectionHead id="how" title={t("ui.about.how.title")} lead={t("ui.about.how.lead")} />
                <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map(([key, Icon], i) => (
                        <li key={key} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-on tabular" aria-hidden>
                                    {i + 1}
                                </span>
                                <Icon className="size-6 text-primary" aria-hidden />
                            </div>
                            <h3 className="text-h3 text-ink">
                                <span className="sr-only">{t("ui.about.how.step", { n: i + 1 })} </span>
                                {t(`ui.about.how.steps.${key}.title`)}
                            </h3>
                            <p className="text-body text-muted">{t(`ui.about.how.steps.${key}.text`)}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            {/* The whole team. Home links here (#team). */}
            <Section tone="sunk" labelledBy="team-title" id="team">
                <SectionHead id="team-title" title={t("ui.team.title")} lead={t("ui.team.lead")} />
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                    {TEAM.map(({ key, photo }) => (
                        <li key={key}>
                            <div className="aspect-square overflow-hidden rounded-card bg-bg">
                                <Picture src={photo} alt={t(`team.members.${key}.name`)} sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw" className="h-full w-full object-cover object-top" />
                            </div>
                            <p className="mt-3 font-semibold text-ink">{t(`team.members.${key}.name`)}</p>
                            <p className="text-small text-muted">{t(`team.members.${key}.position`)}</p>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section labelledBy="about-partners" id="partners">
                <SectionHead id="about-partners" title={t("ui.partners.title")} lead={t("ui.partners.lead")} />
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {PARTNERS.map(({ logo, url, name }) => (
                        <li key={logo}>
                            {/* Logos come in white and in colour: the navy tile keeps both readable. */}
                            <ExternalLink href={url} className="logo-tile flex h-28 items-center justify-center rounded-card p-5 transition-opacity hover:opacity-85">
                                <Picture src={logo} alt={name} sizes="200px" className="max-h-16 w-auto object-contain" />
                            </ExternalLink>
                        </li>
                    ))}
                </ul>
                <p className="mt-8 text-body text-muted">
                    {t("ui.about.partnerNote")}{" "}
                    <L to="/volunteer#companies" className={linkButton.text}>{t("ui.about.partnerLink")}</L>
                </p>
            </Section>

            {/* Legal details and the one Donate action. */}
            <Section tone="sunk" labelledBy="legal">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-card border border-line bg-surface p-6 shadow-card md:p-8">
                        <Landmark className="size-8 text-primary" aria-hidden />
                        <h2 id="legal" className="mt-3 text-h2 text-ink">{t("ui.about.legal.title")}</h2>
                        <p className="mt-3 text-body text-muted">{t("ui.about.legal.text")}</p>
                        <dl className="mt-6 divide-y divide-line border-y border-line">
                            <div className="py-3">
                                <dt className="text-caption text-muted">{t("ui.about.legal.name")}</dt>
                                <dd className="text-body text-ink">{t("ui.footer.legal")}</dd>
                            </div>
                            <div className="py-3">
                                <dt className="text-caption text-muted">{t("ui.footer.code")}</dt>
                                <dd className="select-all font-mono text-body text-ink tabular">{EDRPOU}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-card md:p-8">
                        <HandHeart className="size-8 text-primary" aria-hidden />
                        <h2 className="text-h2 text-ink">{t("ui.donateTeaser.title")}</h2>
                        <p className="text-body text-muted">{t("ui.donateTeaser.text")}</p>
                        <div className="mt-2 flex flex-wrap gap-3">
                            <L to="/donate" className={linkButton.donate}>{t("ui.donateTeaser.cta")}</L>
                            <L to="/campaigns" className={linkButton.outline}>{t("ui.hero.projects")}</L>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default AboutPage;
