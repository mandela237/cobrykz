import type { SolutionPageDefinition } from "@/components/content/solutions";
import ApplicationExamples from "@/components/solutions/ApplicationExamples";
import CapabilityList from "@/components/solutions/CapabilityList";
import OutcomeList from "@/components/solutions/OutcomeList";
import ProblemRecognition from "@/components/solutions/ProblemRecognition";
import RelatedSolutions from "@/components/solutions/RelatedSolutions";
import SolutionApproach from "@/components/solutions/SolutionApproach";
import SolutionFaqs from "@/components/solutions/SolutionFaqs";
import SolutionFinalCta from "@/components/solutions/SolutionFinalCta";
import SolutionGuidance from "@/components/solutions/SolutionGuidance";
import SolutionHero from "@/components/solutions/SolutionHero";

type SolutionPageProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionPage({ solution }: SolutionPageProps) {
  return (
    <>
      <SolutionHero solution={solution} />
      <ProblemRecognition solution={solution} />
      <OutcomeList solution={solution} />
      <CapabilityList solution={solution} />
      <ApplicationExamples solution={solution} />
      {solution.guidance && <SolutionGuidance guidance={solution.guidance} />}
      <SolutionApproach solution={solution} />
      <RelatedSolutions solution={solution} />
      <SolutionFaqs solution={solution} />
      <SolutionFinalCta solution={solution} />
    </>
  );
}
