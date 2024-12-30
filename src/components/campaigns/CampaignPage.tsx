import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CampaignPage.css";

const CampaignPage: React.FC = () => {
    const { campaignId } = useParams();
    const { t } = useTranslation();

    const campaignData = t(`campaigns.${campaignId}.post-text`, {
        returnObjects: true,
    }) as {
        stelp_event_title: string;
        stelp_event_description: string;
        stelp_event_highlights_title: string;
        stelp_event_highlight_1: string;
        stelp_event_highlight_2: string;
        stelp_event_highlight_3: string;
        stelp_event_highlight_4: string;
        stelp_event_effect_title: string;
        stelp_event_effect_1: string;
        stelp_event_effect_2: string;
        stelp_event_effect_3: string;
        stelp_event_thanks: string;
        stelp_event_cta: string;
    };

    return (
        <div className="campaign-page-container">
            <h1 className="campaign-title">{campaignData.stelp_event_title}</h1>
            <p className="campaign-description">
                {campaignData.stelp_event_description}
            </p>

            <h2 className="campaign-section-title">
                {campaignData.stelp_event_highlights_title}
            </h2>
            <ul className="campaign-highlights-list">
                <li>{campaignData.stelp_event_highlight_1}</li>
                <li>{campaignData.stelp_event_highlight_2}</li>
                <li>{campaignData.stelp_event_highlight_3}</li>
                <li>{campaignData.stelp_event_highlight_4}</li>
            </ul>

            <h2 className="campaign-section-title">
                {campaignData.stelp_event_effect_title}
            </h2>
            <ul className="campaign-effects-list">
                <li>{campaignData.stelp_event_effect_1}</li>
                <li>{campaignData.stelp_event_effect_2}</li>
                <li>{campaignData.stelp_event_effect_3}</li>
            </ul>

            <p className="campaign-thanks">{campaignData.stelp_event_thanks}</p>
            <p className="campaign-cta">{campaignData.stelp_event_cta}</p>
        </div>
    );
};

export default CampaignPage;
