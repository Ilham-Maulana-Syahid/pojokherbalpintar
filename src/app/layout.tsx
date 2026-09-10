import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  // Fallback metric-compatible: build tidak gagal jika Google Fonts tak terjangkau
  adjustFontFallback: false,
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "Pojok Herbal Pintar | Inovasi Herbal untuk Kemandirian Kesehatan",
  description:
    "Platform edukasi herbal berbasis sains untuk kemandirian kesehatan masyarakat Indonesia. Menyediakan informasi herbal, wedang tradisional, dan konsultasi AI herbal.",
  keywords: [
    "herbal",
    "jamu",
    "kesehatan",
    "posyandu",
    "puskesmas",
    "wedang",
    "tradisional",
    "kemenkes",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Pojok Herbal Pintar",
    description: "Inovasi Herbal untuk Kemandirian Kesehatan Masyarakat",
    images: ["/logo.png"],
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Herbal Pintar",
  },
};

export const viewport: Viewport = {
  themeColor: "#2d6a4f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Herbal Pintar" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] font-sans">
        <ServiceWorkerRegister />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
