"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Car,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from "lucide-react";
import { Button, Input } from "@/components/ui";

const footerLinks = {
    vehicles: [
        { name: "Cars", href: "/vehicles?type=car" },
        { name: "Bikes", href: "/vehicles?type=bike" },
        { name: "Scooters", href: "/vehicles?type=scooter" },
        { name: "Commercial", href: "/vehicles?type=truck" },
    ],
    services: [
        { name: "Sell Your Vehicle", href: "/seller" },
        { name: "Finance Options", href: "/finance" },
        { name: "Vehicle Verification", href: "/services/verification" },
        { name: "Insurance", href: "/services/insurance" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Terms of Service", href: "/legal/terms" },
        { name: "Privacy Policy", href: "/legal/privacy" },
        { name: "Cookie Policy", href: "/legal/cookies" },
        { name: "Disclaimer", href: "/legal/disclaimer" },
    ],
};

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export function Footer() {
    return (
        <footer className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))] mt-20">
            {/* Newsletter Section */}
            <div className="border-b border-[hsl(var(--background)/0.1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold mb-2">
                                Subscribe to our newsletter
                            </h3>
                            <p className="text-[hsl(var(--background)/0.7)]">
                                Get the latest vehicles, deals, and automotive news
                            </p>
                        </div>
                        <form className="flex gap-3 w-full lg:w-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                icon={<Mail className="w-5 h-5" />}
                                className="flex-1 lg:w-80 bg-[hsl(var(--background)/0.1)] border-[hsl(var(--background)/0.2)] text-[hsl(var(--background))] placeholder:text-[hsl(var(--background)/0.5)]"
                            />
                            <Button variant="secondary" className="gap-2">
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--accent))] flex items-center justify-center"
                            >
                                <Car className="w-7 h-7 text-[hsl(var(--foreground))]" />
                            </motion.div>
                            <span className="text-2xl font-bold text-[hsl(var(--background))]">
                                RideGrow
                            </span>
                        </Link>
                        <p className="text-[hsl(var(--background)/0.7)] mb-6 max-w-sm">
                            India&apos;s most trusted marketplace for pre-owned vehicles.
                            Buy, sell, or finance with confidence.
                        </p>
                        <div className="space-y-3">
                            <a
                                href="tel:+911234567890"
                                className="flex items-center gap-3 text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                +91 123 456 7890
                            </a>
                            <a
                                href="mailto:hello@velomarket.com"
                                className="flex items-center gap-3 text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                hello@velomarket.com
                            </a>
                            <div className="flex items-start gap-3 text-[hsl(var(--background)/0.7)]">
                                <MapPin className="w-5 h-5 mt-0.5" />
                                <span>
                                    123 Auto Street, Tech Park
                                    <br />
                                    Hyderabad, India 500081
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold text-[hsl(var(--background))] mb-4">
                            Vehicles
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.vehicles.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[hsl(var(--background))] mb-4">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[hsl(var(--background))] mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[hsl(var(--background))] mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[hsl(var(--background)/0.7)] hover:text-[hsl(var(--secondary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[hsl(var(--background)/0.1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[hsl(var(--background)/0.6)] text-sm">
                            © 2024 RideGrow. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-[hsl(var(--background)/0.1)] flex items-center justify-center text-[hsl(var(--background)/0.7)] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
