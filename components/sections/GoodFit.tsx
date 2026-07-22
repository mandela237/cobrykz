import { Check, Minus } from "lucide-react";

const goodFit = [
  "Your business is established, but the website no longer represents it well.",
  "You value direct access and recommendations you can understand.",
  "You want a focused launch rather than a long agency process.",
];

const notFit = [
  "Your only priority is installing the cheapest available template.",
  "You want a large account team or several layers of approval.",
  "You want visual spectacle to take priority over clarity.",
];

export default function GoodFit() {
  return (
    <section
      className="flow-root bg-gray-light pb-20 pt-0 md:pb-28"
      aria-labelledby="fit-heading"
    >
      <div
        data-editorial-surface="fit"
        className="section-shell relative z-10 -mt-10 rounded-lg border border-border bg-white p-7 shadow-[0_28px_80px_rgba(11,23,40,0.10)] md:-mt-14 md:p-10 lg:p-14"
      >
        <div className="max-w-[760px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
            Before we talk
          </p>
          <h2
            id="fit-heading"
            className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]"
          >
            The right working relationship should be clear from the start.
          </h2>
        </div>

        <div className="mt-10 grid border-y border-border lg:grid-cols-2">
          <div className="py-8 lg:pr-12">
            <h3 className="text-[18px] font-bold text-navy">
              COBRYKZ is likely a strong fit if
            </h3>
            <ul className="mt-6 space-y-5">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#E8F6F0] text-evergreen">
                    <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <span className="text-[14px] leading-7 text-slate md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border py-8 lg:border-l lg:border-t-0 lg:pl-12">
            <h3 className="text-[18px] font-bold text-navy">
              We may not be the right fit if
            </h3>
            <ul className="mt-6 space-y-5">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gray-100 text-slate">
                    <Minus size={14} strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <span className="text-[14px] leading-7 text-slate md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
