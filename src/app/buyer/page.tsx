"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Heart,
    Search,
    Clock,
    MessageCircle,
    CreditCard,
    Settings,
    Trash2,
    MapPin,
    Eye,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { mockVehicles } from "@/lib/mock-data";
import { formatPrice, formatDistance } from "@/lib/utils";

const tabs = [
    { id: "saved", label: "Saved Vehicles", icon: Heart, count: 5 },
    { id: "history", label: "Search History", icon: Clock, count: 12 },
    { id: "messages", label: "Messages", icon: MessageCircle, count: 3 },
    { id: "finance", label: "Finance", icon: CreditCard, count: 1 },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState("saved");
    const savedVehicles = mockVehicles.slice(0, 5);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Track your saved vehicles, messages, and finance applications
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-[hsl(var(--primary))] text-white"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary)/0.1)]"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.count && (
                                <Badge
                                    variant={activeTab === tab.id ? "secondary" : "muted"}
                                    className="text-xs"
                                >
                                    {tab.count}
                                </Badge>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "saved" && (
                    <div className="space-y-4">
                        {savedVehicles.map((vehicle, index) => (
                            <motion.div
                                key={vehicle.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card variant="elevated" className="p-0">
                                    <div className="flex flex-col md:flex-row gap-4 p-4">
                                        <Link
                                            href={`/vehicle/${vehicle.id}`}
                                            className="w-full md:w-56 aspect-video md:aspect-square rounded-xl overflow-hidden"
                                        >
                                            <img
                                                src={vehicle.images[0]}
                                                alt={vehicle.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <Link href={`/vehicle/${vehicle.id}`}>
                                                        <h3 className="text-lg font-bold hover:text-[hsl(var(--primary))] transition-colors">
                                                            {vehicle.title}
                                                        </h3>
                                                    </Link>
                                                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {vehicle.location}
                                                    </div>
                                                </div>
                                                <button className="p-2 text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)] rounded-lg transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <p className="text-2xl font-bold text-[hsl(var(--primary))] mt-3">
                                                {formatPrice(vehicle.price)}
                                            </p>

                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                                                <span>{vehicle.year}</span>
                                                <span>•</span>
                                                <span>{formatDistance(vehicle.mileage)}</span>
                                                <span>•</span>
                                                <span className="capitalize">{vehicle.fuelType}</span>
                                                <span>•</span>
                                                <span className="capitalize">{vehicle.transmission}</span>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Link href={`/vehicle/${vehicle.id}`}>
                                                    <Button variant="outline" size="sm" className="gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button size="sm" className="gap-1">
                                                    <MessageCircle className="w-4 h-4" />
                                                    Contact Seller
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === "history" && (
                    <Card>
                        <h3 className="font-bold mb-4">Recent Searches</h3>
                        <div className="space-y-3">
                            {["Honda City in Hyderabad", "Bikes under 2 lakhs", "Electric scooters", "SUV automatic"].map(
                                (search, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-[hsl(var(--muted))] rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Search className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                            <span>{search}</span>
                                        </div>
                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                            {index + 1}d ago
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                )}

                {activeTab === "messages" && (
                    <Card>
                        <div className="text-center py-16">
                            <MessageCircle className="w-16 h-16 text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">No Messages Yet</h3>
                            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                Start a conversation with sellers about vehicles you&apos;re interested in
                            </p>
                            <Link href="/vehicles">
                                <Button>Browse Vehicles</Button>
                            </Link>
                        </div>
                    </Card>
                )}

                {activeTab === "finance" && (
                    <Card>
                        <h3 className="font-bold mb-4">Finance Applications</h3>
                        <div className="p-6 bg-[hsl(var(--muted))] rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-medium">Honda City 2022</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        HDFC Bank • ₹10,50,000
                                    </p>
                                </div>
                                <Badge variant="warning">Processing</Badge>
                            </div>
                            <div className="w-full bg-[hsl(var(--border))] rounded-full h-2">
                                <div className="bg-[hsl(var(--warning))] h-2 rounded-full w-[60%]" />
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                                Document verification in progress
                            </p>
                        </div>
                    </Card>
                )}

                {activeTab === "settings" && (
                    <Card>
                        <h3 className="font-bold mb-4">Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Get alerts for new listings
                                    </p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                <div>
                                    <p className="font-medium">Price Drop Alerts</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Notify when saved vehicles reduce price
                                    </p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
