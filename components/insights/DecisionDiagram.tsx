import SystemAtlas from "@/components/atlas/SystemAtlas";
import type { AtlasDefinition } from "@/components/atlas/types";

export default function DecisionDiagram({
  definition,
}: {
  definition: AtlasDefinition;
}) {
  return (
    <section aria-label="Decision model" className="border-b border-border bg-gray-light">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <SystemAtlas definition={definition} />
      </div>
    </section>
  );
}
