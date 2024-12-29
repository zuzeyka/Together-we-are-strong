import React from "react";
import Top from "./about/Top";
import Navbar from "./Navbar";
import Team from "./team/Team";
import Campaigns from "./campaigns/Campaigns";
import StatsSection from "./about/StatsSection";
import About from "./about/About";
import HelpSection from "./help/HelpSection";
import Donate from "./donate/Donate";
import ScrollToTop from "./ScrollToTop";

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <Top />
            <Team />
            <Campaigns />
            <StatsSection />
            <About />
            <HelpSection />
            <Donate />
            <ScrollToTop />
        </>
    );
};

export default Home;
