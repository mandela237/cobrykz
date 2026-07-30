import type { SolutionPageDefinition } from "@/components/content/solutions";

type ApplicationExamplesProps = {
  solution: SolutionPageDefinition;
};

export default function ApplicationExamples({
  solution,
}: ApplicationExamplesProps) {
  return (
    <section
      aria-labelledby="solution-applications-heading"
      className="border-y border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-applications-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          Representative applications
        </h2>
        <ul className="mt-12 border-t border-border">
          {solution.applications.map((application) => (
            <li
              key={application}
              className="border-b border-border py-6 text-base leading-7 text-navy sm:pl-[35%] sm:text-[17px]"
            >
              {application}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
