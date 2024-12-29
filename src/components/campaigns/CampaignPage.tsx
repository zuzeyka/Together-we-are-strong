import React from "react";
import { useParams } from "react-router-dom";

const CampaignPage: React.FC = () => {
    const { campaignId } = useParams();
    return (
        <div>
            <h1>Campaign Page</h1>
            <p>Showing details for campaign ID: {campaignId}</p>
        </div>
    );
};

export default CampaignPage;
