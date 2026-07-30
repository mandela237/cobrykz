"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  primaryCta,
  primaryNavigation,
} from "@/components/content/site";
import { solutions } from "@/components/content/solutions";

const menuId = "mobile-primary-navigation";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="mobile-navigation">
      <button
        ref={triggerRef}
        type="button"
        className="mobile-navigation__trigger action-transition"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X size={20} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu size={20} strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <nav
          id={menuId}
          className="mobile-navigation__panel"
          aria-label="Mobile primary navigation"
        >
          <div className="mobile-navigation__primary">
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                className="mobile-navigation__link action-transition"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div
            className="mobile-navigation__solutions"
            aria-label="Solution destinations"
          >
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={solution.href}
                className="mobile-navigation__solution action-transition"
                onClick={closeMenu}
              >
                {solution.name}
              </Link>
            ))}
          </div>
          <Link
            href={primaryCta.href}
            className="mobile-navigation__cta action-transition"
            onClick={closeMenu}
          >
            {primaryCta.label}
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
