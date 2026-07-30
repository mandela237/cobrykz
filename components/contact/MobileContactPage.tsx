import ContactForm from "@/components/contact/ContactForm";
import { inquirySteps } from "@/components/contact/InquiryPath";
import { contactPage } from "@/components/content/contact";
import MobileChapter from "@/components/mobile/MobileChapter";

type MobileContactPageProps = {
  content: typeof contactPage;
};

export default function MobileContactPage({ content }: MobileContactPageProps) {
  return (
    <div data-mobile-contact>
      <MobileChapter id="contact-opening" index={1} eyebrow="Contact" tone="dark">
        <h1 className="mobile-contact-headline">{content.headline}</h1>
        <p className="mobile-contact-support">{content.support}</p>
      </MobileChapter>

      <MobileChapter id="contact-path" index={2} eyebrow="What happens next">
        <h2 className="mobile-contact-section-title">
          From inquiry to an appropriate next step.
        </h2>
        <ol className="mobile-contact-inquiry-rail">
          {inquirySteps.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <p className="mobile-contact-expectation">
          {content.responseExpectation}
        </p>
      </MobileChapter>

      <MobileChapter
        id="contact-conversation"
        index={3}
        eyebrow="Begin"
        tone="muted"
      >
        <div className="mobile-contact-form-intro">
          <h2 id="contact-form-heading">Begin the conversation</h2>
          <p>{content.responseExpectation}</p>
          <p>
            Prefer email?{" "}
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </p>
        </div>
        <div className="mobile-contact-form-frame">
          <ContactForm />
        </div>
      </MobileChapter>
    </div>
  );
}
