import Link from "next/link";
import { homeMessage, homePageCopy } from "@/components/content/home";
import { primaryCta, solutionsCta } from "@/components/content/site";
import BusinessSystemCutaway from "@/components/home/BusinessSystemCutaway";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="home-hero-atlas relative isolate overflow-hidden border-b border-white/10 bg-navy text-white"
    >
      <div
        aria-hidden="true"
        className="home-hero-atlas__field absolute inset-0 -z-10"
      />
      <div className="section-shell grid gap-12 py-16 sm:py-20 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,0.83fr)_minmax(34rem,1.17fr)] lg:items-center lg:gap-12 lg:py-20 xl:gap-16">
        <div className="home-hero-atlas__message relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-tint">
            {homePageCopy.hero.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="text-balance mt-5 max-w-4xl text-[2.625rem] font-extrabold leading-[1.02] text-white sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.45rem]"
          >
            {homeMessage.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/70 sm:text-lg">
            {homeMessage.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryLink href={primaryCta.href}>
              {primaryCta.label}
            </PrimaryLink>
            <Link
              href={solutionsCta.href}
              className="action-transition inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white hover:border-blue-tint hover:bg-white/10"
            >
              {solutionsCta.label}
            </Link>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/15 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white/52">
            <span>Understand</span>
            <span className="text-center">Connect</span>
            <span className="text-right">Improve</span>
          </div>
        </div>
        <BusinessSystemCutaway />
      </div>
    </section>
  );
}
