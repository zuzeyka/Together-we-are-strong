import React, { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY || currentScrollY <= 0) {
            setShowHeader(true);
            setIsMenuOpen(false);
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

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav
            className={`${lastScrollY > 100 ? "bg-white/10 backdrop-blur-md" : "bg-transparent"} text-secondary-light justify-between px-4 py-3 w-screen flex fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                showHeader ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <a href="/" className="hover:opacity-50 flex-shrink-0">
                <img src="/logo.svg" alt="Logo" className="logo lg:h-28 h-16" />
            </a>

            <div
                className={`absolute top-20 left-0 right-0 bg-black/90 lg:bg-transparent lg:static lg:flex lg:items-center lg:space-x-6 transition-all duration-300 ${
                    isMenuOpen && showHeader ? "max-h-screen" : "max-h-0"
                } lg:max-h-full overflow-hidden`}
            >
                <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-lg lg:text-3xl p-4 lg:p-0">
                    <li>
                        <a href="#team" className="hover:opacity-80">
                            {t("header.nav.team")}
                        </a>
                    </li>
                    <li>
                        <a href="#campaigns" className="hover:opacity-80">
                            {t("header.nav.campaigns")}
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:opacity-80">
                            {t("header.nav.about")}
                        </a>
                    </li>
                    <li>
                        <a href="#help" className="hover:opacity-80">
                            {t("header.nav.help")}
                        </a>
                    </li>
                    <li>
                        <a href="#donate" className="hover:opacity-80">
                            {t("header.nav.donate")}
                        </a>
                    </li>
                </ul>
            </div>

            <LanguageSwitcher />
            <button
                className="lg:hidden text-secondary-light focus:outline-none"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </nav>
    );
};

export default Navbar;
