import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Services from "@/components/sections/Services";
import WhyCOBRYKZ from "@/components/sections/WhyCOBRYKZ";
import Industries from "@/components/sections/Industries";
import OurStandard from "@/components/sections/OurStandard";
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
          <SocialProof />
          <Services />
          <WhyCOBRYKZ />
          <Industries />
          <OurStandard />
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
