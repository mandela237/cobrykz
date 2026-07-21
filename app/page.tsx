import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import BuildArtifact from "@/components/sections/BuildArtifact";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import GoodFit from "@/components/sections/GoodFit";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import MobileExperience from "@/components/mobile/MobileExperience";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="md:hidden">
          <MobileExperience />
        </div>
        <div className="hidden md:block">
          <Hero />
          <BuildArtifact />
          <Services />
          <Industries />
          <Process />
          <Founder />
          <GoodFit />
          <FAQ />
          <FinalCTA />
        </div>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
