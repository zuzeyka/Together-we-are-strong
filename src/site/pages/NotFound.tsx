import React from "react";
import { useTranslation } from "react-i18next";
import { L, Section, linkButton, usePageMeta } from "@/site/ui";

const NotFound: React.FC = () => {
    const { t } = useTranslation();
    usePageMeta(t("ui.notFound.title"));
    return (
        <Section className="text-center">
            <h1 className="text-h1 text-ink">{t("ui.notFound.title")}</h1>
            <L to="/" className={`${linkButton.primary} mt-6`}>{t("ui.notFound.back")}</L>
        </Section>
    );
};

export default NotFound;
