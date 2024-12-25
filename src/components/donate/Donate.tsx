import React from "react";
import { useTranslation } from "react-i18next";

const Donate: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="donate"
            className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-10 left-1/5 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-1/2 w-80 h-80 bg-primary rounded-full blur-3xl opacity-30"></div>
            <div className="absolute top-10 left-1/2 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20"></div>

            <div className="donate-section">
                <h2>{t("donate.donateTitle")}</h2>
                <div className="donate-content">
                    {/* Bank Details Section */}
                    <div className="bank-details">
                        <h3>{t("donate.bankDetailsTitle")}</h3>
                        <p>
                            <strong>{t("donate.bankName")}:</strong> АТ
                            "Райффайзен Банк" <br />
                            <strong>{t("donate.recipient")}:</strong> БО "МБФ
                            "РМС" <br />
                            <strong>{t("donate.edrpou")}:</strong> 44749163{" "}
                            <br />
                            <strong>{t("donate.ibanNumber")}:</strong> UA87 3003
                            3500 0000 0026 0047 8415 9 <br />
                            <strong>{t("donate.currency")}:</strong> EUR
                        </p>
                    </div>

                    {/* Personal Details Section */}
                    <div className="personal-details">
                        <h3>{t("donate.personalDetailsTitle")}</h3>
                        <p>
                            <strong>{t("donate.recipient")}:</strong>{" "}
                            ГРЕБЕНЧУКОВА-РОЗУМЄЙ КАРІНА ВОЛОДИМИРІВНА <br />
                            <strong>{t("donate.ibanNumber")}:</strong>{" "}
                            UA313052990000026008016812384 <br />
                            <strong>{t("donate.edrpou")}:</strong> 44749163{" "}
                            <br />
                            <strong>{t("donate.paymentPurpose")}:</strong>{" "}
                            {t("donate.accountTopUp")}, ГРЕБЕНЧУКОВА-РОЗУМЄЙ
                            КАРІНА ВОЛОДИМИРІВНА
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donate;
