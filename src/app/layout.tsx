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
  // This controls the text displayed on the browser tab
  title: "MountLife | Influencer Marketing Agency",
  description:
    "Elevating brands through authentic influencer partnerships. MountLife is a data-driven influencer marketing agency connecting premium brands with authentic creators.",
  keywords: [
    "Influencer Marketing",
    "MountLife",
    "Brand Agency",
    "Creators",
    "Marketing Strategy",
  ],
  authors: [{ name: "MountLife Team" }],
  icons: {
    // This controls the small icon on the browser tab
    // If you have a favicon.ico in your 'public' folder, this will use it.
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MountLife - Lift Your Brand",
    description: "Elevating brands through authentic influencer partnerships.",
    url: "https://mountlife.com",
    siteName: "MountLife",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MountLife",
    description: "Elevating brands through authentic influencer partnerships.",
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