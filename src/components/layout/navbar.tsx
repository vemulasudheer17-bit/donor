"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Car,
    Search,
    Settings,
    Heart,
    LogIn,
    Plus,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    {
        name: "Vehicles",
        href: "/vehicles",
        children: [
            { name: "Cars", href: "/vehicles?type=car" },
            { name: "Bikes", href: "/vehicles?type=bike" },
            { name: "Scooters", href: "/vehicles?type=scooter" },
            { name: "All Vehicles", href: "/vehicles" },
        ],
    },
    { name: "Finance", href: "/finance" },
    { name: "Sell", href: "/seller" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-[hsl(var(--card)/0.95)] backdrop-blur-xl shadow-lg border-b border-[hsl(var(--border))]"
                    : "bg-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg"
                        >
                            <Car className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                            <span className="text-2xl font-bold text-gradient">
                                RideGrow
                            </span>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] -mt-1">
                                Premium Vehicles
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() =>
                                    item.children && setActiveDropdown(item.name)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-medium transition-colors duration-200",
                                        "text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
                                    )}
                                >
                                    {item.name}
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                "w-4 h-4 transition-transform duration-200",
                                                activeDropdown === item.name && "rotate-180"
                                            )}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {item.children && activeDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 pt-2"
                                        >
                                            <div className="bg-[hsl(var(--card))] rounded-xl shadow-xl border border-[hsl(var(--border))] overflow-hidden min-w-[180px]">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] transition-colors"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Link href="/settings">
                            <Button variant="ghost" size="icon">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="outline" className="gap-2">
                                <LogIn className="w-4 h-4" />
                                Login
                            </Button>
                        </Link>
                        <Link href="/seller/create">
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                Sell Vehicle
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2">
                                {navigation.map((item) => (
                                    <div key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-base font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.children && (
                                            <div className="ml-4 space-y-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4 px-4 space-y-3">
                                    <Link href="/settings" className="block">
                                        <Button variant="ghost" className="w-full gap-2 justify-start">
                                            <Settings className="w-4 h-4" />
                                            Settings
                                        </Button>
                                    </Link>
                                    <Link href="/auth/login" className="block">
                                        <Button variant="outline" className="w-full gap-2">
                                            <LogIn className="w-4 h-4" />
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/seller/create" className="block">
                                        <Button className="w-full gap-2">
                                            <Plus className="w-4 h-4" />
                                            Sell Vehicle
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
