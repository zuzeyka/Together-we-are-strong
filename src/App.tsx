import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CampaignPage from "./components/campaigns/CampaignPage";
import BankDetails from "./components/donate/BankDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/campaigns/:campaignId"
                    element={<CampaignPage />}
                />
                <Route path="/bank-details" element={<BankDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
