import Link from "next/link";
import { homePageCopy, processStages } from "@/components/content/home";
import { processCta } from "@/components/content/site";
import SectionIntro from "@/components/ui/SectionIntro";
import HomeSystemThread from "@/components/home/HomeSystemThread";

export default function ProcessOverview() {
  const threadItems = processStages.map((stage, index) => ({
    id: stage.title.toLowerCase(),
    label: stage.title,
    detail: stage.description,
    state: index === 0 ? ("active" as const) : ("next" as const),
  }));

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
            title={homePageCopy.process.title}
            description={homePageCopy.process.description}
          />
          <Link
            href={processCta.href}
            className="action-transition inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
          >
            {processCta.label}
          </Link>
        </div>
        <div className="home-process-rail mt-14 border border-border bg-white p-6 sm:p-9">
          <HomeSystemThread
            ariaLabel="Cobrykz delivery process"
            items={threadItems}
          />
        </div>
      </div>
    </section>
  );
}
