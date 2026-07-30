import type { SolutionPageDefinition } from "@/components/content/solutions";

type SolutionFaqsProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionFaqs({ solution }: SolutionFaqsProps) {
  return (
    <section aria-labelledby="solution-faq-heading">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-faq-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-12 border-t border-border">
          {solution.faqs.map((faq) => (
            <details key={faq.question} className="border-b border-border">
              <summary className="action-transition flex min-h-11 cursor-pointer items-center py-5 text-lg font-bold text-navy hover:text-blue">
                {faq.question}
              </summary>
              <p className="max-w-3xl pb-6 text-[15px] leading-7 text-slate sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
