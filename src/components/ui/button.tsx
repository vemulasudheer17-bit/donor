"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-shine",
    {
        variants: {
            variant: {
                default:
                    "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] shadow-lg shadow-[hsl(var(--primary)/0.25)] hover:shadow-xl hover:shadow-[hsl(var(--primary)/0.35)] hover:-translate-y-0.5",
                secondary:
                    "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.9)] shadow-lg shadow-[hsl(var(--secondary)/0.25)] hover:shadow-xl hover:shadow-[hsl(var(--secondary)/0.35)] hover:-translate-y-0.5",
                accent:
                    "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.9)] shadow-lg shadow-[hsl(var(--accent)/0.25)] hover:shadow-xl hover:shadow-[hsl(var(--accent)/0.35)] hover:-translate-y-0.5",
                success:
                    "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success)/0.9)] shadow-lg shadow-[hsl(var(--success)/0.25)]",
                danger:
                    "bg-[hsl(var(--danger))] text-[hsl(var(--danger-foreground))] hover:bg-[hsl(var(--danger)/0.9)] shadow-lg shadow-[hsl(var(--danger)/0.25)]",
                outline:
                    "border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-transparent hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]",
                ghost:
                    "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
                link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-lg px-4 text-xs",
                lg: "h-14 rounded-2xl px-8 text-base",
                xl: "h-16 rounded-2xl px-10 text-lg",
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
