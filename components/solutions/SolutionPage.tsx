import type { SolutionPageDefinition } from "@/components/content/solutions";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";
import DesktopSolutionPage from "@/components/solutions/DesktopSolutionPage";
import MobileSolutionPage from "@/components/solutions/MobileSolutionPage";
import { serializeJsonLd, siteUrl } from "@/lib/seo/site";

type SolutionPageProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionPage({ solution }: SolutionPageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
      { "@type": "ListItem", position: 3, name: solution.name, item: `${siteUrl}${solution.href}` },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.heroSupport,
    url: `${siteUrl}${solution.href}`,
    provider: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <ResponsivePageComposition
        mobile={<MobileSolutionPage solution={solution} />}
        desktop={<DesktopSolutionPage solution={solution} />}
      />
    </>
  );
}
