import path from "path";
import { execFileSync } from "child_process";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";

/** After every build, write per-page HTML with that page's meta tags (scripts/prerender-meta.mjs).
 * A plugin, not an npm script, so it runs whatever build command the host uses (Vercel runs `vite build`). */
const prerenderMeta = (): Plugin => {
    let outDir = "dist";
    return {
        name: "prerender-meta",
        apply: "build",
        configResolved(c) {
            outDir = path.resolve(c.root, c.build.outDir);
        },
        closeBundle() {
            execFileSync(process.execPath, [path.resolve(__dirname, "scripts/prerender-meta.mjs"), outDir], { cwd: __dirname, stdio: "inherit" });
        },
    };
};

export default defineConfig({
    plugins: [react(), prerenderMeta()],
    base: "/", // absolute: nested routes (/en/campaigns/x) must load /assets, not ./assets
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
