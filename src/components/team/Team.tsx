import React from "react";
import TeamCard from "./TeamCard";
import { useTranslation } from "react-i18next";

const Team: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="team" className="bg-background py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-typography">
                    {t("team.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TeamCard
                        name={t("team.members.karina.name")}
                        position={t("team.members.karina.position")}
                        image="/src/assets/DSC_4478.jpg"
                    />
                    <TeamCard
                        name={t("team.members.dmitry.name")}
                        position={t("team.members.dmitry.position")}
                        image="/src/assets/DSC_4443.jpg"
                    />
                    <TeamCard
                        name={t("team.members.svitlanaL.name")}
                        position={t("team.members.svitlanaL.position")}
                        image="/src/assets/DSC_4471.jpg"
                    />
                    <TeamCard
                        name={t("team.members.artur.name")}
                        position={t("team.members.artur.position")}
                        image="/src/assets/DSC_4457.jpg"
                    />
                    <TeamCard
                        name={t("team.members.andrii.name")}
                        position={t("team.members.andrii.position")}
                        image="/src/assets/DSC_4463.jpg"
                    />
                    <TeamCard
                        name={t("team.members.svitlanaK.name")}
                        position={t("team.members.svitlanaK.position")}
                        image="/src/assets/DSC_4427.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
