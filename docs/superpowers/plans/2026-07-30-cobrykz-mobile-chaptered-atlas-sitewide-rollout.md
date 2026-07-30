# Cobrykz Mobile Chaptered Atlas Sitewide Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the approved Chaptered Atlas mobile system from the Homepage and Solutions hub to every remaining public route, then present the complete site together at 390px with desktop regression evidence.

**Architecture:** Keep every existing desktop component and typed content registry as the frozen source of truth. Each route selects exactly one server-composed mobile or desktop presentation through a shared runtime breakpoint boundary; only disclosures, Atlas selection, navigation, and the existing contact form hydrate as focused client islands.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, existing System Atlas definitions, Node test runner, Playwright browser validation.

## Global Constraints

- Do not change approved copy, messaging, information architecture, page order, navigation, headlines, CTA labels or destinations, SEO, brand positioning, or desktop composition.
- Do not deploy this rollout.
- Mobile must feel originally designed for mobile, not like a compressed desktop layout.
- Prioritize immediate comprehension, fast scanning, one dominant idea per viewport, progressive disclosure, clear visual rhythm, touch-first interaction, and intentional pacing.
- Do not reduce readable type sizes to solve density.
- Desktop and mobile must consume the same typed content definitions.
- Render one semantic page composition at runtime; never CSS-hide duplicate mobile and desktop content trees.
- Keep touch targets at least 44px, visible keyboard focus, correct state semantics, reduced-motion support, and no horizontal overflow from 320px through 767px.
- Keep the existing `/` and `/solutions` implementations visually and behaviorally unchanged.
- Complete all implementation and internal review gates without pausing for user review; present the entire remaining site together at the end.

---

## Audit Inventory

| Route family | Current composition and source | Mobile problem | Chaptered Atlas treatment | Canonical anchors / client islands | Evidence |
|---|---|---|---|---|---|
| `/process` | `ProcessPage` consumes `processPage`; long hero, six dense `DeliveryRail` records, two gates, scaling rows, four accountability blocks, post-launch list, CTA | Each stage stacks description, decisions, and outputs into a long document; gates lose their relationship to progression | Opening; interactive six-stage delivery rail with one open stage; two emphasized decision gates; scaling paths disclosure; accountability disclosure; post-launch ledger; dark CTA | Preserve `process-hero`, `process-{stage}`, `process-cta`; focused `MobileDeliveryRail` client island | 390/1440 full page; all stages/gates; keyboard and reduced motion |
| `/about` | `AboutPage` consumes `aboutPage`; founding statement, purpose, principles, partnership Atlas, founder, standards, CTA | Principles and standards become repeated text rows; horizontal Atlas shrinks | Opening; dark founding statement; purpose; principles disclosure; partnership dark stage with vertical Atlas; founder accountability; standards disclosure; CTA | Preserve `about-hero`, purpose/partnership/CTA heading IDs; export existing `connectedPartner` definition; generic Atlas client island | 390/1440 full page; Atlas node selection; copy parity |
| Six `/solutions/{slug}` routes | One `SolutionPageDefinition` registry drives hero, recognition, outcomes, deliverables, operating Atlas, applications, optional artifact/guidance, approach, related solutions, FAQ, CTA | 11–13 stacked sections repeat list/grid patterns; operating Atlas is horizontal; optional artifacts create route-specific density | Shared mobile template: opening; recognition; outcomes disclosure; deliverable ledger; vertical operating Atlas; applications; optional artifact; optional guidance; process rail; related solutions; FAQ; CTA | Preserve all `solution-*` IDs and JSON-LD once; generic Atlas island; artifact disclosures only where present | 390/1440 for all six; variant coverage for AI guidance, automation workflow artifact, custom guidance, digital system-map artifact |
| `/projects` and future `/projects/[slug]` | `projects` registry is currently empty; index shows Evidence Standard + honest empty state. Detail renderer conditionally emits the complete case-study record | Evidence standard is six dense cards; future details can contain 14 consecutive prose/list sections; horizontal transformation record collapses | Index: opening, dark evidence-standard disclosure, honest empty/published ledger. Detail: intro, vertical transformation record, condition/decision/response chapters, compact how-it-works and outcome disclosures, quote stage, next/related, CTA | Preserve `projects-hero` and every `project-*` ID; no client island beyond shared disclosure | Current 390/1440 empty index; fixture contract for published index and every optional detail field. No detail screenshot until a project is published |
| `/insights` and future `/insights/[slug]` | `insights` has three drafts and zero published entries; index shows Editorial Method + honest preparation state. Detail renderer is an editorial article with optional Atlas | Index is acceptable but reads as three long blocks; future article sections form uninterrupted prose and a horizontal decision diagram | Index: opening, dark four-step editorial rail, honest empty/published ledger. Detail: article opening, dark executive answer, optional vertical decision Atlas, one numbered editorial chapter per article section, next steps, related solution, author, CTA | Preserve insights heading IDs and structured data once; generic Atlas island only when `visual` exists | Current 390/1440 empty index; fixture contracts for published list/article. No detail screenshot until an insight is published |
| `/contact` | Route-local desktop JSX consumes `contactPage`; left explanation and `InquiryPath`, right single `ContactForm` | On mobile, setup, inquiry path, email, and a long form become one undifferentiated passage | Opening; strong five-step “what happens next” rail; begin-conversation stage; one visually grouped but still single-page form | Preserve `contact-form-heading` and every form field ID; existing `ContactForm` remains the only form/client island | 390/1440 full page; validation, error, success, keyboard, touch and API-contract checks |
| 404 and `global-error` | Focused recovery copy and actions | Generic narrow stack lacks a deliberate mobile recovery frame | One decisive recovery composition with strong section boundary and touch-first actions; no Atlas | Preserve one `h1`, recovery destinations, `reset()` | 390/1440 404; source/interaction contract for global error |
| Shared header/footer | Approved mobile navigation and compact two-column footer already ship with prototypes | Rollout can expose route-change, long-title, focus, or overflow regressions | Keep markup and content unchanged; validate on every route family | Existing `MobileNavigation` is the client island | Menu open/close/Escape/focus/link-close on representative routes; footer destination audit |

## Reusable Boundaries

- `ResponsivePageComposition({ mobile, desktop })`: the same `useSyncExternalStore` / `(max-width: 767px)` runtime selection already approved for the prototypes, generalized for new route families.
- `MobileChapterIntro({ id, title, description? })`: server-only heading and lead treatment for mobile chapters.
- `MobileAtlasExplorer({ definition, ariaLabel, initialSelectedNodeId, showDefinitionContext })`: focused client wrapper around `MobileAtlasPath`; definitions remain exported from their existing content/visual files.
- Existing `MobileChapter` and `MobileDisclosureGroup`: chapter rhythm and one-open progressive disclosure.
- Existing `ContactForm`: remains the sole contact form and submission client boundary.

## Cross-cutting Risks

1. **Hydration and server snapshot:** the approved boundary serves the desktop snapshot before hydration. Do not add CSS-hidden duplicate trees. Measure mobile layout shift during browser QA and fail the gate if the swap produces a visible or interactive regression.
2. **Duplicate IDs:** both presentations use the same canonical anchors, so only one tree may be mounted. Browser tests must assert unique IDs after hydration.
3. **Optional content:** solution artifacts/guidance and project/insight detail sections are conditional. Tests must exercise every variant even when no detail route is currently published.
4. **False interactivity:** static labels must not resemble tabs or buttons. Only buttons, summaries, and links receive interactive affordances.
5. **Over-disclosure:** keep each section’s lead idea visible. Do not hide the only explanation of a section behind interaction.
6. **SEO duplication:** JSON-LD and route metadata remain outside responsive composition boundaries and render exactly once.
7. **Desktop drift:** if desktop JSX must move to a focused component, move it verbatim and guard its section order with tests before mobile work begins.

---

### Task 1: Shared rollout boundary and browser contract

**Files:**
- Create: `components/mobile/ResponsivePageComposition.tsx`
- Create: `components/mobile/MobileChapterIntro.tsx`
- Create: `components/mobile/MobileAtlasExplorer.tsx`
- Create: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Create: `playwright.config.ts`
- Create: `tests/browser/mobile-sitewide-rollout.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `ResponsivePageComposition({ mobile, desktop }: { mobile: ReactNode; desktop: ReactNode })`.
- Produces: `MobileChapterIntro({ id, title, description? })`.
- Produces: `MobileAtlasExplorer({ definition, ariaLabel, initialSelectedNodeId, showDefinitionContext? })`.
- Consumes: existing `MobileAtlasPath`, mobile breakpoint `767px`, focus and material tokens.

- [ ] **Step 1: Write failing shared-boundary contracts**

```js
test("provides one runtime-selected composition and focused Atlas island", () => {
  const boundary = read("components/mobile/ResponsivePageComposition.tsx");
  const atlas = read("components/mobile/MobileAtlasExplorer.tsx");
  assert.match(boundary, /useSyncExternalStore/);
  assert.match(boundary, /matchMedia\("\\(max-width: 767px\\)"\)/);
  assert.match(boundary, /return isMobile \? mobile : desktop/);
  assert.doesNotMatch(boundary, /\{mobile\}\s*\{desktop\}/);
  assert.match(atlas, /"use client"/);
  assert.match(atlas, /useState/);
  assert.match(atlas, /<MobileAtlasPath/);
});
```

- [ ] **Step 2: Run `node --test tests/mobile-sitewide-rollout-contract.test.mjs`**

Expected: FAIL because the shared rollout components do not exist.

- [ ] **Step 3: Implement the focused interfaces**

```tsx
// ResponsivePageComposition.tsx
"use client";
export default function ResponsivePageComposition({
  mobile,
  desktop,
}: {
  mobile: ReactNode;
  desktop: ReactNode;
}) {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isMobile ? mobile : desktop;
}
```

```tsx
// MobileAtlasExplorer.tsx
"use client";
export default function MobileAtlasExplorer(props: MobileAtlasExplorerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    props.initialSelectedNodeId,
  );
  return (
    <MobileAtlasPath
      definition={props.definition}
      selectedNodeId={selectedNodeId}
      onSelectNode={setSelectedNodeId}
      ariaLabel={props.ariaLabel}
      showDefinitionContext={props.showDefinitionContext}
    />
  );
}
```

- [ ] **Step 4: Add Playwright as an explicit dev dependency and configure `webServer`**

Run:

```powershell
npm install --save-dev @playwright/test@1.54.2
```

Configure a production server on port `3100`, Chromium projects for `390x844` and `1440x1000`, `reducedMotion: "reduce"` coverage, trace on first retry, and screenshots only on failure. Do not download or add a second browser engine.

- [ ] **Step 5: Add containment helpers**

The browser suite must assert:

```ts
await expect.poll(() =>
  page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
).toBe(true);
expect(await page.locator("[id]").evaluateAll((nodes) => {
  const ids = nodes.map((node) => node.id);
  return ids.length === new Set(ids).size;
})).toBe(true);
```

- [ ] **Step 6: Run focused contracts, typecheck, and lint**

```powershell
node --test tests/mobile-sitewide-rollout-contract.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add components/mobile app/globals.css tests/mobile-sitewide-rollout-contract.test.mjs tests/browser playwright.config.ts package.json package-lock.json
git commit -m "feat: prepare Chaptered Atlas sitewide rollout"
```

---

### Task 2: Process mobile composition

**Files:**
- Create: `components/company/MobileProcessPage.tsx`
- Create: `components/company/MobileDeliveryRail.tsx`
- Modify: `app/process/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: `ProcessPageDefinition`, `MobileChapter`, `MobileDisclosureGroup`, `ResponsivePageComposition`.
- Produces: canonical mobile sections `process-hero`, `process-stages`, `process-scaling`, `process-accountability`, `process-post-launch`, `process-cta`.

- [ ] **Step 1: Add failing contracts for shared content, exact stage/gate order, canonical IDs, focused client scope, and unchanged desktop `ProcessPage` order**
- [ ] **Step 2: Run the focused Node test and confirm failure**
- [ ] **Step 3: Build `MobileDeliveryRail` as the only new client island**

Keep all six stage names visible; one stage may be expanded at a time. Derive decisions, outputs, and both gate placements directly from `content.stages` and `content.decisionGates`. Use `aria-expanded`, `aria-controls`, and an `aria-live` detail region; do not copy stage labels into the component.

- [ ] **Step 4: Compose six mobile chapters**

Use the approved order: opening; delivery stages and gates; scaling paths; accountability; post-launch partnership; final CTA. Scaling and accountability use `MobileDisclosureGroup`; post-launch keeps short option labels visible.

- [ ] **Step 5: Select one runtime composition in `app/process/page.tsx`**

```tsx
return (
  <ResponsivePageComposition
    mobile={<MobileProcessPage content={processPage} />}
    desktop={<ProcessPage content={processPage} />}
  />
);
```

- [ ] **Step 6: Validate at 320, 390, 767, 768, and 1440px**

Exercise every stage and both decision gates; assert no overflow, unique IDs, 44px controls, visible focus, and the unchanged desktop section sequence.

- [ ] **Step 7: Run `npm test`, `npx tsc --noEmit`, `npm run lint`, and commit**

Commit: `feat: compose the mobile Process experience`

---

### Task 3: About mobile composition

**Files:**
- Create: `components/company/MobileAboutPage.tsx`
- Modify: `components/company/ConnectedPartnerAtlas.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: `AboutPageDefinition`, shared disclosure and Atlas explorer.
- Produces: exported `connectedPartner: AtlasDefinition` without changing desktop `ConnectedPartnerAtlas`.

- [ ] **Step 1: Add failing contracts for all `aboutPage` fields, chapter order, exported Atlas reuse, and server-only page composition**
- [ ] **Step 2: Export the existing `connectedPartner` definition and prove desktop still renders the same `SystemAtlas`**
- [ ] **Step 3: Compose eight mobile chapters**

Opening; founding tension; purpose; principles disclosure; dark partnership Atlas; founder accountability; standards disclosure; CTA. Keep founder name, role, title, and description visible without interaction.

- [ ] **Step 4: Use `MobileAtlasExplorer` with `showDefinitionContext` and the existing definition**
- [ ] **Step 5: Integrate through `ResponsivePageComposition` in `app/about/page.tsx`**
- [ ] **Step 6: Browser-check every principle/standard and Atlas node at 390px; compare the complete 1440px page**
- [ ] **Step 7: Run the full test/type/lint gate and commit**

Commit: `feat: compose the mobile About experience`

---

### Task 4: Six solution-detail mobile compositions

**Files:**
- Create: `components/solutions/DesktopSolutionPage.tsx`
- Create: `components/solutions/MobileSolutionPage.tsx`
- Create: `components/solutions/MobileSolutionArtifact.tsx`
- Modify: `components/solutions/SolutionPage.tsx`
- Modify: `components/content/solutionVisuals.ts`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/solutions-contract.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: one `SolutionPageDefinition` and `solutionVisualBySlug[solution.slug].atlas`.
- Produces: one shared mobile template for all six routes; JSON-LD remains once in `SolutionPage`.

- [ ] **Step 1: Add failing family contracts**

Assert every registry field is consumed, all six slugs use the same template, optional artifact/guidance branches exist, JSON-LD is outside the responsive boundary, and the frozen desktop order remains:

```js
const desktopOrder = [
  "<SolutionHero", "<ProblemRecognition", "<OutcomeList", "<CapabilityList",
  "<SolutionOperatingModel", "<ApplicationExamples", "<SolutionArtifact",
  "<SolutionGuidance", "<SolutionApproach", "<RelatedSolutions",
  "<SolutionFaqs", "<SolutionFinalCta",
];
```

- [ ] **Step 2: Move current desktop JSX verbatim to `DesktopSolutionPage`**
- [ ] **Step 3: Compose the mobile family**

Use ordered chapters for hero, recognition, outcomes, deliverables, operating model, applications, optional artifact, optional guidance, engagement approach, related solutions, FAQ, and CTA. Use disclosure for descriptive collections; keep names, lead conclusions, related links, and CTA visible.

- [ ] **Step 4: Recompose each existing operating Atlas vertically**

Use `MobileAtlasExplorer` with each shared definition. Do not introduce per-slug diagram copy.

- [ ] **Step 5: Implement both artifact variants**

Workflow comparison exposes Before and After as clearly labelled disclosure states followed by safeguards. System map keeps the center label visible and reveals People, Tools, Workflows, Information, then the three distinctions. All text comes from `solution.artifact`.

- [ ] **Step 6: Wrap mobile and desktop inside `SolutionPage` after its two JSON-LD scripts**
- [ ] **Step 7: Validate all six routes**

At 390px and 1440px check section order, variant-specific content, FAQs, related links, Atlas controls, unique IDs, overflow, focus, and reduced motion.

- [ ] **Step 8: Run all automated gates and commit**

Commit: `feat: compose mobile solution detail experiences`

---

### Task 5: Projects index, publication state, and future case studies

**Files:**
- Create: `components/projects/DesktopProjectsIndex.tsx`
- Create: `components/projects/MobileProjectsIndex.tsx`
- Create: `components/projects/DesktopProjectCaseStudy.tsx`
- Create: `components/projects/MobileProjectCaseStudy.tsx`
- Modify: `components/projects/ProjectsIndex.tsx`
- Modify: `components/projects/ProjectCaseStudy.tsx`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/company-content-contract.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: `readonly PublishedProjectDefinition[]` and one complete `PublishedProjectDefinition`.
- Produces: responsive index and conditional detail renderers without publishing draft or invented evidence.

- [ ] **Step 1: Add failing empty, published, and full-detail fixture contracts**

The fixture must populate every optional field, including verified date, authorized quote, related content, and linked capability. Assert no field disappears in mobile composition.

- [ ] **Step 2: Move the existing index and detail markup verbatim into desktop components**
- [ ] **Step 3: Compose the mobile index**

Opening; dark Evidence Standard disclosure; honest empty state or compact published case-study ledger. Preserve both empty-state actions.

- [ ] **Step 4: Compose future mobile case studies**

Build a sequential chapter descriptor array from fields that exist, then render a vertical transformation record followed by the same conditional section order as desktop. Use focused disclosure for multi-step “How it works” and verified outcomes; keep the authorized quote as a dark visual reset.

- [ ] **Step 5: Add responsive wrappers that render exactly one presentation**
- [ ] **Step 6: Screenshot current `/projects` at 390/1440 and test fixtures without adding preview routes**

Do not add a fake public project or development-only URL. A detail screenshot becomes required when the first project is actually published.

- [ ] **Step 7: Run all gates and commit**

Commit: `feat: compose mobile project evidence experiences`

---

### Task 6: Insights index, publication state, and future articles

**Files:**
- Create: `components/insights/DesktopInsightsIndex.tsx`
- Create: `components/insights/MobileInsightsIndex.tsx`
- Create: `components/insights/DesktopInsightArticle.tsx`
- Create: `components/insights/MobileInsightArticle.tsx`
- Modify: `components/insights/InsightsIndex.tsx`
- Modify: `components/insights/InsightArticle.tsx`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/company-content-contract.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: `readonly PublishedInsightDefinition[]` and one complete `PublishedInsightDefinition`.
- Produces: responsive editorial index and article; Article/Breadcrumb JSON-LD remains once.

- [ ] **Step 1: Add failing empty, published, and full-article fixture contracts**
- [ ] **Step 2: Move current desktop index/article markup verbatim into desktop components**
- [ ] **Step 3: Compose the mobile index**

Opening; dark four-step editorial method rail; honest preparation state or compact published guidance ledger. Keep both empty-state actions.

- [ ] **Step 4: Compose a reading-first mobile article**

Use article opening; dark executive answer; optional vertical decision Atlas; one clearly numbered chapter per `insight.sections` entry; practical next steps; related solution; author context; CTA. Paragraphs remain readable editorial content rather than being hidden merely to shorten the page.

- [ ] **Step 5: Keep Article and Breadcrumb JSON-LD outside the responsive boundary**
- [ ] **Step 6: Screenshot current `/insights` at 390/1440 and validate a full fixture without publishing drafts**
- [ ] **Step 7: Run all gates and commit**

Commit: `feat: compose mobile insight experiences`

---

### Task 7: Contact, recovery, and shared-shell completion

**Files:**
- Create: `components/contact/DesktopContactPage.tsx`
- Create: `components/contact/MobileContactPage.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/contact/ContactForm.tsx`
- Modify: `components/contact/InquiryPath.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/global-error.tsx`
- Modify: `app/globals.css`
- Modify: `tests/mobile-sitewide-rollout-contract.test.mjs`
- Modify: `tests/contact-contract.test.mjs`
- Modify: `tests/seo-resilience.test.mjs`
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`

**Interfaces:**
- Consumes: `contactPage`, existing validation/API behavior, shared header/footer.
- Produces: one mobile Contact composition with exactly one `ContactForm`.

- [ ] **Step 1: Add failing contracts**

Require one form, no multistep state, all current fields/options, inquiry path order, email fallback, submission states, recovery actions, one `h1`, and unchanged header/footer destinations.

- [ ] **Step 2: Extract the desktop Contact markup verbatim**
- [ ] **Step 3: Compose mobile Contact**

Opening; five-step inquiry rail; “Begin the conversation” context and email; framed single-page form. Visually group existing fields without hiding required fields or introducing next/previous steps.

- [ ] **Step 4: Refine mobile form focus, errors, success, and touch spacing without changing field names or payload**
- [ ] **Step 5: Give 404 and global error a decisive mobile recovery frame**

Do not add an Atlas, new navigation destination, or new message. Preserve `/solutions`, `/contact`, `/`, and `reset()`.

- [ ] **Step 6: Validate menu and footer on Process, a solution detail, Contact, and 404**
- [ ] **Step 7: Exercise required-field, server-error, network-error, and success behavior; run all gates and commit**

Commit: `feat: complete mobile contact and recovery experiences`

---

### Task 8: Sitewide regression, accessibility, performance, and review evidence

**Files:**
- Modify: `tests/browser/mobile-sitewide-rollout.spec.ts`
- Create: `docs/reports/2026-07-30-mobile-chaptered-atlas-sitewide-review.md`
- Create: `docs/reports/assets/2026-07-30-mobile-{route}-390.png`
- Create: `docs/reports/assets/2026-07-30-desktop-{route}-1440.png`

**Interfaces:**
- Consumes: every implementation task.
- Produces: one review package; no deploy.

- [ ] **Step 1: Run the complete static gate**

```powershell
npm test
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all tests pass, zero type or lint errors, production build succeeds.

- [ ] **Step 2: Run responsive browser validation**

```powershell
npx playwright test
```

For every current public route, validate 320, 375, 390, 430, 767, 768, and 1440 widths; unique IDs; no overflow; one `main`; heading order; 44px controls; keyboard focus; reduced motion; internal links; header/footer; and no console/hydration errors.

- [ ] **Step 3: Capture complete full-page screenshots**

Capture 390px and 1440px for:

```text
/process
/about
/solutions/ai
/solutions/business-automation
/solutions/custom-software-development
/solutions/digital-business-systems
/solutions/websites-web-applications
/solutions/technology-consulting
/projects
/insights
/contact
/chaptered-atlas-missing-page   (404)
```

Retain the already approved Homepage and Solutions hub screenshots in the same review index. Do not fabricate screenshots for unpublished project or insight detail routes.

- [ ] **Step 4: Inspect every screenshot at original resolution**

Check one dominant idea per viewport, chapter rhythm, disclosure affordance, Atlas legibility, meaningful visual resets, false-interactivity cues, long-word containment, footer ending, and route differentiation.

- [ ] **Step 5: Compare desktop screenshots against the frozen baseline**

Reject any changed desktop section order, copy, spacing system, Atlas composition, metadata, CTA, or navigation behavior.

- [ ] **Step 6: Write the review report**

Include route-by-route composition decisions, content/SEO/desktop parity evidence, interaction and accessibility results, performance observations including responsive-swap layout shift, all screenshot links, and any non-blocking follow-up notes.

- [ ] **Step 7: Run final diff audit and commit**

```powershell
git diff --check
git status --short
git diff --stat 8923eec..HEAD
git log --oneline 8923eec..HEAD
```

Confirm no production/deployment files or content registries changed unexpectedly.

Commit: `docs: add sitewide mobile review evidence`

## Completion Boundary

Stop after the complete review package is ready. Do not merge, push, deploy, publish project/insight content, or begin another visual refinement pass until the user reviews the full mobile site.
