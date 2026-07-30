import { solutionBySlug } from "@/components/content/solutions";
import SolutionPage from "@/components/solutions/SolutionPage";
import { buildPageMetadata } from "@/lib/seo/site";

const solution = solutionBySlug["custom-software-development"];

export const metadata = buildPageMetadata({ ...solution.metadata, path: solution.href });

export default function Page() {
  return <SolutionPage solution={solution} />;
}
