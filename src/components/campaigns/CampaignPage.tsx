import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

const CampaignPage: React.FC = () => {
    const { campaignId } = useParams();
    const { t } = useTranslation();

    const [images, setImages] = useState<string[]>([]);
    const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const importImages = () => {
            const imageCount = Number(t(`campaigns.${campaignId}.image-count`));
            const basePath = `/campaigns/${campaignId}/`;
            const imagesArray = Array.from(
                { length: imageCount },
                (_, index) => `${basePath}${index}.jpg`
            );
            setImages(shuffleArray(imagesArray));
            setPreloadedImages(imagesArray.slice(0, 5));
        };

        importImages();
    }, [campaignId]);

    const campaignData = t(`campaigns.${campaignId}.post-text`, {
        returnObjects: true,
    }) as {
        event_title: string;
        event_description: string;
        event_highlights_title: string;
        event_highlights: string[];
        event_effect_title: string;
        event_effects: string[];
        event_thanks: string;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-typography mb-4 text-center">
                {campaignData.event_title}
            </h1>
            <p className="text-lg text-typography mb-6 text-justify">
                {campaignData.event_description}
            </p>

            {images.length > 0 && (
                <img
                    src={images[activeImageIndex]}
                    alt={`${t(`campaigns.${campaignId}.title`)} 1`}
                    className="w-full h-72 object-cover rounded-t-xl mb-6"
                />
            )}

            <Carousel>
                <CarouselContent className="flex gap-4">
                    {preloadedImages.map((image, index) => (
                        <CarouselItem className="basis-1/3" key={index}>
                            <img
                                src={image}
                                alt={`${t(`campaigns.${campaignId}.title`)} ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className="bg-background text-white p-2 rounded-full"
                    onClickCapture={() =>
                        setActiveImageIndex(
                            (activeImageIndex - 1 + images.length) %
                                images.length
                        )
                    }
                />
                <CarouselNext
                    className="bg-gray-800 text-white p-2 rounded-full"
                    onClickCapture={() =>
                        setActiveImageIndex(
                            (activeImageIndex + 1) % images.length
                        )
                    }
                />
            </Carousel>

            <h2 className="text-2xl font-bold text-typography mt-8 mb-4">
                {campaignData.event_highlights_title}
            </h2>
            <ul className="list-disc pl-5 text-typography-secondary mb-6">
                {campaignData.event_highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold text-typography mt-8 mb-4">
                {campaignData.event_effect_title}
            </h2>
            <ul className="list-disc pl-5 text-typography-secondary mb-6">
                {campaignData.event_effects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                ))}
            </ul>

            <p className="text-lg font-semibold text-primary text-center mb-4">
                {campaignData.event_thanks}
            </p>
            <p className="text-lg text-secondary text-center">
                <a
                    href="https://www.instagram.com/twmp.foundation/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t(`campaigns.event_cta`)}
                </a>
            </p>
        </div>
    );
};

export default CampaignPage;
