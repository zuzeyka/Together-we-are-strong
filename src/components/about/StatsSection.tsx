import React from "react";
import { useTranslation } from "react-i18next";

const StatsSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-background py-12">
            <div className="max-w-6xl mx-auto text-center text-typography font-poppins">
                <h2 className="text-4xl font-bold sm:text-8xl font-montserrat">
                    {t("stats.title")}
                </h2>
                <p className="mt-4 text-2xl font-montserrat">
                    {t("stats.subtitle")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {/* Stat 1 */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-extrabold font-montserrat">
                            {t("stats.stat1.value")}
                        </h3>
                        <p className="mt-2 text-typography-secondary text-center">
                            {t("stats.stat1.description")}
                        </p>
                    </div>
                    {/* Stat 2 */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-extrabold font-montserrat">
                            {t("stats.stat2.value")}
                        </h3>
                        <p className="mt-2 text-typography-secondary text-center">
                            {t("stats.stat2.description")}
                        </p>
                    </div>
                    {/* Stat 3 */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-extrabold font-montserrat">
                            {t("stats.stat3.value")}
                        </h3>
                        <p className="mt-2 text-typography-secondary text-center">
                            {t("stats.stat3.description")}
                        </p>
                    </div>
                    {/* Stat 4 */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-extrabold font-montserrat">
                            {t("stats.stat4.value")}
                        </h3>
                        <p className="mt-2 text-typography-secondary text-center">
                            {t("stats.stat4.description")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
