import type { AtlasDefinition } from "./types";

type AtlasLegendProps = {
  definition: AtlasDefinition;
};

export default function AtlasLegend({ definition }: AtlasLegendProps) {
  if (!definition.legend?.length) {
    return null;
  }

  return (
    <dl
      aria-label={`${definition.title} legend`}
      className="atlas-legend"
    >
      {definition.legend.map((item) => (
        <div key={item.label} className="atlas-legend__item">
          <dt className="atlas-legend__term">{item.label}</dt>
          <dd className="atlas-legend__meaning">{item.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}
