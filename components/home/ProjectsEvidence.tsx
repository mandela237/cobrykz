import SectionIntro from "@/components/ui/SectionIntro";

export default function ProjectsEvidence() {
  return (
    <section aria-labelledby="projects-heading" id="projects">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <SectionIntro
            id="projects-heading"
            title="Evidence should be useful, specific, and verifiable."
            description="Cobrykz will share completed work only when the business context and results can be represented responsibly."
          />
          <div
            data-home-composition="evidence-frame"
            className="home-evidence-frame relative border border-border bg-gray-light p-7 sm:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-16 w-[2px] bg-blue"
            />
            <p className="text-lg font-semibold leading-8 text-navy">
              Case studies will be published when completed work can be shown
              with meaningful context, verified outcomes, and permission to
              share.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-slate">
              Until then, this space will not be filled with invented metrics,
              anonymous claims, or empty project cards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
