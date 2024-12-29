import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CampaignPage from "./components/campaigns/CampaignPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/campaigns/:campaignId"
                    element={<CampaignPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
