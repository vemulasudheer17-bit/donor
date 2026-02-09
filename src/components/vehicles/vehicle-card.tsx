"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Heart,
    MapPin,
    Fuel,
    Gauge,
    Calendar,
    Users,
    Eye,
    BadgeCheck,
    Sparkles,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { Vehicle } from "@/types";
import { formatPrice, formatDistance } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
    vehicle: Vehicle;
    index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
    const [isSaved, setIsSaved] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card
                variant={vehicle.isFeatured ? "featured" : "elevated"}
                padding="none"
                className="overflow-hidden group"
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    {!imageError ? (
                        <Image
                            src={vehicle.images[0]}
                            alt={vehicle.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--border))] flex items-center justify-center">
                            <Gauge className="w-16 h-16 text-[hsl(var(--muted-foreground))]" />
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {vehicle.isFeatured && (
                            <Badge variant="secondary" className="gap-1">
                                <Sparkles className="w-3 h-3" />
                                Featured
                            </Badge>
                        )}
                        {vehicle.isVerified && (
                            <Badge variant="success" className="gap-1">
                                <BadgeCheck className="w-3 h-3" />
                                Verified
                            </Badge>
                        )}
                    </div>

                    {/* Vehicle Type Badge */}
                    <Badge
                        variant="muted"
                        className="absolute top-3 right-3 capitalize"
                    >
                        {vehicle.type}
                    </Badge>

                    {/* Save Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSaved(!isSaved);
                        }}
                        className={cn(
                            "absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                            isSaved
                                ? "bg-[hsl(var(--danger))] text-white"
                                : "bg-white/90 text-[hsl(var(--foreground))] hover:bg-white"
                        )}
                    >
                        <Heart
                            className={cn("w-5 h-5", isSaved && "fill-current")}
                        />
                    </motion.button>

                    {/* Views Counter */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4" />
                        {vehicle.views}
                    </div>
                </div>

                {/* Content */}
                <Link href={`/vehicle/${vehicle.id}`}>
                    <div className="p-5">
                        {/* Title & Price */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="font-bold text-lg text-[hsl(var(--foreground))] leading-tight line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                                {vehicle.title}
                            </h3>
                        </div>

                        {/* Price */}
                        <p className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
                            {formatPrice(vehicle.price)}
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <Calendar className="w-4 h-4" />
                                <span>{vehicle.year}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <Gauge className="w-4 h-4" />
                                <span>{formatDistance(vehicle.mileage)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <Fuel className="w-4 h-4" />
                                <span className="capitalize">{vehicle.fuelType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <Users className="w-4 h-4" />
                                <span>
                                    {vehicle.owners === 1
                                        ? "1st Owner"
                                        : `${vehicle.owners} Owners`}
                                </span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] pt-3 border-t border-[hsl(var(--border))]">
                            <MapPin className="w-4 h-4" />
                            <span>{vehicle.location}</span>
                        </div>
                    </div>
                </Link>

                {/* Quick Action */}
                <div className="px-5 pb-5">
                    <Link href={`/vehicle/${vehicle.id}`}>
                        <Button className="w-full" variant="outline">
                            View Details
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}
