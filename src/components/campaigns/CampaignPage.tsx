import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CampaignPage.css";
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
            const basePath = `/src/assets/campaigns/${campaignId}/`;
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
        event_highlight_1: string;
        event_highlight_2: string;
        event_highlight_3: string;
        event_highlight_4: string;
        event_effect_title: string;
        event_effect_1: string;
        event_effect_2: string;
        event_effect_3: string;
        event_thanks: string;
        event_cta: string;
    };

    return (
        <div className="campaign-page-container">
            <h1 className="campaign-title">{campaignData.event_title}</h1>
            <p className="campaign-description">
                {campaignData.event_description}
            </p>

            {images.length > 0 && (
                <img
                    src={images[activeImageIndex]}
                    alt={`${t(`campaigns.${campaignId}.stelp_event_title`)} 1`}
                    className="object-cover object-center w-full h-72 rounded-2xl mb-6"
                />
            )}

            <Carousel>
                <CarouselContent>
                    {preloadedImages.map((image, index) => (
                        <CarouselItem className="basis-1/3" key={index}>
                            <img
                                src={image}
                                alt={`${t(`campaigns.${campaignId}.stelp_event_title`)} ${index + 1}`}
                                className="object-cover object-center w-full h-full rounded-2xl"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className="bg-typography-dark"
                    onClickCapture={() =>
                        setActiveImageIndex(activeImageIndex - 1)
                    }
                />
                <CarouselNext
                    className="bg-typography-dark"
                    onClickCapture={() => {
                        setActiveImageIndex(activeImageIndex + 1);
                        setPreloadedImages(
                            images.slice(0, activeImageIndex + 5)
                        );
                    }}
                />
            </Carousel>

            <h2 className="campaign-section-title">
                {campaignData.event_highlights_title}
            </h2>
            <ul className="campaign-highlights-list">
                <li>{campaignData.event_highlight_1}</li>
                <li>{campaignData.event_highlight_2}</li>
                <li>{campaignData.event_highlight_3}</li>
                <li>{campaignData.event_highlight_4}</li>
            </ul>

            <h2 className="campaign-section-title">
                {campaignData.event_effect_title}
            </h2>
            <ul className="campaign-effects-list">
                <li>{campaignData.event_effect_1}</li>
                <li>{campaignData.event_effect_2}</li>
                <li>{campaignData.event_effect_3}</li>
            </ul>

            <p className="campaign-thanks">{campaignData.event_thanks}</p>
            <p className="campaign-cta">{campaignData.event_cta}</p>
        </div>
    );
};

export default CampaignPage;
