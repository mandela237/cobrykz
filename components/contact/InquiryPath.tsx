import { contactPage } from "@/components/content/contact";

export const inquirySteps = [
  "Business challenge received",
  "Context reviewed",
  "Initial fit and questions identified",
  "Conversation arranged",
  "Appropriate next step defined",
] as const;

export default function InquiryPath() {
  return (
    <aside
      aria-labelledby="inquiry-path-heading"
      className="mt-10 border-t border-border pt-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
        What happens next
      </p>
      <h3 id="inquiry-path-heading" className="mt-3 text-xl font-bold text-navy">
        From inquiry to an appropriate next step.
      </h3>
      <ol className="inquiry-path relative mt-7">
        {inquirySteps.map((step, index) => (
          <li
            key={step}
            className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3 pb-6 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="inquiry-path__node relative z-10 inline-flex size-7 items-center justify-center rounded-full border border-blue/30 bg-white text-[10px] font-bold text-blue"
            >
              {index + 1}
            </span>
            <span className="pt-1 text-sm font-semibold leading-5 text-navy">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-7 border-l-2 border-blue pl-4 text-sm leading-6 text-slate">
        {contactPage.responseExpectation}
      </p>
    </aside>
  );
}
