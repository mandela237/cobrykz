"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  isDecimal?: boolean;
}

function CountUp({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };

    requestAnimationFrame(tick);
  }, [inView, value, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? display.toFixed(1) : display}
      {suffix}
    </span>
  );
}

const supportingStats: StatItem[] = [
  { value: 10, suffix: "+", label: "Industries Served",   sublabel: "From barbershops to law firms" },
  { value: 5,  suffix: "+", label: "Years Building",      sublabel: "Technology & digital products" },
  { value: 12, suffix: "+", label: "Projects Delivered",  sublabel: "And growing fast" },
];

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="bg-[#0F172A] border-t border-white/08 py-16 sm:py-20"
      aria-label="Trust indicators"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-0 items-center">

          {/* Hero stat — Client Satisfaction dominates */}
          <div className="lg:pr-16 lg:border-r lg:border-white/10">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[80px] sm:text-[96px] lg:text-[104px] font-black tracking-[-0.05em] text-white leading-none">
                <CountUp value={5.0} suffix="" isDecimal />
              </span>
              <span className="text-[32px] sm:text-[40px] font-black text-white/20 tracking-tight leading-none">
                /5
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-4" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>

            <p className="text-[18px] font-semibold text-white/80 leading-snug">
              Client Satisfaction
            </p>
            <p className="text-[13px] text-white/35 mt-1">
              Every project, every time
            </p>
          </div>

          {/* Supporting stats — secondary weight */}
          <div className="lg:pl-16 grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-8">
            {supportingStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[40px] lg:text-[48px] font-black tracking-[-0.04em] text-white leading-none mb-1.5">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[13px] font-semibold text-white/60 leading-tight">
                  {stat.label}
                </div>
                <div className="text-[11px] text-white/28 mt-0.5 hidden lg:block">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
