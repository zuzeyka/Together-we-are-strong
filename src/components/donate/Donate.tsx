import React from "react";
import { useTranslation } from "react-i18next";

const Donate: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="donate" className="bg-primaryYellow py-12">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-primaryBlue mb-6">
                    {t("donate.title")}
                </h2>
                <p className="text-lg text-primaryBlue mb-8">
                    {t("donate.description")}
                </p>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-primaryBlue text-sm font-bold mb-2"
                        >
                            {t("donate.form.amount")}
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("donate.form.amountPlaceholder")}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primaryBlue text-white px-6 py-3 rounded-lg shadow hover:bg-primaryYellow hover:text-primaryBlue transition-all"
                    >
                        {t("donate.form.submit")}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Donate;
