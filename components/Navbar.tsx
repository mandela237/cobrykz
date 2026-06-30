"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import CobrykzLogo from "./CobrykzLogo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#our-standard" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0F172A]/98 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-[#0F172A]/90 backdrop-blur-sm"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="COBRYKZ — go to top"
          >
            <CobrykzLogo size={28} variant="reversed" showWordmark wordmarkSize="sm" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-underline text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-150 px-3 py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="shimmer inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 active:scale-[0.98]"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white/70 hover:text-white p-2 rounded-md transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0F172A] flex flex-col pt-20 px-6 pb-10"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col gap-1 flex-1"
              role="list"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block text-2xl font-bold text-white/80 hover:text-white py-3 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="block w-full text-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-semibold px-6 py-4 rounded-xl transition-all duration-150"
              >
                Book a Discovery Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
