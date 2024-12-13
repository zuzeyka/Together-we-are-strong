import React from "react";
import TeamCard from "./TeamCard";

const Team: React.FC = () => {
    return (
        <section id="team" className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TeamCard
                        name="Karina Hrebenchukova-Rozumei"
                        position="Director"
                        image="/src/assets/DSC_4478.jpg"
                    />
                    <TeamCard
                        name="Dmitry Rozumei"
                        position="Campaign Manager"
                        image="/src/assets/DSC_4443.jpg"
                    />
                    <TeamCard
                        name="Svitlana Lievashova"
                        position="Volunteer"
                        image="/src/assets/DSC_4471.jpg"
                    />
                    <TeamCard
                        name="Artur Karamian"
                        position="Volunteer"
                        image="/src/assets/DSC_4457.jpg"
                    />
                    <TeamCard
                        name="Andrii Porokhnia"
                        position="Volunteer"
                        image="/src/assets/DSC_4463.jpg"
                    />
                    <TeamCard
                        name="Svitlana Karatsiuba"
                        position="Volunteer"
                        image="/src/assets/DSC_4427.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
