import { ArrowUpRight, Mail } from "lucide-react";
import CobrykzLogo from "./CobrykzLogo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Inside the build", href: "#inside-build" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#founder" },
  { label: "Questions", href: "#faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-footer-bg text-white">
      <div className="section-shell py-10 md:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <CobrykzLogo
              size={29}
              variant="reversed"
              showWordmark
              wordmarkSize="sm"
            />
            <p className="mt-5 max-w-[390px] text-[13px] leading-6 text-white/75">
              Websites and practical digital systems, designed and built
              directly by Mandela Atud for local businesses.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold uppercase text-white/65">
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-white/78 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-bold uppercase text-white/65">
              Contact
            </p>
            <a
              href="mailto:info@cobrykz.com"
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-white transition-colors hover:text-[#9CC8FF]"
            >
              <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
              info@cobrykz.com
            </a>
            <a
              href="#contact"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/14 bg-white/[0.06] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.1]"
            >
              Start a project
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} COBRYKZ. All rights reserved.</p>
          <p>Designed and built by Mandela Atud.</p>
        </div>
      </div>
    </footer>
  );
}
