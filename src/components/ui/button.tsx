import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

// Variants follow DESIGN_SYSTEM.md: "donate" is the one yellow action per screen.
const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-on hover:bg-primary-hover",
                donate: "bg-accent text-accent-on hover:bg-accent-hover",
                outline: "border-2 border-primary text-primary hover:bg-primary/10",
                ghost: "text-ink hover:bg-ink/5",
                link: "text-primary underline-offset-4 hover:underline",
                destructive: "bg-danger text-white hover:bg-danger/90",
            },
            size: {
                default: "min-h-12 px-6 py-3 text-body",
                sm: "min-h-11 px-4 py-2 text-small",
                lg: "min-h-14 px-8 py-3 text-body",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
