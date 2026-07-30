export const evidenceGroups = [
  {
    title: "Business condition",
    parts: ["Project introduction", "Business context", "Challenge"],
  },
  {
    title: "Decision and designed response",
    parts: ["Assessment and strategy", "Solution", "How it works"],
  },
  {
    title: "Implementation",
    parts: ["Capabilities combined", "Implementation and partnership"],
  },
  {
    title: "Verified change",
    parts: ["Verified outcomes"],
  },
  {
    title: "Authorized perspective",
    parts: ["Authorized client perspective"],
  },
  {
    title: "Next stage",
    parts: ["Next stage", "Related content", "Project call to action"],
  },
] as const;

export default function EvidenceStandard() {
  return (
    <section
      aria-labelledby="evidence-standard-heading"
      className="border-b border-border bg-navy text-white"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-tint">
          Evidence standard
        </p>
        <h2
          id="evidence-standard-heading"
          className="text-balance mt-4 max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
        >
          How Cobrykz documents evidence.
        </h2>
        <ol className="mt-12 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {evidenceGroups.map((group, index) => (
            <li
              key={group.title}
              className="min-h-48 border-b border-r border-white/15 p-6 sm:p-8"
            >
              <span className="text-[11px] font-bold text-blue-tint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-bold">{group.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">
                {group.parts.join(" · ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
