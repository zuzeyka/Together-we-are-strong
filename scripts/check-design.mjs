// Enforces DESIGN_SYSTEM.md "Strict rules" (colours and contrast) on every .tsx file in src/.
// Run: npm run check:design  (also part of npm run build)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".tsx") && files.push(join(d, f))));
walk("src");

const rules = [
    [/\btext-accent(?![-\w])/, "yellow text fails contrast on light backgrounds (rule 2): use text-primary"],
    [/\btext-black\b|\bbg-black\b|\bbg-white\b/, "black/white classes: use tokens (ink, surface, bg)"],
    [/\b(?:text|bg|border|ring|from|via|to)-(?:gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/, "Tailwind palette colour: use a design token"],
    [/\bbg-gradient-/, "gradients are not part of the design"],
    [/\b(?:text|bg|border)-(?:secondary|typography|background)\b/, "old colour alias: use the new tokens"],
    [/\b(?:text|bg|border)-\[#/, "hex colour in a class: add a token instead"],
];
let bad = 0;
for (const f of files) {
    readFileSync(f, "utf8").split("\n").forEach((line, i) => {
        for (const [re, why] of rules) if (re.test(line)) { console.error(`${f}:${i + 1}: ${why}\n    ${line.trim()}`); bad++; }
        // White text only on photos / the scrim (rule 1).
        if (/\btext-white\b/.test(line) && !/on-photo/.test(line)) { console.error(`${f}:${i + 1}: text-white outside .on-photo (rule 1)\n    ${line.trim()}`); bad++; }
    });
}
if (bad) { console.error(`\n${bad} design-rule violation(s). See DESIGN_SYSTEM.md, "Strict rules".`); process.exit(1); }
console.log(`design rules: ${files.length} files OK`);
