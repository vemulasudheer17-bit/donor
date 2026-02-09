import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + " L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatDistance(km: number): string {
  return new Intl.NumberFormat("en-IN").format(km) + " km";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateEMI(
  principal: number,
  rate: number,
  tenure: number
): number {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi);
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
