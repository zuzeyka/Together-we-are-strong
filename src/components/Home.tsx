import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full h-screen font-montserrat">
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
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight max-w-4xl">
                        {t("home.title")}
                    </h1>
                    <p className="mt-4 text-xl lg:text-2xl text-gray-300 max-w-3xl">
                        {t("home.description")}
                    </p>
                    <Button className="mt-6 px-8 py-3 bg-secondary text-black font-semibold rounded-2xl hover:bg-secondary-dark">
                        {t("home.cta")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
