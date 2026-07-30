import Image from "next/image";
import type { AboutPageDefinition } from "@/components/content/companyPages";

export default function FounderAccountability({
  leadership,
}: {
  leadership: AboutPageDefinition["leadership"];
}) {
  return (
    <section
      aria-labelledby="about-leadership-heading"
      className="border-b border-border bg-white"
    >
      <div className="section-shell grid gap-10 py-16 sm:py-20 md:grid-cols-[minmax(18rem,0.92fr)_minmax(0,1.08fr)] md:items-center lg:gap-24 lg:py-28">
        <figure className="relative">
          <div className="relative min-h-[30rem] overflow-hidden bg-gray-100 sm:min-h-[38rem]">
            <Image
              src="/mandela-portrait-sharp.jpg"
              alt={`${leadership.name}, ${leadership.role}`}
              fill
              sizes="(min-width: 1200px) 500px, (min-width: 768px) 46vw, calc(100vw - 2.5rem)"
              className="object-cover object-[50%_18%]"
            />
          </div>
          <figcaption className="border-x border-b border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-blue">
            {leadership.role}
          </figcaption>
        </figure>

        <div className="md:-ml-14 md:bg-white md:p-10 lg:-ml-20 lg:p-14">
          <h2
            id="about-leadership-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
          >
            {leadership.title}
          </h2>
          <p className="mt-6 text-2xl text-charcoal sm:text-3xl">
            {leadership.name}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-[17px] sm:leading-8">
            {leadership.description}
          </p>
        </div>
      </div>
    </section>
  );
}
