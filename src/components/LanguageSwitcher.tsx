import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex flex-col justify-evenly">
            <Button
                onClick={() => changeLanguage("en")}
                className={`${i18n.language === "en" ? "bg-primary" : "bg-secondary"} px-3 py-1 text-white rounded mr-2`}
            >
                EN
            </Button>
            <Button
                onClick={() => changeLanguage("uk")}
                className={`${i18n.language === "uk" ? "bg-primary" : "bg-secondary"} px-3 py-1 text-white rounded mr-2`}
            >
                УК
            </Button>
        </div>
    );
};

export default LanguageSwitcher;
