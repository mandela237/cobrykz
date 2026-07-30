import type { AtlasDefinition } from "./types";

type AtlasTextEquivalentProps = {
  definition: AtlasDefinition;
};

export default function AtlasTextEquivalent({
  definition,
}: AtlasTextEquivalentProps) {
  return (
    <div className="sr-only">
      <p>{definition.readingDirection}</p>
      <ol>
        {definition.layers.map((layer) => (
          <li key={layer.id}>
            <strong>{layer.label}:</strong> {layer.meaning}
          </li>
        ))}
      </ol>
      <ul>
        {definition.nodes.map((node) => (
          <li key={node.id}>
            {node.label}: {node.detail}
          </li>
        ))}
      </ul>
      <ul>
        {definition.connections.map((connection) => {
          const source = definition.nodes.find(
            (node) => node.id === connection.source,
          );
          const target = definition.nodes.find(
            (node) => node.id === connection.target,
          );

          return (
            <li key={connection.id}>
              {source?.label} to {target?.label}: {connection.flowLabel}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
