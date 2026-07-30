# Homepage Architectural Editorial Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the final Milestone 1 homepage refinement by improving System Atlas materiality, illuminating the outcome plane, and strengthening section composition without changing content or strategy.

**Architecture:** Preserve the existing semantic component tree and Atlas data model. Extend the shared SVG renderer with presentational hooks derived from existing layer and node semantics, then refine the homepage through CSS and existing component composition. Keep the work server-rendered, dependency-free, accessible, responsive, and bounded by the diminishing-returns stopping rule.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript, semantic SVG, Tailwind CSS 4, authored CSS tokens, Node test runner, ESLint.

## Global Constraints

- Do not change information architecture, navigation, homepage section order or hierarchy.
- Do not change messaging, headlines, approved copy, CTA strategy, SEO strategy, or brand positioning.
- Do not add homepage sections, labels, nodes, paths, cards, claims, photography, or decorative graphics.
- Use the approved palette only.
- Keep the hero and Atlas server-rendered.
- Do not add canvas, WebGL, video, client-side runtime, or dependencies.
- Motion must explain direction, remain optional, and respect reduced-motion preferences.
- Every change must materially improve comprehension, visual hierarchy, or Cobrykz brand distinction.
- Stop when remaining changes are subjective variations rather than material improvements.
- Do not begin Milestone 2.

## File Map

- `components/atlas/SystemAtlas.tsx`: expose existing semantic layer, node, and connection identities as SVG data attributes; define reusable SVG material primitives.
- `components/home/BusinessSystemCutaway.tsx`: preserve the approved Atlas definition and mark the existing outcomes layer as the focal plane through its existing `id`.
- `components/home/HomeHero.tsx`: preserve content and structure; refine framing classes only if visual balance requires it.
- `components/home/BusinessOutcomes.tsx`: refine asymmetric editorial terminal-state composition.
- `components/home/SolutionsOverview.tsx`: refine the capability rail and indexed rows without adding content.
- `components/home/WhyCobrykz.tsx`: refine dominant-principle and supporting-standard hierarchy.
- `components/home/AIPointOfView.tsx`: refine decision-artifact composition.
- `components/home/ChallengeRouter.tsx`: refine the operational path enclosure without changing behavior.
- `components/home/ProcessOverview.tsx`: refine progression framing.
- `components/home/ProjectsEvidence.tsx`: refine evidence framing.
- `components/home/AuthorityBand.tsx`: refine typography, proportion, and tonal transition without adding an Atlas.
- `components/home/HomeFinalCTA.tsx`: refine the closing composition.
- `app/globals.css`: own Atlas material, illumination, architectural framing, and shared homepage refinement tokens.
- `tests/system-atlas-contract.test.mjs`: verify semantic SVG hooks, outcome-plane focal treatment, accessibility, and absence of added information.
- `tests/presentation-quality.test.mjs`: verify restraint, responsive composition, motion limits, palette, and one responsive tree.
- `tests/strategy-contract.test.mjs`: verify frozen copy sources and homepage order remain intact.

---

### Task 1: Premium System Atlas Materiality

**Files:**
- Modify: `components/atlas/SystemAtlas.tsx`
- Modify: `components/home/BusinessSystemCutaway.tsx`
- Modify: `app/globals.css`
- Test: `tests/system-atlas-contract.test.mjs`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: `AtlasDefinition`, existing `layer.id`, `layer.depth`, `node.kind`, and `connection.state`.
- Produces: `data-atlas-layer`, `data-atlas-node`, and `data-atlas-connection` hooks; reusable `atlas-plane-material` SVG filter and `atlas-outcome-light` SVG gradient IDs scoped by `definition.id`.

- [ ] **Step 1: Write failing semantic material tests**

Add contracts that require the renderer to expose existing identities and the hero to reserve the focal treatment for the existing outcomes plane:

```js
test("gives the existing Atlas semantics precise material hooks", () => {
  const atlas = read("components/atlas/SystemAtlas.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");
  const css = read("app/globals.css");

  assert.match(atlas, /data-atlas-layer=\{layer\.id\}/);
  assert.match(atlas, /data-atlas-node=\{node\.id\}/);
  assert.match(atlas, /data-atlas-connection=\{connection\.id\}/);
  assert.match(atlas, /id=\{`\$\{id\}-plane-material`\}/);
  assert.match(atlas, /id=\{`\$\{id\}-outcome-light`\}/);
  assert.match(cutaway, /id:\s*["']outcomes["']/);
  assert.match(css, /\.business-system-cutaway \[data-atlas-layer=["']outcomes["']\]/);
});

test("refines the hero Atlas without adding information or runtime", () => {
  const atlas = read("components/atlas/SystemAtlas.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");

  assert.doesNotMatch(atlas, /["']use client["']/);
  assert.doesNotMatch(cutaway, /["']use client["']/);
  assert.equal((cutaway.match(/id:\s*["'][^"']+["']/g) || []).length, 21);
  assert.doesNotMatch(cutaway, /particle|canvas|webgl|three|video/i);
});
```

- [ ] **Step 2: Run the focused tests and confirm RED**

Run:

```powershell
node --test tests/system-atlas-contract.test.mjs tests/presentation-quality.test.mjs
```

Expected: failure because the SVG identity hooks and scoped material definitions do not exist.

- [ ] **Step 3: Add scoped SVG material primitives**

In `SystemAtlas.tsx`, retain the accessible title and description, then add definitions inside the existing `<defs>`:

```tsx
<linearGradient
  id={`${id}-outcome-light`}
  x1="0"
  y1="0"
  x2="1"
  y2="1"
>
  <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
  <stop offset="55%" stopColor="currentColor" stopOpacity="0.06" />
  <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
</linearGradient>
<filter
  id={`${id}-plane-material`}
  x="-20%"
  y="-20%"
  width="140%"
  height="160%"
  colorInterpolationFilters="sRGB"
>
  <feDropShadow
    dx="0"
    dy="10"
    stdDeviation="12"
    floodColor="#081321"
    floodOpacity="0.18"
  />
</filter>
```

Expose identities without changing data:

```tsx
<g
  key={layer.id}
  className="atlas-layer"
  data-atlas-layer={layer.id}
  data-atlas-depth={layer.depth}
>
```

```tsx
<g
  key={connection.id}
  data-atlas-connection={connection.id}
>
```

```tsx
<g
  key={node.id}
  className="atlas-node"
  data-atlas-node={node.id}
  data-atlas-kind={node.kind}
>
```

- [ ] **Step 4: Create the illuminated outcome plane and architectural enclosure**

In `app/globals.css`, refine only the hero Atlas:

```css
.business-system-cutaway {
  --atlas-model-edge: rgb(255 255 255 / 0.16);
  --atlas-model-joint: rgb(156 200 255 / 0.2);
  position: relative;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 0.045), transparent 42%),
    rgb(8 19 33 / 0.72);
  box-shadow:
    0 32px 90px rgb(0 0 0 / 0.28),
    inset 0 1px 0 rgb(255 255 255 / 0.08);
}

.business-system-cutaway .atlas-layer__plane {
  filter: url("#business-system-cutaway-plane-material");
  stroke: var(--atlas-model-edge);
}

.business-system-cutaway [data-atlas-layer="outcomes"] .atlas-layer__plane {
  fill: url("#business-system-cutaway-outcome-light");
  stroke: rgb(156 200 255 / 0.46);
}

.business-system-cutaway [data-atlas-layer="outcomes"] {
  color: #9cc8ff;
}
```

Use controlled depth-specific opacity and line weights. Do not add blur layers, new paths, or new animation.

- [ ] **Step 5: Refine node and connection craftsmanship**

Adjust existing CSS so paths appear integrated into the planes:

```css
.business-system-cutaway .atlas-path {
  stroke-width: 1.15;
  opacity: 0.68;
}

.business-system-cutaway .atlas-path[data-atlas-state="active"] {
  stroke-width: 1.7;
  opacity: 1;
}

.business-system-cutaway .atlas-node__shape {
  stroke-width: 1.25;
}

.business-system-cutaway [data-atlas-kind="outcome"] .atlas-node__shape {
  fill: rgb(156 200 255 / 0.14);
  stroke: #9cc8ff;
}
```

Keep label sizes within existing accessibility thresholds and preserve the existing text equivalent.

- [ ] **Step 6: Run focused verification and inspect the change budget**

Run:

```powershell
node --test tests/system-atlas-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all focused tests pass, TypeScript exits `0`, and ESLint exits `0`.

Review every new CSS rule against the stopping rule. Remove any rule that adds difference without improving hierarchy, comprehension, or brand distinction.

- [ ] **Step 7: Commit Task 1**

```powershell
git add components/atlas/SystemAtlas.tsx components/home/BusinessSystemCutaway.tsx app/globals.css tests/system-atlas-contract.test.mjs tests/presentation-quality.test.mjs
git commit -m "feat: refine the hero Atlas materiality"
```

---

### Task 2: Architectural Editorial Homepage Composition

**Files:**
- Modify: `components/home/HomeHero.tsx`
- Modify: `components/home/BusinessOutcomes.tsx`
- Modify: `components/home/SolutionsOverview.tsx`
- Modify: `components/home/WhyCobrykz.tsx`
- Modify: `components/home/AIPointOfView.tsx`
- Modify: `components/home/ChallengeRouter.tsx`
- Modify: `components/home/ProcessOverview.tsx`
- Modify: `components/home/ProjectsEvidence.tsx`
- Modify: `components/home/AuthorityBand.tsx`
- Modify: `components/home/HomeFinalCTA.tsx`
- Modify: `app/globals.css`
- Test: `tests/presentation-quality.test.mjs`
- Test: `tests/strategy-contract.test.mjs`

**Interfaces:**
- Consumes: the current component boundaries, shared content arrays, `HomeSystemThread`, `SectionIntro`, and shared CTA data.
- Produces: differentiated section compositions using the same semantic tree and content.

- [ ] **Step 1: Write failing composition and freeze tests**

Add contracts that preserve the page while requiring intentional composition:

```js
test("keeps the Architectural Editorial homepage frozen and differentiated", () => {
  const page = read("app/page.tsx");
  const sources = collectFiles("components/home", ".tsx")
    .map((path) => read(path))
    .join("\n");

  assert.match(read("components/home/BusinessOutcomes.tsx"), /data-home-composition=["']terminal-states["']/);
  assert.match(read("components/home/SolutionsOverview.tsx"), /data-home-composition=["']capability-index["']/);
  assert.match(read("components/home/WhyCobrykz.tsx"), /data-home-composition=["']accountability["']/);
  assert.match(read("components/home/AIPointOfView.tsx"), /data-home-composition=["']decision-artifact["']/);
  assert.match(read("components/home/ProjectsEvidence.tsx"), /data-home-composition=["']evidence-frame["']/);
  assert.doesNotMatch(sources, /shadow-(?:xl|2xl)|backdrop-blur|transition-all/);
  assert.doesNotMatch(sources, /["']use client["']/);
  assert.match(page, /<HomeHero \/>[\s\S]*<BusinessOutcomes \/>[\s\S]*<SolutionsOverview \/>/);
});
```

Retain the existing assertions for shared copy sources, one H1, CTA links, section order, and one responsive tree.

- [ ] **Step 2: Run the focused tests and confirm RED**

Run:

```powershell
node --test tests/presentation-quality.test.mjs tests/strategy-contract.test.mjs
```

Expected: failure because the composition identifiers do not exist.

- [ ] **Step 3: Refine section proportions and structural framing**

Add `data-home-composition` to the existing top-level section or composition wrapper for each named role. Refine class composition only:

```tsx
<ol
  data-home-composition="terminal-states"
  className="mt-14 grid border-y border-border md:grid-cols-12"
>
```

```tsx
<div
  data-home-composition="capability-index"
  className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24"
>
```

```tsx
<ul
  data-home-composition="accountability"
  className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-12"
>
```

```tsx
<ul
  data-home-composition="decision-artifact"
  className="grid overflow-hidden border border-border bg-border sm:grid-cols-2"
>
```

```tsx
<div
  data-home-composition="evidence-frame"
  className="relative border border-border bg-gray-light p-7 sm:p-10"
>
```

Prefer proportion, offset, border ownership, and negative space over new wrappers. Remove rounding when it makes sections look like repeated cards.

- [ ] **Step 4: Refine transitions and editorial pacing**

In `app/globals.css`, add a small shared vocabulary:

```css
.home-architectural-frame {
  border: 1px solid var(--color-border);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7);
}

.home-structural-joint {
  position: relative;
}

.home-structural-joint::before {
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 2px;
  content: "";
  background: var(--color-blue);
}
```

Apply these only where they clarify enclosure or progression. Do not apply one utility to every section. Keep dark transitions limited to the existing hero, authority band, and closing CTA.

- [ ] **Step 5: Review each major section against its unique role**

Inspect the code and rendered result using this acceptance checklist:

```text
Hero: architectural object; outcome plane is the focal moment.
Outcomes: asymmetric terminal states; not three equal cards.
Solutions: indexed capability exploration; not a generic list.
Why: one dominant commitment with supporting standards.
AI: a controlled decision artifact; not a repeated list.
Challenge: selected path is visually primary; controls remain accessible.
Process: progression reads continuously; not six disconnected cards.
Projects: evidence standard reads as an editorial frame.
Authority: typography and contrast carry the section; no diagram added.
Final CTA: decisive negative-space close; no competing visual device.
```

If a section already meets its role, do not change it further.

- [ ] **Step 6: Run focused verification**

Run:

```powershell
node --test tests/presentation-quality.test.mjs tests/strategy-contract.test.mjs tests/system-atlas-contract.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all focused tests pass and both static checks exit `0`.

- [ ] **Step 7: Commit Task 2**

```powershell
git add app/globals.css components/home tests/presentation-quality.test.mjs tests/strategy-contract.test.mjs tests/system-atlas-contract.test.mjs
git commit -m "feat: art direct the Architectural Editorial homepage"
```

---

### Task 3: Final Milestone 1 Verification and Review Package

**Files:**
- Modify only if verification identifies a material defect in a Task 1 or Task 2 file.
- Create screenshots only through the approved browser QA surface when it is available.

**Interfaces:**
- Consumes: completed Task 1 and Task 2 implementation.
- Produces: verified Milestone 1 refinement and review evidence; no Milestone 2 changes.

- [ ] **Step 1: Run the complete automated suite**

Run sequentially so Next.js build artifacts are not locked:

```powershell
npm test
npm run build
npx tsc --noEmit
npm run lint
git diff --check
```

Expected:

```text
82 or more tests pass with 0 failures.
Next.js production build completes and generates all approved routes.
TypeScript exits 0.
ESLint exits 0.
git diff --check reports no whitespace errors.
```

- [ ] **Step 2: Start the local preview**

```powershell
npm run dev
```

Expected: the homepage is available at `http://localhost:3000`.

- [ ] **Step 3: Perform desktop visual QA**

Using the approved browser QA surface at a 1440 × 1100 viewport:

```text
Check the full hero at initial load.
Confirm the outcome plane is the focal moment without overpowering the headline.
Confirm Atlas labels remain legible.
Confirm no plane, label, path, or shadow is clipped.
Review section transitions and the full-page rhythm.
Confirm no section appears to be an accidental repeated card grid.
Capture a desktop screenshot.
```

- [ ] **Step 4: Perform mobile visual QA**

Using the same semantic page at a 390 × 844 viewport:

```text
Confirm there is no horizontal overflow.
Confirm the hero preserves text-first hierarchy.
Confirm the Atlas remains understandable and its labels remain readable.
Confirm operational threads become clear vertical progressions.
Confirm controls remain at least 44px tall and keyboard focus remains visible.
Capture a mobile screenshot.
```

- [ ] **Step 5: Apply the stopping rule**

For every potential follow-up change, record the answer to:

```text
Does it materially improve comprehension?
Does it materially improve hierarchy?
Does it materially strengthen Cobrykz brand distinction?
```

Implement only if at least one answer is clearly yes and the change does not weaken restraint, performance, or accessibility. Otherwise stop.

- [ ] **Step 6: Re-run verification after any visual QA fix**

If Task 3 changes code, run:

```powershell
npm test
npm run build
npx tsc --noEmit
npm run lint
git diff --check
```

Expected: all commands pass.

- [ ] **Step 7: Commit only material QA fixes**

```powershell
git add <exact-files-changed-by-qa>
git commit -m "fix: complete the homepage refinement review"
```

If no material defects are found, do not create an empty commit.

- [ ] **Step 8: Stop before Milestone 2**

Present:

```text
Desktop screenshot
Mobile screenshot
Implementation decisions and their justification
Automated verification results
Known limitation if the approved browser surface remains unavailable
```

Wait for explicit approval. Do not implement Solutions Capability Atlas or Process Delivery Rail.
