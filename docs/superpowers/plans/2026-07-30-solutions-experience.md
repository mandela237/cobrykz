# Cobrykz Solutions Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Solutions hub and all six dedicated solution pages from the frozen Cobrykz specification.

**Architecture:** Extend the authoritative solution model with typed page content, render the hub and six routes through shared server components, and keep each page distinct through content and explanatory artifacts rather than separate visual systems. Use static App Router pages and per-route metadata; avoid dynamic CMS or runtime data until Projects and Insights require publication state.

**Tech Stack:** Next.js 16.2.9 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, Lucide React, Node test runner

## Global Constraints

- The frozen strategy and messaging guides control all copy and hierarchy.
- Solutions are ordered: AI Solutions, Business Automation, Custom Software Development, Digital Business Systems, Websites & Web Applications, Technology Consulting.
- Websites & Web Applications remains visually equal in importance.
- Every page follows one premium Cobrykz system; no service-specific colors, logos, or themes.
- Lead with business problems and outcomes before technical capability.
- Use shared content and components; do not duplicate solution names in route files.
- Representative applications are examples, never completed-project claims.
- Primary CTA is **Discuss a business challenge**.
- All controls are keyboard accessible and at least 44px on mobile.
- Preserve the reviewed palette, type, focus, icon, motion, and single-responsive-tree contracts.
- Do not modify `0721.mp4` or reopen the frozen information architecture.

---

### Task 1: Complete Typed Solution Content

**Files:**
- Modify: `components/content/solutions.ts`
- Create: `tests/solutions-contract.test.mjs`

**Interfaces:**
- Produces: `SolutionPageDefinition`, complete `solutions`, safe `solutionBySlug`
- Required fields: `heroSupport`, `recognition`, `businessOutcomes`, `deliverables`, `applications`, `approach`, `relatedSlugs`, `faqs`, `cta`, `metadata`

- [ ] Write a failing source-contract test that requires all six page definitions, exact route order, non-empty required arrays, unique metadata titles/descriptions, valid related slugs, and the AI “Where AI may not be the right answer” section.
- [ ] Run `node --test tests/solutions-contract.test.mjs`; expect failure on missing fields.
- [ ] Expand `SolutionDefinition` into:

```ts
export type SolutionFaq = { question: string; answer: string };
export type SolutionPageDefinition = SolutionDefinition & {
  heroSupport: string;
  recognition: readonly string[];
  businessOutcomes: readonly string[];
  deliverables: readonly string[];
  applications: readonly string[];
  approach: readonly { title: string; description: string }[];
  relatedSlugs: readonly SolutionSlug[];
  faqs: readonly SolutionFaq[];
  cta: { title: string; label: string };
  metadata: { title: string; description: string };
  guidance?: { title: string; description: string };
};
```

- [ ] Populate exact approved page content from the frozen specification. AI guidance explains when AI is not the right answer; Custom Software guidance compares configure, integrate, custom build, and modernize; Digital Business Systems preserves the software/systems/automation distinction; Websites organizes around establish trust, enable action, deliver service; Technology Consulting lists concrete decision deliverables.
- [ ] Replace the unsafe `Object.fromEntries` cast with an explicit `satisfies Record<SolutionSlug, SolutionPageDefinition>` object or validate complete construction without a totalizing assertion.
- [ ] Run focused tests, `npm test`, and `npx tsc --noEmit`; expect all pass.
- [ ] Commit: `feat: complete Cobrykz solution content model`

---

### Task 2: Shared Solution Page Components

**Files:**
- Create: `components/solutions/SolutionHero.tsx`
- Create: `components/solutions/ProblemRecognition.tsx`
- Create: `components/solutions/OutcomeList.tsx`
- Create: `components/solutions/CapabilityList.tsx`
- Create: `components/solutions/ApplicationExamples.tsx`
- Create: `components/solutions/SolutionApproach.tsx`
- Create: `components/solutions/SolutionGuidance.tsx`
- Create: `components/solutions/RelatedSolutions.tsx`
- Create: `components/solutions/SolutionFaqs.tsx`
- Create: `components/solutions/SolutionFinalCta.tsx`
- Create: `components/solutions/SolutionPage.tsx`
- Modify: `tests/solutions-contract.test.mjs`

**Interfaces:**
- Consumes: one `SolutionPageDefinition`
- Produces: `SolutionPage({ solution }: { solution: SolutionPageDefinition })`

- [ ] Add failing tests requiring the ten-section shared composition, one H1, semantic labelled sections, examples labelled “Representative applications,” shared CTA consumption, related-solution links, and native `details`/`summary` FAQ behavior or an equivalently accessible disclosure.
- [ ] Run focused test; expect missing component failures.
- [ ] Implement server components. `SolutionPage` renders:

```tsx
<>
  <SolutionHero solution={solution} />
  <ProblemRecognition solution={solution} />
  <OutcomeList solution={solution} />
  <CapabilityList solution={solution} />
  <ApplicationExamples solution={solution} />
  {solution.guidance && <SolutionGuidance guidance={solution.guidance} />}
  <SolutionApproach solution={solution} />
  <RelatedSolutions solution={solution} />
  <SolutionFaqs solution={solution} />
  <SolutionFinalCta solution={solution} />
</>
```

- [ ] Use editorial rows, numbered stages, restrained bordered surfaces, and one shared dark CTA band. Do not create six card-heavy page variants.
- [ ] Run focused tests, full tests, lint, and typecheck; expect all pass.
- [ ] Commit: `feat: add shared solution page system`

---

### Task 3: Solutions Hub

**Files:**
- Create: `app/solutions/page.tsx`
- Create: `components/solutions/SolutionsHub.tsx`
- Create: `components/solutions/SolutionSelectionMatrix.tsx`
- Modify: `tests/solutions-contract.test.mjs`

**Interfaces:**
- Consumes: `solutions`, `homeOutcomes`, `processStages`, `primaryCta`
- Produces: `/solutions`

- [ ] Add failing tests for static metadata, one H1, all six links, three outcomes, business-condition selection matrix, connected-solutions explanation, Discover/Assess/Design summary, Why Cobrykz, and final problem-first CTA.
- [ ] Run focused test; expect route/component missing.
- [ ] Implement the hub without duplicating homepage markup. Use a comparison matrix with semantic rows and direct solution links; explain that connected outcomes may combine multiple capabilities.
- [ ] Add metadata:

```ts
export const metadata: Metadata = {
  title: "Business Technology Solutions | Cobrykz",
  description:
    "Explore AI, automation, custom software, websites, digital business systems, and technology consulting shaped around real business challenges.",
};
```

- [ ] Run focused/full tests, lint, typecheck; expect all pass.
- [ ] Commit: `feat: build Cobrykz solutions hub`

---

### Task 4: Six Dedicated Solution Routes

**Files:**
- Create: `app/solutions/ai/page.tsx`
- Create: `app/solutions/business-automation/page.tsx`
- Create: `app/solutions/custom-software-development/page.tsx`
- Create: `app/solutions/digital-business-systems/page.tsx`
- Create: `app/solutions/websites-web-applications/page.tsx`
- Create: `app/solutions/technology-consulting/page.tsx`
- Modify: `tests/solutions-contract.test.mjs`

**Interfaces:**
- Consumes: `solutionBySlug`, `SolutionPage`
- Produces: six static routes with unique metadata

- [ ] Add failing tests requiring all route files, exact shared-page consumption, correct slug lookup, and unique page metadata drawn from the model.
- [ ] Run focused test; expect six missing routes.
- [ ] Implement each route as a small static server page:

```tsx
import type { Metadata } from "next";
import { solutionBySlug } from "@/components/content/solutions";
import SolutionPage from "@/components/solutions/SolutionPage";

const solution = solutionBySlug.ai;
export const metadata: Metadata = solution.metadata;
export default function Page() {
  return <SolutionPage solution={solution} />;
}
```

Use the appropriate explicit slug key in every route.

- [ ] Run focused/full tests, lint, typecheck, and `npm run build`; expect all seven solution routes statically generated.
- [ ] Commit: `feat: add six Cobrykz solution pages`

---

### Task 5: Solutions Experience Verification

**Files:**
- Modify only files implicated by verification
- Test: `tests/solutions-contract.test.mjs`, `tests/presentation-quality.test.mjs`, `tests/strategy-contract.test.mjs`

- [ ] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`; expect all pass.
- [ ] Verify `rg -n "Artificial Intelligence|Start with the website|Founder-Led Websites" app components` returns no legacy positioning.
- [ ] Verify every solution route returns HTTP 200 from the production server.
- [ ] Verify headings, cross-links, CTA labels, example disclaimers, and metadata differ appropriately without separate visual systems.
- [ ] Record browser visual QA for the final whole-site review if a browser session remains unavailable.
- [ ] Commit only verification fixes: `fix: complete solutions experience gate`.
