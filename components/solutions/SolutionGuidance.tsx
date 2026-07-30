import type { SolutionPageDefinition } from "@/components/content/solutions";

type SolutionGuidanceProps = {
  guidance: NonNullable<SolutionPageDefinition["guidance"]>;
};

export default function SolutionGuidance({
  guidance,
}: SolutionGuidanceProps) {
  return (
    <section
      aria-labelledby="solution-guidance-heading"
      className="border-y border-border bg-blue-tint"
    >
      <div className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <h2
            id="solution-guidance-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem]"
          >
            {guidance.title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate sm:text-[17px]">
            {guidance.description}
          </p>
        </div>
      </div>
    </section>
  );
}
