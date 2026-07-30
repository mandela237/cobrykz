import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
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
  metadataBase: new URL("https://cobrykz.com"),
  title: "Cobrykz | AI, Automation, Software & Digital Systems",
  description:
    "Cobrykz helps businesses grow and operate more effectively through AI, automation, custom software, websites, and connected digital systems.",
  authors: [{ name: "Mandela Atud" }],
  creator: "Cobrykz",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cobrykz",
    title: "Cobrykz | AI, Automation, Software & Digital Systems",
    description:
      "Better systems for stronger businesses—from strategy through ongoing improvement.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cobrykz | AI, Automation, Software & Digital Systems",
    description:
      "Better systems for stronger businesses—from strategy through ongoing improvement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="site-shell-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
