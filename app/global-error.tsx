"use client";

import Link from "next/link";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ResponsivePageComposition
          mobile={<MobileGlobalError reset={reset} />}
          desktop={<DesktopGlobalError reset={reset} />}
        />
      </body>
    </html>
  );
}

function DesktopGlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-gray-light">
          <div className="section-shell py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">Something went wrong</p>
            <h1 className="text-balance mt-5 max-w-4xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl">
              The page could not be completed.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate">
              Try the request again. If the problem continues, return to the Cobrykz homepage.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <button type="button" onClick={() => reset()} className="action-transition min-h-12 rounded-lg bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-dark">
                Try again
              </button>
              <Link href="/" className="action-transition inline-flex min-h-12 items-center px-2 text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy">
                Return home
              </Link>
            </div>
          </div>
        </main>
  );
}

function MobileGlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen" data-mobile-recovery="global-error">
      <div className="section-shell mobile-recovery-frame">
        <p className="mobile-recovery-marker">Something went wrong</p>
        <h1>The page could not be completed.</h1>
        <p>
          Try the request again. If the problem continues, return to the Cobrykz homepage.
        </p>
        <div className="mobile-recovery-actions">
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}
