/** The foundation's projects, in the order shown on the site (newest first as on the old site).
 * Text lives in the translations under projects.<id>; photos are in the media manifest (galleries). */
export const CAMPAIGNS: { id: string; cover: string }[] = [
    { id: "LargeRelocationAid", cover: "/DSC_3580.jpg" },
    { id: "RelocationAid", cover: "/DSC_3581.jpg" },
    { id: "MaternityAid", cover: "/DSC_3582.jpg" },
    { id: "GastroFamilyAid", cover: "/DSC_5998.jpg" },
    { id: "MedicalAid", cover: "/DSC_5999.jpg" },
    { id: "MilitarySupport", cover: "/DSC_5996.jpg" },
    { id: "AnimalShelterSupport", cover: "/DSC_5995.jpg" },
    { id: "SupportForChildren", cover: "/DSC_5994.jpg" },
    { id: "GiftCampaign", cover: "/DSC_5993.jpg" },
    { id: "InternatSupport", cover: "/DSC_5992.jpg" },
    { id: "CharityBrunch", cover: "/DSC_5991.jpg" },
    { id: "HospitalSupport", cover: "/DSC_5990.jpg" },
    { id: "AnimalSupport", cover: "/DSC_5989.jpg" },
    { id: "Grooming", cover: "/5Z7A0926.jpg" },
    { id: "MutualAidProject", cover: "/DSC_5988.jpg" },
    { id: "STELP", cover: "/DSC_5997.jpg" },
    { id: "ALLSTARSIT", cover: "/DSC_9523.jpg" },
    { id: "WCKitchen", cover: "/DSC_9524.jpg" },
];

export const isCampaign = (id: string | undefined) => CAMPAIGNS.some((c) => c.id === id);

export const INSTAGRAM = "https://www.instagram.com/twmp.foundation/";
export const PAYPAL = "https://www.paypal.com/donate/?hosted_button_id=9ZT8X3E3V7D4S";
export const HERO_IMAGE = "/DSC_3580.jpg";

/** Partner logos (same in every language) and their sites. */
export const PARTNERS: { logo: string; url: string; name: string }[] = [
    { logo: "/partners/STELP.webp", url: "https://stelp.eu/en/", name: "STELP" },
    { logo: "/partners/AllStarsIT.webp", url: "https://allstarsit.com/", name: "AllStarsIT" },
    { logo: "/partners/luxgroups.webp", url: "https://www.luxgroups.ua/ua/", name: "Lux Groups" },
    { logo: "/partners/masha.jpg", url: "https://www.instagram.com/masha.foundation/", name: "Masha Foundation" },
    { logo: "/partners/KIWI-PARTY.png", url: "https://kiwiparty.com.ua/", name: "KIWI Party" },
    { logo: "/partners/gastroFamily.webp", url: "https://gfm.com.ua/", name: "Gastro Family" },
    { logo: "/partners/CGU.png", url: "https://cossackguardofukraine.org/", name: "Cossack Guard of Ukraine" },
];
