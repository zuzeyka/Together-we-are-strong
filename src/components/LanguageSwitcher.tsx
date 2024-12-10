import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="absolute top-4 right-4">
            <Button
                onClick={() => changeLanguage("en")}
                className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
            >
                EN
            </Button>
            <Button
                onClick={() => changeLanguage("uk")}
                className="px-3 py-1 bg-blue-600 text-white rounded"
            >
                УК
            </Button>
        </div>
    );
};

export default LanguageSwitcher;
