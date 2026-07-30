import type { Metadata } from "next";
import { solutionBySlug } from "@/components/content/solutions";
import SolutionPage from "@/components/solutions/SolutionPage";

const solution = solutionBySlug["custom-software-development"];

export const metadata: Metadata = solution.metadata;

export default function Page() {
  return <SolutionPage solution={solution} />;
}
