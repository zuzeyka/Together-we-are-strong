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
import useInView from "@/components/team/useInView";

const Campaigns: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    return (
        <section id="campaigns" className="bg-background py-12 text-typography">
            <div
                ref={ref}
                className={`container mx-auto px-4 ${
                    isInView ? "animate-zoom-in" : "opacity-0"
                }`}
            >
                <h2 className="text-3xl font-bold text-center mb-6 animate-slide-in-from-top">
                    {t("campaigns.title")}
                </h2>
                <p className="text-center text-lg mb-8 animate-fade-in-up">
                    {t("campaigns.description")}
                </p>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.Grooming.title")}
                                description={t(
                                    "campaigns.Grooming.description"
                                )}
                                image="/5Z7A0926.jpg"
                                link="/campaigns/Grooming"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.Bila_Tserkva.title")}
                                description={t(
                                    "campaigns.Bila_Tserkva.description"
                                )}
                                image="/DSC_3580.jpg"
                                link="/campaigns/Bila_Tserkva"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.STELP.title")}
                                description={t("campaigns.STELP.description")}
                                image="/DSC_5997.jpg"
                                link="/campaigns/STELP"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.ALLSTARSIT.title")}
                                description={t(
                                    "campaigns.ALLSTARSIT.description"
                                )}
                                image="/DSC_9523.jpg"
                                link="/campaigns/ALLSTARSIT"
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
