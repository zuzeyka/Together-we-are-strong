import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Play, X } from "lucide-react";
import Picture, { mediaBase } from "@/components/Picture";
import manifest from "@/media-manifest.json";
import { CAMPAIGNS, INSTAGRAM } from "@/content/campaigns";
import { ExternalLink, L, Section, linkButton, usePageMeta } from "@/site/ui";
import NotFound from "./NotFound";

type Gallery = { images: string[]; videos: string[] };
const galleries = (manifest as { galleries: Record<string, Gallery> }).galleries;
const posters = (manifest as { videos: Record<string, { poster: string }> }).videos;
const images = (manifest as { images: Record<string, { w: number; h: number; widths: number[] }> }).images;

/** The cover's largest WebP (1600 wide where the original allows) as the share image. */
const shareImage = (cover: string) => {
    const info = images[cover];
    if (!info) return {};
    const w = Math.max(...info.widths);
    return { image: `${mediaBase(cover)}-${w}.webp`, imageWidth: w, imageHeight: Math.round((info.h * w) / info.w) };
};
const isVideo = (p: string) => p.endsWith(".mp4") || p.endsWith(".mov");

type Post = {
    event_title: string;
    event_description: string;
    event_highlights_title: string;
    event_highlights: string[];
    event_effect_title: string;
    event_effects: string[];
    event_thanks: string;
};

const PAGE = 9; // gallery thumbnails shown before "Show all"

const CampaignPage: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const campaign = CAMPAIGNS.find((c) => c.id === id);
    const post = t(`projects.${id}.post-text`, { returnObjects: true }) as Post;
    const title = t(`projects.${id}.title`);
    usePageMeta(
        campaign ? title : t("ui.notFound.title"),
        campaign ? { description: t(`projects.${id}.description`), ...shareImage(campaign.cover), imageAlt: t(`projects.${id}.alt`) } : { noindex: true }
    );
    const g = galleries[id ?? ""] ?? { images: [], videos: [] };
    const media = [...g.images, ...g.videos];
    const [showAll, setShowAll] = useState(false);
    const [open, setOpen] = useState<number | null>(null);

    if (!campaign || typeof post !== "object") return <NotFound />;
    const shown = showAll ? media : media.slice(0, PAGE);
    const nImages = g.images.length;
    const mediaAlt = (i: number) =>
        i < nImages
            ? t("ui.campaign.photoAlt", { n: i + 1, total: nImages, title: post.event_title })
            : t("ui.campaign.videoAlt", { n: i - nImages + 1, total: g.videos.length, title: post.event_title });

    return (
        <>
            <Section className="max-w-prose">
                <L to="/campaigns" className={linkButton.text}>
                    <ArrowLeft className="size-4" aria-hidden /> {t("ui.campaign.back")}
                </L>
                <h1 className="mt-4 text-h1 text-ink">{post.event_title}</h1>
                <p className="mt-4 text-body text-muted">{post.event_description}</p>
                <div className="mt-8 overflow-hidden rounded-card shadow-card">
                    <Picture src={campaign.cover} alt={t(`projects.${id}.alt`, { defaultValue: post.event_title })} sizes="(min-width: 768px) 720px, 100vw" priority className="aspect-[3/2] w-full object-cover" />
                </div>
                {[
                    [post.event_highlights_title, post.event_highlights],
                    [post.event_effect_title, post.event_effects],
                ].map(([title, items]) =>
                    Array.isArray(items) && items.length ? (
                        <div key={title as string} className="mt-10">
                            <h2 className="text-h2 text-ink">{title as string}</h2>
                            <ul className="mt-4 space-y-3">
                                {(items as string[]).map((item) => (
                                    <li key={item} className="flex gap-3 text-body text-ink">
                                        <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null
                )}
                {post.event_thanks && <p className="mt-10 border-l-4 border-primary pl-4 text-body font-semibold text-ink">{post.event_thanks}</p>}
            </Section>

            {media.length > 0 && (
                <Section tone="sunk" labelledBy="media">
                    <h2 id="media" className="mb-6 text-h2 text-ink">{t("ui.campaign.media")}</h2>
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {shown.map((item, i) => (
                            <li key={item}>
                                <button type="button" onClick={() => setOpen(i)} className="group relative block aspect-square w-full overflow-hidden rounded-control bg-bg">
                                    {isVideo(item) ? (
                                        <>
                                            <img src={posters[item]?.poster} alt={mediaAlt(i)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                            <span className="on-photo scrim absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-caption">
                                                <Play className="size-4" aria-hidden /> {t("ui.campaign.video")}
                                            </span>
                                        </>
                                    ) : (
                                        <Picture src={item} alt={mediaAlt(i)} sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 50vw" className="h-full w-full object-cover transition-opacity group-hover:opacity-90" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {!showAll && media.length > PAGE && (
                        <button type="button" onClick={() => setShowAll(true)} className={`${linkButton.outline} mt-6`}>
                            {t("ui.campaign.showAll", { count: media.length })}
                        </button>
                    )}
                </Section>
            )}

            <Section labelledBy="support">
                <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-surface p-8 shadow-card md:flex-row md:items-center md:justify-between">
                    <div className="max-w-prose">
                        <h2 id="support" className="text-h2 text-ink">{t("ui.campaign.support")}</h2>
                        <p className="mt-2 text-body text-muted">{t("ui.campaign.supportText")}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <L to="/donate" className={linkButton.donate}>{t("ui.nav.donate")}</L>
                        <ExternalLink href={INSTAGRAM} className={linkButton.outline}>
                            <Instagram className="size-5" aria-hidden /> {t("ui.campaign.instagram")}
                        </ExternalLink>
                    </div>
                </div>
            </Section>

            {open !== null && <Viewer media={media} index={open} onIndex={setOpen} onClose={() => setOpen(null)} title={post.event_title} alt={mediaAlt} />}
        </>
    );
};

/** Full-screen photo/video viewer: arrows or swipe-free buttons, Esc closes, focus stays inside. */
const Viewer: React.FC<{ media: string[]; index: number; onIndex: (i: number) => void; onClose: () => void; title: string; alt: (i: number) => string }> = ({
    media,
    index,
    onIndex,
    onClose,
    title,
    alt,
}) => {
    const { t } = useTranslation();
    const go = useCallback((d: number) => onIndex((index + d + media.length) % media.length), [index, media.length, onIndex]);
    useEffect(() => {
        const key = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        document.addEventListener("keydown", key);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", key);
            document.body.style.overflow = "";
        };
    }, [go, onClose]);
    const item = media[index];
    const btn = "on-photo inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(255_255_255/0.12)] hover:bg-[rgb(255_255_255/0.22)]";
    return (
        <div role="dialog" aria-modal="true" aria-label={title} className="on-photo scrim fixed inset-0 z-50 flex flex-col">
            <div className="flex items-center justify-between p-3">
                <span className="tabular text-small">{index + 1} / {media.length}</span>
                <button type="button" onClick={onClose} className={btn} aria-label={t("ui.campaign.close")} autoFocus>
                    <X aria-hidden />
                </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6">
                {isVideo(item) ? (
                    <video key={item} src={`/media${item}`} poster={posters[item]?.poster} controls playsInline preload="metadata" className="max-h-full max-w-full rounded-control" />
                ) : (
                    <Picture src={item} alt={alt(index)} sizes="100vw" priority className="max-h-[80vh] w-auto max-w-full rounded-control object-contain" />
                )}
                {media.length > 1 && (
                    <>
                        <button type="button" onClick={() => go(-1)} className={`${btn} absolute left-3`} aria-label={t("ui.campaign.prev")}><ChevronLeft aria-hidden /></button>
                        <button type="button" onClick={() => go(1)} className={`${btn} absolute right-3`} aria-label={t("ui.campaign.next")}><ChevronRight aria-hidden /></button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CampaignPage;
