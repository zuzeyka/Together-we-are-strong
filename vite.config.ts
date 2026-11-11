import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    base: "/", // absolute: nested routes (/en/campaigns/x) must load /assets, not ./assets
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
