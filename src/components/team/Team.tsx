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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TeamCard
                        name={t("team.members.karina.name")}
                        position={t("team.members.karina.position")}
                        image="/src/assets/DSC_4478.jpg"
                        description={t("team.members.karina.description")}
                    />
                    <TeamCard
                        name={t("team.members.dmitry.name")}
                        position={t("team.members.dmitry.position")}
                        image="/src/assets/DSC_4443.jpg"
                        description={t("team.members.dmitry.description")}
                    />
                    <TeamCard
                        name={t("team.members.artur.name")}
                        position={t("team.members.artur.position")}
                        image="/src/assets/DSC_4457.jpg"
                        description={t("team.members.artur.description")}
                    />
                    <TeamCard
                        name={t("team.members.svitlana.name")}
                        position={t("team.members.svitlana.position")}
                        image="/src/assets/DSC_4427.jpg"
                        description={t("team.members.svitlana.description")}
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
