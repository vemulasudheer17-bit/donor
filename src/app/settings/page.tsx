"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    CreditCard,
    HelpCircle,
    ChevronRight,
    Moon,
    Sun,
    Smartphone,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const settingsSections = [
    {
        id: "account",
        name: "Account",
        icon: User,
        description: "Manage your profile and preferences",
    },
    {
        id: "notifications",
        name: "Notifications",
        icon: Bell,
        description: "Control how you receive updates",
    },
    {
        id: "privacy",
        name: "Privacy & Security",
        icon: Shield,
        description: "Manage your data and security settings",
    },
    {
        id: "appearance",
        name: "Appearance",
        icon: Palette,
        description: "Customize the look and feel",
    },
    {
        id: "language",
        name: "Language & Region",
        icon: Globe,
        description: "Set your language and location",
    },
    {
        id: "billing",
        name: "Billing",
        icon: CreditCard,
        description: "Manage payments and subscriptions",
    },
    {
        id: "help",
        name: "Help & Support",
        icon: HelpCircle,
        description: "Get help and contact support",
    },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("account");
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        priceAlerts: true,
        newListings: true,
        messages: true,
    });
    const [theme, setTheme] = useState("system");

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Manage your account and preferences
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-2">
                            <nav className="space-y-1">
                                {settingsSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                                            activeSection === section.id
                                                ? "bg-[hsl(var(--primary))] text-white"
                                                : "hover:bg-[hsl(var(--muted))]"
                                        )}
                                    >
                                        <section.icon className="w-5 h-5" />
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeSection === "account" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <h2 className="text-xl font-bold mb-6">Account Settings</h2>

                                    {/* Profile Section */}
                                    <div className="flex items-center gap-4 p-4 bg-[hsl(var(--muted))] rounded-xl mb-6">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-2xl font-bold">
                                            U
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg">User Name</p>
                                            <p className="text-[hsl(var(--muted-foreground))]">
                                                user@example.com
                                            </p>
                                        </div>
                                        <Button variant="outline">Edit Profile</Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Email Address</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    user@example.com
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Change
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Phone Number</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    +91 98765 43210
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Change
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Password</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Last changed 30 days ago
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Update
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
                                        <Button variant="outline" className="text-[hsl(var(--danger))]">
                                            Delete Account
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeSection === "notifications" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

                                    <div className="space-y-4">
                                        {[
                                            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                                            { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                                            { key: "sms", label: "SMS Alerts", desc: "Get text messages for important updates" },
                                            { key: "priceAlerts", label: "Price Drop Alerts", desc: "When saved vehicles reduce price" },
                                            { key: "newListings", label: "New Listings", desc: "Matching your search criteria" },
                                            { key: "messages", label: "Messages", desc: "When sellers respond to inquiries" },
                                        ].map((item) => (
                                            <div
                                                key={item.key}
                                                className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.label}</p>
                                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key as keyof typeof notifications]}
                                                        onChange={(e) =>
                                                            setNotifications((prev) => ({
                                                                ...prev,
                                                                [item.key]: e.target.checked,
                                                            }))
                                                        }
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-[hsl(var(--border))] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--primary))]"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeSection === "appearance" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <h2 className="text-xl font-bold mb-6">Appearance</h2>

                                    <div className="mb-6">
                                        <p className="font-medium mb-4">Theme</p>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: "light", label: "Light", icon: Sun },
                                                { id: "dark", label: "Dark", icon: Moon },
                                                { id: "system", label: "System", icon: Smartphone },
                                            ].map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setTheme(option.id)}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                                                        theme === option.id
                                                            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                                                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
                                                    )}
                                                >
                                                    <option.icon
                                                        className={cn(
                                                            "w-6 h-6",
                                                            theme === option.id
                                                                ? "text-[hsl(var(--primary))]"
                                                                : "text-[hsl(var(--muted-foreground))]"
                                                        )}
                                                    />
                                                    <span className="font-medium">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeSection === "privacy" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Two-Factor Authentication</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Add an extra layer of security
                                                </p>
                                            </div>
                                            <Badge variant="warning">Not Enabled</Badge>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Profile Visibility</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Control who can see your profile
                                                </p>
                                            </div>
                                            <select className="px-3 py-1 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                                                <option>Public</option>
                                                <option>Private</option>
                                                <option>Contacts Only</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                            <div>
                                                <p className="font-medium">Data Export</p>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Download a copy of your data
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Request Export
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {(activeSection === "language" ||
                            activeSection === "billing" ||
                            activeSection === "help") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="text-center py-16">
                                        <div className="w-20 h-20 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto mb-4">
                                            {activeSection === "language" && <Globe className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />}
                                            {activeSection === "billing" && <CreditCard className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />}
                                            {activeSection === "help" && <HelpCircle className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 capitalize">
                                            {settingsSections.find((s) => s.id === activeSection)?.name}
                                        </h3>
                                        <p className="text-[hsl(var(--muted-foreground))]">
                                            This section is coming soon
                                        </p>
                                    </Card>
                                </motion.div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
