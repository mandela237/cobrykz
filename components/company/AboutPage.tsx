import type { AboutPageDefinition } from "@/components/content/companyPages";
import ConnectedPartnerAtlas from "@/components/company/ConnectedPartnerAtlas";
import FounderAccountability from "@/components/company/FounderAccountability";
import PrimaryLink from "@/components/ui/PrimaryLink";

type AboutPageProps = {
  content: AboutPageDefinition;
};

export default function AboutPage({ content }: AboutPageProps) {
  return (
    <>
      <section
        id="about-hero"
        aria-labelledby="about-hero-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              {content.eyebrow}
            </p>
            <h1
              id="about-hero-heading"
              className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl"
            >
              {content.headline}
            </h1>
          </div>
          <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {content.introduction.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-7 text-slate first:mt-0 sm:text-[17px] sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Why Cobrykz exists" className="bg-navy text-white">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <p className="max-w-5xl text-[2rem] leading-[1.2] text-white sm:text-[2.5rem] lg:text-5xl">
            {content.foundingTension}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="about-purpose-heading"
        className="border-b border-border bg-white"
      >
        <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
          <h2
            id="about-purpose-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
          >
            {content.purpose.title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate sm:text-[17px] sm:leading-8">
            {content.purpose.description}
          </p>
        </div>
      </section>

      <section aria-label="Company principles" className="bg-gray-light">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <ol className="border-t border-border">
            {content.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="grid gap-3 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start"
              >
                <span
                  aria-hidden="true"
                  className="text-[11px] font-bold text-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-bold leading-7 text-navy sm:text-2xl">
                  {principle.title}
                </h2>
                <p className="text-[15px] leading-7 text-slate">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="about-partnership-heading"
        className="bg-charcoal text-white"
      >
        <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
          <h2
            id="about-partnership-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            {content.partnership.title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-[17px] sm:leading-8">
            {content.partnership.description}
          </p>
          <div className="lg:col-span-2">
            <ConnectedPartnerAtlas />
          </div>
        </div>
      </section>

      <FounderAccountability leadership={content.leadership} />

      <section aria-label="Company standards" className="bg-gray-light">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <ol className="grid border-l border-t border-border md:grid-cols-2">
            {content.standards.map((standard) => (
              <li
                key={standard.title}
                className="border-b border-r border-border bg-white p-7 sm:p-9"
              >
                <h2 className="text-xl font-bold leading-7 text-navy sm:text-2xl">
                  {standard.title}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-slate">
                  {standard.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="about-cta"
        aria-labelledby="about-cta-heading"
        className="bg-charcoal text-white"
      >
        <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
          <h2
            id="about-cta-heading"
            className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            {content.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
            {content.cta.description}
          </p>
          <PrimaryLink href={content.cta.href} className="mt-8">
            {content.cta.label}
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
