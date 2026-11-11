import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/site/Layout";
import HomePage from "@/site/pages/HomePage";
import { preferredLang } from "@/i18n/i18n";

// Pages other than the home page are loaded when first visited.
const CampaignsPage = lazy(() => import("@/site/pages/CampaignsPage"));
const CampaignPage = lazy(() => import("@/site/pages/CampaignPage"));
const DonatePage = lazy(() => import("@/site/pages/DonatePage"));
const NotFound = lazy(() => import("@/site/pages/NotFound"));
const AboutPage = lazy(() => import("@/site/pages/AboutPage"));
const HelpPage = lazy(() => import("@/site/pages/HelpPage"));
const VolunteerPage = lazy(() => import("@/site/pages/VolunteerPage"));
const ThanksPage = lazy(() => import("@/site/pages/ThanksPage"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<Navigate to={`/${preferredLang()}`} replace />} />
                    <Route path="/:lang" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="campaigns" element={<CampaignsPage />} />
                        <Route path="campaigns/:id" element={<CampaignPage />} />
                        <Route path="donate" element={<DonatePage />} />
                        <Route path="donate/thanks" element={<ThanksPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="help" element={<HelpPage />} />
                        <Route path="volunteer" element={<VolunteerPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
