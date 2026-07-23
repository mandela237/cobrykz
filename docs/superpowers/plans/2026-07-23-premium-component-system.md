# COBRYKZ Premium Component-System Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine existing COBRYKZ component states and shared values through five disciplined checkpoints while preserving the approved editorial composition at macro scale.

**Architecture:** Keep React component structure and ownership unchanged. Add only a deliberately small CSS token layer in `app/globals.css`, then consume those tokens through narrowly scoped classes or existing component class strings where visual intent is genuinely shared. Every checkpoint ends with tests, responsive state review, and same-viewport macro comparison against the approved baseline before the next checkpoint begins.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner, ESLint, Chrome/Playwright-compatible browser QA.

## Global Constraints

- Do not change section structure, typography, copy, color palette, hero composition, content hierarchy, overall spacing, or interaction behavior.
- Keep the token layer intentionally small; introduce a token only for repeated values with identical visual intent.
- Do not consolidate values merely because they are numerically close.
- Preserve intentional differences in elevation, border treatment, radius, height, and hierarchy.
- Prefer local refinement when a shared token would be abstraction for its own sake.
- Do not introduce new React component types or broad component refactors.
- Form refinement is visual only: no validation messages, validation logic, handlers, state, or behavior changes.
- No dramatic scaling, hover lift, exaggerated glow, heavy shadows, new gradients, glassmorphism, or decorative effects.
- If a refinement becomes noticeable at page scale, correct or remove it before proceeding.
- After every checkpoint, compare 1440px and 375px full-page captures with the approved editorial baseline and confirm macro equivalence.
- Preserve the unrelated untracked `0721.mp4`.

---

### Checkpoint 1: Foundation Tokens

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/presentation-quality.test.mjs`
- Create: `docs/reports/2026-07-23-component-token-audit.md`
- Create: `.superpowers/component-system/baseline-desktop.png`
- Create: `.superpowers/component-system/baseline-mobile.png`

**Interfaces:**
- Consumes: the approved editorial build at the checkpoint base commit.
- Produces: a documented minimal token set in `:root` and fixed baseline screenshots used by Checkpoints 2–5.

- [ ] **Step 1: Capture the immutable editorial baseline**

Run a production build and local server, then capture full-page screenshots at 1440px and 375px before changing CSS. Save them at the exact baseline paths above. Record viewport dimensions, URL, commit SHA, and browser version in the token audit.

- [ ] **Step 2: Write the failing token-contract test**

Add a test named `keeps the premium component token layer small and intentional`. Assert an explicit allowlist of no more than the justified tokens introduced during the audit, prohibit unused tokens, and reject new gradient/glow/scale/lift utilities in component-system changes.

The candidate audit must individually justify or reject:

```text
--control-transition
--focus-ring-light
--focus-ring-dark
--control-height-compact
--control-height-standard
--radius-control
--shadow-quiet
--shadow-elevated
--border-control-light
--border-control-dark
```

Expected implementation should be smaller than this candidate list whenever values do not have identical intent or meaningful duplication.

- [ ] **Step 3: Run the focused test to confirm RED**

Run: `node --test --test-name-pattern="component token layer" tests/presentation-quality.test.mjs`

Expected: FAIL because the audited tokens and their source contract do not yet exist.

- [ ] **Step 4: Write the token audit**

For each candidate, document repeated consumers, visual role, accept/reject decision, and reason. Map accepted tokens to exact existing values so introducing them causes no visual change.

- [ ] **Step 5: Implement only accepted tokens**

Add accepted CSS custom properties to `:root`. Update only the minimum existing shared CSS rules needed to consume them. Do not change any resolved value in this checkpoint.

- [ ] **Step 6: Verify GREEN and macro equivalence**

Run focused and full tests, tracked-source ESLint, and production build. Capture checkpoint screenshots at 1440px and 375px and compare them to the baseline using identical page state. Require no changed section boundaries, wrapping, heights, focal points, or visible component appearance.

- [ ] **Step 7: Commit Checkpoint 1**

```bash
git add app/globals.css tests/presentation-quality.test.mjs docs/reports/2026-07-23-component-token-audit.md
git commit -m "refactor: establish minimal component tokens"
```

### Checkpoint 2: Buttons and Links

**Files:**
- Modify: `app/globals.css`
- Modify only as required: `components/Navbar.tsx`
- Modify only as required: `components/Footer.tsx`
- Modify only as required: `components/CopyProjectNoteButton.tsx`
- Modify only as required: `components/sections/Hero.tsx`
- Modify only as required: `components/sections/Services.tsx`
- Modify only as required: `components/sections/Industries.tsx`
- Modify only as required: `components/sections/Process.tsx`
- Modify only as required: `components/sections/Founder.tsx`
- Modify only as required: `components/sections/FinalCTA.tsx`
- Modify only as required: `components/mobile/MobileHero.tsx`
- Modify only as required: `components/mobile/MobileServices.tsx`
- Modify only as required: `components/mobile/MobileFounder.tsx`
- Modify only as required: `components/mobile/MobileContact.tsx`
- Modify only as required: `components/mobile/MobileActionBar.tsx`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: accepted Checkpoint 1 timing/focus tokens and immutable baseline captures.
- Produces: equivalent action roles with consistent, restrained state language.

- [ ] **Step 1: Write failing action-state contracts**

Add a test named `keeps equivalent actions and links behaviorally consistent`. Assert:

- Equivalent primary actions use the same color-transition intent.
- Pressed translation is either consistently retained for equivalent primary actions or consistently removed; no scale or hover-lift utilities are introduced.
- Equivalent text links use the accepted transition timing.
- Focus treatment remains visible for button, text-link, navigation-link, circular, and dark-surface contexts.
- No label, href, dimensions, spacing, fill, shadow hierarchy, or click behavior changes.

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `node --test --test-name-pattern="actions and links" tests/presentation-quality.test.mjs`

Expected: FAIL on the audited transition and pressed-state inconsistencies.

- [ ] **Step 3: Refine equivalent button states**

Normalize transition timing and pressed treatment only for genuinely equivalent primary actions. Preserve existing role-specific heights, widths, backgrounds, shadows, and hierarchy. Retain, reduce, or remove shimmer consistently only where the same primary-action role is represented; do not add it elsewhere.

- [ ] **Step 4: Refine links and focus geometry**

Apply restrained equivalent color transitions to matching desktop/mobile text actions. Preserve the navigation underline. Replace the global forced focus radius with geometry-aware focus rules that keep plain links plain, circular controls circular, and dark-surface focus clearly visible.

- [ ] **Step 5: Verify interaction and macro equivalence**

Exercise default, hover, active, keyboard-focus, and disabled-native states at 1440px and 375px. Compare full-page captures with the baseline. Require unchanged layout, wrapping, element dimensions, visual hierarchy, and focal flow.

- [ ] **Step 6: Run verification and commit Checkpoint 2**

Run focused/full tests, tracked-source lint, production build, and diff check.

```bash
git add app/globals.css components tests/presentation-quality.test.mjs
git commit -m "refactor: align action and link states"
```

### Checkpoint 3: Forms

**Files:**
- Modify: `app/globals.css`
- Modify only visual class names: `components/sections/FinalCTA.tsx`
- Modify only visual class names: `components/mobile/MobileContact.tsx`
- Modify only visual class names if required: `components/CopyProjectNoteButton.tsx`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Checkpoint 1 tokens and Checkpoint 2 focus language.
- Produces: a shared visual-state contract for existing form markup without behavior changes.

- [ ] **Step 1: Write failing form-state contracts**

Add a test named `keeps form refinement visual and state-complete`. Assert:

- Existing field names, labels, placeholders, `required`, autocomplete, form actions, submit handlers, and status strings are unchanged.
- No new validation state, handler, error message, or conditional validation rendering is introduced.
- Equivalent desktop/mobile controls share border, radius, background, transition, and focus intent while retaining existing 48px desktop and 44px mobile heights.
- Visual selectors cover hover, focus-visible, native disabled, `:user-invalid` with a safe fallback strategy, required, helper text, and existing success status.

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `node --test --test-name-pattern="form refinement" tests/presentation-quality.test.mjs`

Expected: FAIL because the state-complete visual contract is absent.

- [ ] **Step 3: Implement visual-only form states**

Introduce narrowly scoped form-control, helper, and status classes or attributes using existing markup. Use native selectors and existing `required`/`disabled` attributes. Prevent invalid styling from appearing prematurely. Do not add JavaScript, messages, handlers, or state.

- [ ] **Step 4: Verify the state matrix**

At desktop and mobile widths, inspect default, hover, keyboard focus, required-neutral, user-invalid, native disabled, helper text, and existing success status. Confirm the mailto draft, copy action, fields, select, and textarea behave exactly as before.

- [ ] **Step 5: Verify macro equivalence and commit Checkpoint 3**

Compare 1440px and 375px full pages to baseline with untouched form state. Require pixel-equivalent macro layout and hierarchy. Run focused/full tests, tracked lint, build, and diff check.

```bash
git add app/globals.css components/sections/FinalCTA.tsx components/mobile/MobileContact.tsx components/CopyProjectNoteButton.tsx tests/presentation-quality.test.mjs
git commit -m "refactor: unify form visual states"
```

### Checkpoint 4: Accordions

**Files:**
- Modify only visual classes: `components/sections/FAQ.tsx`
- Modify only visual classes: `components/mobile/MobileFAQ.tsx`
- Modify only visual classes: `components/mobile/MobileProcess.tsx`
- Modify only if a shared state rule is justified: `app/globals.css`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: accepted timing, border, and focus treatments.
- Produces: equivalent accordion state feedback while retaining responsive dimensions and logic.

- [ ] **Step 1: Write failing accordion-state contracts**

Add a test named `keeps accordion states precise and behavior-preserving`. Assert unchanged questions, answers, open-index logic, Plus/Minus relationship, IDs, `aria-expanded`, and `aria-controls`. Assert equivalent row hover/focus, state-control border feedback, and transition timing while preserving desktop FAQ 72px/36px, mobile FAQ 64px/32px, and mobile Process 68px/32px dimensions.

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `node --test --test-name-pattern="accordion states" tests/presentation-quality.test.mjs`

Expected: FAIL on inconsistent row/control feedback.

- [ ] **Step 3: Refine accordion presentation only**

Align equivalent hover, focus-visible, border, and transition treatment. Keep current content, density, open/close logic, and accessibility relationships. Add no height animation, rotation, scaling, or new motion.

- [ ] **Step 4: Verify behavior and macro equivalence**

Exercise closed, open, hover, and keyboard-focus states at desktop/mobile widths. Confirm no content jump beyond existing open/close behavior. Compare default full-page state at 1440px and 375px to baseline.

- [ ] **Step 5: Run verification and commit Checkpoint 4**

Run focused/full tests, tracked lint, build, and diff check.

```bash
git add app/globals.css components/sections/FAQ.tsx components/mobile/MobileFAQ.tsx components/mobile/MobileProcess.tsx tests/presentation-quality.test.mjs
git commit -m "refactor: align accordion visual states"
```

### Checkpoint 5: Surfaces and Supporting Elements

**Files:**
- Modify only audit-justified visual values: `app/globals.css`
- Modify only audit-justified classes in existing `components/**/*.tsx`
- Modify: `tests/presentation-quality.test.mjs`
- Create: `docs/reports/2026-07-23-premium-component-system.md`
- Create: `docs/reports/assets/2026-07-23-components-before-desktop.png`
- Create: `docs/reports/assets/2026-07-23-components-after-desktop.png`
- Create: `docs/reports/assets/2026-07-23-components-before-mobile.png`
- Create: `docs/reports/assets/2026-07-23-components-after-mobile.png`

**Interfaces:**
- Consumes: all approved checkpoint changes and immutable baseline captures.
- Produces: final surface/supporting-element refinements, complete QA evidence, and user-review deliverables.

- [ ] **Step 1: Write failing surface-role contracts**

Add a test named `preserves intentional component surface hierarchy`. Assert the approved roles for quiet contained, primary elevated editorial, and dark destination surfaces without requiring identical values. Assert full-radius remains limited to pills/status marks, section labels preserve typography, and no new gradient, glass, glow, lift, or heavy-shadow treatment is introduced.

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `node --test --test-name-pattern="surface hierarchy" tests/presentation-quality.test.mjs`

Expected: FAIL until exact same-intent surface mappings are documented and protected.

- [ ] **Step 3: Audit and refine same-role duplicates only**

Map Services, Process, Fit, FAQ, contact, hero media, navigation, cards, labels, badges, pills, dividers, and borders by visual role. Consolidate only identical-intent duplicates. Leave all other treatments local and document why.

- [ ] **Step 4: Run the complete state and responsive matrix**

Inspect 320px, 375px, 430px, 768px, 1280px, and 1440px. Exercise action, link, form, accordion, keyboard-focus, native disabled, invalid, success, helper, and reduced-motion states. Verify no overflow, clipping, behavior change, console error, or accessibility regression.

- [ ] **Step 5: Produce macro-comparison evidence**

Copy the immutable baseline captures to the two `before` asset paths. Capture final full-page screenshots at the same 1440px and 375px viewports and page state to the two `after` paths. Compare section boundaries, heights, text wrapping, hero framing, focal flow, and overall visual character. If the refinement is visible as a redesign rather than close-detail polish, correct it before proceeding.

- [ ] **Step 6: Write the final report**

Document:

- Every token introduced, its exact value, consumers, and justification.
- Candidate tokens rejected and why.
- Component-by-component refinements.
- Components intentionally left unchanged.
- Checkpoint macro-comparison results.
- State-matrix and responsive QA results.
- Before/after screenshot links.
- Explicit confirmation that functionality, content, macro composition, hierarchy, and overall spacing were preserved.

- [ ] **Step 7: Run final verification**

Run:

```powershell
npm test
$componentFiles = git ls-files '*.js' '*.mjs' '*.ts' '*.tsx'
npx eslint $componentFiles
npm run build
git diff --check
```

Expected: complete tests, tracked-source lint, production build, and diff hygiene PASS.

- [ ] **Step 8: Commit Checkpoint 5**

```bash
git add app/globals.css components tests/presentation-quality.test.mjs docs/reports/2026-07-23-premium-component-system.md docs/reports/assets/2026-07-23-components-*.png
git commit -m "refactor: finish premium component system"
```
