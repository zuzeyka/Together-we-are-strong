import React from "react";
import { useTranslation } from "react-i18next";
import useInView from "@/components/team/useInView";

const Partners: React.FC = () => {
    const { t } = useTranslation();
    const [ref, isInView] = useInView(0.2);

    const logos = t("helpSection.logos", {
        returnObjects: true,
    }) as string[];

    return (
        <section
            id="partners"
            ref={ref}
            className={`relative text-white py-20 overflow-hidden ${
                isInView ? "animate-fade-in" : "opacity-0"
            }`}
        >
            <h2
                className={`text-5xl lg:text-6xl font-extrabold text-center mb-12 leading-tight ${
                    isInView ? "animate-slide-in-from-top" : "opacity-0"
                }`}
            >
                {t("helpSection.partnersTitle")}
            </h2>
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex animate-scroll gap-8"
                    style={{
                        animation: `scrolling 20s linear infinite`,
                    }}
                >
                    {logos.concat(logos).map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="h-20 object-contain"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
