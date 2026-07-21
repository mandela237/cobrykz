# Premium Text and Visual Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make COBRYKZ read and render like a bespoke founder-led studio on desktop and mobile without changing its claims, structure, or interactions.

**Architecture:** Retain the existing separate desktop and mobile component trees and refine them in place. Add a lightweight Node source-regression suite for the objective rendering and readability constraints, then update global rendering rules and component-level typography/copy while preserving component behavior.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TypeScript, Tailwind CSS 4, Node built-in test runner, Lucide React.

## Global Constraints

- Preserve every factual claim and the meaning of each section.
- Do not introduce new performance figures, testimonials, clients, guarantees, prices, or unsupported proof.
- Do not change desktop or mobile information architecture, section order, anchors, state logic, or contact behavior.
- Keep Geist as the primary typeface and Playfair Display as a rare editorial accent.
- Maintain the light-first palette, WCAG AA contrast, visible focus states, reduced motion, and 44-pixel mobile touch targets.
- Rewrite toward a direct founder voice without adding luxury cliches or unsupported adjectives.
- Verify at 375, 768, 1024, and 1440 pixels.

---

### Task 1: Add source-quality regression checks

**Files:**
- Create: `tests/presentation-quality.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: CSS and TSX source files under `app/` and `components/`.
- Produces: `npm test`, a Node test command that enforces agreed rendering and small-text constraints.

- [ ] **Step 1: Create the failing source-quality test**

Create `tests/presentation-quality.test.mjs` with Node's `node:test`, `assert`, and `fs` modules. Read `app/globals.css`, `components/Navbar.tsx`, `components/mobile/MobileActionBar.tsx`, and all TSX files recursively under `components/`. Add individual tests asserting:

```js
assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
assert.doesNotMatch(navSurfaces, /backdrop-blur/);
assert.doesNotMatch(readableMarkup, /<p[^>]*className="[^"]*text-\[(?:10|11|12)px\]/s);
```

Exclude screen-reader-only headings from the paragraph-size check; utility labels may remain smaller because the assertion only targets `<p>` elements.

- [ ] **Step 2: Add and run the test script to verify RED**

Add `"test": "node --test tests/*.test.mjs"` to `package.json`. Run `npm test` and confirm failures identify forced font rendering, backdrop blur, and undersized readable paragraphs in the existing source.

- [ ] **Step 3: Commit the red tests**

Run:

```powershell
git add -- package.json tests/presentation-quality.test.mjs
git commit -m "test: define presentation quality constraints"
```

Expected: one commit containing only the failing regression suite and test script.

---

### Task 2: Sharpen shared rendering and surface treatment

**Files:**
- Modify: `app/globals.css`
- Modify: `components/Navbar.tsx`
- Modify: `components/mobile/MobileActionBar.tsx`
- Modify as inspection requires: `components/sections/Hero.tsx`, `components/mobile/MobileHero.tsx`

**Interfaces:**
- Consumes: Existing CSS variables, `.section-shell`, `.m-shell`, `.m-title`, `.m-body`, and component class strings.
- Produces: Platform-native font rasterization, stronger default body readability, and opaque navigation surfaces without blur.

- [ ] **Step 1: Remove forced rasterization and strengthen shared type**

Remove `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`, and `text-rendering: geometricPrecision` from `body`. Remove the global `shape-rendering: geometricPrecision` rule from `img, svg`. Refine `.m-body` to `font-size: 0.9375rem` and `line-height: 1.65`; keep `.m-title` fixed and strengthen only where visual inspection shows a fragile weight.

- [ ] **Step 2: Replace blurred translucent navigation surfaces**

Remove `backdrop-blur-*` utilities from the desktop navbar and mobile action bar. Use high-opacity or fully opaque surfaces, visible borders, and restrained directional shadows. Do not change dimensions, anchors, sticky/fixed behavior, or show/hide logic.

- [ ] **Step 3: Inspect hero image and overlay sharpness**

Confirm both hero components use `mandela-portrait-sharp.jpg` where the founder portrait is displayed. Keep responsive `next/image` sizing and reduce only overlay opacity or blur that visibly softens the portrait or text; do not change the composition.

- [ ] **Step 4: Run tests and static checks**

Run `npm test` and confirm the font-rendering and blur assertions pass. Any remaining paragraph-size failure is expected until Tasks 3 and 4. Run `npm run lint` and expect zero errors.

- [ ] **Step 5: Commit shared rendering changes**

Run:

```powershell
git add -- app/globals.css components/Navbar.tsx components/mobile/MobileActionBar.tsx components/sections/Hero.tsx components/mobile/MobileHero.tsx
git commit -m "style: sharpen typography and navigation surfaces"
```

Add only files actually changed.

---

### Task 3: Refine desktop copy and typography

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/SocialProof.tsx`
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/WhyCOBRYKZ.tsx`
- Modify: `components/sections/Industries.tsx`
- Modify: `components/sections/OurStandard.tsx`
- Modify: `components/sections/Process.tsx`
- Modify: `components/sections/Founder.tsx`
- Modify: `components/sections/GoodFit.tsx`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/FinalCTA.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: Existing arrays, JSX structure, anchors, form state, and design tokens.
- Produces: Direct, specific desktop language and readable typography with unchanged factual meaning and behavior.

- [ ] **Step 1: Edit the hero, trust strip, and services copy**

Rewrite each heading, paragraph, label, and CTA for natural cadence and concrete business language. Preserve every service outcome, the founder-led promise, the no-template claim, and all existing calls to the same anchors. Reduce paragraph measures where they exceed roughly 70 characters per line.

- [ ] **Step 2: Edit relationship, industries, and standards copy**

Remove repetitive constructions such as multiple consecutive headings built as “X that Y.” Keep the same industries and quality criteria. Use first person only when Mandela's direct accountability is the subject.

- [ ] **Step 3: Edit process, founder, fit, FAQ, contact, and footer copy**

Preserve the 30-minute discovery, 2–3 day direction, 4–7 day build/review, one-to-two-week focused website timeline, email-draft disclosure, and every FAQ answer's factual meaning. Keep all form names and submit behavior unchanged.

- [ ] **Step 4: Strengthen desktop readable text**

Replace fragile low-opacity white body text with accessible solid or high-opacity colors, raise readable paragraph sizes below 13 pixels, and preserve smaller uppercase labels only as utility text. Keep heading hierarchy and section layout intact.

- [ ] **Step 5: Run checks and commit desktop refinement**

Run `npm test` and `npm run lint`. Confirm no test failure originates from desktop paragraphs. Then run:

```powershell
git add -- components/sections components/Footer.tsx
git commit -m "copy: refine desktop founder voice"
```

---

### Task 4: Refine mobile copy and typography

**Files:**
- Modify: `components/mobile/MobileHero.tsx`
- Modify: `components/mobile/MobileServices.tsx`
- Modify: `components/mobile/MobileWhy.tsx`
- Modify: `components/mobile/MobileIndustries.tsx`
- Modify: `components/mobile/MobileStandard.tsx`
- Modify: `components/mobile/MobileProcess.tsx`
- Modify: `components/mobile/MobileFounder.tsx`
- Modify: `components/mobile/MobileFit.tsx`
- Modify: `components/mobile/MobileFAQ.tsx`
- Modify: `components/mobile/MobileContact.tsx`
- Modify: `components/mobile/MobileFooter.tsx`

**Interfaces:**
- Consumes: Existing mobile tab, accordion, action-bar, form, and navigation behavior.
- Produces: A mobile edition of the same founder voice with practical reading sizes and unchanged interactions.

- [ ] **Step 1: Bring mobile language into parity with desktop**

Apply the same claims and voice decisions in phone-length phrasing. Do not copy desktop paragraphs blindly; preserve meaning while keeping mobile text concise. Retain tab labels, accordion questions, field names, and anchor targets.

- [ ] **Step 2: Raise readable mobile paragraph sizes and contrast**

Use at least 13 pixels for explanatory `<p>` text and higher-opacity light text on dark surfaces. Keep metadata and uppercase kickers smaller only when they are not required to understand the offer or complete an action.

- [ ] **Step 3: Run the complete source-quality suite**

Run `npm test`. Expected: all tests pass, including no forced rasterization, no navigation backdrop blur, and no explanatory paragraph below 13 pixels.

- [ ] **Step 4: Lint and commit mobile refinement**

Run `npm run lint` and expect zero errors. Then run:

```powershell
git add -- components/mobile
git commit -m "copy: refine mobile founder voice"
```

---

### Task 5: Production and responsive verification

**Files:**
- Modify only if verification reveals a scoped defect in a file already listed above.

**Interfaces:**
- Consumes: Completed desktop/mobile refinement.
- Produces: Evidence that the implementation builds and renders correctly at the required breakpoints.

- [ ] **Step 1: Run the full automated gate**

Run:

```powershell
npm test
npm run lint
npm run build
git diff --check master...HEAD
```

Expected: all tests pass, ESLint exits zero, Next.js production build exits zero, and no whitespace errors appear.

- [ ] **Step 2: Start the production server**

Run `npm run start -- -p 3000` and keep the process available for browser inspection.

- [ ] **Step 3: Inspect 375 and 768 pixels**

Verify no horizontal overflow, no fixed-element obstruction, readable hero overlay, crisp portrait, minimum readable paragraph size, stable accordions/tabs, and visible form labels and focus states.

- [ ] **Step 4: Inspect 1024 and 1440 pixels**

Verify composed heading wraps, paragraph measures, navigation clarity, crisp text and borders, quiet hero field, no layout shift on hover, and consistent section transitions.

- [ ] **Step 5: Review the final diff against the specification**

Confirm claims, section order, anchors, state logic, and email-draft behavior remain unchanged. Confirm no unsupported proof or luxury cliches were added.

- [ ] **Step 6: Commit any verification fixes**

If scoped fixes were required, rerun the full automated gate and commit them as:

```powershell
git add -- <only-the-fixed-files>
git commit -m "fix: resolve responsive presentation details"
```
