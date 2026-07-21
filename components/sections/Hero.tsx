import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleCheck,
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

      <div className="section-shell relative z-10 grid items-center gap-9 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
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
              className="shimmer inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue px-6 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(31,94,255,0.26)] transition-all hover:bg-blue-dark active:translate-y-px"
            >
              Start a project
              <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
            </a>
            <a
              href="#process"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-6 text-[14px] font-semibold text-navy shadow-[0_8px_24px_rgba(11,23,40,0.05)] transition-colors hover:border-blue/30 hover:bg-blue-tint"
            >
              See how I work
              <ArrowDownRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
          <div
            className="absolute -left-5 -top-5 hidden h-[78%] w-[82%] border border-blue/20 bg-white/35 lg:block"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-lg border border-white bg-white shadow-[0_28px_80px_rgba(11,23,40,0.16)]">
            <div className="relative aspect-[16/8.4] lg:aspect-[0.83] lg:min-h-[480px] xl:min-h-[510px]">
              <Image
                src="/mandela-portrait-sharp.jpg"
                alt="Mandela Atud, founder and builder at COBRYKZ"
                fill
                preload
                quality={92}
                loading="eager"
                className="object-cover object-[52%_12%] lg:object-[52%_7%]"
                sizes="(max-width: 1023px) calc(100vw - 40px), 42vw"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(7,19,33,0.66)_100%)]"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-4 text-white md:p-5">
                <div>
                  <p className="text-[15px] font-bold">Mandela Atud</p>
                  <p className="mt-1 text-[13px] font-medium text-white/85">
                    Designer and developer
                  </p>
                </div>
                <div className="hidden items-center gap-2 text-right text-[12px] font-medium text-white/85 xl:flex">
                  <CircleCheck
                    size={16}
                    strokeWidth={2}
                    className="text-[#78D7B2]"
                    aria-hidden="true"
                  />
                  Founder-led through launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
