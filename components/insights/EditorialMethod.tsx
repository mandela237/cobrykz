export const editorialMethod = [
  "Define the decision",
  "Examine the operating system",
  "Compare practical options",
  "Identify next steps",
] as const;

export default function EditorialMethod() {
  return (
    <section aria-labelledby="editorial-method-heading" className="border-b border-border bg-navy text-white">
      <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-tint">
            Editorial method
          </p>
          <h2 id="editorial-method-heading" className="text-balance mt-4 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl">
            Practical thinking begins with a decision.
          </h2>
        </div>
        <ol className="border-t border-white/20">
          {editorialMethod.map((step, index) => (
            <li key={step} className="grid grid-cols-[3rem_1fr] border-b border-white/20 py-6">
              <span className="text-[11px] font-bold text-blue-tint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-bold">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
