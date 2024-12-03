import React from "react";
import TeamCard from "./TeamCard";

const Home: React.FC = () => {
    return (
        <div className="w-full h-screen">
            <div className="relative h-screen overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="src/assets/mainVideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>

                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
                    <h1 className="text-5xl font-extrabold">
                        Together We Are Strong
                    </h1>
                    <p className="mt-4 text-xl">
                        Empowering communities to create lasting change. Join us
                        today.
                    </p>
                    <button className="mt-6 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
                        Get Involved
                    </button>
                </div>
            </div>

            <div className="bg-gray-100 py-16">
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
            </div>
        </div>
    );
};

export default Home;
