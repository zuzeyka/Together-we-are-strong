import { t } from "i18next";
import React from "react";

interface CampaignCardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = (props) => {
    return (
        <div className="relative group rounded-2xl bg-background text-white font-poppins shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Image Section */}
            <div className="overflow-hidden rounded-t-2xl">
                <img
                    src={props.image}
                    alt={props.title}
                    className="h-72 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-primary-light group-hover:text-secondary-light">
                    {props.title}
                </h3>
            </div>

            {/* Footer with Hover Effects */}
            <div className="absolute flex flex-col items-center inset-0 bg-black bg-opacity-70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-sm my-2 text-typography">
                    {props.description}
                </p>
                <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-secondary text-black rounded-full hover:bg-secondary-dark transition-all"
                >
                    {t("campaigns.button-more")}
                </a>
            </div>
        </div>
    );
};

export default CampaignCard;
