"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Car,
  Bike,
  Zap,
  Shield,
  BadgeCheck,
  Sparkles,
  TrendingUp,
  CreditCard,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { Button, Input, Card, Badge } from "@/components/ui";
import { VehicleCard } from "@/components/vehicles";
import { mockVehicles } from "@/lib/mock-data";

const vehicleTypes = [
  { name: "Cars", icon: Car, count: "25,000+", href: "/vehicles?type=car" },
  { name: "Bikes", icon: Bike, count: "15,000+", href: "/vehicles?type=bike" },
  { name: "Electric", icon: Zap, count: "5,000+", href: "/vehicles?type=scooter" },
];

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Sellers",
    description: "All sellers are verified with ID proof and address verification",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Bank-level security for all payments with fraud protection",
  },
  {
    icon: CreditCard,
    title: "Easy Finance",
    description: "Get instant loan approval from top banks at best rates",
  },
  {
    icon: Headphones,
    title: "AI Assistance",
    description: "24/7 AI-powered support for all your queries and concerns",
  },
];

const stats = [
  { value: "50,000+", label: "Vehicles Listed" },
  { value: "1M+", label: "Happy Customers" },
  { value: "500+", label: "Cities Covered" },
  { value: "₹100Cr+", label: "Transactions" },
];

export default function HomePage() {
  const featuredVehicles = mockVehicles.filter((v) => v.isFeatured).slice(0, 4);
  const latestVehicles = mockVehicles.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-mesh overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[hsl(var(--primary)/0.1)] blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.1)] blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
                <Sparkles className="w-4 h-4" />
                India&apos;s #1 Vehicle Marketplace
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Find Your{" "}
              <span className="text-gradient">Perfect Vehicle</span>
              <br />
              At The Best Price
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto"
            >
              Browse thousands of verified pre-owned cars, bikes, and electric vehicles.
              Buy, sell, or finance with complete peace of mind.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex gap-3 bg-[hsl(var(--card))] p-3 rounded-2xl shadow-xl border border-[hsl(var(--border))]">
                <Input
                  placeholder="Search by brand, model, or location..."
                  icon={<Search className="w-5 h-5" />}
                  className="flex-1 border-0 shadow-none bg-transparent"
                />
                <Button size="lg" className="px-8">
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Quick Search Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-16"
            >
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Popular:
              </span>
              {["Honda City", "Royal Enfield", "Maruti Swift", "Hyundai Creta"].map(
                (term) => (
                  <Link key={term} href={`/vehicles?search=${term}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                      {term}
                    </Badge>
                  </Link>
                )
              )}
            </motion.div>

            {/* Vehicle Type Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              {vehicleTypes.map((type, index) => (
                <Link key={type.name} href={type.href}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <type.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-sm">
                      {type.count} listings
                    </p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[hsl(var(--foreground))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-[hsl(var(--secondary))] mb-2">
                  {stat.value}
                </p>
                <p className="text-[hsl(var(--background)/0.7)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="secondary" className="mb-3">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Vehicles
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mt-2">
                Hand-picked premium vehicles with verified history
              </p>
            </div>
            <Link href="/vehicles?featured=true">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[hsl(var(--muted))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-3">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The RideGrow Advantage
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              We&apos;ve built the most trusted platform for buying and selling vehicles,
              with features that give you complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="elevated" className="text-center h-full">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 mx-auto">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Vehicles */}
      <section className="py-20 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="default" className="mb-3">
                Just Arrived
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Latest Listings
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mt-2">
                Fresh arrivals added by verified sellers
              </p>
            </div>
            <Link href="/vehicles">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/vehicles">
              <Button className="gap-2">
                View All Vehicles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Sell Your Vehicle?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              List your vehicle for free and reach thousands of potential buyers.
              Get the best price with our AI-powered pricing suggestions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/seller/create">
                <Button
                  size="xl"
                  variant="secondary"
                  className="gap-2 min-w-[200px]"
                >
                  Sell Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/finance">
                <Button
                  size="xl"
                  variant="outline"
                  className="gap-2 min-w-[200px] border-white text-white hover:bg-white hover:text-[hsl(var(--primary))]"
                >
                  Get Finance
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
