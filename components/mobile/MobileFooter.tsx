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
        <p className="mt-4 max-w-[310px] text-[13px] leading-5 text-white/72">
          Websites and practical digital systems, designed and built directly
          by Mandela Atud.
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
        <p className="mt-5 border-t border-white/10 pt-5 text-[13px] text-white/65">
          &copy; {year} COBRYKZ. Built by Mandela Atud.
        </p>
      </div>
    </footer>
  );
}
