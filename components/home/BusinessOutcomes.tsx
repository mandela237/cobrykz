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
        <ol
          data-home-composition="terminal-states"
          className="home-terminal-states mt-14 grid border-y border-border md:grid-cols-12"
        >
          {homeOutcomes.map((outcome, index) => (
            <li
              key={outcome.title}
              className={`relative border-b border-border py-8 last:border-b-0 md:border-b-0 md:px-8 md:py-10 ${
                index === 0
                  ? "md:col-span-5 md:border-r md:pl-0"
                  : index === 1
                    ? "md:col-span-4 md:border-r"
                    : "md:col-span-3 md:pr-0"
              }`}
            >
              <span
                aria-hidden="true"
                className="text-[11px] font-bold text-blue"
              >
                0{index + 1}
              </span>
              <h3
                className={`mt-4 font-bold text-navy ${
                  index === 0 ? "text-2xl sm:text-3xl" : "text-xl"
                }`}
              >
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
