import Link from "next/link";
import CobrykzLogo from "@/components/CobrykzLogo";
import {
  primaryCta,
  primaryNavigation,
  siteIdentity,
} from "@/components/content/site";
import { solutions } from "@/components/content/solutions";
import PrimaryLink from "@/components/ui/PrimaryLink";

const companyLinks = primaryNavigation.filter(
  (item) => item.label !== "Solutions",
);

export default function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 bg-footer-bg text-white">
      <div className="site-footer__inner section-shell py-12">
        <div className="site-footer__grid grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          <div className="site-footer__brand sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="action-transition inline-flex min-h-11 items-center rounded-lg"
              aria-label={`${siteIdentity.name}, home`}
            >
              <CobrykzLogo
                size={29}
                variant="reversed"
                showWordmark
                wordmarkSize="sm"
              />
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-6 text-white/75">
              {siteIdentity.tagline}
            </p>
            <PrimaryLink href={primaryCta.href} className="mt-6">
              {primaryCta.label}
            </PrimaryLink>
          </div>

          <div className="site-footer__solutions">
            <p className="text-[13px] font-bold uppercase text-white/65">
              Solutions
            </p>
            <ul className="mt-4 space-y-2" role="list">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={solution.href}
                    className="action-transition inline-flex min-h-11 items-center text-[13px] leading-5 text-white/75 hover:text-white active:text-white"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__company">
            <p className="text-[13px] font-bold uppercase text-white/65">
              Company
            </p>
            <ul className="mt-4 space-y-2" role="list">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="action-transition inline-flex min-h-11 items-center text-[13px] text-white/75 hover:text-white active:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="mailto:info@cobrykz.com"
              className="action-transition mt-5 inline-flex min-h-11 items-center text-[13px] font-medium text-white hover:text-blue-tint active:text-blue-tint"
            >
              info@cobrykz.com
            </a>
          </div>
        </div>

        <p className="site-footer__copyright pt-6 text-[13px] text-white/60">
          &copy; {new Date().getFullYear()} {siteIdentity.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
