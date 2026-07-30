import Link from "next/link";
import { solutionBySlug } from "@/components/content/solutions";
import type { SolutionSlug } from "@/components/content/solutions";

export type SelectionRow = {
  condition: string;
  signal: string;
  solutionSlugs: readonly SolutionSlug[];
};

export const selectionRows = [
  {
    condition: "Unclear AI opportunity",
    signal:
      "There may be value in AI, but the best use, readiness, and risk are not yet clear.",
    solutionSlugs: ["ai", "technology-consulting"],
  },
  {
    condition: "Repetitive work",
    signal:
      "Recurring steps, handoffs, or reporting consume time that could be used elsewhere.",
    solutionSlugs: ["business-automation"],
  },
  {
    condition: "Unsuitable generic tools",
    signal:
      "Existing software forces the business into workarounds or cannot support a distinct operation.",
    solutionSlugs: ["custom-software-development"],
  },
  {
    condition: "Disconnected operations",
    signal:
      "People, tools, workflows, and information do not work together as one reliable environment.",
    solutionSlugs: ["digital-business-systems"],
  },
  {
    condition: "Weak customer experience",
    signal:
      "The digital experience does not establish trust, support customer action, or deliver service well.",
    solutionSlugs: ["websites-web-applications"],
  },
  {
    condition: "Unclear investment priorities",
    signal:
      "Several technology needs compete for attention without a shared decision framework or sequence.",
    solutionSlugs: ["technology-consulting"],
  },
] as const satisfies readonly SelectionRow[];

export default function SolutionSelectionMatrix() {
  return (
    <div
      aria-labelledby="solutions-hub-selection-heading"
      className="mt-10 overflow-x-auto rounded-lg border border-border bg-white"
      role="region"
      tabIndex={0}
    >
      <table className="min-w-[46rem] w-full border-collapse text-left">
        <caption className="sr-only">
          Business conditions and the Cobrykz solutions that may provide a
          practical starting point
        </caption>
        <thead className="bg-gray-light">
          <tr>
            <th
              className="w-1/4 border-b border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-navy"
              scope="col"
            >
              Business condition
            </th>
            <th
              className="w-1/2 border-b border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-navy"
              scope="col"
            >
              What it may signal
            </th>
            <th
              className="w-1/4 border-b border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-navy"
              scope="col"
            >
              Likely starting solution
            </th>
          </tr>
        </thead>
        <tbody>
          {selectionRows.map((row) => (
            <tr key={row.condition} className="border-b border-border last:border-b-0">
              <th
                className="px-5 py-5 align-top text-sm font-bold leading-6 text-navy"
                scope="row"
              >
                {row.condition}
              </th>
              <td className="px-5 py-5 align-top text-sm leading-6 text-slate">
                {row.signal}
              </td>
              <td className="px-5 py-3 align-top">
                <ul>
                  {row.solutionSlugs.map((slug) => {
                    const solution = solutionBySlug[slug];

                    return (
                      <li key={slug}>
                        <Link
                          href={solution.href}
                          className="action-transition inline-flex min-h-11 items-center text-sm font-semibold leading-5 text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
                        >
                          {solution.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
