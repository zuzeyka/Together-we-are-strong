import React from "react";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    {t("contact.title")}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                    {t("contact.description")}
                </p>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            {t("contact.form.name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contact.form.namePlaceholder")}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            {t("contact.form.email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contact.form.emailPlaceholder")}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            {t("contact.form.message")}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primaryBlue"
                            placeholder={t("contact.form.messagePlaceholder")}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-primaryBlue text-white px-6 py-3 rounded-lg shadow hover:bg-primaryYellow hover:text-primaryBlue transition-all"
                    >
                        {t("contact.form.submit")}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
