"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

export type MobileDisclosureItem = {
  id: string;
  summary: ReactNode;
  panel: ReactNode;
};

type MobileDisclosureGroupProps = {
  items: readonly MobileDisclosureItem[];
  defaultOpenId?: string;
  ariaLabel: string;
};

export default function MobileDisclosureGroup({
  items,
  defaultOpenId,
  ariaLabel,
}: MobileDisclosureGroupProps) {
  const groupId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="mobile-disclosure-group"
    >
      {items.map((item) => {
        const itemId = item.id;
        const isOpen = itemId === openId;
        const panelId = `${groupId}-${itemId}-panel`;

        return (
          <div key={itemId} data-disclosure-open={isOpen}>
            <button
              type="button"
              className="mobile-disclosure-trigger min-h-11"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : itemId)}
            >
              {item.summary}
            </button>
            <div
              id={panelId}
              hidden={!isOpen}
              className="mobile-disclosure-panel"
            >
              {item.panel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
