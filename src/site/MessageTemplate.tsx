import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";

/** A ready-to-send message people can copy into an Instagram DM (Help and Volunteer pages). */
const MessageTemplate: React.FC<{ title: string; text: string; copyLabel: string; copiedLabel: string; className?: string }> = ({
    title,
    text,
    copyLabel,
    copiedLabel,
    className,
}) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: the text stays selectable */
        }
    };
    return (
        <figure className={cn("rounded-card border border-line bg-surface p-5 shadow-card md:p-6", className)}>
            <figcaption className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-semibold text-ink">{title}</span>
                <button
                    type="button"
                    onClick={copy}
                    className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-control border px-3 text-small font-semibold",
                        copied ? "border-success text-success" : "border-input-line text-ink hover:bg-ink/5"
                    )}
                >
                    {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                    <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
                </button>
            </figcaption>
            <p className="mt-4 select-all whitespace-pre-line rounded-control bg-sunk p-4 text-body text-ink">{text}</p>
        </figure>
    );
};

export default MessageTemplate;
