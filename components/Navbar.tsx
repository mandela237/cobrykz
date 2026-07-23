"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import CobrykzLogo from "./CobrykzLogo";

const navLinks = [
  {
    label: "Services",
    desktopHref: "#services",
    mobileHref: "#m-services",
    id: "services",
  },
  {
    label: "Inside the build",
    desktopHref: "#inside-build",
    mobileHref: "#m-inside-build",
    id: "inside-build",
  },
  {
    label: "Process",
    desktopHref: "#process",
    mobileHref: "#m-process",
    id: "process",
  },
  {
    label: "About",
    desktopHref: "#founder",
    mobileHref: "#m-founder",
    id: "founder",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-border bg-white shadow-[0_10px_30px_rgba(11,23,40,0.055)]"
            : "border-transparent bg-transparent md:bg-white/95"
        }`}
      >
        <nav
          className="section-shell flex h-16 items-center justify-between md:h-[72px]"
          aria-label="Main navigation"
        >
          <a
            href="#m-top"
            className="flex-shrink-0 md:hidden"
            aria-label="COBRYKZ, back to top"
          >
            <CobrykzLogo
              size={28}
              variant="default"
              showWordmark
              wordmarkSize="sm"
            />
          </a>
          <a
            href="#top"
            className="hidden flex-shrink-0 md:block"
            aria-label="COBRYKZ, back to top"
          >
            <CobrykzLogo
              size={28}
              variant="default"
              showWordmark
              wordmarkSize="sm"
            />
          </a>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <li key={link.desktopHref}>
                  <a
                    href={link.desktopHref}
                    className={`nav-underline action-transition block px-4 py-2 text-[13px] font-medium ${
                      active ? "text-navy" : "text-slate hover:text-navy"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="action-transition hidden min-h-11 items-center gap-2 rounded-lg bg-blue px-5 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(31,94,255,0.24)] hover:bg-blue-dark active:bg-blue-dark md:inline-flex"
          >
            Start a project
            <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="action-transition flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-white text-navy hover:bg-gray-light active:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-white px-5 pb-6 pt-24 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="absolute inset-0 bg-gray-light" aria-hidden="true" />
          <nav className="relative mx-auto flex w-full max-w-md flex-1 flex-col">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-normal text-slate">
              Navigate
            </p>
            <ul className="border-t border-border" role="list">
              {navLinks.filter((link) => link.id !== "inside-build").map((link) => (
                <li key={link.mobileHref} className="border-b border-border">
                  <a
                    href={link.mobileHref}
                    onClick={closeMenu}
                    className="action-transition flex min-h-14 items-center justify-between text-[18px] font-semibold text-navy hover:text-blue-dark"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.8}
                      className="text-blue"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="mb-4 max-w-xs text-[14px] leading-6 text-slate">
                Tell Mandela what your business needs. You will hear directly
                from the person doing the work.
              </p>
              <a
                href="#m-contact"
                onClick={closeMenu}
                className="action-transition flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue px-5 text-[14px] font-semibold text-white hover:bg-blue-dark active:bg-blue-dark"
              >
                Start a project
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
