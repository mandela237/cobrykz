import MobileActionBar from "./MobileActionBar";
import MobileContact from "./MobileContact";
import MobileFAQ from "./MobileFAQ";
import MobileFit from "./MobileFit";
import MobileFooter from "./MobileFooter";
import MobileFounder from "./MobileFounder";
import MobileHero from "./MobileHero";
import MobileIndustries from "./MobileIndustries";
import MobileProcess from "./MobileProcess";
import MobileServices from "./MobileServices";

export default function MobileExperience() {
  return (
    <div data-mobile-system="true">
      <MobileHero />
      <MobileServices />
      <MobileIndustries />
      <MobileProcess />
      <MobileFounder />
      <MobileFit />
      <MobileFAQ />
      <MobileContact />
      <MobileFooter />
      <MobileActionBar />
    </div>
  );
}
