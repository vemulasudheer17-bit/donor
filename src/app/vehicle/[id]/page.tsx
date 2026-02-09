"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Heart,
    Share2,
    MapPin,
    Calendar,
    Gauge,
    Fuel,
    Users,
    Settings,
    Shield,
    BadgeCheck,
    Phone,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Calculator,
    CreditCard,
    Check,
} from "lucide-react";
import { Button, Card, Badge, Input } from "@/components/ui";
import { VehicleCard } from "@/components/vehicles";
import { mockVehicles, mockUsers, mockFinanceOptions } from "@/lib/mock-data";
import { formatPrice, formatDistance, calculateEMI } from "@/lib/utils";

export default function VehicleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const vehicle = mockVehicles.find((v) => v.id === resolvedParams.id);
    const seller = mockUsers.find((u) => u.id === vehicle?.sellerId);
    const similarVehicles = mockVehicles
        .filter((v) => v.id !== resolvedParams.id && v.type === vehicle?.type)
        .slice(0, 4);

    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "features" | "finance">("overview");
    const [loanAmount, setLoanAmount] = useState(vehicle?.price || 0);
    const [loanTenure, setLoanTenure] = useState(36);

    if (!vehicle) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Card className="text-center p-10">
                    <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        The vehicle you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/vehicles">
                        <Button>Browse Vehicles</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const selectedFinance = mockFinanceOptions[0];
    const emi = calculateEMI(loanAmount, selectedFinance.interestRate, loanTenure);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm">
                    <Link
                        href="/vehicles"
                        className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to listings
                    </Link>
                    <span className="text-[hsl(var(--muted-foreground))]">/</span>
                    <span className="text-[hsl(var(--foreground))] font-medium truncate">
                        {vehicle.title}
                    </span>
                </nav>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <Card padding="none" className="overflow-hidden">
                            {/* Main Image */}
                            <div
                                className="relative aspect-[16/10] cursor-pointer group"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <Image
                                    src={vehicle.images[selectedImage]}
                                    alt={vehicle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {vehicle.isFeatured && (
                                        <Badge variant="secondary">Featured</Badge>
                                    )}
                                    {vehicle.isVerified && (
                                        <Badge variant="success" className="gap-1">
                                            <BadgeCheck className="w-3 h-3" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>

                                {/* Navigation Arrows */}
                                {vehicle.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(
                                                    selectedImage === 0
                                                        ? vehicle.images.length - 1
                                                        : selectedImage - 1
                                                );
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(
                                                    selectedImage === vehicle.images.length - 1
                                                        ? 0
                                                        : selectedImage + 1
                                                );
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                    {selectedImage + 1} / {vehicle.images.length}
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            {vehicle.images.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto">
                                    {vehicle.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${selectedImage === index
                                                    ? "ring-2 ring-[hsl(var(--primary))] ring-offset-2"
                                                    : "opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${vehicle.title} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-[hsl(var(--border))]">
                            {(["overview", "features", "finance"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 font-medium capitalize transition-colors relative ${activeTab === tab
                                            ? "text-[hsl(var(--primary))]"
                                            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Specs Grid */}
                                    <Card>
                                        <h3 className="font-bold text-lg mb-4">Vehicle Specifications</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Calendar className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Year</p>
                                                    <p className="font-semibold">{vehicle.year}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Gauge className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Mileage</p>
                                                    <p className="font-semibold">{formatDistance(vehicle.mileage)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Fuel className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Fuel</p>
                                                    <p className="font-semibold capitalize">{vehicle.fuelType}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Settings className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Transmission</p>
                                                    <p className="font-semibold capitalize">{vehicle.transmission}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Users className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Owners</p>
                                                    <p className="font-semibold">{vehicle.owners === 1 ? "1st Owner" : `${vehicle.owners} Owners`}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
                                                <Shield className="w-5 h-5 text-[hsl(var(--primary))]" />
                                                <div>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Condition</p>
                                                    <p className="font-semibold capitalize">{vehicle.condition}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Description */}
                                    <Card>
                                        <h3 className="font-bold text-lg mb-4">Description</h3>
                                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                                            {vehicle.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === "features" && (
                                <motion.div
                                    key="features"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Card>
                                        <h3 className="font-bold text-lg mb-4">Features & Highlights</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {vehicle.features.map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-[hsl(var(--success))] flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === "finance" && (
                                <motion.div
                                    key="finance"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Card>
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                            <Calculator className="w-5 h-5" />
                                            EMI Calculator
                                        </h3>

                                        <div className="space-y-6">
                                            {/* Loan Amount */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Loan Amount: {formatPrice(loanAmount)}
                                                </label>
                                                <input
                                                    type="range"
                                                    min={vehicle.price * 0.5}
                                                    max={vehicle.price}
                                                    step={10000}
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                                    className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
                                                />
                                            </div>

                                            {/* Tenure */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Tenure: {loanTenure} months
                                                </label>
                                                <input
                                                    type="range"
                                                    min={12}
                                                    max={84}
                                                    step={6}
                                                    value={loanTenure}
                                                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                                                    className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
                                                />
                                            </div>

                                            {/* EMI Result */}
                                            <div className="p-6 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl text-white">
                                                <p className="text-white/80 mb-1">Estimated Monthly EMI</p>
                                                <p className="text-4xl font-bold">{formatPrice(emi)}</p>
                                                <p className="text-sm text-white/70 mt-2">
                                                    @ {selectedFinance.interestRate}% interest rate
                                                </p>
                                            </div>

                                            <Button className="w-full" size="lg">
                                                <CreditCard className="w-5 h-5 mr-2" />
                                                Apply for Finance
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Price & Contact */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <Card variant="elevated" className="sticky top-28">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold mb-2">{vehicle.title}</h1>
                                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                                    <MapPin className="w-4 h-4" />
                                    {vehicle.location}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Price</p>
                                <p className="text-4xl font-bold text-[hsl(var(--primary))]">
                                    {formatPrice(vehicle.price)}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    EMI from {formatPrice(emi)}/month
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mb-6">
                                <Button className="w-full" size="lg">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Contact Seller
                                </Button>
                                <Button variant="outline" className="w-full" size="lg">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Chat Now
                                </Button>
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex gap-3">
                                <Button
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={() => setIsSaved(!isSaved)}
                                >
                                    <Heart
                                        className={`w-5 h-5 mr-2 ${isSaved ? "fill-[hsl(var(--danger))] text-[hsl(var(--danger))]" : ""
                                            }`}
                                    />
                                    {isSaved ? "Saved" : "Save"}
                                </Button>
                                <Button variant="ghost" className="flex-1">
                                    <Share2 className="w-5 h-5 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </Card>

                        {/* Seller Card */}
                        {seller && (
                            <Card>
                                <h3 className="font-bold mb-4">Seller Information</h3>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={seller.avatar || "/placeholder.png"}
                                        alt={seller.name}
                                        width={56}
                                        height={56}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold flex items-center gap-2">
                                            {seller.name}
                                            {seller.isVerified && (
                                                <BadgeCheck className="w-4 h-4 text-[hsl(var(--success))]" />
                                            )}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            Member since 2023
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Similar Vehicles */}
                {similarVehicles.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarVehicles.map((v, index) => (
                                <VehicleCard key={v.id} vehicle={v} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="relative w-full max-w-5xl aspect-video mx-4">
                            <Image
                                src={vehicle.images[selectedImage]}
                                alt={vehicle.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        {vehicle.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(
                                            selectedImage === 0
                                                ? vehicle.images.length - 1
                                                : selectedImage - 1
                                        );
                                    }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(
                                            selectedImage === vehicle.images.length - 1
                                                ? 0
                                                : selectedImage + 1
                                        );
                                    }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
