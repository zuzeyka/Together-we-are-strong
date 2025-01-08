import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { useTranslation } from "react-i18next";
import useInView from "@/components/team/useInView";

const Team: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    return (
        <section id="team" className="bg-background py-16">
            <div
                ref={ref}
                className={`container mx-auto text-center ${
                    isInView ? "animate-fade-in-up" : "opacity-0"
                }`}
            >
                <h2 className="text-3xl font-bold mb-8 text-typography animate-slide-in-from-top">
                    {t("team.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TeamCard
                        name={t("team.members.karina.name")}
                        position={t("team.members.karina.position")}
                        image="/DSC_4478.jpg"
                        description={t("team.members.karina.description")}
                    />
                    <TeamCard
                        name={t("team.members.dmitry.name")}
                        position={t("team.members.dmitry.position")}
                        image="/DSC_4443.jpg"
                        description={t("team.members.dmitry.description")}
                    />
                    <TeamCard
                        name={t("team.members.artur.name")}
                        position={t("team.members.artur.position")}
                        image="/DSC_4457.jpg"
                        description={t("team.members.artur.description")}
                    />
                    <TeamCard
                        name={t("team.members.svitlana.name")}
                        position={t("team.members.svitlana.position")}
                        image="/DSC_4427.jpg"
                        description={t("team.members.svitlana.description")}
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
