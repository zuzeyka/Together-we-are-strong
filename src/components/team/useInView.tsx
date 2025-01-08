import React from "react";
import { useState, useEffect } from "react";

const useInView = (threshold = 0.5) => {
    const [isInView, setIsInView] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);

    return [ref, isInView] as const;
};

export default useInView;
