import { primaryCta } from "@/components/content/site";
import type { SolutionPageDefinition } from "@/components/content/solutions";
import PrimaryLink from "@/components/ui/PrimaryLink";

type SolutionFinalCtaProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionFinalCta({
  solution,
}: SolutionFinalCtaProps) {
  return (
    <section
      aria-labelledby="solution-final-cta-heading"
      className="border-t border-white/10 bg-charcoal text-white"
    >
      <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
        <h2
          id="solution-final-cta-heading"
          className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
        >
          {solution.cta.title}
        </h2>
        <PrimaryLink href={primaryCta.href} className="mt-8">
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </section>
  );
}
