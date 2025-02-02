import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import useInView from "@/components/team/useInView";

const projects: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    return (
        <section id="projects" className="bg-background py-12 text-typography">
            <div
                ref={ref}
                className={`container mx-auto px-4 ${
                    isInView ? "animate-zoom-in" : "opacity-0"
                }`}
            >
                <h2 className="text-3xl font-bold text-center mb-6 animate-slide-in-from-top">
                    {t("projects.title")}
                </h2>
                <p className="text-center text-lg mb-8 animate-fade-in-up">
                    {t("projects.description")}
                </p>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.LargeRelocationAid.title")}
                                description={t(
                                    "projects.LargeRelocationAid.description"
                                )}
                                image="/DSC_3580.jpg"
                                link="/LargeRelocationAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.RelocationAid.title")}
                                description={t(
                                    "projects.RelocationAid.description"
                                )}
                                image="/DSC_3581.jpg"
                                link="/RelocationAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.MaternityAid.title")}
                                description={t(
                                    "projects.MaternityAid.description"
                                )}
                                image="/DSC_3582.jpg"
                                link="/MaternityAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.GastroFamilyAid.title")}
                                description={t(
                                    "projects.GastroFamilyAid.description"
                                )}
                                image="/DSC_5998.jpg"
                                link="/GastroFamilyAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.MedicalAid.title")}
                                description={t(
                                    "projects.MedicalAid.description"
                                )}
                                image="/DSC_5999.jpg"
                                link="/MedicalAid"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.MilitarySupport.title")}
                                description={t(
                                    "projects.MilitarySupport.description"
                                )}
                                image="/DSC_5996.jpg"
                                link="/MilitarySupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.AnimalShelterSupport.title")}
                                description={t(
                                    "projects.AnimalShelterSupport.description"
                                )}
                                image="/DSC_5995.jpg"
                                link="/AnimalShelterSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.SupportForChildren.title")}
                                description={t(
                                    "projects.SupportForChildren.description"
                                )}
                                image="/DSC_5994.jpg"
                                link="/SupportForChildren"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.GiftCampaign.title")}
                                description={t(
                                    "projects.GiftCampaign.description"
                                )}
                                image="/DSC_5993.jpg"
                                link="/GiftCampaign"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.InternatSupport.title")}
                                description={t(
                                    "projects.InternatSupport.description"
                                )}
                                image="/DSC_5992.jpg"
                                link="/InternatSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.CharityBrunch.title")}
                                description={t(
                                    "projects.CharityBrunch.description"
                                )}
                                image="/DSC_5991.jpg"
                                link="/CharityBrunch"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.HospitalSupport.title")}
                                description={t(
                                    "projects.HospitalSupport.description"
                                )}
                                image="/DSC_5990.jpg"
                                link="/HospitalSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.AnimalSupport.title")}
                                description={t(
                                    "projects.AnimalSupport.description"
                                )}
                                image="/DSC_5989.jpg"
                                link="/AnimalSupport"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.Grooming.title")}
                                description={t("projects.Grooming.description")}
                                image="/5Z7A0926.jpg"
                                link="/Grooming"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.MutualAidProject.title")}
                                description={t(
                                    "projects.MutualAidProject.description"
                                )}
                                image="/DSC_5988.jpg"
                                link="/MutualAidProject"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.STELP.title")}
                                description={t("projects.STELP.description")}
                                image="/DSC_5997.jpg"
                                link="/STELP"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.ALLSTARSIT.title")}
                                description={t(
                                    "projects.ALLSTARSIT.description"
                                )}
                                image="/DSC_9523.jpg"
                                link="/ALLSTARSIT"
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 animate-zoom-in">
                            <ProjectCard
                                title={t("projects.WCKitchen.title")}
                                description={t(
                                    "projects.WCKitchen.description"
                                )}
                                image="/DSC_9524.jpg"
                                link="/WCKitchen"
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="bg-typography-dark left-0" />
                    <CarouselNext className="bg-typography-dark right-0" />
                </Carousel>
            </div>
        </section>
    );
};

export default projects;
