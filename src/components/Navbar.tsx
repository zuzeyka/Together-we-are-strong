import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className="bg-transparent text-white px-4 py-3 flex absolute top-0 left-0 right-0 z-50">
            <a href="/" className="hover:opacity-50">
                <img src="/src/assets/logo.svg" alt="Logo" className="logo" />
            </a>
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex space-x-4 text-3xl">
                    <li>
                        <a href="#campaings" className="hover:opacity-50">
                            {t("header.nav.campaings")}
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:opacity-50">
                            {t("header.nav.about")}
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:opacity-50">
                            {t("header.nav.contact")}
                        </a>
                    </li>
                    <li>
                        <a href="#donate" className="hover:opacity-50">
                            {t("header.nav.donate")}
                        </a>
                    </li>
                </ul>
                <LanguageSwitcher />
            </div>
        </nav>
    );
};

export default Navbar;
