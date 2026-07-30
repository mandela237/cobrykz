import type { ProcessPageDefinition } from "@/components/content/companyPages";
import MobileDeliveryRail from "@/components/company/MobileDeliveryRail";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileChapterIntro from "@/components/mobile/MobileChapterIntro";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileProcessPageProps = {
  content: ProcessPageDefinition;
};

const itemId = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

export default function MobileProcessPage({
  content,
}: MobileProcessPageProps) {
  return (
    <div data-mobile-process>
      <MobileChapter
        id="process-hero"
        index={1}
        eyebrow="Opening"
        tone="dark"
      >
        <div className="mobile-process-opening">
          <p className="mobile-process-kicker">{content.eyebrow}</p>
          <h1 id="process-hero-heading">{content.headline}</h1>
          <div className="mobile-process-opening__introduction">
            {content.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol
            aria-label="Process stage overview"
            className="mobile-process-opening__sequence"
          >
            {content.stages.map((stage, index) => (
              <li key={stage.name}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{stage.name}</strong>
              </li>
            ))}
          </ol>
        </div>
      </MobileChapter>

      <MobileChapter
        id="process-stages"
        index={2}
        eyebrow="Delivery stages"
      >
        <MobileChapterIntro
          id="process-stages-heading"
          title="Process stages"
        />
        <MobileDeliveryRail
          stages={content.stages}
          gates={content.decisionGates}
        />
      </MobileChapter>

      <MobileChapter
        id="process-scaling"
        index={3}
        eyebrow="Scaling paths"
        tone="muted"
      >
        <MobileChapterIntro
          id="process-scaling-heading"
          title={content.scaling.title}
          description={content.scaling.description}
        />
        <div className="mobile-process-disclosure">
          <MobileDisclosureGroup
            items={content.scaling.paths.map((path, index) => ({
              id: itemId(path.title),
              summary: (
                <>
                  <span className="mobile-process-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{path.title}</strong>
                </>
              ),
              panel: <p>{path.description}</p>,
            }))}
            defaultOpenId={itemId(content.scaling.paths[0]?.title ?? "")}
            ariaLabel="Process scaling paths"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="process-accountability"
        index={4}
        eyebrow="Accountability"
        tone="dark"
      >
        <MobileChapterIntro
          id="process-accountability-heading"
          title="How the work stays accountable"
        />
        <div className="mobile-process-disclosure mobile-process-disclosure--dark">
          <MobileDisclosureGroup
            items={content.operatingModel.map((item, index) => ({
              id: itemId(item.title),
              summary: (
                <>
                  <span className="mobile-process-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{item.title}</strong>
                </>
              ),
              panel: <p>{item.description}</p>,
            }))}
            defaultOpenId={itemId(content.operatingModel[0]?.title ?? "")}
            ariaLabel="How the work stays accountable"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="process-post-launch"
        index={5}
        eyebrow="Ongoing partnership"
      >
        <MobileChapterIntro
          id="process-post-launch-heading"
          title={content.postLaunch.title}
          description={content.postLaunch.description}
        />
        <ol className="mobile-process-post-launch">
          {content.postLaunch.options.map((option, index) => (
            <li key={option}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{option}</strong>
            </li>
          ))}
        </ol>
      </MobileChapter>

      <MobileChapter
        id="process-cta"
        index={6}
        eyebrow="Next step"
        tone="dark"
      >
        <div className="mobile-process-cta">
          <h2 id="process-cta-heading">{content.cta.title}</h2>
          <p>{content.cta.description}</p>
          <PrimaryLink href={content.cta.href}>
            {content.cta.label}
          </PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
