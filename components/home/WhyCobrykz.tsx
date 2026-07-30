import { whyCobrykz } from "@/components/content/home";
import SectionIntro from "@/components/ui/SectionIntro";

export default function WhyCobrykz() {
  return (
    <section
      aria-labelledby="why-cobrykz-heading"
      id="why-cobrykz"
      className="border-y border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <SectionIntro
          id="why-cobrykz-heading"
          title="One accountable partner from decision to delivery."
          description="Strong systems come from keeping business context, technical judgment, and implementation responsibility connected."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {whyCobrykz.map((reason, index) => (
            <li
              key={reason.title}
              className="bg-white p-6 sm:min-h-64 lg:min-h-72"
            >
              <span
                aria-hidden="true"
                className="text-[11px] font-bold text-blue"
              >
                0{index + 1}
              </span>
              <h3 className="mt-8 text-lg font-bold leading-6 text-navy">
                {reason.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
