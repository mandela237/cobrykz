import Link from "next/link";
import type { PublishedProjectDefinition } from "@/components/content/projects";
import PrimaryLink from "@/components/ui/PrimaryLink";

type ProjectsIndexProps = {
  projects: readonly PublishedProjectDefinition[];
};

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  return (
    <>
      <section
        id="projects-hero"
        aria-labelledby="projects-hero-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              Projects
            </p>
            <h1
              id="projects-hero-heading"
              className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl"
            >
              Evidence should explain how the business changed.
            </h1>
          </div>
          <p className="border-t border-border pt-6 text-base leading-7 text-slate sm:text-[17px] sm:leading-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            Cobrykz publishes projects as business case studies: the context,
            decisions, implementation, and outcomes that can be supported by
            approved evidence.
          </p>
        </div>
      </section>

      {projects.length === 0 ? (
        <section
          aria-labelledby="projects-empty-heading"
          className="bg-white"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl border-y border-border py-10 sm:py-12">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                Published evidence
              </p>
              <h2
                id="projects-empty-heading"
                className="text-balance mt-4 text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
              >
                No project case studies are published yet.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-[17px] sm:leading-8">
                Work will appear here only when its business context, delivery
                decisions, and outcomes can be presented responsibly. Until
                then, explore how Cobrykz approaches business challenges or
                begin with one of your own.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PrimaryLink href="/contact">
                  Discuss a business challenge
                </PrimaryLink>
                <Link
                  href="/solutions"
                  className="action-transition inline-flex min-h-11 items-center px-1 text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
                >
                  Explore our solutions
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-labelledby="projects-published-heading"
          className="bg-white"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="projects-published-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Published business case studies
            </h2>
            <ol className="mt-12 border-t border-border">
              {projects.map((project, index) => (
                <li key={project.slug} className="border-b border-border">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="action-transition grid min-h-11 gap-4 py-7 text-navy hover:text-blue active:text-blue sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[11px] font-bold text-blue"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-bold leading-7 sm:text-2xl">
                      {project.title}
                    </span>
                    <span className="text-[15px] leading-7 text-slate">
                      {project.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
