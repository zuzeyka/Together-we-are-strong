import React from "react";
import { useTranslation } from "react-i18next";
import CampaignCard from "./CampaignCard";

const Campaigns: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="campaigns" className="bg-background py-12 text-typography">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">
                    {t("campaigns.title")}
                </h2>
                <p className="text-center text-lg mb-8">
                    {t("campaigns.description")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CampaignCard
                        title={t("campaigns.campaign1.title")}
                        description={t("campaigns.campaign1.description")}
                        image="/src/assets/DSC_4478.jpg"
                    />
                    <CampaignCard
                        title={t("campaigns.campaign2.title")}
                        description={t("campaigns.campaign2.description")}
                        image="/src/assets/DSC_4478.jpg"
                    />
                    <CampaignCard
                        title={t("campaigns.campaign3.title")}
                        description={t("campaigns.campaign3.description")}
                        image="/src/assets/DSC_4478.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Campaigns;
