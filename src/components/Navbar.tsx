import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-transparent text-white px-4 py-3 flex absolute top-0 left-0 right-0 z-50">
            <img src="/src/assets/logo.svg" alt="Logo" className="logo" />
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex space-x-4 text-3xl">
                    <li>
                        <Link to="/" className="hover:opacity-50">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/campaigns" className="hover:opacity-50">
                            Campaigns
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:opacity-50">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:opacity-50">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/donate"
                            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                        >
                            Donate
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
