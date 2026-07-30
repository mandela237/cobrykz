import type { PublishedProjectDefinition } from "@/components/content/projects";

export default function TransformationRecord({
  project,
}: {
  project: PublishedProjectDefinition;
}) {
  const stages = [
    { label: "Condition", present: Boolean(project.context?.length || project.challenge?.length) },
    { label: "Decision", present: Boolean(project.strategy?.length) },
    { label: "Response", present: Boolean(project.solution?.length || project.howItWorks?.length) },
    { label: "Implementation", present: Boolean(project.implementation?.length) },
    { label: "Verified change", present: Boolean(project.verifiedOutcomes?.length) },
    { label: "Next stage", present: Boolean(project.nextStage?.length) },
  ].filter((stage) => stage.present);

  return (
    <section aria-label="Transformation record" className="border-b border-border bg-white">
      <div className="section-shell py-12 sm:py-16">
        <ol className="grid border-y border-border md:grid-cols-6">
          {stages.map((stage, index) => (
            <li key={stage.label} className="border-b border-border py-5 md:border-b-0 md:border-r md:px-4 md:last:border-r-0">
              <span className="text-[11px] font-bold text-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-sm font-bold text-navy">
                {stage.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
