"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

type MobileDisclosureGroupProps<T> = {
  items: T[];
  getId: (item: T) => string;
  renderSummary: (item: T, index: number, isOpen: boolean) => ReactNode;
  renderPanel: (item: T, index: number) => ReactNode;
  defaultOpenId?: string;
  ariaLabel: string;
};

export default function MobileDisclosureGroup<T>({
  items,
  getId,
  renderSummary,
  renderPanel,
  defaultOpenId,
  ariaLabel,
}: MobileDisclosureGroupProps<T>) {
  const groupId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="mobile-disclosure-group"
    >
      {items.map((item, index) => {
        const itemId = getId(item);
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
              {renderSummary(item, index, isOpen)}
            </button>
            <div
              id={panelId}
              hidden={!isOpen}
              className="mobile-disclosure-panel"
            >
              {renderPanel(item, index)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
