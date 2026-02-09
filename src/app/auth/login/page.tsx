"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Car,
    Chrome,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate network delay
        setTimeout(() => {
            // Check credentials
            if (
                (identifier.toLowerCase() === "sudheer" || identifier === "sudheer@ridegrow.com") &&
                password === "sudheer123"
            ) {
                // Successful login
                // In a real app, you would set auth tokens here
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", "admin");
                localStorage.setItem("userName", "Sudheer");
                router.push("/admin");
            } else if (identifier === "admin" && password === "admin") {
                // Fallback admin login
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", "admin");
                localStorage.setItem("userName", "Admin");
                router.push("/admin");
            } else {
                setError("Invalid username or password");
                setIsLoading(false);
            }
        }, 1500);
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
                        <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Status Message */}
                    {statusMessage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                        >
                            <CheckCircle className="w-4 h-4" />
                            {statusMessage}
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email or Username</label>
                            <Input
                                type="text"
                                placeholder="Enter 'sudheer'"
                                icon={<Mail className="w-5 h-5" />}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter 'sudheer123'"
                                icon={<Lock className="w-5 h-5" />}
                                endIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                }
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded" />
                                <span>Remember me</span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-[hsl(var(--primary))] hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    Signing In...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
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
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        size="lg"
                        disabled={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            setError("");
                            setStatusMessage("Connecting to Google...");

                            // Simulate Google Login delay
                            setTimeout(() => {
                                setStatusMessage("Successfully signed in as sudheer@gmail.com");

                                setTimeout(() => {
                                    localStorage.setItem("isLoggedIn", "true");
                                    localStorage.setItem("userRole", "admin");
                                    localStorage.setItem("userName", "Sudheer (Google)");
                                    router.push("/admin");
                                }, 1000);
                            }, 1500);
                        }}
                    >
                        <Chrome className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-[hsl(var(--muted-foreground))]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="text-[hsl(var(--primary))] font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}

