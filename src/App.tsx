import Home from "@/components/Home";
import Campaigns from "@/components/campaigns/Campaigns";
import About from "@/components/about/About";
import Contacts from "@/components/contacts/Contact";
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
            <Contacts />
            <Donate />
        </>
    );
}

export default App;
