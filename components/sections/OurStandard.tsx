import {
  Accessibility,
  Check,
  Gauge,
  LayoutTemplate,
  Smartphone,
} from "lucide-react";

const standards = [
  {
    title: "The work starts with your business",
    description:
      "The structure comes from your audience, your offer, and your goals—not from a pre-built theme.",
    icon: LayoutTemplate,
  },
  {
    title: "Mobile is designed, not compressed",
    description:
      "Phone layouts are considered from the start, with stable screens and controls that are easy to use.",
    icon: Smartphone,
  },
  {
    title: "Polish without unnecessary weight",
    description:
      "Images, motion, and code each need a reason to be there, so the finished site stays responsive.",
    icon: Gauge,
  },
  {
    title: "Accessibility is part of the build",
    description:
      "Keyboard focus, contrast, labels, and reduced motion are handled during the work—not left for cleanup.",
    icon: Accessibility,
  },
];

export default function OurStandard() {
  return (
    <section id="our-standard" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
              Proof you can inspect
            </p>
            <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
              You can inspect the standard before you hire me.
            </h2>
            <p className="mt-5 max-w-[540px] text-[15px] leading-[1.8] text-slate md:text-[17px]">
              This site is not a substitute for client proof. It is, however, a
              working example of the care, clarity, and technical judgment I
              bring to a project.
            </p>

            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-gray-light shadow-[0_24px_70px_rgba(11,23,40,0.10)]">
              <div className="flex h-11 items-center gap-2 border-b border-border bg-white px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#DCE5F0]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#DCE5F0]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue/30" aria-hidden="true" />
                <div className="ml-2 flex h-6 flex-1 items-center rounded bg-gray-light px-3 text-[10px] text-slate">
                  cobrykz.com / quality review
                </div>
              </div>
              <div className="page-grid px-5 py-7 md:px-7 md:py-9">
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-normal text-blue">
                      Build standard
                    </p>
                    <p className="mt-2 text-[22px] font-bold tracking-normal text-navy">
                      Clear, useful, and ready for real customers.
                    </p>
                  </div>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-navy text-white sm:flex">
                    <Check size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
                <div className="grid grid-cols-3 border-y border-border bg-white">
                  {["Design", "Build", "Verify"].map((item, index) => (
                    <div
                      key={item}
                      className={`px-3 py-4 text-center ${
                        index > 0 ? "border-l border-border" : ""
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-normal text-slate">
                        {item}
                      </p>
                      <div className="mx-auto mt-3 h-1.5 max-w-[70px] rounded-full bg-blue/15">
                        <div
                          className="h-full rounded-full bg-blue"
                          style={{ width: `${76 + index * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border lg:mt-[76px]">
            {standards.map((standard) => {
              const Icon = standard.icon;
              return (
                <article
                  key={standard.title}
                  className="grid gap-4 border-b border-border py-6 sm:grid-cols-[48px_1fr]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-tint text-blue">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-navy">
                      {standard.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-7 text-slate">
                      {standard.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
