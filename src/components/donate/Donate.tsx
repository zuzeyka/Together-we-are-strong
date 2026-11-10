import React from "react";
import Picture from "@/components/Picture";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useInView from "@/components/team/useInView";

const Donate: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.1);

    return (
        <section
            id="donate"
            ref={ref}
            className={`relative bg-sunk text-ink p-10 overflow-hidden ${
                isInView ? "animate-fade-in" : "opacity-0"
            }`}
        >
            {/* Decorative Elements */}

            <div className="flex flex-col md:flex-row justify-between">
                <div
                    className={`flex flex-col text-left ${
                        isInView ? "animate-slide-in-from-right" : "opacity-0"
                    }`}
                >
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <p className="font-bold text-xl ">
                                {t("donate.name")}
                            </p>
                            <a
                                href="/"
                                className="hover:opacity-50 h-full w-full"
                            >
                                <Picture
                                    src="/logo.svg"
                                    sizes="192px"
                                    alt="Logo"
                                    className="w-40 h-auto"
                                />
                            </a>
                        </div>

                        <a
                            href="https://www.instagram.com/twmp.foundation/"
                            className="hover:opacity-50 z-10"
                        >
                            <Picture
                                src="/instagram.jpg"
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                alt="QR Code"
                                className="mt-4 h-96 w-full animate-zoom-in object-cover rounded-3xl"
                            />
                        </a>
                    </div>
                </div>
                <div
                    className={`flex flex-col lg:space-y-40 space-y-4 lg:my-0 my-4 h-full ${isInView ? "animate-slide-in-from-top" : "opacity-0"}`}
                >
                    <Button className=" lg:h-24 z-10 mt-1 px-8 py-3 bg-primary text-primary-on font-semibold rounded-control hover:bg-primary-hover">
                        <a href="https://www.paypal.com/donate/?hosted_button_id=9ZT8X3E3V7D4S">
                            Pay Pal
                        </a>
                    </Button>
                    <Button className="lg:h-24 z-10 px-8 py-3 bg-accent text-accent-on font-semibold rounded-control hover:bg-accent-hover">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/bank-details"
                        >
                            {t("donate.detailsButton")}
                        </a>
                    </Button>
                </div>
                <div
                    className={`flex flex-col justify-between text-left ${
                        isInView ? "animate-slide-in-from-left" : "opacity-0"
                    }`}
                >
                    <p className="font-bold text-2xl ">
                        {t("donate.name")}
                    </p>
                    <p>{t("donate.edrpou")}</p>
                    <p>{t("donate.uah.currency")}</p>
                    <p>{t("donate.uah.recipient")}</p>
                    <p>{t("donate.uah.iban")}</p>
                    <p>{t("donate.eur.currency")}</p>
                    <p>{t("donate.eur.recipient")}</p>
                    <p>{t("donate.eur.iban")}</p>
                </div>
            </div>
        </section>
    );
};

export default Donate;
