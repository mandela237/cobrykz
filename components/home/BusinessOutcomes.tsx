import { homeOutcomes } from "@/components/content/home";
import SectionIntro from "@/components/ui/SectionIntro";

export default function BusinessOutcomes() {
  return (
    <section
      aria-labelledby="outcomes-heading"
      id="outcomes"
      className="border-b border-border bg-white"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <SectionIntro
          id="outcomes-heading"
          title="Technology should make the business stronger."
          description="The right system creates progress people can recognize in growth, day-to-day work, and important decisions."
        />
        <ol className="mt-12 grid border-y border-border md:grid-cols-3">
          {homeOutcomes.map((outcome, index) => (
            <li
              key={outcome.title}
              className="border-b border-border py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="text-[11px] font-bold text-blue"
              >
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy">
                {outcome.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                {outcome.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
