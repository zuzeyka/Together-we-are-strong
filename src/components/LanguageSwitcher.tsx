import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="lg:mr-4 lg:mt-0 my-auto lg:my-0">
            <div className="lg:flex lg:flex-col justify-center h-full w-full items-center">
                <Button
                    onClick={() => changeLanguage("en")}
                    className={`${i18n.language === "en" ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark"} px-3 py-1 text-typography rounded text-sm sm:text-base lg:h-full lg:w-full lg:mb-2 mr-2 lg:mr-0`}
                >
                    EN
                </Button>
                <Button
                    onClick={() => changeLanguage("uk")}
                    className={`${i18n.language === "uk" ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark"} px-3 py-1 text-typography rounded text-sm sm:text-base lg:h-full lg:w-full`}
                >
                    УК
                </Button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
