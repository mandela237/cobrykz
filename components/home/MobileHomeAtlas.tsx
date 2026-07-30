"use client";

import { useState } from "react";
import type { AtlasDefinition } from "@/components/atlas/types";
import MobileAtlasPath from "@/components/mobile/MobileAtlasPath";

type MobileHomeAtlasProps = {
  definition: AtlasDefinition;
  ariaLabel: string;
  initialSelectedNodeId: string;
};

export default function MobileHomeAtlas({
  definition,
  ariaLabel,
  initialSelectedNodeId,
}: MobileHomeAtlasProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    initialSelectedNodeId,
  );

  return (
    <MobileAtlasPath
      definition={definition}
      selectedNodeId={selectedNodeId}
      onSelectNode={setSelectedNodeId}
      ariaLabel={ariaLabel}
    />
  );
}
