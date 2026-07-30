import HomeHero from "@/components/home/HomeHero";
import BusinessOutcomes from "@/components/home/BusinessOutcomes";
import SolutionsOverview from "@/components/home/SolutionsOverview";
import WhyCobrykz from "@/components/home/WhyCobrykz";
import AIPointOfView from "@/components/home/AIPointOfView";
import ChallengeRouter from "@/components/home/ChallengeRouter";
import ProcessOverview from "@/components/home/ProcessOverview";
import ProjectsEvidence from "@/components/home/ProjectsEvidence";
import AuthorityBand from "@/components/home/AuthorityBand";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <BusinessOutcomes />
      <SolutionsOverview />
      <WhyCobrykz />
      <AIPointOfView />
      <div className="border-y border-border bg-white">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <ChallengeRouter />
        </div>
      </div>
      <ProcessOverview />
      <ProjectsEvidence />
      <AuthorityBand />
      <HomeFinalCTA />
    </main>
  );
}
