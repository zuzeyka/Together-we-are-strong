import React, { useEffect, useRef } from "react";
import manifest from "@/media-manifest.json";

const hero = (manifest as { videos: Record<string, { poster: string }> }).videos["/mainVideo.mp4"];

// The 15 s background clip plays only when the connection is fast and motion is welcome;
// otherwise the poster frame stays (it is also what loads first, so the page paints fast).
const wantsVideo = () => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c?.saveData || (c?.effectiveType && c.effectiveType !== "4g")) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
import { useTranslation } from "react-i18next";

const Top: React.FC = () => {
    const { t } = useTranslation();
    const video = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const v = video.current;
        if (!v || !wantsVideo()) return;
        v.src = "/media/mainVideo.mp4";
        v.play().catch(() => {});
    }, []);

    return (
        <div className="w-full h-screen font-montserrat">
            <div className="relative h-screen overflow-hidden">
                <video
                    ref={video}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    poster={hero?.poster}
                    preload="none"
                    loop
                    muted
                    playsInline
                ></video>

                <div className="absolute inset-0 bg-typography-dark bg-opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 animate-fade-in">
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight max-w-4xl animate-slide-in-from-top">
                        {t("home.title")}
                    </h1>
                    <p className="mt-4 text-xl lg:text-2xl text-white/85 max-w-3xl animate-slide-in-from-bottom">
                        {t("home.description")}
                    </p>
                    <a
                        href="#donate"
                        className="mt-6 inline-flex min-h-12 items-center rounded-control bg-accent px-8 py-3 font-semibold text-accent-on hover:bg-accent-hover animate-zoom-in"
                    >
                        {t("home.cta")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Top;
