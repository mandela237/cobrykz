import type { Metadata } from "next";
import SolutionsHub from "@/components/solutions/SolutionsHub";

export const metadata: Metadata = {
  title: "Business Technology Solutions | Cobrykz",
  description:
    "Explore AI, automation, custom software, websites, digital business systems, and technology consulting shaped around real business challenges.",
};

export default function SolutionsPage() {
  return <SolutionsHub />;
}
