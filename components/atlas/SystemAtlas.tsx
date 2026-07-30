import AtlasLegend from "./AtlasLegend";
import AtlasTextEquivalent from "./AtlasTextEquivalent";
import type { AtlasDefinition, AtlasNode } from "./types";

type SystemAtlasProps = {
  definition: AtlasDefinition;
  className?: string;
  tone?: "light" | "dark";
};

const safeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

function AtlasNodeShape({ node }: { node: AtlasNode }) {
  if (node.kind === "decision") {
    return (
      <path
        d={`M ${node.x} ${node.y - 12} L ${node.x + 12} ${node.y} L ${node.x} ${node.y + 12} L ${node.x - 12} ${node.y} Z`}
        className="atlas-node__shape"
      />
    );
  }

  if (node.kind === "outcome") {
    return (
      <rect
        x={node.x - 14}
        y={node.y - 10}
        width="28"
        height="20"
        rx="10"
        className="atlas-node__shape"
      />
    );
  }

  return (
    <circle
      cx={node.x}
      cy={node.y}
      r={node.kind === "control" || node.kind === "owner" ? 11 : 9}
      className="atlas-node__shape"
    />
  );
}

export default function SystemAtlas({
  definition,
  className = "",
  tone = "light",
}: SystemAtlasProps) {
  const id = safeId(definition.id);
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const markerId = `${id}-arrow`;

  return (
    <figure
      className={`system-atlas system-atlas--${tone} ${className}`.trim()}
      data-atlas-id={id}
    >
      <div className="system-atlas__heading">
        <p className="system-atlas__eyebrow">{definition.eyebrow}</p>
        <h2 className="system-atlas__title">{definition.title}</h2>
        <p className="system-atlas__description">{definition.description}</p>
      </div>

      <div className="system-atlas__viewport">
        <svg
          viewBox="0 0 720 440"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          className="system-atlas__svg"
        >
          <title id={titleId}>{definition.title}</title>
          <desc id={descriptionId}>
            {definition.description} {definition.readingDirection}
          </desc>
          <defs>
            <linearGradient
              id={`${id}-outcome-light`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="55%" stopColor="currentColor" stopOpacity="0.07" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
            </linearGradient>
            <filter
              id={`${id}-plane-material`}
              x="-20%"
              y="-20%"
              width="140%"
              height="160%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="12"
                floodColor="#081321"
                floodOpacity="0.18"
              />
            </filter>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="atlas-arrow" />
            </marker>
          </defs>

          <g aria-hidden="true">
            {definition.layers.map((layer) => (
              <g
                key={layer.id}
                className="atlas-layer"
                data-atlas-layer={layer.id}
                data-atlas-depth={layer.depth}
              >
                <rect
                  x={layer.bounds.x}
                  y={layer.bounds.y}
                  width={layer.bounds.width}
                  height={layer.bounds.height}
                  rx="14"
                  className="atlas-layer__plane"
                />
                <text
                  x={layer.bounds.x + 16}
                  y={layer.bounds.y + 24}
                  className="atlas-layer__label"
                >
                  {layer.label}
                </text>
              </g>
            ))}
          </g>

          <g aria-hidden="true">
            {definition.connections.map((connection) => {
              const source = definition.nodes.find(
                (node) => node.id === connection.source,
              );
              const target = definition.nodes.find(
                (node) => node.id === connection.target,
              );

              if (!source || !target) {
                return null;
              }

              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;

              return (
                <g
                  key={connection.id}
                  data-atlas-connection={connection.id}
                >
                  <path
                    d={`M ${source.x} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${target.x} ${target.y}`}
                    markerEnd={`url(#${markerId})`}
                    className="atlas-path"
                    data-atlas-state={connection.state ?? "supporting"}
                  />
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    className="atlas-path__label"
                  >
                    {connection.flowLabel}
                  </text>
                </g>
              );
            })}
          </g>

          <g aria-hidden="true">
            {definition.nodes.map((node) => (
              <g
                key={node.id}
                className="atlas-node"
                data-atlas-node={node.id}
                data-atlas-kind={node.kind}
                transform={`translate(0 0)`}
              >
                <AtlasNodeShape node={node} />
                <text
                  x={node.x}
                  y={node.y + 29}
                  textAnchor="middle"
                  className="atlas-node__label"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <AtlasLegend definition={definition} />
      <figcaption className="system-atlas__caption">
        {definition.readingDirection}
      </figcaption>
      <AtlasTextEquivalent definition={definition} />
    </figure>
  );
}
