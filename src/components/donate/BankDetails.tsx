import React from "react";
import { useTranslation } from "react-i18next";

const BankDetails: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-10 rounded-lg shadow-lg w-full text-4xl flex flex-col items-center space-y-8">
            <h2 className="text-8xl sm:text-12xl font-extrabold mb-6 text-center tracking-wide animate-fade-in-down">
                {t("donate.donateTitle")}
            </h2>
            <div className="text-left space-y-6 animate-fade-in-up">
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.bankName")}
                    </h3>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.recipient")}
                    </p>
                </div>
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.name")}
                    </h3>
                    <p className="text-base sm:text-lg animate-slide-in-from-right">
                        {t("donate.edrpou")}
                    </p>
                </div>
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.currency")} USD
                    </h3>
                    <p className="font-mono text-base sm:text-lg break-all animate-slide-in-from-right">
                        {t("donate.ibanNumber")}: UA313052990000026008016812384
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-xl sm:text-2xl animate-slide-in-from-left">
                        {t("donate.currency")} EUR
                    </h3>
                    <p className="font-mono text-base sm:text-lg break-all animate-slide-in-from-right">
                        {t("donate.ibanNumber")}: UA87 3003 3500 0000 0026 0047
                        8415 9
                    </p>
                </div>
            </div>
            <img
                src="/instagram.jpg"
                alt="QR Code"
                className="mt-10 h-auto animate-zoom-in"
            />
        </div>
    );
};

export default BankDetails;
