import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const HelpSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="help" className="bg-secondary text-center py-16">
            <h2 className="text-7xl font-bold mb-4 font-montserrat text-typography-dark">
                {t("helpSection.title")}
            </h2>
            <p className="text-2xl mb-6 font-poppins text-typography">
                {t("helpSection.description")}
            </p>
            <div className="space-x-4">
                <Button className="bg-typography-dark text-white px-6 py-2 rounded hover:bg-primary">
                    {t("helpSection.helpButton")}
                </Button>
                <Button className="bg-typography text-typography-dark px-6 py-2 rounded border border-black hover:bg-typography-secondary">
                    {t("helpSection.volunteerButton")}
                </Button>
            </div>
        </section>
    );
};

export default HelpSection;
