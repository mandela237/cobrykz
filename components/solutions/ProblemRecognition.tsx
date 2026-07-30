import type { SolutionPageDefinition } from "@/components/content/solutions";

type ProblemRecognitionProps = {
  solution: SolutionPageDefinition;
};

export default function ProblemRecognition({
  solution,
}: ProblemRecognitionProps) {
  return (
    <section aria-labelledby="solution-recognition-heading">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2
              id="solution-recognition-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Where the challenge shows up
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate sm:text-[17px]">
              {solution.problem}
            </p>
          </div>
          <ul className="border-t border-border">
            {solution.recognition.map((item) => (
              <li
                key={item}
                className="border-b border-border py-5 text-base leading-7 text-navy"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
