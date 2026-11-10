import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Home from "./components/Home";

// Loaded only when visited, so the home page ships less JavaScript.
const CampaignPage = lazy(() => import("./components/projects/ProjectPage"));
const BankDetails = lazy(() => import("./components/donate/BankDetails"));

function App() {
    return (
        <Router basename="/">
            <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:campaignId" element={<CampaignPage />} />
                <Route path="/bank-details" element={<BankDetails />} />
            </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
