import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Crave Dine | Your Taste, Our Passion",
    template: "%s | Crave Dine",
  },
  description:
    "Crave Dine — premium restaurant on Multan Road, Dokota. Order BBQ, karahi, Chinese, rice, snacks, and more online.",
  keywords: [
    "Crave Dine",
    "restaurant Multan Road",
    "BBQ",
    "karahi",
    "online ordering",
    "Dokota",
  ],
  openGraph: {
    title: "Crave Dine | Your Taste, Our Passion",
    description:
      "Premium restaurant flavours — BBQ, karahi, Chinese classics, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
