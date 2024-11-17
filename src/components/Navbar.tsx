import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Together We Are Strong</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/campaigns" className="hover:underline">
                            Campaigns
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:underline">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:underline">
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
