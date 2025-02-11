import React from "react";
import Top from "./about/Top";
import Navbar from "./Navbar";
import Team from "./team/Team";
import Projects from "./projects/Projects";
import StatsSection from "./about/StatsSection";
import About from "./about/About";
import HelpSection from "./help/HelpSection";
import Donate from "./donate/Donate";
import ScrollToTop from "./ScrollToTop";
import Partners from "./about/Partners";

const Home: React.FC = () => {
    return (
        <div className="bg-background">
            <Navbar />
            <Top />
            <Team />
            <Projects />
            <StatsSection />
            <About />
            <Partners />
            <HelpSection />
            <Donate />
            <ScrollToTop />
        </div>
    );
};

export default Home;
