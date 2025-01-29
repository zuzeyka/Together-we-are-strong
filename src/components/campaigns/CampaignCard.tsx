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
        <div className="relative backshadow my-12 group rounded-2xl bg-background text-white font-poppins shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden rounded-t-2xl">
                <img
                    src={props.image}
                    alt={props.title}
                    className="h-72 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="lg:p-4 h-36 flex flex-col justify-center">
                <h3 className="lg:text-lg text-sm font-bold text-primary-light group-hover:text-secondary-light">
                    {props.title}
                </h3>
            </div>

            <div className="absolute flex flex-col items-center inset-0 bg-black bg-opacity-70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="lg:text-sm text-xs break-words my-2 text-typography px-4">
                    {props.description}
                </p>
                <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:px-6 px-1 lg:py-3 py-1 lg:text-sm text-xs bg-secondary text-black rounded-full hover:bg-secondary-dark transition-all"
                >
                    {t("campaigns.button-more")}
                </a>
            </div>
        </div>
    );
};

export default CampaignCard;
