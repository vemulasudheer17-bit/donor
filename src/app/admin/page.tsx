"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Car,
    Users,
    CreditCard,
    MessageCircle,
    Settings,
    BarChart3,
    Shield,
    Bot,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    DollarSign,
    Eye,
    Ban,
    Check,
    MoreVertical,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { mockVehicles, mockUsers } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "users", label: "Users", icon: Users },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "ai-agents", label: "AI Agents", icon: Bot },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
];

const stats = [
    { label: "Total Vehicles", value: "2,450", change: "+12%", icon: Car },
    { label: "Active Users", value: "15,230", change: "+8%", icon: Users },
    { label: "Transactions", value: "₹2.5Cr", change: "+24%", icon: CreditCard },
    { label: "AI Queries", value: "8,920", change: "+45%", icon: Bot },
];

const recentTransactions = [
    { id: 1, vehicle: "Honda City 2022", buyer: "Raj Kumar", amount: 1150000, status: "completed" },
    { id: 2, vehicle: "Royal Enfield Classic", buyer: "Priya Sharma", amount: 175000, status: "pending" },
    { id: 3, vehicle: "Maruti Swift", buyer: "Amit Patel", amount: 875000, status: "processing" },
    { id: 4, vehicle: "Hyundai Creta", buyer: "Sneha Gupta", amount: 1450000, status: "completed" },
];

const aiAgentStatus = [
    { name: "User Support Agent", status: "active", queries: 245, response: "0.8s" },
    { name: "Backend Monitor Agent", status: "active", queries: 89, response: "0.3s" },
    { name: "Knowledge Agent", status: "warning", queries: 156, response: "1.2s" },
];

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("dashboard");

    const [agents, setAgents] = useState([
        { name: "User Support Agent", status: "active", queries: 245, response: "0.8s" },
        { name: "Backend Monitor Agent", status: "processing", queries: 89, response: "0.3s" },
        { name: "Knowledge Agent", status: "active", queries: 156, response: "1.2s" },
    ]);

    // Simulate AI Agent activity
    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prevAgents => prevAgents.map(agent => ({
                ...agent,
                queries: agent.queries + Math.floor(Math.random() * 3),
                response: (parseFloat(agent.response) + (Math.random() * 0.2 - 0.1)).toFixed(1) + "s",
                status: Math.random() > 0.7 ? "processing" : "active"
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const pendingVehicles = mockVehicles.slice(0, 5);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] p-4 overflow-y-auto z-50">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary))] flex items-center justify-center">
                        <Shield className="w-6 h-6 text-[hsl(var(--foreground))]" />
                    </div>
                    <div>
                        <p className="font-bold">RideGrow</p>
                        <p className="text-xs text-[hsl(var(--background)/0.6)]">Admin Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                                activeSection === item.id
                                    ? "bg-[hsl(var(--background)/0.1)] text-[hsl(var(--secondary))]"
                                    : "text-[hsl(var(--background)/0.7)] hover:bg-[hsl(var(--background)/0.05)] hover:text-[hsl(var(--background))]"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold capitalize">{activeSection.replace("-", " ")}</h1>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Welcome back, Admin
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="warning" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            3 Pending Approvals
                        </Badge>
                        <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </div>

                {activeSection === "dashboard" && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                                <div className="flex items-center gap-1 mt-2 text-[hsl(var(--success))] text-sm">
                                                    <TrendingUp className="w-4 h-4" />
                                                    {stat.change}
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Transactions */}
                            <Card>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">Recent Transactions</h3>
                                    <Button variant="ghost" size="sm">View All</Button>
                                </div>
                                <div className="space-y-3">
                                    {recentTransactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between p-3 bg-[hsl(var(--muted))] rounded-xl"
                                        >
                                            <div>
                                                <p className="font-medium text-sm">{tx.vehicle}</p>
                                                <p className="text-xs text-[hsl(var(--muted-foreground))]">{tx.buyer}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{formatPrice(tx.amount)}</p>
                                                <Badge
                                                    variant={
                                                        tx.status === "completed"
                                                            ? "success"
                                                            : tx.status === "pending"
                                                                ? "warning"
                                                                : "default"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {tx.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* AI Agents Status */}
                            <Card>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">AI Agents Status</h3>
                                    <Button variant="ghost" size="sm">Manage</Button>
                                </div>
                                <div className="space-y-3">
                                    {agents.map((agent) => (
                                        <div
                                            key={agent.name}
                                            className="flex items-center justify-between p-3 bg-[hsl(var(--muted))] rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        "w-3 h-3 rounded-full transition-colors duration-500",
                                                        agent.status === "active"
                                                            ? "bg-[hsl(var(--success))]"
                                                            : agent.status === "processing"
                                                                ? "bg-[hsl(var(--primary))]"
                                                                : "bg-[hsl(var(--warning))]"
                                                    )}
                                                />
                                                <div>
                                                    <p className="font-medium text-sm">{agent.name}</p>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                                        {agent.queries} queries today
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{agent.response}</p>
                                                <p className="text-xs text-[hsl(var(--muted-foreground))]">avg response</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Pending Approvals */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold">Pending Vehicle Approvals</h3>
                                <Badge variant="warning">{pendingVehicles.length} pending</Badge>
                            </div>
                            <div className="space-y-3">
                                {pendingVehicles.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex items-center gap-4 p-3 bg-[hsl(var(--muted))] rounded-xl"
                                    >
                                        <img
                                            src={vehicle.images[0]}
                                            alt={vehicle.title}
                                            className="w-20 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{vehicle.title}</p>
                                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                {vehicle.location} • {formatPrice(vehicle.price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="gap-1">
                                                <Eye className="w-4 h-4" />
                                                Review
                                            </Button>
                                            <Button size="sm" variant="success" className="gap-1 bg-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.9)]">
                                                <Check className="w-4 h-4" />
                                                Approve
                                            </Button>
                                            <Button size="sm" variant="ghost" className="text-[hsl(var(--danger))]">
                                                <Ban className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeSection === "ai-agents" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {aiAgentStatus.map((agent, index) => (
                                <Card key={agent.name} variant="elevated">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-white" />
                                        </div>
                                        <Badge variant={agent.status === "active" ? "success" : "warning"}>
                                            {agent.status}
                                        </Badge>
                                    </div>
                                    <h3 className="font-bold mb-2">{agent.name}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-[hsl(var(--muted-foreground))]">Queries Today</span>
                                            <span className="font-medium">{agent.queries}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[hsl(var(--muted-foreground))]">Avg Response</span>
                                            <span className="font-medium">{agent.response}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button size="sm" variant="outline" className="flex-1">Configure</Button>
                                        <Button size="sm" variant="outline" className="flex-1">Logs</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <h3 className="font-bold mb-4">AI Agent Configuration</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                    <div>
                                        <p className="font-medium">Auto-response for common queries</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            Let AI handle frequently asked questions
                                        </p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                    <div>
                                        <p className="font-medium">Error auto-healing</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            Automatically fix common backend issues
                                        </p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl">
                                    <div>
                                        <p className="font-medium">Price suggestions</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            AI-powered pricing recommendations for sellers
                                        </p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeSection !== "dashboard" && activeSection !== "ai-agents" && (
                    <Card className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 capitalize">{activeSection.replace("-", " ")}</h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            This section is under development
                        </p>
                    </Card>
                )}
            </main>
        </div>
    );
}
