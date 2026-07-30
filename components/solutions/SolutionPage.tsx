import type { SolutionPageDefinition } from "@/components/content/solutions";
import ApplicationExamples from "@/components/solutions/ApplicationExamples";
import CapabilityList from "@/components/solutions/CapabilityList";
import OutcomeList from "@/components/solutions/OutcomeList";
import ProblemRecognition from "@/components/solutions/ProblemRecognition";
import RelatedSolutions from "@/components/solutions/RelatedSolutions";
import SolutionApproach from "@/components/solutions/SolutionApproach";
import SolutionArtifact from "@/components/solutions/SolutionArtifact";
import SolutionFaqs from "@/components/solutions/SolutionFaqs";
import SolutionFinalCta from "@/components/solutions/SolutionFinalCta";
import SolutionGuidance from "@/components/solutions/SolutionGuidance";
import SolutionHero from "@/components/solutions/SolutionHero";
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
      <SolutionHero solution={solution} />
      <ProblemRecognition solution={solution} />
      <OutcomeList solution={solution} />
      <CapabilityList solution={solution} />
      <ApplicationExamples solution={solution} />
      {solution.artifact && <SolutionArtifact artifact={solution.artifact} />}
      {solution.guidance && <SolutionGuidance guidance={solution.guidance} />}
      <SolutionApproach solution={solution} />
      <RelatedSolutions solution={solution} />
      <SolutionFaqs solution={solution} />
      <SolutionFinalCta solution={solution} />
    </>
  );
}
