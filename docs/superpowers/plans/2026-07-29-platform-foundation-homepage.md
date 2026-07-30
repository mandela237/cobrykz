# Cobrykz Platform Foundation and Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website-agency homepage with the frozen Cobrykz technology-company homepage and establish the shared content, navigation, metadata, and responsive component foundation for the multi-page site.

**Architecture:** Keep Next.js App Router and the existing premium visual tokens. Move repeated company and solution information into typed content modules, render one semantic responsive homepage instead of separate desktop/mobile copy trees, and isolate only interactive navigation and challenge routing as client components. Preserve the existing brand assets until each is deliberately accepted or removed during implementation.

**Tech Stack:** Next.js 16.2.9 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, Geist, Playfair Display, Lucide React, Node test runner

## Global Constraints

- The strategy, information architecture, UX model, messaging system, and page structure in `docs/superpowers/specs/2026-07-29-cobrykz-strategic-repositioning-design.md` are frozen.
- Use **Better systems. Stronger business.** as the public tagline.
- Use **Turn business challenges into better systems.** as the homepage H1.
- Use **Discuss a business challenge** as the primary CTA.
- Use **AI Solutions**, never **Artificial Intelligence**, as the solution name.
- Preserve the light-first palette, deep ink authority sections, conviction blue actions, Geist typography, restrained editorial accents, generous spacing, and minimal functional motion.
- Do not add generic AI gradients, robots, brains, circuits, floating dashboards, invented projects, fabricated metrics, anonymous testimonials, or unsupported claims.
- Company capability uses “Cobrykz” or “we”; “I” appears only in attributed founder material.
- All controls require visible focus, keyboard access, sufficient contrast, and 44px minimum mobile targets.
- No critical content may require hover, animation, or imagery.
- Do not initialize decorative Three.js experiences on this phase unless a measured review proves they add sufficient value.
- Do not modify or delete the unrelated untracked file `0721.mp4`.

---

## File Structure

Create:

- `components/content/site.ts` — company identity, navigation, CTA, and route constants
- `components/content/solutions.ts` — authoritative typed solution definitions
- `components/content/home.ts` — frozen homepage copy and challenge mappings
- `components/layout/SiteHeader.tsx` — server-rendered header shell
- `components/layout/SolutionsMenu.tsx` — accessible client navigation disclosure
- `components/layout/SiteFooter.tsx` — shared footer
- `components/ui/SectionIntro.tsx` — shared editorial section heading
- `components/ui/PrimaryLink.tsx` — shared CTA link treatment
- `components/home/HomeHero.tsx`
- `components/home/BusinessOutcomes.tsx`
- `components/home/SolutionsOverview.tsx`
- `components/home/WhyCobrykz.tsx`
- `components/home/AIPointOfView.tsx`
- `components/home/ChallengeRouter.tsx`
- `components/home/ProcessOverview.tsx`
- `components/home/ProjectsEvidence.tsx`
- `components/home/AuthorityBand.tsx`
- `components/home/HomeFinalCTA.tsx`
- `tests/strategy-contract.test.mjs`

Modify:

- `app/layout.tsx` — company metadata and shared shell
- `app/page.tsx` — one responsive semantic homepage
- `app/globals.css` — shared layout utilities and responsive presentation
- `tests/presentation-quality.test.mjs` — remove assertions tied to retired website-agency sections and preserve relevant quality contracts

Retire after replacements pass:

- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/mobile/MobileExperience.tsx`
- Homepage-only legacy section and mobile files no longer imported by any route

Retirement must happen with explicit tracked paths after `rg` confirms zero imports. Do not bulk-delete directories.

---

### Task 1: Authoritative Brand and Solution Content

**Files:**
- Create: `components/content/site.ts`
- Create: `components/content/solutions.ts`
- Create: `components/content/home.ts`
- Create: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Produces: `siteIdentity`, `primaryNavigation`, `primaryCta`
- Produces: `SolutionSlug`, `SolutionDefinition`, `solutions`, `solutionBySlug`
- Produces: `homeOutcomes`, `whyCobrykz`, `aiPrinciples`, `challengeRoutes`, `processStages`

- [ ] **Step 1: Write the failing content-contract test**

Create `tests/strategy-contract.test.mjs` with Node tests that import source text and assert:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("defines the frozen six-solution portfolio once", () => {
  const source = read("components/content/solutions.ts");
  for (const name of [
    "AI Solutions",
    "Business Automation",
    "Custom Software Development",
    "Digital Business Systems",
    "Websites & Web Applications",
    "Technology Consulting",
  ]) {
    assert.equal(source.split(`name: "${name}"`).length - 1, 1);
  }
  assert.doesNotMatch(source, /name: "Artificial Intelligence"/);
});

test("retains the frozen homepage message hierarchy", () => {
  const source = read("components/content/home.ts");
  assert.match(source, /Turn business challenges into better systems\./);
  assert.match(source, /Grow more effectively/);
  assert.match(source, /Operate more efficiently/);
  assert.match(source, /Modernize with confidence/);
  assert.match(source, /Where AI may not be the right answer/);
});
```

- [ ] **Step 2: Run the test and verify the missing files fail**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: FAIL with `ENOENT` for `components/content/solutions.ts`.

- [ ] **Step 3: Implement the typed content modules**

Define:

```ts
export type SolutionSlug =
  | "ai"
  | "business-automation"
  | "custom-software-development"
  | "digital-business-systems"
  | "websites-web-applications"
  | "technology-consulting";

export type SolutionDefinition = {
  slug: SolutionSlug;
  name: string;
  navOutcome: string;
  problem: string;
  outcome: string;
  href: `/solutions/${SolutionSlug}`;
};
```

Populate all six definitions in the frozen order. In `site.ts`, define the five
navigation destinations and:

```ts
export const primaryCta = {
  label: "Discuss a business challenge",
  href: "/contact",
} as const;
```

In `home.ts`, define exactly three outcomes, five Why Cobrykz commitments, three
AI principles, six challenge routes keyed to `SolutionSlug`, and the six
process stages. Store copy once and consume it in later components.

- [ ] **Step 4: Run content tests**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: 2 tests pass.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`  
Expected: exit code 0.

- [ ] **Step 6: Commit**

```powershell
git add -- components/content/site.ts components/content/solutions.ts components/content/home.ts tests/strategy-contract.test.mjs
git commit -m "feat: define frozen Cobrykz content model"
```

---

### Task 2: Shared Metadata, Header, and Footer

**Files:**
- Create: `components/layout/SiteHeader.tsx`
- Create: `components/layout/SolutionsMenu.tsx`
- Create: `components/layout/SiteFooter.tsx`
- Create: `components/ui/PrimaryLink.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Test: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Consumes: `primaryNavigation`, `primaryCta`, `solutions`, `siteIdentity`
- Produces: a shared root layout, keyboard-operable Solutions disclosure, and unified CTA link

- [ ] **Step 1: Add failing shell tests**

Assert that `app/layout.tsx` contains the title
`Cobrykz | AI, Automation, Software & Digital Systems`, imports `SiteHeader` and
`SiteFooter`, and no longer contains `Founder-Led Websites`. Assert that
`SolutionsMenu.tsx` includes `aria-expanded`, `aria-controls`, Escape-key
handling, and all links from the shared solution array.

- [ ] **Step 2: Run the focused test**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: FAIL on the unchanged metadata and missing layout components.

- [ ] **Step 3: Implement `PrimaryLink` and the shared shell**

`PrimaryLink` accepts:

```ts
type PrimaryLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
```

It renders a minimum-44px blue link using `action-transition`, restrained color
states, and the existing focus system.

`SolutionsMenu` is the only client component in the header. It opens from a
button, closes on Escape and link selection, exposes state through ARIA, and
uses click/tap rather than hover as the only activation method.

`SiteHeader` renders the logo, primary navigation, Solutions disclosure, and
primary CTA. `SiteFooter` renders the approved tagline, solution links, company
links, working email address, and primary CTA.

- [ ] **Step 4: Update metadata and root layout**

Set:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://cobrykz.com"),
  title: "Cobrykz | AI, Automation, Software & Digital Systems",
  description:
    "Cobrykz helps businesses grow and operate more effectively through AI, automation, custom software, websites, and connected digital systems.",
  authors: [{ name: "Mandela Atud" }],
  creator: "Cobrykz",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cobrykz",
    title: "Cobrykz | AI, Automation, Software & Digital Systems",
    description:
      "Better systems for stronger businesses—from strategy through ongoing improvement.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cobrykz | AI, Automation, Software & Digital Systems",
    description:
      "Better systems for stronger businesses—from strategy through ongoing improvement.",
  },
};
```

Render `SiteHeader`, `children`, and `SiteFooter` once around all pages.

- [ ] **Step 5: Run tests and lint**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: all focused tests pass.

Run: `npm run lint`  
Expected: exit code 0.

- [ ] **Step 6: Commit**

```powershell
git add -- app/layout.tsx app/globals.css components/layout components/ui/PrimaryLink.tsx tests/strategy-contract.test.mjs
git commit -m "feat: add shared Cobrykz site shell"
```

---

### Task 3: Semantic Homepage Narrative

**Files:**
- Create: `components/ui/SectionIntro.tsx`
- Create: `components/home/HomeHero.tsx`
- Create: `components/home/BusinessOutcomes.tsx`
- Create: `components/home/SolutionsOverview.tsx`
- Create: `components/home/WhyCobrykz.tsx`
- Create: `components/home/AIPointOfView.tsx`
- Create: `components/home/ProcessOverview.tsx`
- Create: `components/home/ProjectsEvidence.tsx`
- Create: `components/home/AuthorityBand.tsx`
- Create: `components/home/HomeFinalCTA.tsx`
- Modify: `app/page.tsx`
- Test: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Consumes: all frozen content modules and `PrimaryLink`
- Produces: one server-rendered semantic homepage with ten narrative sections

- [ ] **Step 1: Add a failing homepage-order test**

Read `app/page.tsx` and assert imports and JSX instances appear in this order:

```js
const expected = [
  "HomeHero",
  "BusinessOutcomes",
  "SolutionsOverview",
  "WhyCobrykz",
  "AIPointOfView",
  "ChallengeRouter",
  "ProcessOverview",
  "ProjectsEvidence",
  "AuthorityBand",
  "HomeFinalCTA",
];
```

Also assert that `MobileExperience`, `Founder-led websites`, and
`Start with the website` are absent.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: FAIL because `app/page.tsx` still imports the legacy homepage.

- [ ] **Step 3: Implement server-rendered homepage sections**

Use semantic `section`, `h1`, `h2`, `h3`, lists, and links. The H1 occurs once
in `HomeHero`. Every section consumes shared content instead of redefining
solution names.

Use this section identity contract:

```tsx
<section aria-labelledby="solutions-heading" id="solutions">
  <SectionIntro
    id="solutions-heading"
    title="Modern solutions for real business challenges."
    description="Cobrykz combines strategy and execution to move organizations from problem to working solution."
  />
</section>
```

`ProjectsEvidence` must describe future case studies honestly and must not
render fake project cards. `AuthorityBand` combines Mandela’s accountable
leadership with one preview of the first planned insight, clearly labeled as
planned content rather than a live article link until the article exists.

- [ ] **Step 4: Replace `app/page.tsx`**

Render one `<main>` with the ten sections in the tested order. Do not use
parallel `.md:hidden` and `.hidden md:block` content trees.

- [ ] **Step 5: Run focused and full tests**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: all focused tests pass.

Run: `npm test`  
Expected: legacy presentation tests may identify contracts that must be updated
in Task 5; record exact failures and do not weaken unrelated accessibility,
icon, focus, or motion contracts.

- [ ] **Step 6: Commit**

```powershell
git add -- app/page.tsx components/home components/ui/SectionIntro.tsx tests/strategy-contract.test.mjs
git commit -m "feat: build technology company homepage narrative"
```

---

### Task 4: Accessible Business-Challenge Router

**Files:**
- Create: `components/home/ChallengeRouter.tsx`
- Modify: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Consumes: `challengeRoutes`, `solutionBySlug`
- Produces: selectable challenges with linked recommended starting solutions

- [ ] **Step 1: Add failing source-contract tests**

Assert `ChallengeRouter.tsx` contains:

- `"use client"`
- a native `button` for each challenge
- `aria-pressed`
- a live explanatory region with `aria-live="polite"`
- the qualifier `A focused assessment confirms the right approach.`
- a link to the selected solution
- a link to `/contact`

- [ ] **Step 2: Run and verify the test fails**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: FAIL because the client router does not yet exist.

- [ ] **Step 3: Implement the interaction**

Use:

```ts
const [selectedSlug, setSelectedSlug] =
  useState<SolutionSlug>("business-automation");
```

Render all six challenge buttons in the DOM. Selection updates the explanation
without hiding the other options. Buttons remain at least 44px tall and show a
clear selected state without relying on color alone.

- [ ] **Step 4: Verify**

Run: `node --test tests/strategy-contract.test.mjs`  
Expected: all tests pass.

Run: `npx tsc --noEmit`  
Expected: exit code 0.

- [ ] **Step 5: Commit**

```powershell
git add -- components/home/ChallengeRouter.tsx tests/strategy-contract.test.mjs
git commit -m "feat: route visitors by business challenge"
```

---

### Task 5: Responsive Premium Presentation and Legacy Retirement

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/presentation-quality.test.mjs`
- Delete: only legacy files proven unreferenced with `rg`
- Test: `tests/presentation-quality.test.mjs`
- Test: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Consumes: completed shared shell and homepage
- Produces: one responsive presentation from 320px upward and a test suite aligned with the frozen strategy

- [ ] **Step 1: Add responsive structure assertions**

Update tests to require one homepage content tree and reject imports from
`components/mobile/MobileExperience`. Preserve tests for:

- platform-native font rendering
- restrained action transitions
- focus outlines
- Lucide-only interface icons
- `aria-hidden` on decorative icons
- 13px minimum explanatory text
- no repeated generated-landing-page decoration
- accessible, non-blocking hero media if retained

- [ ] **Step 2: Run full tests and capture failures**

Run: `npm test`  
Expected: FAIL on legacy path and copy assumptions that no longer describe the
frozen strategy.

- [ ] **Step 3: Implement responsive styles**

Extend the existing token system without introducing a second brand palette.
Use shared `.section-shell`, fixed mobile typography, restrained editorial
depth, and responsive grids only where comparison benefits.

Do not add `transition-all`, scale/lift hover effects, shimmer, scroll-hidden
content, continuous icon motion, or hover-only disclosures.

- [ ] **Step 4: Prove legacy files are unused**

Run:

```powershell
rg -n "MobileExperience|components/Navbar|components/Footer|components/sections/(Hero|BuildArtifact|Services|Industries|Process|Founder|GoodFit|FAQ|FinalCTA)" app components
```

Expected: no live imports from the new app shell or homepage. Review every
match before removing an exact file.

- [ ] **Step 5: Remove only confirmed retired files**

Use `apply_patch` delete hunks for the explicit unused files. Keep assets and
components still referenced by any route or test. Do not delete the
`components/mobile` directory recursively.

- [ ] **Step 6: Run verification**

Run: `npm test`  
Expected: all tests pass.

Run: `npm run lint`  
Expected: exit code 0.

Run: `npx tsc --noEmit`  
Expected: exit code 0.

- [ ] **Step 7: Commit**

```powershell
git add -A -- app components tests
git commit -m "refactor: unify responsive Cobrykz homepage"
```

---

### Task 6: Production Build and Manual Quality Gate

**Files:**
- Modify only files implicated by verification failures
- Test: all automated tests and production build

**Interfaces:**
- Consumes: complete foundation and homepage
- Produces: a production-buildable, accessible homepage ready for supporting-page plans

- [ ] **Step 1: Run the complete automated gate**

Run:

```powershell
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Expected: every command exits with code 0.

- [ ] **Step 2: Start the production server**

Run: `npm start`  
Expected: Next.js reports a local production URL without runtime errors.

- [ ] **Step 3: Review key viewports**

Inspect at:

- 320 × 568
- 390 × 844
- 768 × 1024
- 1280 × 800
- 1440 × 900

Verify:

- The first viewport identifies Cobrykz as a technology company.
- The H1, two hero actions, and capability support remain legible.
- Navigation works by keyboard and touch.
- Solutions menu does not clip or trap focus.
- Challenge selection communicates state without color alone.
- All six solutions remain visible and equally credible.
- Founder presence supports company leadership rather than freelancer identity.
- No horizontal overflow occurs.
- Reduced motion removes nonessential animation.
- The full narrative contains no legacy website-first language.

- [ ] **Step 4: Verify content and route contracts**

Run:

```powershell
rg -n "Founder-Led Websites|Founder-led web design|Start with the website|website need to do better" app components
rg -n "Artificial Intelligence" app components
rg -n "Discuss a business challenge" app components
```

Expected:

- First command returns no matches.
- Second command returns no solution-name matches.
- Third command returns the header, homepage, and footer primary actions.

- [ ] **Step 5: Commit verification fixes**

If verification required changes:

```powershell
git add -- app components tests
git commit -m "fix: complete homepage quality gate"
```

If no changes were required, do not create an empty commit.

---

## Follow-on Plans

After this plan passes:

1. Solutions hub and six dedicated solution pages
2. Projects, Process, About, and Insights content platform
3. Server-backed Contact flow, privacy, abuse protection, and analytics
4. Full-site SEO, structured data, sitemap, error states, and launch QA

Each follow-on plan must reuse the content and component interfaces established
here and may not reopen the frozen strategy.
