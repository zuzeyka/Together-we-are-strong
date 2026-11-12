import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pause, Play } from "lucide-react";
import { saveData, useMotionOk } from "./useMotionOk";

const VIDEO = "/media/mainVideo.mp4"; // 15 s, 720p, muted, 2.4 MB (scripts/optimize_media.py)
const POSTER = "/media/mainVideo-poster.webp";
const KEY = "heroVideo";

/**
 * Full-width hero background: the poster paints first (it's the LCP image), the video is only
 * downloaded when it may play (not with reduced motion or Save-Data) and plays only while on screen.
 * The visitor can pause it; the choice is remembered on this device.
 */
const HeroVideo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const ref = useRef<HTMLVideoElement>(null);
    const motionOk = useMotionOk();
    const [allowed] = useState(() => !saveData());
    const [userPaused, setUserPaused] = useState(() => {
        try {
            return localStorage.getItem(KEY) === "paused";
        } catch {
            return false;
        }
    });
    const [playing, setPlaying] = useState(false);
    const canPlay = motionOk && allowed;

    useEffect(() => {
        const v = ref.current;
        if (!v || !canPlay || userPaused) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) v.play().catch(() => setPlaying(false));
            else v.pause();
        });
        io.observe(v);
        return () => {
            io.disconnect();
            v.pause();
        };
    }, [canPlay, userPaused]);

    const toggle = () => {
        const next = !userPaused;
        setUserPaused(next);
        try {
            localStorage.setItem(KEY, next ? "paused" : "playing");
        } catch {
            /* storage blocked */
        }
    };

    return (
        <section className="on-photo relative isolate flex min-h-[78svh] items-end overflow-hidden md:min-h-[84svh]">
            <img src={POSTER} alt="" width={1280} height={720} className="absolute inset-0 -z-20 h-full w-full object-cover" {...({ fetchpriority: "high" } as Record<string, string>)} />
            {canPlay && (
                <video
                    ref={ref}
                    src={VIDEO}
                    poster={POSTER}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden
                    onPlaying={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
                />
            )}
            <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
            <div className="mx-auto w-full max-w-container px-4 pb-14 pt-24 md:px-6 md:pb-20">{children}</div>
            {canPlay && (
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={userPaused ? t("ui.heroVideo.play") : t("ui.heroVideo.pause")}
                    title={userPaused ? t("ui.heroVideo.play") : t("ui.heroVideo.pause")}
                    className="photo-button absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full md:bottom-6 md:right-6"
                >
                    {userPaused ? <Play className="size-5" aria-hidden /> : <Pause className="size-5" aria-hidden />}
                </button>
            )}
        </section>
    );
};

export default HeroVideo;
