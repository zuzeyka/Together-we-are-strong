import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pause, Play } from "lucide-react";
import Picture from "@/components/Picture";
import { PARTNERS } from "@/content/campaigns";
import { ExternalLink } from "@/site/ui";
import { cn } from "@/shared/lib/utils";
import { useMotionOk } from "./useMotionOk";

const Tile: React.FC<{ p: (typeof PARTNERS)[number]; hidden?: boolean; className?: string }> = ({ p, hidden, className }) => (
    // Logos come in white and in colour: the navy tile keeps both readable.
    <ExternalLink href={p.url} tabIndex={hidden ? -1 : undefined} className={cn("logo-tile flex h-28 items-center justify-center rounded-card p-5 transition-transform hover:scale-[1.03]", className)}>
        <Picture src={p.logo} alt={hidden ? "" : p.name} sizes="200px" className="max-h-16 w-auto object-contain" />
    </ExternalLink>
);

/**
 * Partner logos gliding past in an endless loop. Pauses while hovered or focused, and with its
 * pause button (WCAG 2.2.2). With reduced motion it's a still grid. The second copy of the list
 * only makes the loop seamless: hidden from screen readers and from the Tab key.
 */
const PartnersMarquee: React.FC = () => {
    const { t } = useTranslation();
    const motionOk = useMotionOk();
    const [paused, setPaused] = useState(false);

    if (!motionOk)
        return (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {PARTNERS.map((p) => (
                    <li key={p.logo}>
                        <Tile p={p} />
                    </li>
                ))}
            </ul>
        );

    return (
        <div>
            <div className="marquee overflow-hidden">
                <ul className={cn("marquee-track flex w-max", paused && "marquee-paused")}>
                    {[...PARTNERS, ...PARTNERS].map((p, i) => (
                        <li key={i} className="pr-4" aria-hidden={i >= PARTNERS.length || undefined}>
                            <Tile p={p} hidden={i >= PARTNERS.length} className="w-44 md:w-52" />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={() => setPaused((x) => !x)}
                    aria-pressed={paused}
                    className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-small font-semibold text-primary hover:bg-ink/5"
                >
                    {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
                    {paused ? t("ui.heroVideo.play") : t("ui.heroVideo.pause")}
                </button>
            </div>
        </div>
    );
};

export default PartnersMarquee;
