import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="about"
            className="relative text-white py-20 overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-5xl lg:text-6xl font-extrabold text-center mb-12 leading-tight">
                    {t("about.title")}
                </h2>
                <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
                    {t("about.description")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="w-16 flex items-center justify-center bg-secondary rounded-full">
                            <span className="text-2xl font-bold">1</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.support")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 flex items-center justify-center bg-secondary rounded-full">
                            <span className="text-2xl font-bold">2</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.projects")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 flex items-center justify-center bg-secondary rounded-full">
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.partnerships")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-14 flex items-center justify-center bg-secondary rounded-full">
                            <span className="text-2xl font-bold">4</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.vision")}
                        </p>
                    </div>
                </div>
                <p className="text-xl text-gray-300 text-center mt-12 max-w-3xl mx-auto">
                    {t("about.footer")}
                </p>
            </div>
        </section>
    );
};

export default About;
