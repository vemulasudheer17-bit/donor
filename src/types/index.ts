// Vehicle Types
export type VehicleType = "car" | "bike" | "scooter" | "truck" | "other";

export type FuelType = "petrol" | "diesel" | "electric" | "hybrid" | "cng";

export type TransmissionType = "manual" | "automatic" | "cvt" | "dct";

export type VehicleCondition = "excellent" | "good" | "fair" | "needs-repair";

export interface Vehicle {
    id: string;
    title: string;
    type: VehicleType;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: FuelType;
    transmission: TransmissionType;
    condition: VehicleCondition;
    color: string;
    owners: number;
    location: string;
    description: string;
    features: string[];
    images: string[];
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
    saves: number;
    isVerified: boolean;
    isFeatured: boolean;
    isActive: boolean;
}

// User Types
export type UserRole = "buyer" | "seller" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    role: UserRole;
    isVerified: boolean;
    location: string;
    createdAt: Date;
    savedVehicles: string[];
}

// Finance Types
export interface FinanceOption {
    id: string;
    lenderName: string;
    logo: string;
    interestRate: number;
    minTenure: number;
    maxTenure: number;
    minAmount: number;
    maxAmount: number;
    processingFee: number;
    features: string[];
}

export interface FinanceApplication {
    id: string;
    userId: string;
    vehicleId: string;
    lenderId: string;
    amount: number;
    tenure: number;
    status: "pending" | "approved" | "rejected" | "processing";
    createdAt: Date;
}

// Transaction Types
export interface Transaction {
    id: string;
    vehicleId: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    type: "purchase" | "deposit" | "refund";
    status: "pending" | "completed" | "failed" | "cancelled";
    createdAt: Date;
}

// Message Types
export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    vehicleId?: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
}

// AI Agent Types
export interface AIMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export interface AIConversation {
    id: string;
    userId: string;
    messages: AIMessage[];
    createdAt: Date;
}

// Filter Types
export interface VehicleFilters {
    type?: VehicleType[];
    make?: string[];
    model?: string[];
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    fuelType?: FuelType[];
    transmission?: TransmissionType[];
    location?: string;
    condition?: VehicleCondition[];
}

export type SortOption = "price-asc" | "price-desc" | "date-new" | "date-old" | "mileage-low" | "mileage-high";
