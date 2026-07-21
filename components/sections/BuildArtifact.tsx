import Image from "next/image";
import { buildDecisions } from "@/components/content/buildArtifact";

export default function BuildArtifact() {
  return (
    <section id="inside-build" className="border-b border-border bg-white py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-6 border-b border-navy/15 pb-8 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-[680px] text-[38px] font-extrabold leading-[1.05] tracking-normal text-navy md:text-[54px]">
            This page is part of the proof.
          </h2>
          <p className="max-w-[560px] text-[16px] leading-7 text-slate lg:justify-self-end">
            COBRYKZ was built with the same choices I bring to client work: a clear position, deliberate mobile composition, and no dead-end inquiry form.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.45fr_.55fr] lg:gap-14">
          <figure className="overflow-hidden rounded-lg border border-navy/15 bg-gray-light">
            <Image src="/cobrykz-build-desktop.png" alt="The COBRYKZ desktop homepage opening" width={1440} height={900} className="h-auto w-full" />
            <figcaption className="border-t border-navy/10 px-4 py-3 text-[12px] font-medium text-slate">
              Live homepage composition · desktop
            </figcaption>
          </figure>

          <ol className="border-t border-navy/20">
            {buildDecisions.map((decision) => (
              <li key={decision.number} className="grid grid-cols-[36px_1fr] gap-3 border-b border-navy/15 py-6">
                <span className="text-[12px] font-bold text-blue">{decision.number}</span>
                <div>
                  <h3 className="text-[17px] font-bold text-navy">{decision.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-slate">{decision.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
