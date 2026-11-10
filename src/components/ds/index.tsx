import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";

/* Building blocks from DESIGN_SYSTEM.md. Pages are rebuilt with these in Phase 2. */

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={cn("rounded-card border border-line bg-surface text-ink shadow-card", className)} {...props} />
);

type ChipTone = "active" | "done" | "neutral";
const chipTone: Record<ChipTone, string> = {
    active: "bg-success/15 text-success",
    done: "bg-sunk text-muted",
    neutral: "bg-tint text-primary",
};
export const Chip: React.FC<{ tone?: ChipTone; children: React.ReactNode; className?: string }> = ({ tone = "neutral", children, className }) => (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-caption", chipTone[tone], className)}>{children}</span>
);

/** Fundraising progress: accent bar on a sunk track, with the numbers in words for screen readers. */
export const ProgressBar: React.FC<{ value: number; goal: number; label: string; className?: string }> = ({ value, goal, label, className }) => {
    const pct = goal > 0 ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    return (
        <div className={className}>
            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={goal}
                aria-valuenow={value}
                aria-label={label}
                className="h-2.5 w-full overflow-hidden rounded-full bg-sunk"
            >
                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-small text-muted tabular">{label}</p>
        </div>
    );
};

/** A payment detail with its own copy button ("Copied ✓" for 2 s). */
export const CopyField: React.FC<{ label: string; value: string; copyLabel?: string; copiedLabel?: string }> = ({
    label,
    value,
    copyLabel = "Copy",
    copiedLabel = "Copied",
}) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: the value stays selectable */
        }
    };
    return (
        <div className="flex items-center gap-3 border-b border-line py-3">
            <div className="min-w-0 flex-1">
                <p className="text-caption text-muted">{label}</p>
                <p className="select-all break-all font-mono text-body">{value}</p>
            </div>
            <button
                type="button"
                onClick={copy}
                className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-control border px-3 text-small font-semibold",
                    copied ? "border-success text-success" : "border-input-line text-ink hover:bg-ink/5"
                )}
                aria-label={`${copyLabel}: ${label}`}
            >
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
            </button>
        </div>
    );
};
