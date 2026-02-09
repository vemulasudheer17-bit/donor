"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, endIcon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-4 py-3 text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-2 focus:border-[hsl(var(--primary))]",
                        "hover:border-[hsl(var(--primary)/0.5)]",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        icon && "pl-12",
                        endIcon && "pr-12",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {endIcon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                        {endIcon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
