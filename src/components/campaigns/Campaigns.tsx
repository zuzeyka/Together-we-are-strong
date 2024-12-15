import React from "react";
import { useTranslation } from "react-i18next";

const Campaigns: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="campaigns" className="bg-lightGray py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">
                    {t("campaigns.title")}
                </h2>
                <p className="text-center text-lg mb-8">
                    {t("campaigns.description")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/src/assets/DSC_4471.jpg"
                            alt={t("campaigns.campaign1.alt")}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                {t("campaigns.campaign1.title")}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t("campaigns.campaign1.description")}
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                {t("campaigns.learnMore")}
                            </a>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/src/assets/DSC_4471.jpg"
                            alt={t("campaigns.campaign2.alt")}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                {t("campaigns.campaign2.title")}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t("campaigns.campaign2.description")}
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                {t("campaigns.learnMore")}
                            </a>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/src/assets/DSC_4471.jpg"
                            alt={t("campaigns.campaign3.alt")}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                {t("campaigns.campaign3.title")}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t("campaigns.campaign3.description")}
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                {t("campaigns.learnMore")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Campaigns;
