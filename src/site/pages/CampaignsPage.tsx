import React from "react";
import { useTranslation } from "react-i18next";
import CampaignCard from "@/site/CampaignCard";
import { CAMPAIGNS } from "@/content/campaigns";
import { Section, SectionHead, usePageMeta } from "@/site/ui";

const CampaignsPage: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta(t("ui.projects.title"));
    return (
        <Section labelledBy="all-projects">
            <SectionHead level={1} id="all-projects" title={t("ui.projects.title")} lead={`${t("ui.projects.lead")} ${t("ui.projects.count", { count: CAMPAIGNS.length })}`} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CAMPAIGNS.map((c, i) => <CampaignCard key={c.id} {...c} priority={i === 0} heading="h2" />)}
            </div>
        </Section>
    );
};

export default CampaignsPage;
