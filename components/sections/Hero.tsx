// ─────────────────────────────────────────────────────────
//  HERO — Router
//  Edit mobile layout:  HeroMobile.tsx
//  Edit desktop layout: HeroDesktop.tsx
// ─────────────────────────────────────────────────────────

import HeroMobile from "./HeroMobile";
import HeroDesktop from "./HeroDesktop";

export default function Hero() {
  return (
    <div id="top">
      <h1 className="sr-only">COBRYKZ — Premium websites and digital systems that help your business compete at the highest level</h1>
      {/* Mobile: < 768px — purposefully designed, not a stacked version of desktop */}
      <div className="md:hidden">
        <HeroMobile />
      </div>

      {/* Desktop: 768px + — editorial portrait composition */}
      <div className="hidden md:block">
        <HeroDesktop />
      </div>
    </div>
  );
}
