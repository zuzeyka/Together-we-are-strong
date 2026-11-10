import React from "react";
import { useTranslation } from "react-i18next";

/** One segmented control: the current language is marked (aria-pressed), both stay readable. */
const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const current = i18n.resolvedLanguage ?? i18n.language;
    const langs = [
        { code: "en", label: "EN", name: "English" },
        { code: "uk", label: "УК", name: "Українська" },
    ];
    return (
        <div role="group" aria-label="Language" className="inline-flex rounded-control border border-line p-1 lg:mr-4">
            {langs.map((l) => {
                const active = current?.startsWith(l.code);
                return (
                    <button
                        key={l.code}
                        type="button"
                        lang={l.code}
                        aria-pressed={active}
                        title={l.name}
                        onClick={() => i18n.changeLanguage(l.code)}
                        className={`min-h-11 min-w-11 rounded-[6px] px-3 text-small font-semibold ${
                            active ? "bg-accent text-accent-on" : "hover:bg-ink/10"
                        }`}
                    >
                        {l.label}
                    </button>
                );
            })}
        </div>
    );
};

export default LanguageSwitcher;
