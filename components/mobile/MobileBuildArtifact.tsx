import Image from "next/image";
import { buildDecisions } from "@/components/content/buildArtifact";

export default function MobileBuildArtifact() {
  return (
    <section id="m-inside-build" className="m-section border-b border-border bg-white">
      <div className="m-shell">
        <h2 className="text-[30px] font-extrabold leading-[1.08] text-navy">This page is part of the proof.</h2>
        <p className="mt-4 text-[14px] leading-6 text-slate">
          The mobile experience is composed for this screen, not reduced from a desktop template.
        </p>

        <figure className="mt-7 overflow-hidden rounded-lg border border-navy/15 bg-gray-light">
          <Image src="/cobrykz-build-mobile.png" alt="The COBRYKZ mobile homepage opening" width={375} height={812} className="h-auto w-full" />
          <figcaption className="border-t border-navy/10 px-3 py-3 text-[11px] font-medium text-slate">Live homepage composition · mobile</figcaption>
        </figure>

        <ol className="mt-7 border-t border-navy/20">
          {buildDecisions.map((decision) => (
            <li key={decision.number} className="grid grid-cols-[32px_1fr] gap-2 border-b border-navy/15 py-5">
              <span className="text-[11px] font-bold text-blue">{decision.number}</span>
              <div>
                <h3 className="text-[16px] font-bold text-navy">{decision.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-slate">{decision.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
