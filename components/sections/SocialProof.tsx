"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({ to, duration = 1000 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-label="Trust indicators"
      className="relative bg-[#060C1A] dot-grid"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.35), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 70% 80% at 80% 50%, rgba(99,102,241,0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 65% at 15% 50%, rgba(37,99,235,0.10) 0%, transparent 58%)",
          ].join(", "),
        }}
      />

      {/* Mobile: 2×2 grid */}
      <div className="sm:hidden max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 gap-x-6 gap-y-10">
        {/* Rating */}
        <div>
          <p className="text-[52px] font-black text-white tracking-[-0.04em] leading-none mb-2">5.0</p>
          <div className="flex items-center gap-0.5 mb-1.5" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#D97706" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Client Rating</p>
        </div>

        {/* Industries */}
        <div>
          <p className="text-[52px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={10} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Industries Served</p>
        </div>

        {/* Years */}
        <div>
          <p className="text-[52px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={5} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Years Building</p>
        </div>

        {/* Projects */}
        <div>
          <p className="text-[52px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={12} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Projects Delivered</p>
        </div>
      </div>

      {/* Desktop: single row with dividers */}
      <div className="hidden sm:flex items-start divide-x divide-white/[0.1] max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* Rating */}
        <div className="flex-1 pr-10 lg:pr-14">
          <p className="text-[64px] lg:text-[80px] font-black text-white tracking-[-0.04em] leading-none mb-2">5.0</p>
          <div className="flex items-center gap-0.5 mb-2" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D97706" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Client Rating</p>
        </div>

        {/* Industries */}
        <div className="flex-1 px-10 lg:px-14">
          <p className="text-[64px] lg:text-[80px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={10} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">
            <span className="hidden lg:inline">Industries Served</span>
            <span className="lg:hidden">Industries</span>
          </p>
        </div>

        {/* Years */}
        <div className="flex-1 px-10 lg:px-14">
          <p className="text-[64px] lg:text-[80px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={5} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">Years Building</p>
        </div>

        {/* Projects */}
        <div className="flex-1 pl-10 lg:pl-14">
          <p className="text-[64px] lg:text-[80px] font-black text-white tracking-[-0.04em] leading-none mb-2">
            <CountUp to={12} /><span className="text-blue">+</span>
          </p>
          <p className="text-[11px] text-white/45 tracking-[0.04em]">
            <span className="hidden lg:inline">Projects Delivered</span>
            <span className="lg:hidden">Projects</span>
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
        aria-hidden="true"
      />
    </section>
  );
}
