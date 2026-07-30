import Image from "next/image";
import { connectedPartner } from "@/components/company/ConnectedPartnerAtlas";
import type { AboutPageDefinition } from "@/components/content/companyPages";
import MobileAtlasExplorer from "@/components/mobile/MobileAtlasExplorer";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileChapterIntro from "@/components/mobile/MobileChapterIntro";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileAboutPageProps = {
  content: AboutPageDefinition;
};

export default function MobileAboutPage({
  content,
}: MobileAboutPageProps) {
  return (
    <div data-mobile-about-page>
      <MobileChapter
        id="about-hero"
        index={1}
        eyebrow="Company"
        tone="muted"
      >
        <div className="mobile-about-opening">
          <p className="mobile-about-opening__eyebrow">
            {content.eyebrow}
          </p>
          <h1 id="about-hero-heading" className="text-balance">
            {content.headline}
          </h1>
          <div className="mobile-about-opening__introduction">
            {content.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </MobileChapter>

      <MobileChapter
        id="about-founding-tension"
        index={2}
        eyebrow="Origin"
        tone="dark"
      >
        <p className="mobile-about-founding-statement">
          {content.foundingTension}
        </p>
      </MobileChapter>

      <MobileChapter
        id="about-purpose"
        index={3}
        eyebrow="Purpose"
      >
        <MobileChapterIntro
          id="about-purpose-heading"
          title={content.purpose.title}
          description={content.purpose.description}
        />
      </MobileChapter>

      <MobileChapter
        id="about-principles"
        index={4}
        eyebrow="Principles"
        tone="muted"
      >
        <MobileChapterIntro
          id="about-principles-heading"
          title="Company principles"
        />
        <div className="mobile-about-disclosures mobile-about-principles">
          <MobileDisclosureGroup
            ariaLabel="Company principles"
            defaultOpenId="principle-1"
            items={content.principles.map((principle, index) => ({
              id: `principle-${index + 1}`,
              summary: (
                <>
                  <span
                    aria-hidden="true"
                    className="mobile-about-row-index"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{principle.title}</strong>
                </>
              ),
              panel: <p>{principle.description}</p>,
            }))}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="about-partnership"
        index={5}
        eyebrow="Partnership"
        tone="dark"
      >
        <MobileChapterIntro
          id="about-partnership-heading"
          title={content.partnership.title}
          description={content.partnership.description}
        />
        <div className="mobile-about-atlas-stage">
          <MobileAtlasExplorer
            definition={connectedPartner}
            ariaLabel="Connected partnership model"
            initialSelectedNodeId="accountability"
            showDefinitionContext
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="about-leadership"
        index={6}
        eyebrow="Leadership"
      >
        <div className="mobile-about-leadership">
          <figure className="mobile-about-leadership__portrait">
            <Image
              src="/mandela-portrait-sharp.jpg"
              alt={`${content.leadership.name}, ${content.leadership.role}`}
              fill
              sizes="calc(100vw - 2.5rem)"
              className="object-cover object-[50%_18%]"
            />
            <figcaption>{content.leadership.role}</figcaption>
          </figure>
          <div className="mobile-about-leadership__statement">
            <h2
              id="about-leadership-heading"
              className="text-balance"
            >
              {content.leadership.title}
            </h2>
            <p className="mobile-about-leadership__name">
              {content.leadership.name}
            </p>
            <p className="mobile-about-leadership__description">
              {content.leadership.description}
            </p>
          </div>
        </div>
      </MobileChapter>

      <MobileChapter
        id="about-standards"
        index={7}
        eyebrow="Standards"
        tone="muted"
      >
        <MobileChapterIntro
          id="about-standards-heading"
          title="Company standards"
        />
        <div className="mobile-about-disclosures mobile-about-standards">
          <MobileDisclosureGroup
            ariaLabel="Company standards"
            defaultOpenId="standard-1"
            items={content.standards.map((standard, index) => ({
              id: `standard-${index + 1}`,
              summary: (
                <>
                  <span
                    aria-hidden="true"
                    className="mobile-about-row-index"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{standard.title}</strong>
                </>
              ),
              panel: <p>{standard.description}</p>,
            }))}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="about-cta"
        index={8}
        eyebrow="Next step"
        tone="dark"
      >
        <div className="mobile-about-final">
          <h2 id="about-cta-heading" className="text-balance">
            {content.cta.title}
          </h2>
          <p>{content.cta.description}</p>
          <PrimaryLink href={content.cta.href}>
            {content.cta.label}
          </PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
