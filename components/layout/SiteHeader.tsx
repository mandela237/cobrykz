import Link from "next/link";
import CobrykzLogo from "@/components/CobrykzLogo";
import {
  primaryCta,
  primaryNavigation,
  siteIdentity,
} from "@/components/content/site";
import PrimaryLink from "@/components/ui/PrimaryLink";
import SolutionsMenu from "./SolutionsMenu";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="section-shell flex min-h-16 flex-wrap items-center justify-between gap-x-4 py-2 lg:py-0">
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
          className="order-3 w-full border-t border-border lg:order-none lg:w-auto lg:border-0"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center justify-between lg:justify-start" role="list">
            {primaryNavigation.map((item) =>
              item.label === "Solutions" ? (
                <SolutionsMenu key={item.href} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-underline action-transition flex min-h-11 items-center px-2 text-[13px] font-medium text-slate hover:text-navy active:text-navy lg:px-3"
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
          className="order-2 mb-2 w-full lg:order-none lg:mb-0 lg:w-auto"
        >
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </header>
  );
}
