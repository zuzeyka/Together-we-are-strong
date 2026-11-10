import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
import en from "./en.json";
import uk from "./uk.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uk: { translation: uk },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

// <html lang> follows the language, for screen readers, hyphenation and search engines.
const setLang = (lng: string) => document.documentElement.setAttribute("lang", lng.startsWith("uk") ? "uk" : "en");
i18n.on("languageChanged", setLang);
if (i18n.language) setLang(i18n.language);

export default i18n;
