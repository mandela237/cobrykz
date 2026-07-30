import Link from "next/link";
import { processStages } from "@/components/content/home";
import SectionIntro from "@/components/ui/SectionIntro";

export default function ProcessOverview() {
  return (
    <section
      aria-labelledby="process-heading"
      id="process"
      className="border-y border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro
            id="process-heading"
            title="A clear path from question to working system."
            description="Each engagement follows the same disciplined sequence while adapting to the people, constraints, and outcomes involved."
          />
          <Link
            href="/process"
            className="action-transition inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
          >
            Explore the full process
          </Link>
        </div>
        <ol className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {processStages.map((stage, index) => (
            <li key={stage.title} className="border-t border-border pt-5">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="text-[11px] font-bold text-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-navy">{stage.title}</h3>
              </div>
              <p className="mt-3 pl-9 text-[15px] leading-7 text-slate">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
