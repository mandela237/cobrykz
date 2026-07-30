import SystemAtlas from "@/components/atlas/SystemAtlas";
import { solutionVisualBySlug } from "@/components/content/solutionVisuals";
import type { SolutionPageDefinition } from "@/components/content/solutions";

export default function SolutionOperatingModel({
  solution,
}: {
  solution: SolutionPageDefinition;
}) {
  const visual = solutionVisualBySlug[solution.slug];

  return (
    <section
      aria-label={`${solution.name} operating model`}
      className="border-y border-border bg-navy"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <SystemAtlas
          definition={visual.atlas}
          tone="dark"
          className="solution-operating-model"
        />
      </div>
    </section>
  );
}
