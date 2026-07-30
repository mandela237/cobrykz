import { primaryCta } from "@/components/content/site";
import type { SolutionPageDefinition } from "@/components/content/solutions";
import PrimaryLink from "@/components/ui/PrimaryLink";

type SolutionHeroProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionHero({ solution }: SolutionHeroProps) {
  return (
    <section
      aria-labelledby="solution-hero-heading"
      className="border-b border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <p className="text-[11px] font-bold uppercase text-blue">
          {solution.name}
        </p>
        <h1
          id="solution-hero-heading"
          className="text-balance mt-5 max-w-5xl text-[2.625rem] font-extrabold leading-[1.02] text-navy sm:text-[3.5rem] lg:text-[4.25rem]"
        >
          {solution.outcome}
        </h1>
        <p className="mt-7 max-w-3xl text-[17px] leading-8 text-slate sm:text-lg">
          {solution.heroSupport}
        </p>
        <PrimaryLink href={primaryCta.href} className="mt-8">
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </section>
  );
}
