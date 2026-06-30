import CobrykzLogo from "./CobrykzLogo";

const services = [
  "Website Design",
  "Web Applications",
  "AI Solutions",
  "Business Automation",
  "Branding",
  "SEO & Growth",
];

const company = [
  { label: "About", href: "#founder" },
  { label: "Our Process", href: "#process" },
  { label: "Our Standard", href: "#our-standard" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0A0F1C] border-t border-white/06"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
          {/* Brand column */}
          <div>
            <CobrykzLogo
              size={28}
              variant="reversed"
              showWordmark
              wordmarkSize="sm"
              className="mb-4"
            />
            <p className="text-[13px] text-white/38 leading-[1.75] max-w-[220px]">
              Premium digital solutions for ambitious businesses. Built with
              craftsmanship. Delivered with integrity.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/06 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(248,250,252,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/06 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(248,250,252,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-white/06 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(248,250,252,0.5)" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">
              Services
            </p>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-150"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">
              Company
            </p>
            <ul className="space-y-3 mb-8" role="list">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-semibold px-4 py-2.5 rounded-lg transition-all duration-150"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/06 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/28 tracking-[0.02em]">
            &copy; {year} COBRYKZ. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[12px] text-white/28 hover:text-white/50 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-white/28 hover:text-white/50 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
