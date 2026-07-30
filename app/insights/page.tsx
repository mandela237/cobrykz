import type { Metadata } from "next";
import { publishedInsights } from "@/components/content/insights";
import InsightsIndex from "@/components/insights/InsightsIndex";

const description =
  "Practical guidance from Cobrykz on using AI, automation, software, and digital systems to improve how businesses operate and grow.";

export const metadata: Metadata = {
  title: "Insights | Cobrykz",
  description,
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    type: "website",
    title: "Insights | Cobrykz",
    description,
    url: "/insights",
  },
  robots: {
    index: publishedInsights.length >= 3,
    follow: true,
  },
};

export default function InsightsRoute() {
  return <InsightsIndex insights={publishedInsights} />;
}
