import React from "react";
import Picture from "@/components/Picture";
import { useTranslation } from "react-i18next";

const BankDetails: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-surface text-ink border border-line p-10 rounded-card shadow-card w-full text-4xl flex flex-col items-center space-y-8">
            <h2 className="lg:text-8xl text-5xl sm:text-12xl font-extrabold mb-6 text-center tracking-wide animate-fade-in-down">
                {t("donate.donateTitle")}
            </h2>
            <div className="text-left space-y-6 animate-fade-in-up">
                <div className="border-b border-line pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.name")}
                    </h3>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.edrpou")}
                    </p>
                </div>
                <div className="border-b border-line pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.uah.currency")}
                    </h3>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.uah.recipient")}
                    </p>
                    <p className="font-mono text-base sm:text-lg break-all animate-slide-in-from-right">
                        {t("donate.uah.iban")}
                    </p>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.uah.purpose")}
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.eur.currency")}
                    </h3>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.eur.recipient")}
                    </p>
                    <p className="font-mono text-base sm:text-lg break-all animate-slide-in-from-right">
                        {t("donate.eur.iban")}
                    </p>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.eur.provider")}
                    </p>
                </div>
            </div>
            <Picture
                src="/instagram.jpg"
                sizes="480px"
                alt="QR Code"
                className="mt-10 h-auto animate-zoom-in"
            />
        </div>
    );
};

export default BankDetails;
