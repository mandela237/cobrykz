import {
  ArrowUpRight,
  Blocks,
  Check,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";

const services = [
  {
    label: "Core",
    title: "A website that makes the right first impression",
    description:
      "Clear positioning, confident visual design, and a fast build that turns attention into a next step.",
    outcomes: [
      "Custom strategy and page structure",
      "Responsive design and development",
      "Conversion-focused calls to action",
    ],
    icon: MonitorSmartphone,
    featured: true,
  },
  {
    label: "Extend",
    title: "Digital systems that remove friction",
    description:
      "Practical tools for businesses ready to make booking, intake, lead handling, or internal work easier.",
    outcomes: [
      "Booking and intake flows",
      "Client portals and internal tools",
      "Thoughtful AI and automation",
    ],
    icon: Blocks,
    featured: false,
  },
  {
    label: "Support",
    title: "Ongoing care without agency overhead",
    description:
      "A dependable technical partner for updates, improvements, and the details that keep your site credible.",
    outcomes: [
      "Content and feature updates",
      "Performance and quality reviews",
      "Clear recommendations as you grow",
    ],
    icon: Wrench,
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[0.9fr_1.1fr] md:items-end md:pb-14">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
              What COBRYKZ builds
            </p>
            <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
              A better website first. Smarter systems when you need them.
            </h2>
          </div>
          <p className="max-w-[520px] text-[15px] leading-[1.8] text-slate md:justify-self-end md:text-[17px]">
            Local businesses rarely need more technology. They need the right
            technology, explained clearly and built around how people actually
            choose, call, book, and buy.
          </p>
        </div>

        <div className="divide-y divide-border">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`grid gap-5 py-9 md:grid-cols-[150px_1fr_0.9fr] md:gap-8 md:py-11 ${
                  service.featured ? "relative" : ""
                }`}
              >
                {service.featured && (
                  <div
                    className="absolute -inset-x-5 inset-y-0 -z-10 bg-blue-tint/55 md:-inset-x-8"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-3 md:items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue/15 bg-white text-blue shadow-[0_8px_20px_rgba(31,94,255,0.08)]">
                    <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                  </div>
                  <span className="pt-0 text-[11px] font-bold uppercase tracking-normal text-slate md:pt-3">
                    {service.label}
                  </span>
                </div>

                <div>
                  <h3 className="max-w-[540px] text-[23px] font-bold leading-[1.25] tracking-normal text-navy md:text-[28px]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[560px] text-[14px] leading-7 text-slate md:text-[15px]">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 self-center text-[13px] text-charcoal md:text-[14px]">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <Check
                        size={16}
                        strokeWidth={2.1}
                        className="mt-0.5 flex-none text-evergreen"
                        aria-hidden="true"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="max-w-[580px] text-[14px] leading-6 text-slate">
            Not sure what you need yet? Start with the business problem. The
            right scope comes after.
          </p>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-blue transition-colors hover:text-blue-dark"
          >
            Talk through your project
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
