import Link from "next/link";
import { solutions } from "@/components/content/solutions";
import {
  homeOutcomes,
  processStages,
  whyCobrykz,
} from "@/components/content/home";
import { primaryCta } from "@/components/content/site";
import SolutionSelectionMatrix from "@/components/solutions/SolutionSelectionMatrix";
import PrimaryLink from "@/components/ui/PrimaryLink";
import SectionIntro from "@/components/ui/SectionIntro";

const outcomeStartingPoints = [solutions[4], solutions[1], solutions[5]];

export default function SolutionsHub() {
  return (
    <>
      <section
        id="solutions-hub-hero"
        aria-labelledby="solutions-hub-hero-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
            Business technology solutions
          </p>
          <h1
            id="solutions-hub-hero-heading"
            className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl"
          >
            Find the right way to improve your business.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate sm:text-lg sm:leading-8">
            Compare practical starting points for growth, operational
            improvement, and confident modernization. Cobrykz begins with the
            challenge, then shapes the technology around the result.
          </p>
          <PrimaryLink href="#solutions-hub-outcomes" className="mt-8">
            Start with an outcome
          </PrimaryLink>
        </div>
      </section>

      <section
        id="solutions-hub-outcomes"
        aria-labelledby="solutions-hub-outcomes-heading"
        className="border-b border-border bg-white"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-outcomes-heading"
            title="Begin with what the business needs to do better."
            description="A desired outcome is often a clearer starting point than a technical category. These pathways help narrow the first conversation."
          />
          <ol className="mt-12 grid border-y border-border md:grid-cols-3">
            {homeOutcomes.map((outcome, index) => {
              const startingPoint = outcomeStartingPoints[index];

              return (
                <li
                  key={outcome.title}
                  className="border-b border-border py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-bold text-blue"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-navy">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate">
                    {outcome.description}
                  </p>
                  <Link
                    href={startingPoint.href}
                    className="action-transition mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
                  >
                    Consider {startingPoint.name}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="solutions-hub-portfolio"
        aria-labelledby="solutions-hub-portfolio-heading"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-portfolio-heading"
            title="Six capabilities, shaped around the challenge."
            description="Each capability has a distinct role. Cobrykz connects them only when the business outcome calls for a broader system."
          />
          <ol className="mt-12 border-t border-border">
            {solutions.map((solution, index) => (
              <li key={solution.slug} className="border-b border-border">
                <div className="grid gap-4 py-7 sm:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-start">
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-bold text-blue"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>
                      <Link
                        href={solution.href}
                        className="action-transition inline-flex min-h-11 items-center text-xl font-bold text-navy underline decoration-blue/25 underline-offset-4 hover:text-blue sm:text-2xl"
                      >
                        {solution.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate">
                      {solution.problem}
                    </p>
                  </div>
                  <p className="text-[15px] font-medium leading-7 text-navy">
                    {solution.outcome}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="solutions-hub-selection"
        aria-labelledby="solutions-hub-selection-heading"
        className="border-y border-border bg-gray-light"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-selection-heading"
            title="Recognize your likely starting point."
            description="A familiar business condition can indicate the first capability to assess. The final recommendation follows a closer look at the work, constraints, and desired result."
          />
          <SolutionSelectionMatrix />
        </div>
      </section>

      <section
        id="solutions-hub-connected"
        aria-labelledby="solutions-hub-connected-heading"
        className="border-b border-border bg-white"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-connected-heading"
            title="Connected outcomes may combine multiple capabilities."
            description="A business challenge can cross customer experience, internal operations, and the systems between them. Cobrykz assesses that wider context before recommending the parts that belong together."
          />
          <div className="mt-12 grid border-y border-border md:grid-cols-3">
            <div className="border-b border-border py-7 md:border-b-0 md:border-r md:pr-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue">
                Customer experience
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                A web experience can establish trust, enable customer action,
                or deliver a digital service.
              </p>
            </div>
            <div className="border-b border-border py-7 md:border-b-0 md:border-r md:px-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue">
                Operational flow
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                Automation can move the resulting work through approvals,
                handoffs, and reporting with less manual effort.
              </p>
            </div>
            <div className="py-7 md:pl-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue">
                Connected system
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                A digital business system can keep the people, tools, and
                information behind the experience aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solutions-hub-method"
        aria-labelledby="solutions-hub-method-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-method-heading"
            title="Clarity comes before a build decision."
            description="Discover, Assess, and Design establish the business case, constraints, and important decisions before implementation begins."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-9 md:grid-cols-3">
            {processStages.slice(0, 3).map((stage, index) => (
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
          <Link
            href="/process"
            className="action-transition mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
          >
            See how the full process works
          </Link>
        </div>
      </section>

      <section
        id="solutions-hub-why"
        aria-labelledby="solutions-hub-why-heading"
        className="border-b border-border bg-white"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <SectionIntro
            id="solutions-hub-why-heading"
            title="Why Cobrykz"
            description="The work stays connected from the first decision through delivery and long-term improvement."
          />
          <ul className="mt-12 border-t border-border">
            {whyCobrykz.map((reason, index) => (
              <li
                key={reason.title}
                className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start"
              >
                <span
                  aria-hidden="true"
                  className="text-[11px] font-bold text-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold leading-6 text-navy">
                  {reason.title}
                </h3>
                <p className="text-sm leading-6 text-slate">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="solutions-hub-cta"
        aria-labelledby="solutions-hub-cta-heading"
        className="bg-charcoal text-white"
      >
        <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
          <h2
            id="solutions-hub-cta-heading"
            className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            What could technology improve in your business?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
            Begin with a challenge, bottleneck, or opportunity. You do not need
            a technical brief to start a useful conversation.
          </p>
          <PrimaryLink href={primaryCta.href} className="mt-8">
            {primaryCta.label}
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
