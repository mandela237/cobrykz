import CobrykzLogo from "@/components/CobrykzLogo";

const links = [
  { label: "Services", href: "#m-services" },
  { label: "Process", href: "#m-process" },
  { label: "About", href: "#m-founder" },
];

export default function MobileFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg pb-24 text-white">
      <div className="m-shell border-t border-white/10 py-8">
        <CobrykzLogo
          size={25}
          variant="reversed"
          showWordmark
          wordmarkSize="sm"
        />
        <p className="mt-4 max-w-[310px] text-[11px] leading-5 text-white/45">
          Founder-led websites and practical digital systems for local
          businesses.
        </p>
        <nav className="mt-6 flex gap-5" aria-label="Mobile footer">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 min-w-11 items-center text-[11px] font-medium text-white/65"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="mt-5 border-t border-white/10 pt-5 text-[10px] text-white/32">
          &copy; {year} COBRYKZ. Built by Mandela Atud.
        </p>
      </div>
    </footer>
  );
}
