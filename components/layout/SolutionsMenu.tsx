"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { solutions } from "@/components/content/solutions";

const menuId = "site-solutions-menu";

export default function SolutionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape") {
      closeMenu();
      buttonRef.current?.focus();
    }
  };

  return (
    <li className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-underline action-transition flex min-h-11 items-center gap-1.5 px-2 text-[13px] font-medium text-slate hover:text-navy active:text-navy md:px-3"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        Solutions
        <ChevronDown
          size={15}
          strokeWidth={2}
          aria-hidden="true"
          className={isOpen ? "text-blue" : "text-slate-light"}
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute left-0 top-full z-50 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-white p-2 shadow-[0_18px_48px_rgba(11,23,40,0.14)]"
        >
          <ul role="list">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <a
                  href={solution.href}
                  className="action-transition block rounded-lg px-3 py-3 hover:bg-gray-light active:bg-gray-100"
                  onClick={closeMenu}
                >
                  <span className="block text-[13px] font-semibold text-navy">
                    {solution.name}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-slate">
                    {solution.navOutcome}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
