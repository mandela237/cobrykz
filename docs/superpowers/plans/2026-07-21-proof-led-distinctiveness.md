# Proof-Led Distinctiveness and Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace repeated agency reassurance patterns with an annotated first-party build artifact, a shorter objection-led narrative, and a more resilient project-note conversion path.

**Architecture:** Keep the existing desktop/mobile composition boundary at 768 pixels, but share proof-artifact content through one typed data module. Add dedicated desktop and mobile artifact presentations, consolidate overlapping method content into the existing process components, and retain the honest mail-draft flow while adding copyable fallbacks because the repository has no configured form backend.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TypeScript, Tailwind CSS 4, Next Image, Lucide React, Node built-in test runner.

## Global Constraints

- Preserve every factual claim and all documented process timings.
- Do not invent client work, outcomes, performance scores, testimonials, prices, or server capabilities.
- Keep the founder portrait, conviction-blue/deep-ink palette, 8-pixel control radius, WCAG AA target, reduced motion, and 44-pixel mobile targets.
- Remove decorative two-axis page grids and repeated section-kicker grammar.
- Keep Playfair Display to one deliberate quotation/emphasis and remove Cormorant as a parallel premium shorthand.
- Preserve the separate mobile composition rather than shrinking desktop.
- Never show a delivered/success state for a mail draft that was not sent.
- Verify at 375, 768, 1024, and 1440 pixels, with overflow safety from 320 pixels upward.

---

### Task 1: Expand presentation regression tests

**Files:**
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: homepage, global CSS, desktop/mobile rendered component source, and contact components.
- Produces: regression assertions for the approved distinctiveness and conversion boundaries.

- [ ] **Step 1: Add failing tests for the proof-led structure**

Extend the source suite with assertions that:

```js
assert.match(pageAndExperiences, /BuildArtifact/);
assert.match(proofSources, /Lead with reputation/);
assert.match(proofSources, /Compose mobile separately/);
assert.match(proofSources, /Create one conversion path/);
assert.doesNotMatch(pageSource, /<SocialProof \/>/);
assert.doesNotMatch(pageAndExperiences, /<OurStandard \/>|<MobileStandard \/>|<WhyCOBRYKZ \/>|<MobileWhy \/>/);
```

Read the future desktop/mobile artifact files defensively only after they exist; for the RED phase, assert their expected paths are present using `existsSync` and fail with a clear message.

- [ ] **Step 2: Add failing tests for anti-AI guardrails**

Assert that rendered source and CSS do not contain `.page-grid`, the `page-grid` class, `Cormorant_Garamond`, or explanatory dark-form placeholders below `text-white/60`. Assert global `:focus-visible` uses `border-radius: 8px`.

- [ ] **Step 3: Add failing tests for conversion fallback**

Assert `FinalCTA.tsx` and `MobileContact.tsx` each include a copy action, keep `info@cobrykz.com`, retain mailto draft behavior, and do not contain copy claiming the message was sent.

- [ ] **Step 4: Run the tests and verify RED**

Run `npm test`. Expected: the new structural, grid, Cormorant, focus-radius, and copy-fallback assertions fail against the current implementation while the existing sharpness tests remain green.

- [ ] **Step 5: Commit the failing tests**

```powershell
git add -- tests/presentation-quality.test.mjs
git commit -m "test: define proof-led homepage constraints"
```

---

### Task 2: Build the annotated first-party artifact

**Files:**
- Create: `components/content/buildArtifact.ts`
- Create: `components/sections/BuildArtifact.tsx`
- Create: `components/mobile/MobileBuildArtifact.tsx`
- Create: `public/cobrykz-build-desktop.png`
- Create: `public/cobrykz-build-mobile.png`
- Modify: `app/page.tsx`
- Modify: `components/mobile/MobileExperience.tsx`
- Modify: `components/sections/Hero.tsx`
- Modify: `components/mobile/MobileHero.tsx`

**Interfaces:**
- Produces: `buildAnnotations: ReadonlyArray<{ number: string; title: string; decision: string; consequence: string }>`.
- Produces: `BuildArtifact()` and `MobileBuildArtifact()` presentational components.
- Consumes: static screenshots captured from the current COBRYKZ homepage and the shared annotation data.

- [ ] **Step 1: Capture honest homepage artifacts**

Run the current production build at a fixed local URL. Capture the desktop hero at 1440 pixels and the mobile hero at 375 pixels through the existing browser tooling. Save optimized screenshots as `public/cobrykz-build-desktop.png` and `public/cobrykz-build-mobile.png`. The images must show only COBRYKZ's own interface and contain no detector overlays or browser chrome.

- [ ] **Step 2: Create the shared annotation data**

Create three typed entries:

```ts
export const buildAnnotations = [
  {
    number: "01",
    title: "Lead with reputation",
    decision: "The opening names the gap between the real business and its online impression before discussing technology.",
    consequence: "A business owner can recognize the problem before being asked to understand the solution.",
  },
  {
    number: "02",
    title: "Compose mobile separately",
    decision: "The phone experience edits the hierarchy and interactions instead of shrinking the desktop page.",
    consequence: "The proposition, founder, and next action remain clear on the screen customers use most.",
  },
  {
    number: "03",
    title: "Create one conversion path",
    decision: "Proof, process, fit, and contact content answer objections in sequence.",
    consequence: "Each section moves a serious visitor toward one transparent project note.",
  },
] as const;
```

- [ ] **Step 3: Build the desktop artifact**

Create an asymmetric section immediately after the hero: one large screenshot on a plain surface, three numbered margin notes, fine rules, and no rounded icon containers. Use Next Image with explicit responsive sizes and accessible alt text. The section identifies the artifact as COBRYKZ's own homepage and never implies client results.

- [ ] **Step 4: Build the mobile artifact**

Use the mobile screenshot first, followed by the three annotations in reading order. Keep body copy at least 14 pixels. Avoid horizontal scrolling and keep numbering meaningful only within the artifact.

- [ ] **Step 5: Replace the trust strip and simplify the hero**

Render `BuildArtifact` after `Hero` and `MobileBuildArtifact` after `MobileHero`. Remove `SocialProof` from the desktop flow. Remove the three-item desktop hero commitment row and the multi-item mobile assurance line. Retain the portrait, headline meaning, primary action, and quiet process link.

- [ ] **Step 6: Run tests, lint, and commit**

Run `npm test` and `npm run lint`. Artifact-presence tests should pass; later consolidation/guardrail tests may remain red. Commit:

```powershell
git add -- app/page.tsx components/content components/sections/BuildArtifact.tsx components/mobile/MobileBuildArtifact.tsx components/mobile/MobileExperience.tsx components/sections/Hero.tsx components/mobile/MobileHero.tsx public/cobrykz-build-desktop.png public/cobrykz-build-mobile.png
git commit -m "feat: add annotated homepage build artifact"
```

---

### Task 3: Consolidate the desktop narrative

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/Process.tsx`
- Modify: `components/sections/Industries.tsx`
- Modify: `components/sections/Founder.tsx`
- Modify: `components/sections/GoodFit.tsx`
- Modify: `components/sections/FAQ.tsx`
- Delete from rendered flow only: `components/sections/WhyCOBRYKZ.tsx`, `components/sections/OurStandard.tsx`

**Interfaces:**
- Consumes: all existing timing, accountability, responsive, accessibility, and quality claims.
- Produces: one desktop working-method section with ordered steps and integrated quality commitments.

- [ ] **Step 1: Remove overlapping sections from the page composition**

Remove `WhyCOBRYKZ` and `OurStandard` imports/renders. Do not delete their files in this pass; preserving them keeps the change recoverable while the new narrative is reviewed.

- [ ] **Step 2: Rebuild Process as Working Method**

Keep the four ordered steps and exact durations. Add one concise founder-accountability statement and one compact, unboxed quality line covering responsive composition, accessibility, intentional performance, and pre-launch review. Avoid an icon-plus-card grid.

- [ ] **Step 3: Tighten Services and Industries**

Ensure Services answers only what gets built. Reduce Industries to a concise recognition list and one sentence; remove decorative dark-band grid treatment and repeated reassurance copy.

- [ ] **Step 4: Differentiate Founder, Fit, and FAQ**

Founder answers who is accountable and why the studio exists. Fit answers who benefits. FAQ answers price, timing, inputs, template, revision, support, and technology questions. Remove language duplicated by the artifact or working method.

- [ ] **Step 5: Remove decorative grid CSS usage**

Remove `.page-grid` from `app/globals.css` and all rendered component class strings. Retain the subtle dark dot field only where it provides section texture and does not sit behind small body text.

- [ ] **Step 6: Run tests, lint, and commit**

Run `npm test` and `npm run lint`. Desktop consolidation and grid assertions should pass. Commit changed desktop files and CSS as:

```powershell
git commit -m "refactor: consolidate desktop homepage narrative"
```

---

### Task 4: Consolidate the mobile narrative and typography

**Files:**
- Modify: `components/mobile/MobileExperience.tsx`
- Modify: `components/mobile/MobileServices.tsx`
- Modify: `components/mobile/MobileProcess.tsx`
- Modify: `components/mobile/MobileIndustries.tsx`
- Modify: `components/mobile/MobileFounder.tsx`
- Modify: `components/mobile/MobileFit.tsx`
- Modify: `components/mobile/MobileFAQ.tsx`
- Remove from rendered flow: `components/mobile/MobileWhy.tsx`, `components/mobile/MobileStandard.tsx`
- Modify: `components/mobile/MobileHero.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: shared proof annotations and desktop narrative decisions.
- Produces: a shorter phone journey with fewer interaction models and one serif accent family.

- [ ] **Step 1: Remove overlapping mobile sections**

Remove `MobileWhy` and `MobileStandard` from `MobileExperience`. Move their useful accountability and quality facts into `MobileProcess` without adding another tab or accordion system.

- [ ] **Step 2: Simplify mobile interactions**

Retain the service tabs and FAQ accordion. Render the four process steps as visible ordered rows rather than another accordion, reducing interaction-model accumulation. Keep the bottom action rail.

- [ ] **Step 3: Remove Cormorant and repeated kickers**

Remove `Cormorant_Garamond` from `MobileHero`. Use the existing Playfair variable for the single hero emphasis or use Geist alone if the visual review is stronger. Remove `m-kicker` from repeated section grammar and replace it with content-specific headings or occasional plain labels.

- [ ] **Step 4: Tighten mobile Industries, Founder, Fit, and FAQ**

Keep each section focused on its distinct objection. Remove swipe-only instructions if Industries no longer scrolls horizontally. Ensure the proposition remains visible within the 375-pixel first viewport.

- [ ] **Step 5: Run tests, lint, and commit**

Run `npm test` and `npm run lint`. All anti-AI, structure, and typography assertions except contact fallback should pass. Commit:

```powershell
git add -- components/mobile app/layout.tsx
git commit -m "refactor: consolidate mobile homepage narrative"
```

---

### Task 5: Harden the honest project-note conversion

**Files:**
- Create: `components/CopyProjectNoteButton.tsx`
- Modify: `components/sections/FinalCTA.tsx`
- Modify: `components/mobile/MobileContact.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `CopyProjectNoteButton({ text, className? }: { text: string; className?: string })` client component.
- Consumes: the same formatted project-note strings already used to build mailto URLs.
- Preserves: mailto draft behavior and `info@cobrykz.com` fallback.

- [ ] **Step 1: Create the copy fallback component**

Implement an accessible button using `navigator.clipboard.writeText(text)`. Show honest temporary status: “Project note copied” on success and “Copy failed—select the text below” on failure. Reset the status when the source text changes. Do not claim delivery.

- [ ] **Step 2: Refactor desktop contact note formatting**

Build one plain-text note string from current form state and use it for both the encoded mailto body and copy action. Keep the form content in place after submission. Rename the primary button to “Open email draft.” Add a visible copy action and copyable email fallback.

- [ ] **Step 3: Refactor mobile contact note formatting**

Apply the same behavior with the shorter mobile fields. Preserve entered content, provide “Open email draft,” copy action, and copyable address.

- [ ] **Step 4: Fix dark-form contrast and focus radius**

Raise meaningful placeholders to at least `text-white/60` and set global `:focus-visible` to the documented `8px` radius.

- [ ] **Step 5: Run the complete test suite and commit**

Run `npm test` and `npm run lint`. Expected: every presentation-quality test passes. Commit:

```powershell
git add -- components/CopyProjectNoteButton.tsx components/sections/FinalCTA.tsx components/mobile/MobileContact.tsx app/globals.css
git commit -m "feat: add resilient project-note fallback"
```

---

### Task 6: Production and responsive verification

**Files:**
- Modify only files already listed when verification reveals an in-scope defect.

**Interfaces:**
- Consumes: completed proof-led homepage.
- Produces: automated and visual evidence for the approved design.

- [ ] **Step 1: Run the automated gate**

```powershell
npm test
npm run lint
npm run build
git diff --check master...HEAD
```

Expected: all tests pass, lint exits zero, Next.js builds and prerenders `/`, and no whitespace errors appear.

- [ ] **Step 2: Verify mobile at 375 and 320 pixels**

Check first-viewport proposition visibility, artifact legibility, no horizontal overflow, visible ordered process, contact fallback, 44-pixel targets, and fixed action-rail clearance.

- [ ] **Step 3: Verify 768, 1024, and 1440 pixels**

Check hero/artifact hierarchy, screenshot sharpness, annotation alignment, section rhythm, process timing visibility, founder crop, and contact form clarity.

- [ ] **Step 4: Verify keyboard and conversion behavior**

Tab through primary navigation, hero actions, service tabs, FAQ, contact fields, mail-draft action, and copy fallback. Confirm focus visibility, native validation, copy success/failure status, and no false sent state.

- [ ] **Step 5: Review the final narrative**

Confirm every surviving section resolves a distinct objection, no unsupported proof appears, the process is the only numbered sequence outside the artifact annotations, and the page no longer depends on repeated reassurance grammar.

- [ ] **Step 6: Commit verification fixes if required**

After rerunning the full automated gate, commit only scoped fixes as:

```powershell
git commit -m "fix: resolve proof-led responsive details"
```
