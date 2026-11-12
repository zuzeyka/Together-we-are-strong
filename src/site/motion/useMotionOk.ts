import { useEffect, useState } from "react";

/**
 * False when the visitor asked for less motion (OS setting) or less data (Save-Data, 2G).
 * Then the hero shows its poster instead of the video and partners show as a still grid
 * (DESIGN_SYSTEM.md rule 7).
 */
export const useMotionOk = (): boolean => {
    const query = typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)") : undefined;
    const [reduce, setReduce] = useState(() => !!query?.matches);
    useEffect(() => {
        if (!query) return;
        const on = () => setReduce(query.matches);
        query.addEventListener("change", on);
        return () => query.removeEventListener("change", on);
    }, [query]);
    return !reduce;
};

export const saveData = (): boolean => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    return !!c && (c.saveData === true || c.effectiveType === "2g" || c.effectiveType === "slow-2g");
};
