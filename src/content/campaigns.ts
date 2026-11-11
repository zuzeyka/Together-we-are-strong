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

/* ---- Donation flow (Phase 2b). ---------------------------------------------------------------
 * PLACEHOLDERS: the founder will supply these. While a value is "", the site shows NOTHING for it
 * (no fake jar, no fake QR). Fill in and redeploy; DonatePage.tsx renders the option automatically.
 *   MONOBANK_JAR   — full Monobank jar link, e.g. "https://send.monobank.ua/jar/XXXXXXXXXX"
 *   PAYMENT_QR     — path under /public to the bank's payment QR image, e.g. "/media/donate-qr.png"
 */
export const MONOBANK_JAR = "";
export const PAYMENT_QR = "";

/** The public site address used in share links (the language is appended: /en or /uk). */
export const SITE_URL = "https://www.twmp.com.ua";

/** Suggested amounts on the Donate page. They only guide a bank transfer or PayPal; there is no payment processor.
 * The examples (ui.donatePage.presets.<key>) are worded as contributions, never as exact prices. */
export const DONATION_PRESETS: { uah: number; eur: number; key: "food" | "baby" | "medicine" | "shelter" }[] = [
    { uah: 200, eur: 5, key: "food" },
    { uah: 500, eur: 10, key: "baby" },
    { uah: 1000, eur: 25, key: "medicine" },
    { uah: 2000, eur: 50, key: "shelter" },
];
