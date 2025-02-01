import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CampaignPage from "./components/projects/ProjectPage";
import BankDetails from "./components/donate/BankDetails";

function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:campaignId" element={<CampaignPage />} />
                <Route path="/bank-details" element={<BankDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
