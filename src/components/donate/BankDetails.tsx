import React from "react";
import { useTranslation } from "react-i18next";

const BankDetails: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-10 rounded-lg shadow-lg w-full text-4xl flex flex-col items-center">
            <div></div>
            <h2 className="text-8xl sm:text-12xl font-extrabold mb-6 text-center tracking-wide">
                {t("donate.donateTitle")}
            </h2>
            <div className="text-left space-y-6">
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl">
                        {t("donate.bankName")}
                    </h3>
                    <p className="text-base sm:text-lg">
                        {t("donate.recipient")}
                    </p>
                </div>
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl">
                        {t("donate.name")}
                    </h3>
                    <p className="text-base sm:text-lg">{t("donate.edrpou")}</p>
                </div>
                <div className="border-b border-white/20 pb-4">
                    <h3 className="font-bold text-xl sm:text-2xl">
                        {t("donate.currency")} USD
                    </h3>
                    <p className="font-mono text-base sm:text-lg break-all">
                        {t("donate.ibanNumber")}: UA313052990000026008016812384
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-xl sm:text-2xl">
                        {t("donate.currency")} EUR
                    </h3>
                    <p className="font-mono text-base sm:text-lg break-all">
                        {t("donate.ibanNumber")}: UA87 3003 3500 0000 0026 0047
                        8415 9
                    </p>
                </div>
            </div>
            <img
                src="/src/assets/instagram.jpg"
                alt="QR Code"
                className="mt-10"
            />
        </div>
    );
};

export default BankDetails;
