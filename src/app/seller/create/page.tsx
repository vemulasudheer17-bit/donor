"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    Car,
    Bike,
    Zap,
    Camera,
    X,
    Check,
    Info,
} from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui";
import { vehicleMakes, locations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, name: "Vehicle Type", description: "Select vehicle category" },
    { id: 2, name: "Details", description: "Enter vehicle information" },
    { id: 3, name: "Photos", description: "Upload vehicle images" },
    { id: 4, name: "Pricing", description: "Set your asking price" },
];

const vehicleTypes = [
    { value: "car", label: "Car", icon: Car, description: "Sedan, SUV, Hatchback, etc." },
    { value: "bike", label: "Bike", icon: Bike, description: "Motorcycle, Cruiser, Sports, etc." },
    { value: "scooter", label: "Electric", icon: Zap, description: "E-Scooter, E-Bike, etc." },
];

export default function CreateListingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        type: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        fuelType: "",
        transmission: "",
        color: "",
        owners: "",
        location: "",
        description: "",
        price: "",
        images: [] as string[],
    });

    const updateFormData = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/seller"
                        className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">List Your Vehicle</h1>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Create a listing in a few simple steps
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-10">
                    <div className="flex justify-between">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex flex-col items-center flex-1",
                                    step.id !== steps.length && "relative"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                                        currentStep > step.id
                                            ? "bg-[hsl(var(--success))] text-white"
                                            : currentStep === step.id
                                                ? "bg-[hsl(var(--primary))] text-white"
                                                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <p
                                    className={cn(
                                        "mt-2 text-sm font-medium hidden sm:block",
                                        currentStep >= step.id
                                            ? "text-[hsl(var(--foreground))]"
                                            : "text-[hsl(var(--muted-foreground))]"
                                    )}
                                >
                                    {step.name}
                                </p>
                                {step.id !== steps.length && (
                                    <div
                                        className={cn(
                                            "absolute top-5 left-[60%] w-[80%] h-0.5",
                                            currentStep > step.id
                                                ? "bg-[hsl(var(--success))]"
                                                : "bg-[hsl(var(--muted))]"
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <Card>
                    {/* Step 1: Vehicle Type */}
                    {currentStep === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-bold mb-2">What are you selling?</h2>
                            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                Select the type of vehicle you want to list
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {vehicleTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => updateFormData("type", type.value)}
                                        className={cn(
                                            "p-6 rounded-2xl border-2 transition-all text-left",
                                            formData.type === type.value
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]"
                                                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                                                formData.type === type.value
                                                    ? "gradient-primary"
                                                    : "bg-[hsl(var(--muted))]"
                                            )}
                                        >
                                            <type.icon
                                                className={cn(
                                                    "w-7 h-7",
                                                    formData.type === type.value
                                                        ? "text-white"
                                                        : "text-[hsl(var(--muted-foreground))]"
                                                )}
                                            />
                                        </div>
                                        <h3 className="font-bold mb-1">{type.label}</h3>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            {type.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Vehicle Details */}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-xl font-bold mb-2">Vehicle Details</h2>
                                <p className="text-[hsl(var(--muted-foreground))]">
                                    Provide accurate information about your vehicle
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Brand / Make</label>
                                    <select
                                        value={formData.make}
                                        onChange={(e) => updateFormData("make", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select Brand</option>
                                        {vehicleMakes[formData.type as keyof typeof vehicleMakes]?.map((make) => (
                                            <option key={make} value={make}>{make}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Model</label>
                                    <Input
                                        placeholder="e.g., City, Classic 350"
                                        value={formData.model}
                                        onChange={(e) => updateFormData("model", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Year</label>
                                    <select
                                        value={formData.year}
                                        onChange={(e) => updateFormData("year", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select Year</option>
                                        {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Kilometers Driven</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 25000"
                                        value={formData.mileage}
                                        onChange={(e) => updateFormData("mileage", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Fuel Type</label>
                                    <select
                                        value={formData.fuelType}
                                        onChange={(e) => updateFormData("fuelType", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select Fuel Type</option>
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="cng">CNG</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Transmission</label>
                                    <select
                                        value={formData.transmission}
                                        onChange={(e) => updateFormData("transmission", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select Transmission</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
                                        <option value="cvt">CVT</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <select
                                        value={formData.location}
                                        onChange={(e) => updateFormData("location", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select City</option>
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Number of Owners</label>
                                    <select
                                        value={formData.owners}
                                        onChange={(e) => updateFormData("owners", e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1st Owner</option>
                                        <option value="2">2nd Owner</option>
                                        <option value="3">3rd Owner</option>
                                        <option value="4">4+ Owners</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your vehicle's condition, features, service history..."
                                    value={formData.description}
                                    onChange={(e) => updateFormData("description", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] resize-none"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Photos */}
                    {currentStep === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-bold mb-2">Upload Photos</h2>
                            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                Add high-quality photos of your vehicle (minimum 3 photos)
                            </p>

                            <div
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="border-2 border-dashed border-[hsl(var(--border))] rounded-2xl p-10 text-center hover:border-[hsl(var(--primary))] transition-colors cursor-pointer bg-[hsl(var(--muted)/0.3)] hover:bg-[hsl(var(--muted)/0.5)]"
                            >
                                <div className="w-16 h-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
                                </div>
                                <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    PNG, JPG up to 10MB each
                                </p>
                                <input
                                    id="image-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
                                            setFormData(prev => ({
                                                ...prev,
                                                images: [...prev.images, ...newImages]
                                            }));
                                        }
                                    }}
                                />
                            </div>

                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                                    {formData.images.map((img, index) => (
                                        <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-[hsl(var(--border))]">
                                            <img
                                                src={img}
                                                alt={`Upload ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index)
                                                    }));
                                                }}
                                                className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-[hsl(var(--muted))] rounded-xl">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-[hsl(var(--primary))] mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium mb-1">Photo Tips</p>
                                        <ul className="text-[hsl(var(--muted-foreground))] space-y-1">
                                            <li>• Take photos in good lighting</li>
                                            <li>• Include exterior, interior, and dashboard</li>
                                            <li>• Show any damage or wear honestly</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Pricing */}
                    {currentStep === 4 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-bold mb-2">Set Your Price</h2>
                            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                Choose a competitive price for your vehicle
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Asking Price (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="e.g., 850000"
                                    value={formData.price}
                                    onChange={(e) => updateFormData("price", e.target.value)}
                                    className="text-2xl font-bold h-16"
                                />
                            </div>

                            <div className="p-4 bg-[hsl(var(--muted))] rounded-xl mb-6">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-[hsl(var(--primary))] mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium mb-1">AI Price Suggestion</p>
                                        <p className="text-[hsl(var(--muted-foreground))]">
                                            Based on similar vehicles, we recommend pricing between ₹8,00,000 - ₹9,50,000
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 gradient-primary rounded-2xl text-white text-center">
                                <p className="text-white/80 mb-1">Your vehicle will be listed at</p>
                                <p className="text-4xl font-bold">
                                    {formData.price ? `₹${parseInt(formData.price).toLocaleString("en-IN")}` : "₹0"}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-[hsl(var(--border))]">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </Button>
                        {currentStep < 4 ? (
                            <Button
                                onClick={nextStep}
                                disabled={currentStep === 1 && !formData.type}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button className="gap-2">
                                <Check className="w-4 h-4" />
                                Publish Listing
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div >
    );
}
