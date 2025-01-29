import React from "react";
import { useTranslation } from "react-i18next";
import CampaignCard from "./CampaignCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
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
                                link="/Grooming"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.LargeRelocationAid.title")}
                                description={t(
                                    "campaigns.LargeRelocationAid.description"
                                )}
                                image="/DSC_3580.jpg"
                                link="/LargeRelocationAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.RelocationAid.title")}
                                description={t(
                                    "campaigns.RelocationAid.description"
                                )}
                                image="/DSC_3581.jpg"
                                link="/RelocationAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.MaternityAid.title")}
                                description={t(
                                    "campaigns.MaternityAid.description"
                                )}
                                image="/DSC_3582.jpg"
                                link="/MaternityAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.GastroFamilyAid.title")}
                                description={t(
                                    "campaigns.GastroFamilyAid.description"
                                )}
                                image="/DSC_5998.jpg"
                                link="/GastroFamilyAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.MedicalAid.title")}
                                description={t(
                                    "campaigns.MedicalAid.description"
                                )}
                                image="/DSC_5999.jpg"
                                link="/MedicalAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.MilitarySupport.title")}
                                description={t(
                                    "campaigns.MilitarySupport.description"
                                )}
                                image="/DSC_5996.jpg"
                                link="/MilitarySupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t(
                                    "campaigns.AnimalShelterSupport.title"
                                )}
                                description={t(
                                    "campaigns.AnimalShelterSupport.description"
                                )}
                                image="/DSC_5995.jpg"
                                link="/AnimalShelterSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.SupportForChildren.title")}
                                description={t(
                                    "campaigns.SupportForChildren.description"
                                )}
                                image="/DSC_5994.jpg"
                                link="/SupportForChildren"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.GiftCampaign.title")}
                                description={t(
                                    "campaigns.GiftCampaign.description"
                                )}
                                image="/DSC_5993.jpg"
                                link="/GiftCampaign"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.InternatSupport.title")}
                                description={t(
                                    "campaigns.InternatSupport.description"
                                )}
                                image="/DSC_5992.jpg"
                                link="/InternatSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.CharityBrunch.title")}
                                description={t(
                                    "campaigns.CharityBrunch.description"
                                )}
                                image="/DSC_5991.jpg"
                                link="/CharityBrunch"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.HospitalSupport.title")}
                                description={t(
                                    "campaigns.HospitalSupport.description"
                                )}
                                image="/DSC_5990.jpg"
                                link="/HospitalSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.AnimalSupport.title")}
                                description={t(
                                    "campaigns.AnimalSupport.description"
                                )}
                                image="/DSC_5989.jpg"
                                link="/AnimalSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.MutualAidProject.title")}
                                description={t(
                                    "campaigns.MutualAidProject.description"
                                )}
                                image="/DSC_5988.jpg"
                                link="/MutualAidProject"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.STELP.title")}
                                description={t("campaigns.STELP.description")}
                                image="/DSC_5997.jpg"
                                link="/STELP"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.ALLSTARSIT.title")}
                                description={t(
                                    "campaigns.ALLSTARSIT.description"
                                )}
                                image="/DSC_9523.jpg"
                                link="/ALLSTARSIT"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <CampaignCard
                                title={t("campaigns.WCKitchen.title")}
                                description={t(
                                    "campaigns.WCKitchen.description"
                                )}
                                image="/DSC_9524.jpg"
                                link="/WCKitchen"
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Campaigns;
