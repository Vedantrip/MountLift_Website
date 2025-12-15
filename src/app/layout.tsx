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
  title: "MountLift - Influencer Marketing Agency",
  description: "MountLift is a data-driven influencer marketing agency that connects premium brands with authentic creators to drive measurable results and meaningful engagement.",
  keywords: ["MountLift", "influencer marketing", "creator tools", "brand partnerships", "social media marketing", "content creators"],
  authors: [{ name: "MountLift Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MountLift - Influencer Marketing Agency",
    description: "Data-driven influencer marketing that connects brands with authentic creators for measurable results.",
    url: "https://mountlift.agency",
    siteName: "MountLift",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MountLift - Influencer Marketing Agency",
    description: "Data-driven influencer marketing that connects brands with authentic creators for measurable results.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
