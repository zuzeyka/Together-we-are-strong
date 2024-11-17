import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/components/home/Home";
import Campaigns from "@/components/campaigns/Campaigns";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Donate from "@/components/donate/Donate";
import Navbar from "@/components/Navbar";

import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
