import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COBRYKZ — Premium Digital Solutions for Ambitious Businesses",
  description:
    "COBRYKZ builds premium websites and digital experiences that help businesses earn more trust, attract more clients, and grow faster. Founded by Mandela Atud.",
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
    title: "COBRYKZ — Premium Digital Solutions",
    description:
      "We build premium websites and digital experiences that help businesses earn more trust, attract more clients, and grow faster.",
    siteName: "COBRYKZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "COBRYKZ — Premium Digital Solutions",
    description:
      "We build premium websites and digital experiences that help businesses earn more trust, attract more clients, and grow faster.",
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
    <html lang="en" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
