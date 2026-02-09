"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Car,
    Chrome,
    User,
    Phone,
    Check,
} from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const updateForm = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card variant="glass" className="p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                                <Car className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gradient">RideGrow</span>
                        </Link>
                        <h1 className="text-2xl font-bold mt-6 mb-2">Create Account</h1>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Join millions of users buying and selling vehicles
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                icon={<User className="w-5 h-5" />}
                                value={formData.name}
                                onChange={(e) => updateForm("name", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                icon={<Mail className="w-5 h-5" />}
                                value={formData.email}
                                onChange={(e) => updateForm("email", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <Input
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                icon={<Phone className="w-5 h-5" />}
                                value={formData.phone}
                                onChange={(e) => updateForm("phone", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                icon={<Lock className="w-5 h-5" />}
                                endIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                }
                                value={formData.password}
                                onChange={(e) => updateForm("password", e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 mt-1 rounded"
                                checked={formData.agreeTerms}
                                onChange={(e) => updateForm("agreeTerms", e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-sm text-[hsl(var(--muted-foreground))]">
                                I agree to the{" "}
                                <Link href="/legal/terms" className="text-[hsl(var(--primary))] hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/legal/privacy" className="text-[hsl(var(--primary))] hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button className="w-full" size="lg">
                            Create Account
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[hsl(var(--border))]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <Button variant="outline" className="w-full gap-2" size="lg">
                        <Chrome className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    {/* Sign In Link */}
                    <p className="text-center mt-6 text-[hsl(var(--muted-foreground))]">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-[hsl(var(--primary))] font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}
