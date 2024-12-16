import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="about"
            className="bg-background font-poppins text-typography py-12"
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">{t("about.title")}</h2>
                <p className="text-lg mb-8">{t("about.description")}</p>
                <ul className="text-left max-w-2xl mx-auto list-disc list-inside mb-8">
                    <li>{t("about.education")}</li>
                    <li>{t("about.healthcare")}</li>
                    <li>{t("about.youth")}</li>
                    <li>{t("about.humanitarian")}</li>
                </ul>
                <p className="text-lg">{t("about.footer")}</p>
            </div>
        </section>
    );
};

export default About;
