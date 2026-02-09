"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Grid3X3,
    List,
    X,
    ChevronDown,
    SlidersHorizontal,
    Car,
    Bike,
    Zap,
} from "lucide-react";
import { Button, Input, Card, Badge } from "@/components/ui";
import { VehicleCard } from "@/components/vehicles";
import { mockVehicles, vehicleMakes, locations } from "@/lib/mock-data";
import { VehicleType, FuelType, TransmissionType, SortOption } from "@/types";
import { cn } from "@/lib/utils";

const vehicleTypeOptions: { value: VehicleType; label: string; icon: React.ElementType }[] = [
    { value: "car", label: "Cars", icon: Car },
    { value: "bike", label: "Bikes", icon: Bike },
    { value: "scooter", label: "Scooters", icon: Zap },
];

const fuelTypeOptions: { value: FuelType; label: string }[] = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "cng", label: "CNG" },
];

const transmissionOptions: { value: TransmissionType; label: string }[] = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "cvt", label: "CVT" },
];

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "date-new", label: "Newest First" },
    { value: "date-old", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "mileage-low", label: "Lowest Mileage" },
];

const priceRanges = [
    { min: 0, max: 500000, label: "Under ₹5 Lakh" },
    { min: 500000, max: 1000000, label: "₹5-10 Lakh" },
    { min: 1000000, max: 2000000, label: "₹10-20 Lakh" },
    { min: 2000000, max: 5000000, label: "₹20-50 Lakh" },
    { min: 5000000, max: Infinity, label: "Above ₹50 Lakh" },
];

export default function VehiclesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<VehicleType[]>([]);
    const [selectedFuels, setSelectedFuels] = useState<FuelType[]>([]);
    const [selectedTransmission, setSelectedTransmission] = useState<TransmissionType[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("date-new");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = <T,>(
        value: T,
        selected: T[],
        setSelected: React.Dispatch<React.SetStateAction<T[]>>
    ) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((v) => v !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const filteredVehicles = useMemo(() => {
        let filtered = [...mockVehicles];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (v) =>
                    v.title.toLowerCase().includes(query) ||
                    v.make.toLowerCase().includes(query) ||
                    v.model.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (selectedTypes.length > 0) {
            filtered = filtered.filter((v) => selectedTypes.includes(v.type));
        }

        // Fuel filter
        if (selectedFuels.length > 0) {
            filtered = filtered.filter((v) => selectedFuels.includes(v.fuelType));
        }

        // Transmission filter
        if (selectedTransmission.length > 0) {
            filtered = filtered.filter((v) => selectedTransmission.includes(v.transmission));
        }

        // Location filter
        if (selectedLocation) {
            filtered = filtered.filter((v) => v.location === selectedLocation);
        }

        // Price range filter
        if (priceRange) {
            filtered = filtered.filter(
                (v) => v.price >= priceRange.min && v.price <= priceRange.max
            );
        }

        // Sort
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "date-new":
                filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;
            case "date-old":
                filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                break;
            case "mileage-low":
                filtered.sort((a, b) => a.mileage - b.mileage);
                break;
        }

        return filtered;
    }, [
        searchQuery,
        selectedTypes,
        selectedFuels,
        selectedTransmission,
        selectedLocation,
        priceRange,
        sortBy,
    ]);

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedTypes([]);
        setSelectedFuels([]);
        setSelectedTransmission([]);
        setSelectedLocation("");
        setPriceRange(null);
        setSortBy("date-new");
    };

    const activeFiltersCount =
        selectedTypes.length +
        selectedFuels.length +
        selectedTransmission.length +
        (selectedLocation ? 1 : 0) +
        (priceRange ? 1 : 0);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] pt-24">
            {/* Header */}
            <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full lg:max-w-xl">
                            <Input
                                placeholder="Search vehicles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                                endIcon={
                                    searchQuery && (
                                        <button onClick={() => setSearchQuery("")}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    )
                                }
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            {/* Filter Toggle (Mobile) */}
                            <Button
                                variant="outline"
                                className="lg:hidden gap-2 relative"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[hsl(var(--primary))] text-white text-xs rounded-full flex items-center justify-center">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </Button>

                            {/* Sort */}
                            <div className="relative flex-1 lg:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full lg:w-48 h-12 px-4 pr-10 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none" />
                            </div>

                            {/* View Mode */}
                            <div className="hidden sm:flex items-center bg-[hsl(var(--muted))] rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        viewMode === "grid"
                                            ? "bg-[hsl(var(--card))] shadow-sm"
                                            : "text-[hsl(var(--muted-foreground))]"
                                    )}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        viewMode === "list"
                                            ? "bg-[hsl(var(--card))] shadow-sm"
                                            : "text-[hsl(var(--muted-foreground))]"
                                    )}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Type Filters */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {vehicleTypeOptions.map((type) => (
                            <button
                                key={type.value}
                                onClick={() =>
                                    toggleFilter(type.value, selectedTypes, setSelectedTypes)
                                }
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap",
                                    selectedTypes.includes(type.value)
                                        ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                                        : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
                                )}
                            >
                                <type.icon className="w-4 h-4" />
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <Card variant="default" className="sticky top-48">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5" />
                                    Filters
                                </h3>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-[hsl(var(--primary))] hover:underline"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Price Range</h4>
                                <div className="space-y-2">
                                    {priceRanges.map((range) => (
                                        <button
                                            key={range.label}
                                            onClick={() =>
                                                setPriceRange(
                                                    priceRange?.min === range.min ? null : range
                                                )
                                            }
                                            className={cn(
                                                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                                priceRange?.min === range.min
                                                    ? "bg-[hsl(var(--primary))] text-white"
                                                    : "bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary)/0.1)]"
                                            )}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fuel Type */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Fuel Type</h4>
                                <div className="flex flex-wrap gap-2">
                                    {fuelTypeOptions.map((fuel) => (
                                        <button
                                            key={fuel.value}
                                            onClick={() =>
                                                toggleFilter(fuel.value, selectedFuels, setSelectedFuels)
                                            }
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-sm border transition-colors",
                                                selectedFuels.includes(fuel.value)
                                                    ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
                                            )}
                                        >
                                            {fuel.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Transmission</h4>
                                <div className="flex flex-wrap gap-2">
                                    {transmissionOptions.map((trans) => (
                                        <button
                                            key={trans.value}
                                            onClick={() =>
                                                toggleFilter(
                                                    trans.value,
                                                    selectedTransmission,
                                                    setSelectedTransmission
                                                )
                                            }
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-sm border transition-colors",
                                                selectedTransmission.includes(trans.value)
                                                    ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
                                            )}
                                        >
                                            {trans.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h4 className="font-semibold mb-3">Location</h4>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full h-10 px-3 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--card))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                >
                                    <option value="">All Locations</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Card>
                    </aside>

                    {/* Mobile Filters */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "-100%" }}
                                    transition={{ type: "spring", damping: 25 }}
                                    className="absolute left-0 top-0 bottom-0 w-80 bg-[hsl(var(--card))] p-6 overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-lg">Filters</h3>
                                        <button onClick={() => setIsFilterOpen(false)}>
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                    {/* Same filter content as desktop */}
                                    <div className="space-y-6">
                                        {/* Price Range */}
                                        <div>
                                            <h4 className="font-semibold mb-3">Price Range</h4>
                                            <div className="space-y-2">
                                                {priceRanges.map((range) => (
                                                    <button
                                                        key={range.label}
                                                        onClick={() =>
                                                            setPriceRange(
                                                                priceRange?.min === range.min ? null : range
                                                            )
                                                        }
                                                        className={cn(
                                                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                                            priceRange?.min === range.min
                                                                ? "bg-[hsl(var(--primary))] text-white"
                                                                : "bg-[hsl(var(--muted))]"
                                                        )}
                                                    >
                                                        {range.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fuel Type */}
                                        <div>
                                            <h4 className="font-semibold mb-3">Fuel Type</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {fuelTypeOptions.map((fuel) => (
                                                    <button
                                                        key={fuel.value}
                                                        onClick={() =>
                                                            toggleFilter(fuel.value, selectedFuels, setSelectedFuels)
                                                        }
                                                        className={cn(
                                                            "px-3 py-1.5 rounded-full text-sm border transition-colors",
                                                            selectedFuels.includes(fuel.value)
                                                                ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                                                                : "border-[hsl(var(--border))]"
                                                        )}
                                                    >
                                                        {fuel.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={clearAllFilters}
                                        >
                                            Clear All
                                        </Button>
                                        <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                                            Apply
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-[hsl(var(--muted-foreground))]">
                                <span className="font-semibold text-[hsl(var(--foreground))]">
                                    {filteredVehicles.length}
                                </span>{" "}
                                vehicles found
                            </p>
                            {activeFiltersCount > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Active filters:
                                    </span>
                                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                                </div>
                            )}
                        </div>

                        {/* Vehicle Grid */}
                        {filteredVehicles.length > 0 ? (
                            <div
                                className={cn(
                                    "grid gap-6",
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                                        : "grid-cols-1"
                                )}
                            >
                                {filteredVehicles.map((vehicle, index) => (
                                    <VehicleCard
                                        key={vehicle.id}
                                        vehicle={vehicle}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Card variant="default" className="text-center py-16">
                                <div className="w-20 h-20 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <Button onClick={clearAllFilters}>Clear All Filters</Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
