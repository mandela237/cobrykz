# Editorial Section Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing desktop and mobile section sequence into one premium editorial composition using selective elevation, open dark anchors, controlled overlaps, and one dominant focal point per viewport.

**Architecture:** Keep every section component and all existing content and interactions. Add explicit structural markers to the selected unified surfaces, then tune each component independently: Services, Process, Fit, and FAQ gain one elevated or tinted grouping surface; Industries, Founder, and Contact remain open anchors. Finish with complete-page visual QA and allow measured class adjustments based on the full scroll rather than enforcing one global overlap or shadow preset.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner, browser-based responsive QA.

## Global Constraints

- Preserve all existing copy, typography, palette, section order, forms, controls, and interaction behavior.
- Do not add a card to every section.
- Do not use glassmorphism, decorative blobs, heavy gradients, strong shadows, new corner-radius styles, or decorative motion.
- Every viewport must have one dominant focal point.
- Desktop and mobile share the same editorial intent but are composed independently.
- Mobile must remain free of horizontal overflow, clipped shadows, and action-bar collisions from 320px upward.
- Complete-page desktop and mobile review is required before completion.
- Leave the unrelated untracked `0721.mp4` untouched.

---

### Task 1: Lock the Editorial Surface Contract

**Files:**
- Modify: `tests/presentation-quality.test.mjs`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Source markup from the desktop and mobile section components.
- Produces: A regression contract for selective elevated surfaces, unified process/FAQ groupings, open dark anchors, and unchanged section order.

- [ ] **Step 1: Add the failing presentation test**

Append this test:

```js
test("uses selective editorial depth instead of carding every section", () => {
  const desktop = [
    read("components/sections/Services.tsx"),
    read("components/sections/Industries.tsx"),
    read("components/sections/Process.tsx"),
    read("components/sections/Founder.tsx"),
    read("components/sections/GoodFit.tsx"),
    read("components/sections/FAQ.tsx"),
    read("components/sections/FinalCTA.tsx"),
  ].join("\n");
  const mobile = [
    read("components/mobile/MobileServices.tsx"),
    read("components/mobile/MobileIndustries.tsx"),
    read("components/mobile/MobileProcess.tsx"),
    read("components/mobile/MobileFounder.tsx"),
    read("components/mobile/MobileFit.tsx"),
    read("components/mobile/MobileFAQ.tsx"),
    read("components/mobile/MobileContact.tsx"),
  ].join("\n");

  assert.equal((desktop.match(/data-editorial-surface/g) || []).length, 4);
  assert.equal((mobile.match(/data-editorial-surface/g) || []).length, 4);
  assert.match(desktop, /data-editorial-surface="services"/);
  assert.match(desktop, /data-editorial-surface="process"/);
  assert.match(desktop, /data-editorial-surface="fit"/);
  assert.match(desktop, /data-editorial-surface="faq"/);
  assert.match(mobile, /data-editorial-surface="services"/);
  assert.match(mobile, /data-editorial-surface="process"/);
  assert.match(mobile, /data-editorial-surface="fit"/);
  assert.match(mobile, /data-editorial-surface="faq"/);
  assert.doesNotMatch(desktop, /data-editorial-surface="industries"|data-editorial-surface="founder"|data-editorial-surface="contact"/);
  assert.doesNotMatch(mobile, /data-editorial-surface="industries"|data-editorial-surface="founder"|data-editorial-surface="contact"/);
  assert.match(desktop, /data-founder-glow/);
  assert.match(mobile, /data-founder-glow/);
});
```

- [ ] **Step 2: Run the test and confirm the intended failure**

Run: `npm test`

Expected: the new test fails because no `data-editorial-surface` or `data-founder-glow` markers exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/presentation-quality.test.mjs
git commit -m "test: define editorial section depth contract"
```

### Task 2: Compose Desktop Section Depth

**Files:**
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/Industries.tsx`
- Modify: `components/sections/Process.tsx`
- Modify: `components/sections/Founder.tsx`
- Modify: `components/sections/GoodFit.tsx`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/FinalCTA.tsx`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Existing section markup, content arrays, and interaction state.
- Produces: Four desktop elements marked `data-editorial-surface="services|process|fit|faq"`, one `data-founder-glow`, and open Industries/Founder/Contact anchors.

- [ ] **Step 1: Elevate Services as one surface**

Change the outer section to a pale field with extra transition room:

```tsx
<section id="services" className="relative bg-gray-light pb-24 pt-20 md:pb-32 md:pt-28">
  <div
    data-editorial-surface="services"
    className="section-shell relative z-10 rounded-lg border border-border/80 bg-white px-5 py-10 shadow-[0_24px_70px_rgba(11,23,40,0.09)] md:px-10 md:py-14 lg:px-14"
  >
```

Keep all existing Services children inside this surface. Remove the featured row's full-bleed negative inset and use `rounded-lg bg-blue-tint/55` within the surface so it does not escape the container.

- [ ] **Step 2: Let Industries remain the open dark release**

Add top transition spacing to the existing Industries section without creating an outer panel:

```tsx
className="relative overflow-hidden bg-navy pb-20 pt-24 text-white md:pb-24 md:pt-32"
```

Keep its rows, dividers, and existing restrained blue illumination. Do not add `data-editorial-surface`.

- [ ] **Step 3: Group Process inside one premium panel**

Keep the heading column outside the surface. Wrap only the existing `<ol>`:

```tsx
<div
  data-editorial-surface="process"
  className="overflow-hidden rounded-lg border border-border bg-white px-6 shadow-[0_22px_64px_rgba(11,23,40,0.085)] md:px-8"
>
  <ol className="relative divide-y divide-border">…</ol>
</div>
```

Remove the `<ol>` top border and each row's bottom border because the wrapper owns the boundary and `divide-y` owns internal separation.

- [ ] **Step 4: Focus Founder on the portrait**

Insert this immediately inside the portrait wrapper, behind the frame:

```tsx
<div
  data-founder-glow
  className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_48%_48%,rgba(31,94,255,0.22),transparent_68%)]"
  aria-hidden="true"
/>
```

Keep Founder open and retain its existing portrait frame and copy hierarchy.

- [ ] **Step 5: Bridge Founder into Fit with one elevated surface**

Use a light-gray section field and wrap the existing heading plus comparison grid together:

```tsx
<section className="relative bg-gray-light pb-24 pt-20 md:pb-28 md:pt-24" aria-labelledby="fit-heading">
  <div
    data-editorial-surface="fit"
    className="section-shell relative rounded-lg border border-border bg-white px-5 py-10 shadow-[0_24px_72px_rgba(11,23,40,0.10)] md:-mt-10 md:px-10 md:py-14 lg:px-14"
  >
```

Preserve the existing heading and two-column comparison. Replace the grid's outer `border-y` with a single `rounded-lg border border-border bg-gray-light/60 px-5 md:px-8`, retaining only the internal column divider.

- [ ] **Step 6: Keep FAQ open with one unified accordion container**

Change FAQ to white. Keep its heading column open and wrap only the question rows:

```tsx
<div
  data-editorial-surface="faq"
  className="overflow-hidden rounded-lg border border-border bg-gray-light/70 px-5 shadow-[0_16px_46px_rgba(11,23,40,0.06)] md:px-7"
>
  {questions.map(/* existing rows */)}
</div>
```

Remove the accordion's outer top border; keep row separators and interaction behavior unchanged.

- [ ] **Step 7: Strengthen the Contact destination transition**

Add a thin top highlight and modestly increased top padding to FinalCTA:

```tsx
className="relative overflow-hidden border-t border-white/10 bg-navy pb-20 pt-24 text-white md:pb-28 md:pt-32"
```

Keep the existing form as the only elevated surface in Contact.

- [ ] **Step 8: Run the desktop contract and lint**

Run: `npm test && npx eslint components/sections/Services.tsx components/sections/Industries.tsx components/sections/Process.tsx components/sections/Founder.tsx components/sections/GoodFit.tsx components/sections/FAQ.tsx components/sections/FinalCTA.tsx`

Expected: tests pass only after the desktop contributes exactly four surface markers and one founder glow; lint exits with no diagnostics.

- [ ] **Step 9: Commit the desktop composition**

```bash
git add components/sections/Services.tsx components/sections/Industries.tsx components/sections/Process.tsx components/sections/Founder.tsx components/sections/GoodFit.tsx components/sections/FAQ.tsx components/sections/FinalCTA.tsx
git commit -m "feat: add editorial depth to desktop sections"
```

### Task 3: Compose Mobile Section Depth

**Files:**
- Modify: `components/mobile/MobileServices.tsx`
- Modify: `components/mobile/MobileIndustries.tsx`
- Modify: `components/mobile/MobileProcess.tsx`
- Modify: `components/mobile/MobileFounder.tsx`
- Modify: `components/mobile/MobileFit.tsx`
- Modify: `components/mobile/MobileFAQ.tsx`
- Modify: `components/mobile/MobileContact.tsx`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Existing mobile state and section markup.
- Produces: Four mobile `data-editorial-surface` elements, one mobile `data-founder-glow`, open dark anchors, and phone-safe shallow overlaps.

- [ ] **Step 1: Give Mobile Services one elevated surface**

Change the section to `className="m-section bg-gray-light"`. Place the existing heading, tabs, selected service content, and reassurance copy inside:

```tsx
<div
  data-editorial-surface="services"
  className="m-shell rounded-lg border border-border bg-white px-5 py-7 shadow-[0_16px_42px_rgba(11,23,40,0.08)]"
>
```

Do not create cards inside the selected service panel.

- [ ] **Step 2: Keep Mobile Industries open**

Retain its navy full-width section and horizontal swipe behavior. Increase top spacing only enough to receive the Services transition; do not add an editorial surface marker or another outer card.

- [ ] **Step 3: Group Mobile Process steps**

Keep the heading in the open section shell. Wrap the accordion list in:

```tsx
<div
  data-editorial-surface="process"
  className="mt-7 overflow-hidden rounded-lg border border-border bg-white px-4 shadow-[0_14px_38px_rgba(11,23,40,0.075)]"
>
```

Remove the list's outer top border and preserve every accordion button and `aria-expanded` relationship.

- [ ] **Step 4: Add a restrained Mobile Founder portrait glow**

Inside the portrait's relative wrapper, before the image frame, add:

```tsx
<div
  data-founder-glow
  className="pointer-events-none absolute -inset-5 bg-[radial-gradient(circle_at_50%_42%,rgba(31,94,255,0.20),transparent_70%)]"
  aria-hidden="true"
/>
```

Keep the dark section open and do not wrap all Founder content in a panel.

- [ ] **Step 5: Elevate Mobile Fit as one decision surface**

Change the section field to `bg-gray-light`, then wrap the current heading, tabs, and criteria list in:

```tsx
<div
  data-editorial-surface="fit"
  className="m-shell relative -mt-5 rounded-lg border border-border bg-white px-5 py-7 shadow-[0_18px_48px_rgba(11,23,40,0.095)]"
>
```

Keep tab state, copy, and criteria rows unchanged.

- [ ] **Step 6: Unify Mobile FAQ without carding questions**

Keep the heading open. Wrap only the accordion rows:

```tsx
<div
  data-editorial-surface="faq"
  className="mt-7 overflow-hidden rounded-lg border border-border bg-gray-light/75 px-4 shadow-[0_12px_34px_rgba(11,23,40,0.055)]"
>
```

Remove the list's outer top border and retain row dividers.

- [ ] **Step 7: Preserve Mobile Contact as the dark destination**

Add a restrained top border and tune top spacing without wrapping the section:

```tsx
<section id="m-contact" className="m-section border-t border-white/10 bg-navy text-white">
```

Keep the existing fields and submit control unchanged.

- [ ] **Step 8: Run the complete contract and lint**

Run: `npm test && npx eslint components/mobile/MobileServices.tsx components/mobile/MobileIndustries.tsx components/mobile/MobileProcess.tsx components/mobile/MobileFounder.tsx components/mobile/MobileFit.tsx components/mobile/MobileFAQ.tsx components/mobile/MobileContact.tsx`

Expected: all tests pass, including exactly four mobile editorial surfaces and one founder glow; lint exits with no diagnostics.

- [ ] **Step 9: Commit the mobile composition**

```bash
git add components/mobile/MobileServices.tsx components/mobile/MobileIndustries.tsx components/mobile/MobileProcess.tsx components/mobile/MobileFounder.tsx components/mobile/MobileFit.tsx components/mobile/MobileFAQ.tsx components/mobile/MobileContact.tsx
git commit -m "feat: add editorial depth to mobile sections"
```

### Task 4: Holistic Full-Page Art-Direction Pass

**Files:**
- Modify if visual evidence requires: the section files listed in Tasks 2 and 3
- Verify: `app/page.tsx`
- Verify: `components/mobile/MobileExperience.tsx`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: Completed desktop and mobile compositions.
- Produces: Final full-scroll rhythm with no repetitive, isolated, or disproportionately loud section.

- [ ] **Step 1: Run production verification**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, ESLint reports no errors, and Next.js emits the static `/` route.

- [ ] **Step 2: Capture full-page mobile compositions**

Start the app with `npm run dev -- --port 3002`. At 320×700, 375×812, and 430×900, capture complete-page screenshots and verify:

- one dominant focal point per viewport;
- no horizontal overflow or clipped shadows;
- shallow overlaps do not collide with headings or the fixed action bar;
- Services, Process, Fit, and FAQ read as unified surfaces;
- Industries, Founder, and Contact remain open dark pauses.

- [ ] **Step 3: Capture full-page desktop compositions**

At 768×1024, 1280×800, and 1440×1000, capture complete-page screenshots and verify the same hierarchy plus consistent shell alignment and intentional negative space.

- [ ] **Step 4: Tune the complete scroll based on evidence**

For every issue found, change only the responsible section class. Allowed corrections are spacing, overlap amount, background tint, border opacity, shadow softness, glow strength, and local padding. Do not change content, type sizes, component order, or interaction code. Re-run `npm test` after each correction batch.

- [ ] **Step 5: Re-capture mobile and desktop after tuning**

Repeat the 375×812 and 1440×1000 complete-page captures. Confirm no section repeats its neighbor's treatment without purpose, no section feels detached, and no secondary surface competes with the intended focal point.

- [ ] **Step 6: Inspect the final repository diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only intended section/test files are modified; `0721.mp4` remains untracked and untouched.

- [ ] **Step 7: Commit holistic tuning if needed**

```bash
git add components/sections components/mobile tests/presentation-quality.test.mjs
git commit -m "fix: tune full-page editorial rhythm"
```

If visual QA required no additional source changes, skip this commit rather than creating an empty commit.
