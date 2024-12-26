import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const Donate: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="donate"
            className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white p-10 overflow-hidden font-poppins"
        >
            {/* Decorative Elements */}
            <div className="absolute top-10 left-1/5 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 z-0"></div>
            <div className="absolute bottom-0 right-1/2 w-80 h-80 bg-primary rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute top-10 left-1/2 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20 z-0"></div>

            <div className="flex flex-col md:flex-row justify-between">
                <div className="text-left flex flex-col">
                    <div className="flex items-center">
                        <p className="font-bold text-xl font-monserrat">
                            {t("donate.name")}
                        </p>
                        <a href="/" className="hover:opacity-50">
                            <img
                                src="/src/assets/logo.svg"
                                alt="Logo"
                                className="logo"
                            />
                        </a>
                    </div>

                    <p className="text-sm">{t("donate.adress")}</p>
                    <a
                        href="https://www.instagram.com/twmp.foundation/"
                        className="hover:opacity-50 z-10"
                    >
                        Instagram
                    </a>
                </div>
                <div className="flex flex-col">
                    <Button className="mt-6 z-10 px-8 py-3 bg-primary text-typography font-semibold rounded-2xl hover:bg-primary-dark">
                        <a href="https://www.paypal.com/donate/?hosted_button_id=9ZT8X3E3V7D4S">
                            Pay Pal
                        </a>
                    </Button>
                    <Button className="mt-6 z-10 px-8 py-3 bg-secondary text-typography-dark font-semibold rounded-2xl hover:bg-secondary-dark">
                        <a href="https://mobile-app.pumb.ua/u9h1mKxptXEDDRRa7">
                            {t("donate.detailsButton")}
                        </a>
                    </Button>
                    <Button className="mt-6 z-10 px-8 py-3 bg-transparent text-typography box-border border-2 border-secondary font-semibold rounded-2xl hover:bg-secondary-dark">
                        {t("donate.donateButton")}
                    </Button>
                </div>
                <div className="text-left">
                    <p className="font-bold text-2xl font-monserrat">
                        {t("donate.name")}
                    </p>
                    <p>{t("donate.edrpou")}</p>
                    <p>{t("donate.recipient")}</p>
                    <p>
                        {t("donate.currency")}
                        EUR
                    </p>
                    <p>
                        {t("donate.ibanNumber")} UA873003350000000026004784159
                    </p>
                    <p>
                        {t("donate.currency")}
                        USD
                    </p>
                    <p>
                        {t("donate.ibanNumber")} UA313052990000026008016812384
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Donate;
