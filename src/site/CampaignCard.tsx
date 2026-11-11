import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Picture from "@/components/Picture";
import { L } from "@/site/ui";

/** A project card: photo, title and summary always visible; the whole card is one link. */
const CampaignCard: React.FC<{ id: string; cover: string; priority?: boolean; heading?: "h2" | "h3" }> = ({ id, cover, priority, heading: H = "h3" }) => {
    const { t } = useTranslation();
    return (
        <L
            to={`/campaigns/${id}`}
            className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-lg"
        >
            <div className="aspect-[3/2] overflow-hidden bg-sunk">
                <Picture
                    src={cover}
                    alt={t(`projects.${id}.alt`, { defaultValue: t(`projects.${id}.title`) })}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    priority={priority}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
                <H className="text-h3 text-ink group-hover:text-primary">{t(`projects.${id}.title`)}</H>
                <p className="line-clamp-3 text-small text-muted">{t(`projects.${id}.description`)}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-small font-semibold text-primary">
                    {t("ui.projects.read")} <ArrowRight className="size-4" aria-hidden />
                </span>
            </div>
        </L>
    );
};

export default CampaignCard;
