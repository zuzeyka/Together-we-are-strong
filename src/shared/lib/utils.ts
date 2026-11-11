import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge must know the custom font sizes (tailwind.config.js): otherwise it reads
// "text-h2" as a colour and drops it when "text-ink" follows in the same cn() call.
const twMerge = extendTailwindMerge({
    extend: { classGroups: { "font-size": [{ text: ["display", "h1", "h2", "h3", "body", "small", "caption"] }] } },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
