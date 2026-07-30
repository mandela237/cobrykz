import SolutionsHub from "@/components/solutions/SolutionsHub";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata = buildPageMetadata({
  title: "Business Technology Solutions | Cobrykz",
  description:
    "Explore AI, automation, custom software, websites, digital business systems, and technology consulting shaped around real business challenges.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <SolutionsHub />;
}
