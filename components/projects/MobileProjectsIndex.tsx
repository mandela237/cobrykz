import Link from "next/link";
import type { PublishedProjectDefinition } from "@/components/content/projects";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import { evidenceGroups } from "@/components/projects/EvidenceStandard";
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileProjectsIndexProps = {
  projects: readonly PublishedProjectDefinition[];
};

const itemId = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

export default function MobileProjectsIndex({
  projects,
}: MobileProjectsIndexProps) {
  return (
    <div data-mobile-projects-index>
      <MobileChapter
        id="projects-hero"
        index={1}
        eyebrow="Opening"
      >
        <div className="mobile-projects-opening">
          <p className="mobile-projects-kicker">Projects</p>
          <h1 id="projects-hero-heading">
            Evidence should explain how the business changed.
          </h1>
          <p className="mobile-projects-lead">
            Cobrykz publishes projects as business case studies: the context,
            decisions, implementation, and outcomes that can be supported by
            approved evidence.
          </p>
        </div>
      </MobileChapter>

      <MobileChapter
        id="projects-evidence-standard"
        index={2}
        eyebrow="Evidence standard"
        tone="dark"
      >
        <div className="mobile-projects-evidence">
          <h2 id="evidence-standard-heading">
            How Cobrykz documents evidence.
          </h2>
          <MobileDisclosureGroup
            items={evidenceGroups.map((group, index) => ({
              id: itemId(group.title),
              summary: (
                <>
                  <span className="mobile-projects-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{group.title}</strong>
                </>
              ),
              panel: <p>{group.parts.join(" · ")}</p>,
            }))}
            defaultOpenId={itemId(evidenceGroups[0].title)}
            ariaLabel="How Cobrykz documents evidence"
          />
        </div>
      </MobileChapter>

      {projects.length === 0 ? (
        <MobileChapter
          id="projects-empty"
          index={3}
          eyebrow="Published evidence"
        >
          <div className="mobile-projects-publication-state">
            <h2 id="projects-empty-heading">
              No project case studies are published yet.
            </h2>
            <p>
              Work will appear here only when its business context, delivery
              decisions, and outcomes can be presented responsibly. Until
              then, explore how Cobrykz approaches business challenges or
              begin with one of your own.
            </p>
            <div className="mobile-projects-actions">
              <PrimaryLink href="/contact">
                Discuss a business challenge
              </PrimaryLink>
              <Link
                href="/solutions"
                className="mobile-projects-secondary-action action-transition"
              >
                Explore our solutions
              </Link>
            </div>
          </div>
        </MobileChapter>
      ) : (
        <MobileChapter
          id="projects-published"
          index={3}
          eyebrow="Published evidence"
        >
          <div className="mobile-projects-published">
            <h2 id="projects-published-heading">
              Published business case studies
            </h2>
            <ol>
              {projects.map((project, index) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{project.title}</strong>
                    <p>{project.summary}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </MobileChapter>
      )}
    </div>
  );
}
