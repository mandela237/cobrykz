import { aiPrinciples } from "@/components/content/home";
import SectionIntro from "@/components/ui/SectionIntro";

export default function AIPointOfView() {
  return (
    <section aria-labelledby="ai-heading" id="ai-point-of-view">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionIntro
            id="ai-heading"
            title="A practical point of view on AI."
            description="AI is valuable when it improves real work. Cobrykz evaluates it as one possible tool within a responsible business solution, never as a requirement."
          />
          <ul className="divide-y divide-border border-y border-border">
            {aiPrinciples.map((principle) => (
              <li key={principle.title} className="py-6">
                <h3 className="text-lg font-bold text-navy">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
