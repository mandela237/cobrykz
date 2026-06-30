import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Services from "@/components/sections/Services";
import WhyCOBRYKZ from "@/components/sections/WhyCOBRYKZ";
import Industries from "@/components/sections/Industries";
import OurStandard from "@/components/sections/OurStandard";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <WhyCOBRYKZ />
        <Industries />
        <OurStandard />
        <Process />
        <Founder />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
