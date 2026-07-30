# Cobrykz Mobile Chaptered Atlas Prototypes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build production-quality mobile-first Chaptered Atlas prototypes for the Homepage and Solutions hub, then provide complete 390px and desktop comparison screenshots without deploying.

**Architecture:** Keep the approved typed content definitions as the only narrative source and preserve the existing desktop components above 768px. Add small mobile interaction primitives and mobile presentation components that consume those same definitions; page-level responsive composition switches presentation without changing route semantics, metadata, section order, or desktop styling.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, existing CSS tokens, existing System Atlas model, Node test runner.

## Global Constraints

- Prototype scope is limited to `/` and `/solutions`.
- Do not deploy the prototype.
- Preserve exact approved copy, information architecture, page order, metadata, canonical URLs, CTA labels, CTA destinations, and desktop composition.
- Mobile must feel originally designed for mobile, not like a compressed desktop layout.
- Prioritize immediate comprehension, fast scanning, one dominant idea per viewport, progressive disclosure, clear visual rhythm, touch-first interaction, and intentional pacing.
- Do not reduce the approved readable type sizes to solve density.
- Use the same typed content definitions for desktop and mobile.
- Keep all interactive targets at least 44px.
- Respect keyboard interaction, visible focus, semantic state, and reduced motion.
- Prevent horizontal overflow from 320px through 767px.
- Review with complete top-to-bottom screenshots at exactly 390px plus desktop comparisons.

---

## File Structure

### New shared mobile files

- `components/mobile/MobileChapter.tsx`: semantic chapter wrapper and functional chapter marker.
- `components/mobile/MobileDisclosureGroup.tsx`: touch-first, keyboard-accessible single-open disclosure behavior.
- `components/mobile/MobileAtlasPath.tsx`: vertical mobile System Atlas renderer derived from existing Atlas definitions.

### New page presentation files

- `components/home/MobileHomePage.tsx`: Chaptered Atlas composition for all approved Homepage sections.
- `components/solutions/MobileSolutionsHub.tsx`: Chaptered Atlas composition for all approved Solutions hub sections.

### Existing integration files

- `app/page.tsx`: select the mobile Homepage presentation below 768px while preserving the existing desktop sequence.
- `components/solutions/SolutionsHub.tsx`: retain the current desktop hub and integrate the mobile hub presentation.
- `components/solutions/CapabilityRelationshipAtlas.tsx`: export the shared Atlas definition for mobile reuse.
- `app/globals.css`: Chaptered Atlas mobile tokens, responsive visibility, chapter surfaces, disclosure states, and vertical Atlas materiality.

### Tests

- `tests/mobile-chaptered-atlas-contract.test.mjs`: content parity, section order, mobile component boundaries, interactions, responsive containment, desktop preservation, and no-copy-fork contracts.
- Existing suites remain unchanged and must continue to pass.

---

### Task 1: Shared mobile chapter and disclosure primitives

**Files:**
- Create: `components/mobile/MobileChapter.tsx`
- Create: `components/mobile/MobileDisclosureGroup.tsx`
- Create: `tests/mobile-chaptered-atlas-contract.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `MobileChapter({ index, eyebrow, id, tone, children })`.
- Produces: `MobileDisclosureGroup<T>({ items, getId, renderSummary, renderPanel, defaultOpenId, ariaLabel })`.
- Consumes: existing palette, type, border, focus, and spacing tokens from `app/globals.css`.

- [ ] **Step 1: Write the failing primitive contract tests**

Add tests that require focused component boundaries and accessible state:

```js
test("defines a semantic Chaptered Atlas mobile grammar", () => {
  const chapter = read("components/mobile/MobileChapter.tsx");
  const disclosure = read("components/mobile/MobileDisclosureGroup.tsx");

  assert.match(chapter, /export default function MobileChapter/);
  assert.match(chapter, /data-mobile-chapter/);
  assert.match(chapter, /aria-labelledby/);
  assert.match(disclosure, /"use client"/);
  assert.match(disclosure, /aria-expanded/);
  assert.match(disclosure, /aria-controls/);
  assert.match(disclosure, /min-h-11/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs
```

Expected: FAIL because the mobile components do not exist.

- [ ] **Step 3: Implement `MobileChapter`**

Use a semantic section wrapper with a functional index and tone:

```tsx
type MobileChapterProps = {
  id: string;
  index: number;
  eyebrow: string;
  tone?: "light" | "muted" | "dark";
  children: React.ReactNode;
};

export default function MobileChapter({
  id,
  index,
  eyebrow,
  tone = "light",
  children,
}: MobileChapterProps) {
  const labelId = `${id}-chapter-label`;
  return (
    <section
      id={id}
      aria-labelledby={labelId}
      data-mobile-chapter
      data-mobile-tone={tone}
      className="mobile-chapter"
    >
      <div className="section-shell mobile-chapter__inner">
        <p id={labelId} className="mobile-chapter__marker">
          <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
          <span>{eyebrow}</span>
        </p>
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement `MobileDisclosureGroup`**

Implement one-open-at-a-time state, allow all items to remain closed after
explicit collapse, and keep state semantics on native buttons:

```tsx
"use client";

import { useId, useState } from "react";

export default function MobileDisclosureGroup<T>({
  items,
  getId,
  renderSummary,
  renderPanel,
  defaultOpenId,
  ariaLabel,
}: MobileDisclosureGroupProps<T>) {
  const groupId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div aria-label={ariaLabel} className="mobile-disclosure-group">
      {items.map((item, index) => {
        const itemId = getId(item);
        const isOpen = itemId === openId;
        const panelId = `${groupId}-${itemId}-panel`;
        return (
          <div key={itemId} data-disclosure-open={isOpen}>
            <button
              type="button"
              className="mobile-disclosure-trigger min-h-11"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : itemId)}
            >
              {renderSummary(item, index, isOpen)}
            </button>
            <div id={panelId} hidden={!isOpen} className="mobile-disclosure-panel">
              {renderPanel(item, index)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: Add the mobile grammar styles**

Add mobile-only rules under `@media (max-width: 767px)`:

```css
.mobile-chapter {
  border-bottom: 1px solid var(--color-border);
  background: white;
}

.mobile-chapter[data-mobile-tone="muted"] {
  background: var(--color-gray-light);
}

.mobile-chapter[data-mobile-tone="dark"] {
  background: var(--color-navy);
  color: white;
}

.mobile-chapter__inner {
  padding-block: 3.5rem;
}

.mobile-chapter__marker {
  display: flex;
  gap: 0.65rem;
  color: var(--color-blue);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mobile-disclosure-trigger {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid var(--color-border);
  padding-block: 1rem;
  text-align: left;
}
```

- [ ] **Step 6: Run the focused test**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs
```

Expected: PASS for primitive contracts.

- [ ] **Step 7: Commit**

```powershell
git add components/mobile/MobileChapter.tsx components/mobile/MobileDisclosureGroup.tsx app/globals.css tests/mobile-chaptered-atlas-contract.test.mjs
git commit -m "feat: add Chaptered Atlas mobile primitives"
```

---

### Task 2: Vertical mobile System Atlas

**Files:**
- Create: `components/mobile/MobileAtlasPath.tsx`
- Modify: `components/solutions/CapabilityRelationshipAtlas.tsx`
- Modify: `tests/mobile-chaptered-atlas-contract.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `AtlasDefinition` from `components/atlas/types.ts`.
- Produces: `MobileAtlasPath({ definition, selectedNodeId, onSelectNode, ariaLabel })`.
- Produces: exported `capabilityRelationship` definition for both renderers.

- [ ] **Step 1: Add failing tests for shared Atlas semantics**

```js
test("recomposes Atlas definitions vertically without copying labels", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");
  const relationship = read("components/solutions/CapabilityRelationshipAtlas.tsx");

  assert.match(mobileAtlas, /definition: AtlasDefinition/);
  assert.match(mobileAtlas, /definition\\.nodes\\.map/);
  assert.match(mobileAtlas, /definition\\.connections/);
  assert.match(relationship, /export const capabilityRelationship/);
  assert.doesNotMatch(mobileAtlas, /Consulting|Automation|Digital systems/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs
```

Expected: FAIL because `MobileAtlasPath` and the exported definition are absent.

- [ ] **Step 3: Export the existing capability definition**

Change:

```tsx
const capabilityRelationship = {
```

to:

```tsx
export const capabilityRelationship = {
```

No definition values or desktop rendering change.

- [ ] **Step 4: Implement the vertical renderer**

Render nodes from the definition in a semantic ordered list. Use connection
labels to describe the path and a controlled selected-node panel:

```tsx
"use client";

import type { AtlasDefinition } from "@/components/atlas/types";

type MobileAtlasPathProps = {
  definition: AtlasDefinition;
  selectedNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  ariaLabel: string;
};

export default function MobileAtlasPath({
  definition,
  selectedNodeId,
  onSelectNode,
  ariaLabel,
}: MobileAtlasPathProps) {
  return (
    <figure className="mobile-atlas" aria-label={ariaLabel}>
      <ol className="mobile-atlas__path">
        {definition.nodes.map((node, index) => {
          const incoming = definition.connections.find(
            (connection) => connection.target === node.id,
          );
          const selected = selectedNodeId === node.id;
          return (
            <li key={node.id} className="mobile-atlas__node">
              {incoming ? (
                <span className="mobile-atlas__flow">{incoming.flowLabel}</span>
              ) : null}
              <button
                type="button"
                className="mobile-atlas__control min-h-11"
                aria-pressed={selected}
                onClick={() => onSelectNode?.(node.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node.label}</strong>
              </button>
              {selected ? <p>{node.detail}</p> : null}
            </li>
          );
        })}
      </ol>
      <figcaption>{definition.readingDirection}</figcaption>
    </figure>
  );
}
```

- [ ] **Step 5: Add restrained vertical Atlas material styles**

Use a single blue path, layered node planes, readable labels, and no decorative
animation. Add reduced-motion protection for selection transitions.

- [ ] **Step 6: Run the focused test and the existing Atlas suite**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs tests/system-atlas-contract.test.mjs tests/visual-direction-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add components/mobile/MobileAtlasPath.tsx components/solutions/CapabilityRelationshipAtlas.tsx app/globals.css tests/mobile-chaptered-atlas-contract.test.mjs
git commit -m "feat: recompose System Atlas for mobile"
```

---

### Task 3: Homepage mobile prototype

**Files:**
- Create: `components/home/MobileHomePage.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/mobile-chaptered-atlas-contract.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `homeMessage`, `homeOutcomes`, `whyCobrykz`, `aiPrinciples`, `challengeRoutes`, and `processStages` from `components/content/home.ts`.
- Consumes: `solutions` from `components/content/solutions.ts`.
- Consumes: shared CTA definitions from `components/content/site.ts`.
- Consumes: Task 1 primitives and Task 2 `MobileAtlasPath`.
- Produces: `MobileHomePage`, used only below 768px.

- [ ] **Step 1: Add failing Homepage composition tests**

Require:

- The existing desktop component sequence remains in `app/page.tsx`.
- The mobile presentation consumes shared content imports.
- No approved copy literal is duplicated in `MobileHomePage.tsx`.
- Chapter order matches the approved Homepage order.
- Outcomes, capabilities, AI principles, challenges, and process use disclosure
  or selection patterns.

```js
test("builds the mobile Homepage from the frozen content source", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const page = read("app/page.tsx");

  for (const model of [
    "homeMessage",
    "homeOutcomes",
    "whyCobrykz",
    "aiPrinciples",
    "challengeRoutes",
    "processStages",
    "solutions",
  ]) {
    assert.match(mobile, new RegExp(model));
  }

  assert.match(page, /MobileHomePage/);
  assert.match(page, /HomeHero/);
  assert.match(mobile, /data-mobile-homepage/);
  assert.doesNotMatch(mobile, /Turn business challenges into better systems\\./);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs
```

Expected: FAIL because `MobileHomePage` does not exist.

- [ ] **Step 3: Implement the mobile Homepage composition**

Create one ordered mobile sequence:

1. Hero and vertical business transformation Atlas.
2. Business Outcomes with the first outcome expanded.
3. Six-solution capability ledger.
4. Dark Why Cobrykz trust stage.
5. AI decision artifact.
6. Touch-first Challenge Router with one changing recommendation panel.
7. Six-stage vertical process with one expanded stage.
8. Projects evidence stage.
9. Authority stage.
10. Final CTA.

Use the shared content arrays directly:

```tsx
<MobileDisclosureGroup
  items={homeOutcomes}
  getId={(outcome) => outcome.title.toLowerCase().replaceAll(" ", "-")}
  defaultOpenId="grow-more-effectively"
  ariaLabel="Business outcomes"
  renderSummary={(outcome, index) => (
    <>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{outcome.title}</strong>
    </>
  )}
  renderPanel={(outcome) => <p>{outcome.description}</p>}
/>
```

The Challenge Router keeps all six challenge labels visible while the selected
description, Atlas thread, and destination update in one framed panel.

- [ ] **Step 4: Integrate responsive page composition**

Render the mobile composition in a `md:hidden` wrapper and the existing exact
desktop sequence in `hidden md:block`:

```tsx
export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <MobileHomePage />
      </div>
      <div className="hidden md:block">
        <HomeHero />
        <BusinessOutcomes />
        <SolutionsOverview />
        <WhyCobrykz />
        <AIPointOfView />
        {/* existing Challenge Router wrapper and closing sequence unchanged */}
      </div>
    </>
  );
}
```

The mobile and desktop copies are imported from the same definitions. Both
responsive wrappers must use CSS `display: none` outside their target range so
only one semantic sequence is exposed at a time.

- [ ] **Step 5: Add Homepage-specific mobile composition styles**

Add the hero stage, illuminated vertical outcome plane, capability ledger,
trust-stage grid, AI artifact, challenge selection state, process rail, and
closing transitions under the mobile media query only.

- [ ] **Step 6: Run focused and existing Homepage tests**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs tests/strategy-contract.test.mjs tests/presentation-quality.test.mjs tests/visual-direction-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add components/home/MobileHomePage.tsx app/page.tsx app/globals.css tests/mobile-chaptered-atlas-contract.test.mjs
git commit -m "feat: compose the Chaptered Atlas mobile homepage"
```

---

### Task 4: Solutions hub mobile prototype

**Files:**
- Create: `components/solutions/MobileSolutionsHub.tsx`
- Modify: `components/solutions/SolutionsHub.tsx`
- Modify: `tests/mobile-chaptered-atlas-contract.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `solutions`, `homeOutcomes`, `processStages`, `whyCobrykz`, `primaryCta`, and exported `capabilityRelationship`.
- Consumes: Task 1 primitives and Task 2 `MobileAtlasPath`.
- Produces: mobile Solutions hub presentation below 768px.

- [ ] **Step 1: Add failing Solutions hub composition tests**

Require:

- All six solutions come from the shared `solutions` array.
- All approved sections remain in the approved order.
- Conditions, portfolio rows, operating context, process, and Why Cobrykz use
  compact mobile disclosure.
- The mobile relationship Atlas consumes `capabilityRelationship`.
- The existing desktop hub remains present and unchanged.

```js
test("builds the dense Solutions hub as a mobile capability explorer", () => {
  const mobile = read("components/solutions/MobileSolutionsHub.tsx");
  const desktop = read("components/solutions/SolutionsHub.tsx");

  assert.match(mobile, /solutions\\.map/);
  assert.match(mobile, /homeOutcomes/);
  assert.match(mobile, /processStages/);
  assert.match(mobile, /whyCobrykz/);
  assert.match(mobile, /capabilityRelationship/);
  assert.match(desktop, /MobileSolutionsHub/);
  assert.doesNotMatch(mobile, /Find the right way to improve your business\\./);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs
```

Expected: FAIL because `MobileSolutionsHub` does not exist.

- [ ] **Step 3: Implement the mobile Solutions hub**

Compose:

1. Editorial opening and outcome anchor.
2. Three business conditions as disclosures.
3. Six-capability indexed ledger.
4. Starting-point selection stage.
5. Vertical Capability Relationship Atlas with selected capability detail.
6. Customer experience, operational flow, and connected system disclosures.
7. Discover, Assess, and Design progression.
8. Why Cobrykz disclosure ledger.
9. Existing final CTA.

Keep all capability names visible, and reveal their problem, outcome, and direct
link within the selected row.

- [ ] **Step 4: Integrate with the desktop hub**

Wrap the new mobile presentation and existing exact desktop sections:

```tsx
export default function SolutionsHub() {
  return (
    <>
      <div className="md:hidden">
        <MobileSolutionsHub />
      </div>
      <div className="hidden md:block">
        {/* existing Solutions hub JSX unchanged */}
      </div>
    </>
  );
}
```

- [ ] **Step 5: Add Solutions-specific mobile styles**

Implement the capability ledger, selected capability material state, vertical
relationship rail, staged operating-context panels, and final dark CTA under
the mobile media query only.

- [ ] **Step 6: Run focused and Solutions contract tests**

Run:

```powershell
node --test tests/mobile-chaptered-atlas-contract.test.mjs tests/solutions-contract.test.mjs tests/strategy-contract.test.mjs tests/visual-direction-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add components/solutions/MobileSolutionsHub.tsx components/solutions/SolutionsHub.tsx app/globals.css tests/mobile-chaptered-atlas-contract.test.mjs
git commit -m "feat: compose the mobile Solutions capability explorer"
```

---

### Task 5: Responsive QA and screenshot review package

**Files:**
- Modify if required by verified defects: files from Tasks 1–4 only.
- Create: `docs/reports/assets/2026-07-30-mobile-homepage-390.png`
- Create: `docs/reports/assets/2026-07-30-mobile-solutions-390.png`
- Create: `docs/reports/assets/2026-07-30-desktop-homepage.png`
- Create: `docs/reports/assets/2026-07-30-desktop-solutions.png`
- Create: `docs/reports/2026-07-30-mobile-chaptered-atlas-prototype-review.md`

**Interfaces:**
- Consumes: completed Homepage and Solutions hub prototypes.
- Produces: full-page visual evidence and a written design rationale.

- [ ] **Step 1: Run the complete automated gate**

Run:

```powershell
npm test
npx eslint -- $(git ls-files '*.js' '*.jsx' '*.mjs' '*.ts' '*.tsx')
npx tsc --noEmit
npm run build
```

Expected:

- All tests pass.
- Tracked-source lint exits 0.
- TypeScript exits 0.
- Production build completes with the existing route inventory.

- [ ] **Step 2: Start the local production server**

Run:

```powershell
npm run start
```

Expected: the built site responds at `http://localhost:3000`.

- [ ] **Step 3: Verify interaction and containment**

At 390px:

- Open and close every disclosure group.
- Change every Challenge Router selection.
- Change every Solutions capability selection.
- Verify all destination links.
- Verify visible focus using keyboard navigation.
- Verify no horizontal overflow.
- Verify reduced-motion behavior.

Repeat containment checks at 320px, 375px, 430px, and 767px.

- [ ] **Step 4: Capture complete review screenshots**

Capture full-page screenshots at:

- Homepage: `390px` width.
- Solutions hub: `390px` width.
- Homepage desktop comparison: `1440px` width.
- Solutions hub desktop comparison: `1440px` width.

Save them to the exact paths listed above. Do not use cropped component
screenshots as substitutes.

- [ ] **Step 5: Write the prototype review report**

Document:

- The mobile composition reasoning for each major chapter.
- How the desktop and mobile experiences remain one design system.
- How scanning, readability, interaction, and rhythm improved.
- Confirmation that copy, IA, SEO, CTA strategy, and desktop composition remain
  unchanged.
- Screenshot paths.
- Automated verification results.
- Any remaining concerns before broader mobile rollout.

- [ ] **Step 6: Inspect repository state and confirm no deployment**

Run:

```powershell
git status --short --branch
git log -6 --oneline
```

Expected:

- Only intentional prototype/report changes are committed.
- `origin/master` has not been updated during prototype implementation.
- The pre-existing untracked `0721.mp4` remains untouched.

- [ ] **Step 7: Commit the review evidence**

```powershell
git add docs/reports/2026-07-30-mobile-chaptered-atlas-prototype-review.md docs/reports/assets/2026-07-30-mobile-homepage-390.png docs/reports/assets/2026-07-30-mobile-solutions-390.png docs/reports/assets/2026-07-30-desktop-homepage.png docs/reports/assets/2026-07-30-desktop-solutions.png
git commit -m "docs: add Chaptered Atlas mobile prototype review"
```

Stop after this commit. Present the screenshots and rationale for approval. Do
not extend the system to other pages and do not deploy.
