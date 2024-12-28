import React from "react";
import { useTranslation } from "react-i18next";
import CampaignCard from "./CampaignCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

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
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="basis-1/3">
                            <CampaignCard
                                title={t("campaigns.campaign1.title")}
                                description={t(
                                    "campaigns.campaign1.description"
                                )}
                                image="/src/assets/5Z7A0926.jpg"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <CampaignCard
                                title={t("campaigns.campaign2.title")}
                                description={t(
                                    "campaigns.campaign2.description"
                                )}
                                image="/src/assets/DSC_3580.jpg"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <CampaignCard
                                title={t("campaigns.campaign3.title")}
                                description={t(
                                    "campaigns.campaign3.description"
                                )}
                                image="/src/assets/DSC_5997.jpg"
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="bg-typography-dark" />
                    <CarouselNext className="bg-typography-dark" />
                </Carousel>
            </div>
        </section>
    );
};

export default Campaigns;
