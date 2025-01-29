import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useInView from "@/components/team/useInView";

const HelpSection: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

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
                className={`lg:text-2xl text-xl mb-6 font-poppins text-typography ${
                    isInView ? "animate-slide-in-from-bottom" : "opacity-0"
                }`}
            >
                {t("helpSection.description")}
            </p>
            <div className="space-x-4">
                <Button
                    className={`bg-typography-dark text-white py-2 rounded hover:bg-primary ${isInView ? "animate-slide-in-from-left" : "opacity-0"}`}
                >
                    {t("helpSection.helpButton")}
                </Button>
                <Button
                    className={`bg-typography text-typography-dark px-6 py-2 rounded border border-black hover:bg-typography-secondary ${isInView ? "animate-slide-in-from-right" : "opacity-0"}`}
                >
                    {t("helpSection.volunteerButton")}
                </Button>
            </div>
        </section>
    );
};

export default HelpSection;
