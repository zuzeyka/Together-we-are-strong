import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light by default, dark follows the phone. Only a tap here is remembered (localStorage "theme");
 * index.html applies it before the first paint. Nothing is stored on load, so the site keeps
 * following the phone until the visitor chooses.
 */
const ThemeToggle: React.FC = () => {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch {
            /* private mode: just don't remember */
        }
    };
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control hover:bg-ink/10"
        >
            {dark ? <Sun aria-hidden /> : <Moon aria-hidden />}
        </button>
    );
};

export default ThemeToggle;
