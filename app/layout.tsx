import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "COBRYKZ — Founder-Led Websites for Local Businesses",
  description:
    "COBRYKZ designs and builds high-trust websites and practical digital systems for local businesses. Work directly with founder Mandela Atud.",
  keywords: [
    "premium website design",
    "web development",
    "business website",
    "digital solutions",
    "COBRYKZ",
    "Mandela Atud",
  ],
  authors: [{ name: "Mandela Atud" }],
  creator: "COBRYKZ",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "COBRYKZ — Founder-Led Websites for Local Businesses",
    description:
      "High-trust websites and practical digital systems, designed and built directly by Mandela Atud.",
    siteName: "COBRYKZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "COBRYKZ — Founder-Led Websites for Local Businesses",
    description:
      "High-trust websites and practical digital systems for local businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
