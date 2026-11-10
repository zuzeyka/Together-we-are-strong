import React from "react";
import manifest from "@/media-manifest.json";

/**
 * Web-sized image from public/media (made by scripts/optimize_media.py).
 * `src` is the original path ("/DSC_3580.jpg", "/projects/Grooming/3.jpg"); the browser picks AVIF or
 * WebP at the width it needs (`sizes`). Lazy by default; pass `priority` for the first visible image.
 */
type ImageInfo = { w: number; h: number; widths: number[]; logo?: boolean };
const images = (manifest as { images: Record<string, ImageInfo> }).images;

export const mediaBase = (src: string) => "/media" + src.replace(/\.[^./]+$/, "");

interface PictureProps {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
    priority?: boolean;
}

const Picture: React.FC<PictureProps> = ({ src, alt, sizes = "100vw", className, priority }) => {
    const info = images[src];
    const loading = priority ? "eager" : "lazy";
    if (!info) return <img src={src} alt={alt} className={className} loading={loading} decoding="async" />;
    const base = info.logo ? "/media/logo" : mediaBase(src);
    const set = (ext: string) => info.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
    const fallbackWidth = info.widths[Math.min(1, info.widths.length - 1)];
    return (
        <picture>
            {!info.logo && <source type="image/avif" srcSet={set("avif")} sizes={sizes} />}
            <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
            <img
                src={`${base}-${fallbackWidth}.${info.logo ? "png" : "webp"}`}
                width={info.w}
                height={info.h}
                alt={alt}
                loading={loading}
                decoding="async"
                // React 18 types lack fetchPriority; the lowercase HTML attribute works in browsers.
                {...({ fetchpriority: priority ? "high" : "auto" } as Record<string, string>)}
                className={className}
            />
        </picture>
    );
};

export default Picture;
