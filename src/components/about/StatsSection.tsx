import React from "react";
import { useTranslation } from "react-i18next";
import useInView from "@/components/team/useInView";

const StatsSection: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    return (
        <section className="bg-background py-12 animate-fade-in">
            <div
                ref={ref}
                className="max-w-6xl lg:px-0 px-4 mx-auto text-center text-typography font-poppins"
            >
                <h2
                    className={`text-4xl font-bold sm:text-8xl font-montserrat ${isInView ? "animate-slide-in-from-top" : "opacity-0"}`}
                >
                    {t("stats.title")}
                </h2>
                <p
                    className={`mt-4 text-2xl font-montserrat ${isInView ? "animate-slide-in-from-bottom" : "opacity-0"}`}
                >
                    {t("stats.subtitle")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center hover:scale-105 backshadow ${
                                isInView
                                    ? index === 0 ||
                                      index === 1 ||
                                      index === 4 ||
                                      index === 5
                                        ? "animate-slide-in-from-left"
                                        : "animate-slide-in-from-right"
                                    : "opacity-0"
                            }`}
                        >
                            <h3 className="text-4xl font-extrabold font-montserrat">
                                {t(`stats.stat${index + 1}.value`)}
                            </h3>
                            <p className="mt-2 text-typography-secondary text-center">
                                {t(`stats.stat${index + 1}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
