import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const Donate: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="donate"
            className="bg-background font-poppins text-typography py-12"
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">{t("donate.title")}</h2>
                <p className="text-lg mb-8">{t("donate.description")}</p>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-bold mb-2"
                        >
                            {t("donate.form.amount")}
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="w-full text-typography-secondary px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("donate.form.amountPlaceholder")}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-secondary px-6 py-3 text-black font-semibold rounded-2xl hover:bg-secondary-dark transition-all"
                    >
                        {t("donate.form.submit")}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Donate;
