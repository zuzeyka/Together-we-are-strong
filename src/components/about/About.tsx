import React from "react";
import { useTranslation } from "react-i18next";
import useInView from "@/components/team/useInView";

const About: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    return (
        <section
            id="about"
            ref={ref}
            className={`relative text-white py-20 overflow-hidden ${
                isInView ? "animate-fade-in" : "opacity-0"
            }`}
        >
            <div className="container mx-auto px-6 lg:px-20">
                <h2
                    className={`text-5xl lg:text-6xl font-extrabold text-center mb-12 leading-tight ${
                        isInView ? "animate-slide-in-from-top" : "opacity-0"
                    }`}
                >
                    {t("about.title")}
                </h2>
                <p
                    className={`text-xl text-typography-primary text-center max-w-3xl mx-auto mb-12 ${
                        isInView ? "animate-slide-in-from-bottom" : "opacity-0"
                    }`}
                >
                    {t("about.description")}
                </p>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto ${
                        isInView ? "animate-fade-in" : "opacity-0"
                    }`}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-6 ${
                                isInView
                                    ? index === 0 || index === 2
                                        ? "animate-slide-in-from-left"
                                        : "animate-slide-in-from-right"
                                    : "opacity-0"
                            }`}
                        >
                            <div className="w-16 flex items-center justify-center bg-secondary rounded-full">
                                <span className="text-2xl font-bold">
                                    {index + 1}
                                </span>
                            </div>
                            <p className="text-lg text-typography-secondary">
                                {t(
                                    `about.${["support", "projects", "partnerships", "vision"][index]}`
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <p
                    className={`text-xl text-typography-primary text-center mt-12 max-w-3xl mx-auto ${
                        isInView ? "animate-slide-in-from-bottom" : "opacity-0"
                    }`}
                >
                    {t("about.footer")}
                </p>
            </div>
        </section>
    );
};

export default About;
