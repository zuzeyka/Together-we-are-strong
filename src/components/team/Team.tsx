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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <TeamCard
                        name={t("team.members.karina.name")}
                        position={t("team.members.karina.position")}
                        image="/IMG_3276.jpg"
                        description={t("team.members.karina.description")}
                    />
                    <TeamCard
                        name={t("team.members.dmitry.name")}
                        position={t("team.members.dmitry.position")}
                        image="/IMG_3384.jpg"
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
                    <TeamCard
                        name={t("team.members.alexandra.name")}
                        position={t("team.members.alexandra.position")}
                        image="/5Z7A1014.jpg"
                        description={t("team.members.alexandra.description")}
                    />
                    <TeamCard
                        name={t("team.members.lubov.name")}
                        position={t("team.members.lubov.position")}
                        image="/DSC_3033.jpg"
                        description={t("team.members.lubov.description")}
                    />
                    <TeamCard
                        name={t("team.members.volodimyr.name")}
                        position={t("team.members.volodimyr.position")}
                        image="/DSC_4400.jpg"
                        description={t("team.members.volodimyr.description")}
                    />
                    <TeamCard
                        name={t("team.members.danil.name")}
                        position={t("team.members.danil.position")}
                        image="/DSC_2244.jpg"
                        description={t("team.members.danil.description")}
                    />
                    <TeamCard
                        name={t("team.members.andrey.name")}
                        position={t("team.members.andrey.position")}
                        image="/DSC_4463.jpg"
                        description={t("team.members.andrey.description")}
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
