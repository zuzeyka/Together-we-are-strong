import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const Contacts: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="contacts"
            className="bg-background font-poppins text-typography py-12"
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    {t("contacts.title")}
                </h2>
                <p className="text-lg mb-8">{t("contacts.description")}</p>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-bold mb-2"
                        >
                            {t("contacts.form.name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contacts.form.namePlaceholder")}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold mb-2"
                        >
                            {t("contacts.form.email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contacts.form.emailPlaceholder")}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-sm font-bold mb-2"
                        >
                            {t("contacts.form.message")}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contacts.form.messagePlaceholder")}
                        ></textarea>
                    </div>
                    <Button
                        type="submit"
                        className="bg-secondary text-black px-6 py-3 rounded-2xl font-semibold hover:bg-secondary-dark transition-all"
                    >
                        {t("contacts.form.submit")}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Contacts;
