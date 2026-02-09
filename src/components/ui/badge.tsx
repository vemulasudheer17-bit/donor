"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
    {
        variants: {
            variant: {
                default:
                    "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                secondary:
                    "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
                accent:
                    "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]",
                success:
                    "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]",
                warning:
                    "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]",
                danger:
                    "bg-[hsl(var(--danger))] text-[hsl(var(--danger-foreground))]",
                outline:
                    "border border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-transparent",
                muted:
                    "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
