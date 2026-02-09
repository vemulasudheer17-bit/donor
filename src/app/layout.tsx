import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import { AIChat } from "@/components/ai";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "RideGrow - Premium Pre-Owned Vehicle Marketplace",
  description:
    "India's most trusted marketplace for pre-owned cars, bikes, and vehicles. Buy, sell, or finance with confidence. Verified sellers, secure transactions, and AI-powered assistance.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RideGrow",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "used cars",
    "second hand cars",
    "pre-owned vehicles",
    "bikes",
    "car finance",
    "vehicle marketplace",
  ],
  authors: [{ name: "RideGrow" }],
  openGraph: {
    title: "RideGrow - Premium Pre-Owned Vehicle Marketplace",
    description:
      "India's most trusted marketplace for pre-owned cars, bikes, and vehicles.",
    type: "website",
    locale: "en_IN",
    siteName: "RideGrow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChat />
      </body>
    </html>
  );
}
