"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Calculator,
    CreditCard,
    Building2,
    CheckCircle2,
    ArrowRight,
    FileText,
    Clock,
    Shield,
    Percent,
    BadgeCheck,
} from "lucide-react";
import { Button, Card, Badge, Input } from "@/components/ui";
import { mockFinanceOptions } from "@/lib/mock-data";
import { formatPrice, calculateEMI } from "@/lib/utils";

const benefits = [
    {
        icon: Clock,
        title: "Quick Approval",
        description: "Get loan approval within 24 hours",
    },
    {
        icon: Percent,
        title: "Low Interest Rates",
        description: "Starting from 8.25% per annum",
    },
    {
        icon: FileText,
        title: "Minimal Documents",
        description: "Only basic KYC documents required",
    },
    {
        icon: Shield,
        title: "Secure Process",
        description: "Bank-level security for your data",
    },
];

const steps = [
    { number: 1, title: "Apply Online", description: "Fill the simple application form" },
    { number: 2, title: "Get Approval", description: "Receive approval within 24 hours" },
    { number: 3, title: "Submit Documents", description: "Upload required documents online" },
    { number: 4, title: "Get Disbursement", description: "Amount transferred to seller" },
];

export default function FinancePage() {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [tenure, setTenure] = useState(36);
    const [selectedLender, setSelectedLender] = useState(mockFinanceOptions[0]);

    const emi = calculateEMI(loanAmount, selectedLender.interestRate, tenure);
    const totalPayable = emi * tenure;
    const totalInterest = totalPayable - loanAmount;

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            {/* Hero Section */}
            <section className="gradient-mesh py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="secondary" className="mb-4">
                                <CreditCard className="w-4 h-4 mr-1" />
                                Easy Vehicle Finance
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Get Your Dream Vehicle with{" "}
                                <span className="text-gradient">Easy EMI</span>
                            </h1>
                            <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8">
                                Low interest rates starting at 8.25%. Get instant approval from
                                India&apos;s leading banks and NBFCs.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="gap-2">
                                    Calculate EMI
                                    <Calculator className="w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    Apply Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* EMI Calculator Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card variant="glass" className="p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-[hsl(var(--primary))]" />
                                    EMI Calculator
                                </h2>

                                {/* Loan Amount */}
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium">Loan Amount</label>
                                        <span className="font-bold text-[hsl(var(--primary))]">
                                            {formatPrice(loanAmount)}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={50000}
                                        max={5000000}
                                        step={10000}
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
                                    />
                                    <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                        <span>₹50K</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium">Loan Tenure</label>
                                        <span className="font-bold text-[hsl(var(--primary))]">
                                            {tenure} months
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={12}
                                        max={84}
                                        step={6}
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
                                    />
                                    <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                        <span>12 months</span>
                                        <span>84 months</span>
                                    </div>
                                </div>

                                {/* Interest Rate Display */}
                                <div className="bg-[hsl(var(--muted))] rounded-xl p-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Interest Rate</span>
                                        <span className="font-bold text-lg">
                                            {selectedLender.interestRate}% p.a.
                                        </span>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="p-6 gradient-primary rounded-2xl text-white mb-6">
                                    <div className="text-center">
                                        <p className="text-white/80 mb-1">Monthly EMI</p>
                                        <p className="text-4xl font-bold">{formatPrice(emi)}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
                                        <div className="text-center">
                                            <p className="text-white/70 text-sm">Total Interest</p>
                                            <p className="font-semibold">{formatPrice(totalInterest)}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white/70 text-sm">Total Payable</p>
                                            <p className="font-semibold">{formatPrice(totalPayable)}</p>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full" size="lg">
                                    Apply for Loan
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-[hsl(var(--muted))]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="text-center h-full">
                                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                                        <benefit.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {benefit.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Lenders */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="accent" className="mb-3">
                            <Building2 className="w-4 h-4 mr-1" />
                            Our Partners
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Partner Banks & NBFCs
                        </h2>
                        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                            Get the best loan offers from India&apos;s top financial institutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockFinanceOptions.map((lender, index) => (
                            <motion.div
                                key={lender.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    variant={selectedLender.id === lender.id ? "featured" : "elevated"}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedLender(lender)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center overflow-hidden">
                                                <Building2 className="w-7 h-7 text-[hsl(var(--primary))]" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{lender.lenderName}</h3>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Processing fee: {lender.processingFee}%
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="success" className="gap-1">
                                            <BadgeCheck className="w-3 h-3" />
                                            Verified
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))] rounded-xl mb-4">
                                        <div>
                                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Interest Rate</p>
                                            <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                                                {lender.interestRate}%
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Tenure</p>
                                            <p className="font-semibold">
                                                {lender.minTenure}-{lender.maxTenure} months
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {lender.features.slice(0, 3).map((feature) => (
                                            <Badge key={feature} variant="outline" className="text-xs">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-[hsl(var(--foreground))]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-[hsl(var(--background)/0.7)] max-w-2xl mx-auto">
                            Get your vehicle loan in 4 simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center relative"
                            >
                                <div className="w-16 h-16 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-[hsl(var(--background)/0.7)]">{step.description}</p>

                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[hsl(var(--secondary)/0.3)]" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-primary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Finance Your Vehicle?
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        Get pre-approved in minutes. No impact on your credit score.
                    </p>
                    <Button size="xl" variant="secondary" className="gap-2">
                        Check Your Eligibility
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
