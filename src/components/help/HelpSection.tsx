import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useInView from "@/components/team/useInView";

const HelpSection: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.1);

    return (
        <section
            id="help"
            ref={ref}
            className={`bg-secondary text-center py-16 ${
                isInView ? "animate-fade-in" : "opacity-0"
            }`}
        >
            <h2
                className={`lg:text-7xl text-5xl font-bold mb-4 font-montserrat text-typography-dark ${
                    isInView ? "animate-slide-in-from-top" : "opacity-0"
                }`}
            >
                {t("helpSection.title")}
            </h2>
            <p
                className={`lg:text-2xl text-xl mb-6 font-poppins text-typography-dark ${
                    isInView ? "animate-slide-in-from-bottom" : "opacity-0"
                }`}
            >
                {t("helpSection.description")}
            </p>
            <div className="space-x-4">
                <Button
                    className={`bg-[#0E1B2C] text-white px-6 py-2 rounded-control min-h-12 hover:bg-[#084A82] ${isInView ? "animate-slide-in-from-left" : "opacity-0"}`}
                >
                    {t("helpSection.helpButton")}
                </Button>
                <Button
                    className={`bg-transparent text-typography-dark px-6 py-2 rounded-control min-h-12 border-2 border-[#0E1B2C] hover:bg-[#0E1B2C]/10 ${isInView ? "animate-slide-in-from-right" : "opacity-0"}`}
                >
                    {t("helpSection.volunteerButton")}
                </Button>
            </div>
        </section>
    );
};

export default HelpSection;
