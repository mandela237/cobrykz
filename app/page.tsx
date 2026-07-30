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
import MobileHomePage from "@/components/home/MobileHomePage";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata = buildPageMetadata({
  title: "Cobrykz | AI, Automation, Software & Digital Systems",
  description:
    "Cobrykz helps businesses grow and operate more effectively through AI, automation, custom software, websites, and connected digital systems.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <MobileHomePage />
      </div>
      <div className="hidden md:block">
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
      </div>
    </>
  );
}
