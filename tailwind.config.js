/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

const tok = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // Colours are tokens from src/index.css (light + .dark); see DESIGN_SYSTEM.md.
            fontFamily: {
                sans: ["Onest", "Onest Fallback", "system-ui", "sans-serif"],
                // Old class names, kept until Phase 2 rewrites the pages: all Onest now.
                poppins: ["Onest", "Onest Fallback", "system-ui", "sans-serif"],
                montserrat: ["Onest", "Onest Fallback", "system-ui", "sans-serif"],
            },
            colors: {
                bg: tok("bg"),
                surface: tok("surface"),
                sunk: tok("sunk"),
                tint: tok("tint"),
                ink: tok("ink"),
                muted: tok("muted"),
                primary: {
                    DEFAULT: tok("primary"),
                    hover: tok("primary-hover"),
                    on: tok("on-primary"),
                    // old names
                    light: tok("primary"),
                    dark: tok("primary-hover"),
                },
                accent: { DEFAULT: tok("accent"), hover: tok("accent-hover"), on: tok("on-accent") },
                success: tok("success"),
                danger: tok("danger"),
                line: tok("line"),
                "input-line": tok("input-line"),
                // Old names, mapped onto the tokens until Phase 2 replaces them:
                background: tok("bg"),
                foreground: tok("ink"),
                secondary: { DEFAULT: tok("accent"), light: tok("accent"), dark: tok("accent-hover") },
                typography: {
                    DEFAULT: tok("ink"),
                    primary: tok("ink"),
                    secondary: tok("muted"),
                    dark: "#0E1B2C", // always dark: text on yellow, photo overlays
                },
            },
            borderRadius: {
                control: "8px",
                card: "16px",
            },
            boxShadow: {
                card: "var(--shadow-card)",
            },
            maxWidth: {
                container: "1200px",
                prose: "720px",
            },
            fontSize: {
                // fluid sizes from DESIGN_SYSTEM.md (mobile → desktop)
                display: ["clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
                h1: ["clamp(1.875rem, 1.4rem + 2vw, 2.75rem)", { lineHeight: "1.15", fontWeight: "700" }],
                h2: ["clamp(1.5rem, 1.25rem + 1vw, 2rem)", { lineHeight: "1.2", fontWeight: "650" }],
                h3: ["clamp(1.25rem, 1.2rem + 0.2vw, 1.375rem)", { lineHeight: "1.3", fontWeight: "600" }],
                body: ["1.0625rem", { lineHeight: "1.6" }],
                small: ["0.9375rem", { lineHeight: "1.5" }],
                caption: ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
            },
            keyframes: {
                rise: {
                    "0%": { opacity: 0, transform: "translateY(12px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fade: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
            },
            // One calm entrance for everything (the old names all map to it until Phase 2).
            animation: {
                rise: "rise 0.35s ease-out both",
                fade: "fade 0.35s ease-out both",
                "fade-in": "fade 0.35s ease-out both",
                "fade-in-up": "rise 0.35s ease-out both",
                "fade-in-down": "rise 0.35s ease-out both",
                "slide-in-from-left": "rise 0.35s ease-out both",
                "slide-in-from-right": "rise 0.35s ease-out both",
                "slide-in-from-top": "rise 0.35s ease-out both",
                "slide-in-from-bottom": "rise 0.35s ease-out both",
                "zoom-in": "fade 0.35s ease-out both",
            },
        },
    },
    plugins: [tailwindcssAnimate],
};
