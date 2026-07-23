import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import TrustField from "@/components/TrustField";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-gray-light pb-10 pt-[104px] md:pb-12 md:pt-[124px]"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(112deg,#FFFFFF_0%,#F7FAFF_52%,#EAF2FF_100%)]"
        aria-hidden="true"
      />
      <TrustField className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-90 lg:block" />

      <div className="relative z-10 mx-auto grid w-[calc(100%-2.5rem)] max-w-[1560px] items-center gap-9 md:w-[calc(100%-5rem)] lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
        <div className="max-w-[700px]">
          <div className="mb-5 flex items-center gap-3 text-[13px] font-semibold text-slate md:mb-6">
            <span className="h-2 w-2 rounded-full bg-evergreen" aria-hidden="true" />
            Founder-led websites for local businesses
          </div>

          <h1 className="text-balance text-[42px] font-extrabold leading-[1.02] tracking-normal text-navy min-[410px]:text-[46px] md:text-[58px] lg:text-[54px] xl:text-[68px]">
            Make your business look as{" "}
            <span className="font-serif font-normal italic text-blue">
              credible
            </span>{" "}
            online as it is in person.
          </h1>

          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.75] text-slate md:mt-6 md:text-[17px]">
            I design and build websites for established local businesses whose
            online presence no longer reflects the quality of their work.
          </p>

          <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row md:mt-8">
            <a
              href="#contact"
              className="action-transition inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue px-6 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(31,94,255,0.26)] hover:bg-blue-dark active:bg-blue-dark"
            >
              Start a project
              <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
            </a>
            <a
              href="#process"
              className="action-transition inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-6 text-[14px] font-semibold text-navy shadow-[0_8px_24px_rgba(11,23,40,0.05)] hover:border-blue/30 hover:bg-blue-tint active:border-blue/30 active:bg-blue-tint"
            >
              See how I work
              <ArrowDownRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

        </div>

        <div className="relative mx-auto w-full lg:ml-auto">
          <div
            className="absolute -left-5 -top-5 hidden h-[78%] w-[82%] border border-blue/20 bg-white/35 lg:block"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-lg border border-white bg-white shadow-[0_28px_80px_rgba(11,23,40,0.16)]">
            <div className="relative aspect-video bg-[#eef3f7]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/hero-video-poster.jpg"
                className="h-full w-full object-cover"
                aria-label="COBRYKZ brand animation"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
