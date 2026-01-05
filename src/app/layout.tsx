import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sdah-philippine-edition.vercel.app"),
  title: "SDA Hymnal Philippine Edition",
  description: "Digital collection of the SDA Hymnal Philippine Edition, featuring lyrics, and sheet music.",
  openGraph: {
    title: "SDA Hymnal Philippine Edition",
    description: "Digital collection of the SDA Hymnal Philippine Edition",
    siteName: "SDA Hymnal PH",
    type: "website",
  },
  verification: {
    google: "google09a54106ded3a245", // Adding explicit tag as fallback/best practice
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
