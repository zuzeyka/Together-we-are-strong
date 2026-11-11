import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Baby, Dog, HandHeart, Home as HomeIcon, Stethoscope, Instagram, Shield, Users } from "lucide-react";
import Picture from "@/components/Picture";
import CampaignCard from "@/site/CampaignCard";
import { CAMPAIGNS, HERO_IMAGE, INSTAGRAM, PARTNERS, PAYPAL } from "@/content/campaigns";
import { ExternalLink, L, Section, SectionHead, linkButton, usePageMeta } from "@/site/ui";
import { cn } from "@/shared/lib/utils";

const AREAS = [
    ["displaced", HomeIcon],
    ["mothers", Baby],
    ["children", HandHeart],
    ["hospitals", Stethoscope],
    ["defenders", Shield],
    ["animals", Dog],
] as const;

const TEAM = [
    ["karina", "/IMG_3276.jpg"], ["dmitry", "/IMG_3384.jpg"], ["artur", "/DSC_4457.jpg"], ["svitlana", "/DSC_4427.jpg"],
    ["alexandra", "/5Z7A1014.jpg"], ["lubov", "/IMG_5933.jpg"], ["volodimyr", "/DSC_4400.jpg"], ["danil", "/DSC_2244.jpg"],
    ["andrey", "/DSC_4463.jpg"], ["alevtyna", "/IMG_5901.jpg"], ["olha", "/IMG_5897.jpg"], ["ivan", "/IMG_5899.jpg"],
] as const;

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta();

    return (
        <>
            {/* Hero: words first on phones, the photo beside them on wide screens. */}
            <section className="bg-bg">
                <div className="mx-auto grid max-w-container items-center gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-2">
                    <div className="animate-rise">
                        <p className="text-small font-semibold uppercase tracking-wide text-primary">{t("ui.hero.eyebrow")}</p>
                        <h1 className="mt-3 text-display text-ink">{t("ui.hero.title")}</h1>
                        <p className="mt-5 max-w-prose text-body text-muted md:text-[1.1875rem]">{t("ui.hero.lead")}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <L to="/donate" className={linkButton.donate}>{t("ui.hero.donate")}</L>
                            <L to="/campaigns" className={linkButton.outline}>{t("ui.hero.projects")}</L>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-card shadow-card">
                        <Picture
                            src={HERO_IMAGE}
                            alt={t("ui.hero.photo")}
                            sizes="(min-width: 1024px) 580px, 100vw"
                            priority
                            className="aspect-[4/3] h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Impact numbers: each says what it counts. */}
            <Section tone="tint" labelledBy="impact" id="about">
                <SectionHead id="impact" title={t("ui.impact.title")} lead={t("ui.impact.note")} />
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

            <Section labelledBy="areas">
                <SectionHead id="areas" title={t("ui.areas.title")} />
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {AREAS.map(([key, Icon]) => {
                        const [title, text] = t(`ui.areas.items.${key}`, { returnObjects: true }) as string[];
                        return (
                            <li key={key} className="flex gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
                                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
                                    <Icon className="size-6" aria-hidden />
                                </span>
                                <div>
                                    <h3 className="text-h3 text-ink">{title}</h3>
                                    <p className="mt-1 text-small text-muted">{text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </Section>

            <Section tone="sunk" labelledBy="projects">
                <SectionHead
                    id="projects"
                    title={t("ui.projects.title")}
                    lead={t("ui.projects.lead")}
                    action={<L to="/campaigns" className={linkButton.text}>{t("ui.projects.all")} <ArrowRight className="size-4" aria-hidden /></L>}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {CAMPAIGNS.slice(0, 6).map((c) => <CampaignCard key={c.id} {...c} />)}
                </div>
            </Section>

            <Section labelledBy="give">
                <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-surface p-8 shadow-card md:flex-row md:items-center md:justify-between md:p-10">
                    <div className="max-w-prose">
                        <h2 id="give" className="text-h2 text-ink">{t("ui.donateTeaser.title")}</h2>
                        <p className="mt-3 text-body text-muted">{t("ui.donateTeaser.text")}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <L to="/donate" className={linkButton.donate}>{t("ui.donateTeaser.cta")}</L>
                        <ExternalLink href={PAYPAL} className={linkButton.outline}>{t("ui.donateTeaser.paypal")}</ExternalLink>
                    </div>
                </div>
            </Section>

            <Section tone="sunk" labelledBy="partners">
                <SectionHead id="partners" title={t("ui.partners.title")} lead={t("ui.partners.lead")} />
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
            </Section>

            <Section labelledBy="team">
                <SectionHead id="team" title={t("ui.team.title")} lead={t("ui.team.lead")} />
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                    {TEAM.map(([key, photo]) => (
                        <li key={key}>
                            <div className="aspect-square overflow-hidden rounded-card bg-sunk">
                                <Picture src={photo} alt={t(`team.members.${key}.name`)} sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw" className="h-full w-full object-cover object-top" />
                            </div>
                            <p className="mt-3 font-semibold text-ink">{t(`team.members.${key}.name`)}</p>
                            <p className="text-small text-muted">{t(`team.members.${key}.position`)}</p>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section tone="tint" labelledBy="help-title" id="help">
                <SectionHead id="help-title" title={t("ui.help.title")} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                        [Users, "need"],
                        [HandHeart, "vol"],
                    ].map(([Icon, key]) => {
                        const I = Icon as typeof Users;
                        return (
                            <div key={key as string} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card">
                                <I className="size-8 text-primary" aria-hidden />
                                <h3 className="text-h3 text-ink">{t(`ui.help.${key}Title`)}</h3>
                                <p className="text-body text-muted">{t(`ui.help.${key}Text`)}</p>
                                <ExternalLink href={INSTAGRAM} className={cn(linkButton.primary, "mt-2 self-start")}>
                                    <Instagram className="size-5" aria-hidden /> {t("ui.help.cta")}
                                </ExternalLink>
                            </div>
                        );
                    })}
                </div>
            </Section>
        </>
    );
};

export default HomePage;
