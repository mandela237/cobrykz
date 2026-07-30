import Link from "next/link";
import CobrykzLogo from "@/components/CobrykzLogo";
import {
  primaryCta,
  primaryNavigation,
  siteIdentity,
} from "@/components/content/site";
import PrimaryLink from "@/components/ui/PrimaryLink";
import MobileNavigation from "./MobileNavigation";
import SolutionsMenu from "./SolutionsMenu";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="site-header-mobile section-shell md:hidden">
        <Link
          href="/"
          className="action-transition flex min-h-11 items-center rounded-lg"
          aria-label={`${siteIdentity.name}, home`}
        >
          <CobrykzLogo
            size={28}
            variant="default"
            showWordmark
            wordmarkSize="sm"
          />
        </Link>
        <MobileNavigation />
      </div>

      <div className="site-header-desktop section-shell hidden md:flex min-w-0 min-h-16 flex-wrap items-center justify-between gap-x-4 py-2 lg:py-0">
        <Link
          href="/"
          className="action-transition flex min-h-11 items-center rounded-lg"
          aria-label={`${siteIdentity.name}, home`}
        >
          <CobrykzLogo
            size={28}
            variant="default"
            showWordmark
            wordmarkSize="sm"
          />
        </Link>

        <nav
          className="min-w-0 w-full border-t border-border lg:w-auto lg:border-0"
          aria-label="Primary navigation"
        >
          <ul
            className="flex max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-1 py-1 lg:flex-nowrap lg:gap-0 lg:py-0"
            role="list"
          >
            {primaryNavigation.map((item) =>
              item.label === "Solutions" ? (
                <SolutionsMenu key={item.href} />
              ) : (
                <li key={item.href} className="max-w-full">
                  <Link
                    href={item.href}
                    className="nav-underline action-transition flex min-h-11 max-w-full items-center px-2 text-[13px] font-medium text-slate hover:text-navy active:text-navy lg:px-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <PrimaryLink
          href={primaryCta.href}
          className="mb-2 w-full max-w-full basis-full lg:mb-0 lg:w-auto lg:basis-auto"
        >
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </header>
  );
}
