"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
    "rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] transition-all duration-300",
    {
        variants: {
            variant: {
                default: "shadow-sm hover:shadow-lg",
                elevated: "shadow-lg hover:shadow-xl hover:-translate-y-1",
                glass: "glass shadow-lg hover:shadow-xl",
                outline: "border-2 bg-transparent",
                featured:
                    "border-[hsl(var(--secondary))] shadow-lg shadow-[hsl(var(--secondary)/0.15)] hover:shadow-xl hover:shadow-[hsl(var(--secondary)/0.25)]",
            },
            padding: {
                none: "",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, padding, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-bold leading-tight tracking-tight text-[hsl(var(--foreground))]",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-[hsl(var(--muted-foreground))]", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
