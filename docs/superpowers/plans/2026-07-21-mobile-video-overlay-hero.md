# Mobile Video Overlay Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the split mobile hero with a readable bottom-left copy overlay on a full-bleed brand video.

**Architecture:** Keep the implementation isolated to `MobileHero.tsx`. Start the media stage immediately below the 64px fixed navigation and top-align one unfiltered `object-contain` video so the complete frame remains visible without a gap, place a localized semi-transparent gradient inside the text block only, and anchor the content group at bottom-left; enforce the structural contract with the existing source-level presentation test.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner.

## Global Constraints

- Mobile only; desktop hero and downstream sections remain unchanged.
- Hero uses a compact `68svh` height with a `500px` minimum and `620px` maximum, switching to `100svh` with compact gaps below `650px` viewport height.
- Copy stays bottom-left with 20px standard horizontal spacing.
- `/hero-video.mp4`, `/hero-video-poster.jpg`, autoplay, muted, loop, and inline playback remain.
- Film remains fully visible with centered `object-contain`; no scale, crop, filter, duplicate media layer, card, border, rounded overlay container, or uniform heavy tint.
- CTA has a minimum 44px touch height and links to `#m-contact`.
- Layout must not overflow horizontally from 320px through 767px.

---

### Task 1: Replace the Split Contract with an Overlay Contract

**Files:**
- Modify: `tests/presentation-quality.test.mjs`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Source markup exported by `components/mobile/MobileHero.tsx`.
- Produces: A regression contract requiring the full-bleed stage, overlay content, gradients, viewport height, stable video behavior, one CTA, and no split grid.

- [ ] **Step 1: Write the failing test**

Replace the existing mobile split test with:

```js
test("composes the mobile hero as a full-bleed video overlay", () => {
  const mobileHero = read("components/mobile/MobileHero.tsx");

  assert.match(mobileHero, /min-h-\[560px\]/);
  assert.match(mobileHero, /h-\[80svh\]/);
  assert.match(mobileHero, /max-h-\[649px\]:h-svh/);
  assert.match(mobileHero, /data-mobile-hero-backdrop/);
  assert.match(mobileHero, /data-mobile-hero-gradient/);
  assert.match(mobileHero, /data-mobile-hero-copy/);
  assert.match(mobileHero, /absolute inset-0/);
  assert.match(mobileHero, /object-cover/);
  assert.match(mobileHero, /from-navy/);
  assert.equal((mobileHero.match(/href="#m-contact"/g) || []).length, 1);
  assert.doesNotMatch(mobileHero, /grid-cols-\[46%_54%\]|data-mobile-portrait-stage/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: the new overlay test fails because `MobileHero.tsx` still contains the split grid and portrait stage.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/presentation-quality.test.mjs
git commit -m "test: define mobile video overlay contract"
```

### Task 2: Build and Verify the Full-Bleed Overlay Hero

**Files:**
- Modify: `components/mobile/MobileHero.tsx`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: `/hero-video.mp4`, `/hero-video-poster.jpg`, `Manrope`, and `ArrowUpRight`.
- Produces: `MobileHero(): JSX.Element`, containing decorative full-bleed film, contrast gradients, bottom-left copy, and one project CTA.

- [ ] **Step 1: Implement the overlay composition**

Use one relative section with `h-[80svh] min-h-[560px] max-h-[649px]:h-svh`. Place the video in an `absolute inset-0` wrapper. Add two `aria-hidden` gradient layers marked `data-mobile-hero-gradient`: one `bg-gradient-to-t from-navy` bottom veil and one `bg-gradient-to-r from-navy/70` left veil. Place `data-mobile-hero-copy` in a `relative z-20 flex h-full max-w-[430px] flex-col justify-end px-5 pb-8 pt-24` container, with compact short-screen gaps using `max-h-[649px]:...` variants. Preserve the existing copy and CTA destination, change overlay text to white and white opacity levels, and retain blue only for the CTA.

- [ ] **Step 2: Run the source contract**

Run: `npm test`

Expected: all presentation-quality tests pass.

- [ ] **Step 3: Run lint and production build**

Run: `npx eslint components/mobile/MobileHero.tsx tests/presentation-quality.test.mjs`

Expected: exit code 0 with no diagnostics.

Run: `npm run build`

Expected: Next.js compiles successfully and emits the `/` route.

- [ ] **Step 4: Inspect the implementation diff**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git diff -- components/sections/Hero.tsx`

Expected: no output; the desktop hero remains unchanged.

- [ ] **Step 5: Commit the implementation**

```bash
git add components/mobile/MobileHero.tsx
git commit -m "feat: blend mobile copy over hero film"
```
