"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import CobrykzLogo from "./CobrykzLogo";

const navLinks = [
  { label: "Services", href: "#services",     id: "services"     },
  { label: "Work",     href: "#our-standard", id: "our-standard" },
  { label: "Process",  href: "#process",      id: "process"      },
  { label: "About",    href: "#founder",      id: "founder"      },
  { label: "Contact",  href: "#contact",      id: "contact"      },
];

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Frosted-glass trigger at 48px
  useEffect(() => {
    const check = () => setIsScrolled(window.scrollY > 48);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Active-section tracking via IntersectionObserver
  useEffect(() => {
    const els = navLinks
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* Gradient veil — darkens the hero behind the nav so text is always legible */}
      <div
        className="fixed top-0 left-0 right-0 z-[49] h-36 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,6,13,0.85) 0%, rgba(4,6,13,0.5) 44%, transparent 100%)",
        }}
      />

      {/* ─── HEADER ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-500"
        style={{
          background: isScrolled
            ? "rgba(6, 9, 15, 0.88)"
            : "transparent",
          boxShadow: isScrolled
            ? "0 1px 0 rgba(255,255,255,0.045), 0 8px 48px rgba(0,0,0,0.44)"
            : "none",
          backdropFilter: isScrolled ? "blur(24px) saturate(160%)" : "none",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#top"
            className="flex-shrink-0"
            aria-label="COBRYKZ — back to top"
          >
            <CobrykzLogo size={26} variant="reversed" showWordmark wordmarkSize="sm" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5" role="list">
            {navLinks.map(link => {
              const active = activeSection === link.id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`relative block px-4 py-2 text-[13px] font-medium rounded-lg transition-colors duration-150 ${
                      active
                        ? "text-white"
                        : "text-white/80 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-blue"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="shimmer inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-[13px] font-semibold px-5 py-[9px] rounded-xl transition-colors duration-150 active:scale-[0.98] shadow-[0_2px_18px_rgba(37,99,235,0.30),inset_0_1px_0_rgba(255,255,255,0.07)]"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white/80 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.14 }}
                >
                  <X size={20} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.14 }}
                >
                  <Menu size={20} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-40 bg-[#04060D] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Aurora ambient */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: [
                  "radial-gradient(ellipse 85% 55% at 15% 8%, rgba(37,99,235,0.20) 0%, transparent 62%)",
                  "radial-gradient(ellipse 65% 55% at 88% 88%, rgba(99,102,241,0.16) 0%, transparent 60%)",
                ].join(", "),
              }}
            />

            {/* Content below the fixed header */}
            <div className="relative z-10 flex flex-col flex-1 pt-16">

              {/* Divider under header area */}
              <div
                className="mx-6 h-px mb-8"
                style={{ background: "linear-gradient(to right, rgba(37,99,235,0.4), rgba(255,255,255,0.06), transparent)" }}
                aria-hidden="true"
              />

              {/* Editorial serif links */}
              <nav className="flex-1 flex flex-col justify-center px-6">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
                  className="space-y-0"
                  role="list"
                >
                  {navLinks.map(link => (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: 22 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={close}
                        className={`block font-serif italic font-normal text-[42px] min-[390px]:text-[48px] leading-[1.1] py-1.5 transition-colors duration-150 ${
                          activeSection === link.id
                            ? "text-white"
                            : "text-white/55 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              {/* Bottom: CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.4, ease }}
                className="px-6 pb-10 space-y-3"
              >
                <div
                  className="h-px mb-5"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  aria-hidden="true"
                />
                <a
                  href="#contact"
                  onClick={close}
                  className="block w-full text-center bg-blue hover:bg-blue-dark text-white text-[15px] font-semibold px-6 py-4 rounded-2xl transition-colors duration-150 shadow-[0_4px_24px_rgba(37,99,235,0.38)]"
                >
                  Book a Discovery Call
                </a>
                <p className="text-center text-[10px] text-white/28 tracking-[0.07em] uppercase">
                  Premium digital for the ambitious
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
