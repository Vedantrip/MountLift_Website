import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MT/LFT | Attention Architectures",
  description: "We break algorithms. A data-driven influencer marketing agency matching premium brands with exclusive creators via proprietary neural networks.",
  keywords: ["MountLift", "influencer marketing", "viral scaling", "creator roster", "attention architecture"],
  authors: [{ name: "MountLift Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MT/LFT | Attention Architectures",
    description: "We break algorithms. A data-driven influencer marketing agency matching premium brands with exclusive creators.",
    url: "https://mountlift.agency",
    siteName: "MountLift",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MT/LFT | Attention Architectures",
    description: "We break algorithms. A data-driven influencer marketing agency matching premium brands with exclusive creators.",
  },
  other: {
    "instagram": "https://www.instagram.com/mount.lift/",
    "linkedin": "https://www.linkedin.com/company/mountlift-agency/",
    "website": "https://mountlift.agency"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col overscroll-none`}
      >
        <main className="flex-grow w-full">
          {children}
        </main>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}