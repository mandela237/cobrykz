import Link from "next/link";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function NotFound() {
  return (
    <ResponsivePageComposition
      mobile={<MobileNotFound />}
      desktop={<DesktopNotFound />}
    />
  );
}

function DesktopNotFound() {
  return (
    <section className="bg-gray-light">
      <div className="section-shell py-20 sm:py-28 lg:py-36">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">Page not found</p>
        <h1 className="text-balance mt-5 max-w-4xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl">
          This path does not lead to an active Cobrykz page.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate sm:text-[17px]">
          Explore the technology solutions Cobrykz provides, or begin with the business challenge you want to improve.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PrimaryLink href="/contact">Discuss a business challenge</PrimaryLink>
          <Link href="/solutions" className="action-transition inline-flex min-h-11 items-center px-1 text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy">
            Explore solutions
          </Link>
        </div>
      </div>
    </section>
  );
}

function MobileNotFound() {
  return (
    <section data-mobile-recovery="not-found">
      <div className="section-shell mobile-recovery-frame">
        <p className="mobile-recovery-marker">Page not found</p>
        <h1>This path does not lead to an active Cobrykz page.</h1>
        <p>
          Explore the technology solutions Cobrykz provides, or begin with the business challenge you want to improve.
        </p>
        <div className="mobile-recovery-actions">
          <PrimaryLink href="/contact">Discuss a business challenge</PrimaryLink>
          <Link href="/solutions">Explore solutions</Link>
        </div>
      </div>
    </section>
  );
}
