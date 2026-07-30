import { primaryCta } from "@/components/content/site";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function HomeFinalCTA() {
  return (
    <section
      aria-labelledby="home-final-cta-heading"
      id="contact"
      className="border-t border-white/10 bg-charcoal text-white"
    >
      <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
        <h2
          id="home-final-cta-heading"
          className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
        >
          What could technology improve in your business?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
          Begin with a challenge, bottleneck, or opportunity. You do not need a
          technical brief to start a useful conversation.
        </p>
        <PrimaryLink href={primaryCta.href} className="mt-8">
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </section>
  );
}
