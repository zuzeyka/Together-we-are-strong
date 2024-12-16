import React, { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY || currentScrollY <= 0) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <nav
            className={`${lastScrollY > 100 ? "bg-white/1 backdrop-blur-md" : "bg-transparent"} text-secondary-light px-4 py-3 w-full flex fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                showHeader ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <a href="/" className="hover:opacity-50">
                <img src="/src/assets/logo.svg" alt="Logo" className="logo" />
            </a>
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex space-x-4 text-3xl">
                    <li>
                        <a href="#team" className="hover:opacity-50">
                            {t("header.nav.team")}
                        </a>
                    </li>
                    <li>
                        <a href="#campaigns" className="hover:opacity-50">
                            {t("header.nav.campaigns")}
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:opacity-50">
                            {t("header.nav.about")}
                        </a>
                    </li>
                    <li>
                        <a href="#contacts" className="hover:opacity-50">
                            {t("header.nav.contacts")}
                        </a>
                    </li>
                    <li>
                        <a href="#donate" className="hover:opacity-50">
                            {t("header.nav.donate")}
                        </a>
                    </li>
                </ul>
            </div>
            <LanguageSwitcher />
        </nav>
    );
};

export default Navbar;
