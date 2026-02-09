"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Plus,
    Car,
    BarChart3,
    MessageCircle,
    Settings,
    Eye,
    Heart,
    TrendingUp,
    DollarSign,
    Edit,
    Trash2,
    MoreVertical,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { mockVehicles } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

const stats = [
    { label: "Active Listings", value: "3", icon: Car, trend: "+1" },
    { label: "Total Views", value: "2,450", icon: Eye, trend: "+18%" },
    { label: "Total Saves", value: "156", icon: Heart, trend: "+24%" },
    { label: "Inquiries", value: "12", icon: MessageCircle, trend: "+8" },
];

const tabs = [
    { id: "listings", label: "My Listings", icon: Car },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState("listings");
    const myListings = mockVehicles.slice(0, 3);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Manage your vehicle listings and track performance
                        </p>
                    </div>
                    <Link href="/seller/create">
                        <Button className="gap-2">
                            <Plus className="w-5 h-5" />
                            Add New Vehicle
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                        <div className="flex items-center gap-1 mt-2 text-[hsl(var(--success))] text-sm">
                                            <TrendingUp className="w-4 h-4" />
                                            {stat.trend}
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
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
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === "listings" && (
                    <div className="space-y-4">
                        {myListings.map((vehicle) => (
                            <Card key={vehicle.id} variant="elevated" className="p-0">
                                <div className="flex flex-col md:flex-row gap-4 p-4">
                                    {/* Image */}
                                    <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden bg-[hsl(var(--muted))]">
                                        <img
                                            src={vehicle.images[0]}
                                            alt={vehicle.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-bold">{vehicle.title}</h3>
                                                    {vehicle.isVerified && (
                                                        <Badge variant="success">Verified</Badge>
                                                    )}
                                                    {vehicle.isFeatured && (
                                                        <Badge variant="secondary">Featured</Badge>
                                                    )}
                                                </div>
                                                <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                                                    {formatPrice(vehicle.price)}
                                                </p>
                                            </div>
                                            <button className="p-2 hover:bg-[hsl(var(--muted))] rounded-lg">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-[hsl(var(--muted-foreground))]">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {vehicle.views} views
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                {vehicle.saves} saves
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                5 inquiries
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                Boost
                                            </Button>
                                            <Button variant="ghost" size="sm" className="gap-1 text-[hsl(var(--danger))]">
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === "analytics" && (
                    <Card>
                        <div className="text-center py-16">
                            <BarChart3 className="w-16 h-16 text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Analytics Coming Soon</h3>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Detailed analytics will be available here
                            </p>
                        </div>
                    </Card>
                )}

                {activeTab === "messages" && (
                    <Card>
                        <div className="text-center py-16">
                            <MessageCircle className="w-16 h-16 text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">No Messages Yet</h3>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Buyer inquiries will appear here
                            </p>
                        </div>
                    </Card>
                )}

                {activeTab === "settings" && (
                    <Card>
                        <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Receive updates about inquiries
                                    </p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                <div>
                                    <p className="font-medium">SMS Alerts</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Get SMS for new inquiries
                                    </p>
                                </div>
                                <input type="checkbox" className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
