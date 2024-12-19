import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="about"
            className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 overflow-hidden"
        >
            {/* Decorative Circle */}
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-5xl lg:text-6xl font-extrabold text-center mb-12 leading-tight">
                    {t("about.title")}
                </h2>
                <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
                    {t("about.description")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full">
                            <span className="text-2xl font-bold">1</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.education")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full">
                            <span className="text-2xl font-bold">2</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.healthcare")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full">
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.youth")}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full">
                            <span className="text-2xl font-bold">4</span>
                        </div>
                        <p className="text-lg text-gray-300">
                            {t("about.humanitarian")}
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
