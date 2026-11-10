import React from "react";
import { useState, useEffect } from "react";

/**
 * True once the element has scrolled into view, and it stays true: sections fade in one time
 * (DESIGN_SYSTEM.md, Motion) instead of hiding again whenever they leave the screen.
 */
const useInView = (threshold = 0.5) => {
    const [isInView, setIsInView] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || isInView) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            // A low threshold on phones: tall sections may never be 50% visible on a small screen.
            { threshold: Math.min(threshold, 0.15) }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, isInView]);

    return [ref, isInView] as const;
};

export default useInView;
