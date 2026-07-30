export default function AuthorityBand() {
  return (
    <section
      aria-labelledby="authority-heading"
      id="authority"
      className="bg-navy text-white"
    >
      <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
        <div>
          <p className="text-[11px] font-bold uppercase text-blue-tint">
            Accountable leadership
          </p>
          <h2
            id="authority-heading"
            className="text-balance mt-5 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            Clear thinking, direct responsibility.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
            Cobrykz is founded and led by Mandela Atud. Every engagement is
            guided by business understanding, technology judgment, and direct
            accountability from the first decision through delivery.
          </p>
        </div>

        <aside
          aria-labelledby="planned-insight-heading"
          className="border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
        >
          <p className="text-[11px] font-bold uppercase text-blue-tint">
            Planned insight
          </p>
          <h3
            id="planned-insight-heading"
            className="mt-5 text-2xl font-bold leading-8"
          >
            Where should a business actually start with AI?
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-white/70">
            A practical decision guide is in development. It will be published
            here when the full article is ready; this preview is not a live
            article link.
          </p>
        </aside>
      </div>
    </section>
  );
}
