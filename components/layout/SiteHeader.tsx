import CobrykzLogo from "@/components/CobrykzLogo";
import {
  primaryCta,
  primaryNavigation,
  siteIdentity,
} from "@/components/content/site";
import PrimaryLink from "@/components/ui/PrimaryLink";
import SolutionsMenu from "./SolutionsMenu";

const homeHref = "/";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="section-shell flex min-h-16 flex-wrap items-center justify-between gap-x-4">
        <a
          href={homeHref}
          className="action-transition flex min-h-11 items-center rounded-lg"
          aria-label={`${siteIdentity.name}, home`}
        >
          <CobrykzLogo
            size={28}
            variant="default"
            showWordmark
            wordmarkSize="sm"
          />
        </a>

        <nav
          className="order-3 w-full border-t border-border md:order-none md:w-auto md:border-0"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center justify-between md:justify-start" role="list">
            {primaryNavigation.map((item) =>
              item.label === "Solutions" ? (
                <SolutionsMenu key={item.href} />
              ) : (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-underline action-transition flex min-h-11 items-center px-2 text-[13px] font-medium text-slate hover:text-navy active:text-navy md:px-3"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <PrimaryLink href={primaryCta.href} className="hidden md:inline-flex">
          {primaryCta.label}
        </PrimaryLink>
      </div>
    </header>
  );
}
