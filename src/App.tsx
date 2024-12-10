import Home from "@/components/Home";
import Campaigns from "@/components/campaigns/Campaigns";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Donate from "@/components/donate/Donate";
import Navbar from "@/components/Navbar";
import "./App.css";
import Team from "./components/team/Team";

function App() {
    return (
        <>
            <Navbar />
            <Home />
            <Team />
            <Campaigns />
            <About />
            <Contact />
            <Donate />
        </>
    );
}

export default App;
