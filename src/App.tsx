import Home from "@/components/Home";
import Campaigns from "@/components/campaigns/Campaigns";
import About from "@/components/about/About";
import Contacts from "@/components/contacts/HelpSection";
import Donate from "@/components/donate/Donate";
import Navbar from "@/components/Navbar";
import "./App.css";
import Team from "./components/team/Team";
import ScrollToTop from "./components/ScrollToTop";
import StatsSection from "./components/about/StatsSection";

function App() {
    return (
        <>
            <Navbar />
            <Home />
            <Team />
            <Campaigns />
            <StatsSection />
            <About />
            <Contacts />
            <Donate />
            <ScrollToTop />
        </>
    );
}

export default App;
