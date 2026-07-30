import Link from "next/link";
import { homeMessage } from "@/components/content/home";
import { primaryCta } from "@/components/content/site";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden border-b border-border bg-gray-light"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-blue-tint blur-3xl sm:h-96 sm:w-96"
      />
      <div className="section-shell py-20 sm:py-24 lg:py-32">
        <p className="text-[11px] font-bold uppercase text-blue">
          Business technology, connected
        </p>
        <h1
          id="home-hero-heading"
          className="text-balance mt-5 max-w-5xl text-[2.625rem] font-extrabold leading-[1.02] text-navy sm:text-[3.5rem] lg:text-[4.25rem]"
        >
          {homeMessage.headline}
        </h1>
        <p className="mt-7 max-w-3xl text-[17px] leading-8 text-slate sm:text-lg">
          {homeMessage.description}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryLink href={primaryCta.href}>
            {primaryCta.label}
          </PrimaryLink>
          <Link
            href="/solutions"
            className="action-transition inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-white px-5 text-[13px] font-semibold text-navy hover:border-blue hover:text-blue"
          >
            Explore our solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
