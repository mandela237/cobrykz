"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, LayoutGrid, Route } from "lucide-react";

export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const handleScroll = () => setVisible(window.scrollY > 560);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const contact = document.getElementById("m-contact");
    const observer = contact
      ? new IntersectionObserver(
          ([entry]) => setContactVisible(entry.isIntersecting),
          { threshold: 0.08 },
        )
      : null;
    if (contact && observer) observer.observe(contact);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  const show = visible && !contactVisible;

  return (
    <nav
      aria-label="Quick mobile actions"
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-[56px_56px_1fr] gap-1 rounded-lg border border-border bg-white p-1.5 shadow-[0_14px_36px_rgba(11,23,40,0.16)] transition-[transform,opacity] duration-200 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <a
        href="#m-services"
        aria-label="Services"
        className="action-transition m-control flex items-center justify-center text-slate hover:bg-gray-light hover:text-navy active:bg-gray-100"
      >
        <LayoutGrid size={18} strokeWidth={1.9} aria-hidden="true" />
      </a>
      <a
        href="#m-process"
        aria-label="Process"
        className="action-transition m-control flex items-center justify-center text-slate hover:bg-gray-light hover:text-navy active:bg-gray-100"
      >
        <Route size={18} strokeWidth={1.9} aria-hidden="true" />
      </a>
      <a
        href="#m-contact"
        className="action-transition m-control flex items-center justify-center gap-2 bg-blue px-4 text-[13px] font-semibold text-white hover:bg-blue-dark active:bg-blue-dark"
      >
        Start a project
        <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
      </a>
    </nav>
  );
}
