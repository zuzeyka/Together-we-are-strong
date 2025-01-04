import React from "react";
import { useTranslation } from "react-i18next";

const BankDetails: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center my-10">
            <h2 className="mb-5 text-3xl font-bold">
                {t("donate.donateTitle")}
            </h2>
            <p>{t("donate.bankName")}</p>
            <p>{t("donate.recipient")}</p>
            <p>{t("donate.name")}</p>
            <p>{t("donate.edrpou")}</p>
            <p>{t("donate.currency")}USD</p>
            <p>{t("donate.iban")}UA313052990000026008016812384</p>
            <p>{t("donate.currency")}EUR</p>
            <p>{t("donate.iban")}UA87 3003 3500 0000 0026 0047 8415 9</p>
        </div>
    );
};

export default BankDetails;
