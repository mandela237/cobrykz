# HeroMobile Film Poster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `HeroMobile.tsx` as a Film Poster composition where Mandela Atud's portrait fills 100dvh as the background, atmospheric gradient layers create cinematic depth, glass cards float at shoulder level, and the text block anchors to the bottom — everything visible in one viewport, nothing stacking off-screen.

**Architecture:** Single `"use client"` component. Portrait is `position: absolute; inset: 0` at z-0, filling the full viewport. Five gradient divs layer atmospheric depth at z-1. Two glassmorphism cards and a name badge float at z-20 (shoulder zone, 35–68% from top). Text block is `position: absolute; bottom: 0; inset-x: 0` at z-10 with full viewport width. All children are absolutely positioned — the container needs no padding offset.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, Tailwind CSS v4, Framer Motion 12.42.0, Next.js `<Image>` with `fill` prop.

## Global Constraints

- `"use client"` directive required — Framer Motion runs client-side
- `height: 100dvh` via inline style — NOT `h-screen`, handles mobile browser chrome correctly
- Portrait crop: `object-cover object-[50%_10%]` — anchors 10% from top of source image (shows face and shoulders, NOT ceiling)
- Brand colors locked: `#06090F` (background), `#2563EB` (blue accent), `#1a3e9e` (button shadow)
- No fabricated testimonials, fake client names, or invented metrics
- No Calendly — CTA links to `#contact` (custom form section)
- Stacking order: portrait z-0, gradients z-1, text z-10, cards z-20
- Do NOT modify `HeroDesktop.tsx` or `Hero.tsx`
- Dev server runs from `cobrykz/` with `npm run dev`, available at http://localhost:3000

---

### Task 1: Portrait Shell — Viewport-Filling Background

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx` (complete rewrite)

**Interfaces:**
- Produces: root `<div>` at `height: 100dvh`, `overflow: hidden`, `position: relative`, `bg-[#06090F]`, containing a `motion.div` with `<Image fill>` at `absolute inset-0 z-0`, crop `object-cover object-[50%_10%]`, fade-in entrance animation

- [ ] **Step 1: Write the portrait shell to `cobrykz/components/sections/HeroMobile.tsx`**

Overwrite the entire file with:

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const glass =
  "backdrop-blur-xl bg-white/[0.06] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.65),0_3px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.18)]";

export default function HeroMobile() {
  return (
    <div
      className="relative bg-[#06090F] overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Portrait — fills entire viewport as background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.85, ease },
          scale: { duration: 0.85, ease },
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mandela-portrait.jpg"
            alt="Mandela Atud — Founder & CEO, COBRYKZ"
            fill
            priority
            className="object-cover object-[50%_10%]"
            sizes="100vw"
          />
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify portrait fills full viewport with correct crop**

Open http://localhost:3000 in DevTools mobile emulation (iPhone 14 — 390×844).
Expected:
- Mandela's face and shoulders are prominent and centered
- No ceiling or top-of-room visible
- Portrait fills edge-to-edge, top-to-bottom (no letterboxing, no white areas)
- Dark background `#06090F` fades in briefly before image loads

---

### Task 2: Atmospheric Gradient Layers

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx`

**Interfaces:**
- Consumes: portrait shell (Task 1) — `motion.div` at z-0
- Produces: 5 overlay divs at z-1 creating: blue ambient bloom at top, left/right edge fades, cinematic dark canvas at bottom 65%, directional lighting overlay, dot-grid texture

- [ ] **Step 1: Add gradient layers after the portrait `motion.div`, inside the root div**

Insert before the closing `</div>` of the root:

```tsx
      {/* ── Atmospheric depth layers (all z-[1], pointer-events-none) ── */}

      {/* 1. Blue ambient bloom — simulates studio light from above */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 110% 48% at 50% 0%, rgba(37,99,235,0.20) 0%, transparent 55%)",
        }}
      />

      {/* 2. Left edge fade — portrait bleeds naturally into dark bg */}
      <div
        className="absolute inset-y-0 left-0 w-10 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, #06090F, transparent)" }}
      />

      {/* 3. Right edge fade */}
      <div
        className="absolute inset-y-0 right-0 w-10 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to left, #06090F, transparent)" }}
      />

      {/* 4. Cinematic bottom gradient — dark canvas for text section */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, #06090F 0%, #06090F 35%, rgba(6,9,15,0.97) 52%, rgba(6,9,15,0.72) 66%, transparent 82%)",
        }}
      />

      {/* 5. Directional lighting overlay — light from upper-left creates 3D depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 42%, rgba(0,0,0,0.14) 100%)",
        }}
      />

      {/* 6. Dot grid texture — barely visible material texture */}
      <div
        className="absolute inset-0 dot-grid opacity-[0.15] z-[1] pointer-events-none"
        aria-hidden="true"
      />
```

- [ ] **Step 2: Verify atmospheric depth**

Refresh at http://localhost:3000 on mobile viewport.
Expected:
- Subtle blue glow at top of screen (like studio light from above)
- Portrait edges fade softly into the dark background
- Bottom 35% of screen is solid dark `#06090F` — clean canvas for text
- Upper-right corner slightly darker than upper-left (directional light effect)
- Portrait blends seamlessly into the dark bottom — no hard cutoff line

---

### Task 3: Floating Glass Cards and Name Badge

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx`

**Interfaces:**
- Consumes: `glass` const (defined at top of file) — shared card styles
- Produces:
  - Performance 100 card: `absolute z-20 right-4 top-[35%]`, slides in from right (delay 0.9s), floats `y: [0, -7, 0]` duration 4.2s
  - Client Rating 5.0 card: `absolute z-20 left-4 top-[45%]`, slides in from left (delay 1.05s), floats `y: [0, -7, 0]` duration 4.6s
  - Name badge: `absolute z-20 left-4 top-[68%]`, fades in (delay 1.2s)

- [ ] **Step 1: Add floating elements after the gradient divs, inside the root div**

Insert after the dot-grid `<div>`, before the closing `</div>` of the root:

```tsx
      {/* ── Floating glass card: Performance 100 — right shoulder zone ── */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.9, ease }}
        className="absolute z-20 right-4 top-[35%]"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className={`${glass} px-3 py-2.5`}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-[8px] font-bold uppercase tracking-wide text-white/45">
              Performance
            </span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[20px] font-black text-white leading-none">100</span>
            <span className="text-[8px] text-white/30">/100</span>
          </div>
          <div className="flex gap-0.5 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[2.5px] rounded-full bg-emerald-400/65"
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating glass card: Client Rating 5.0 — left shoulder zone ── */}
      <motion.div
        initial={{ opacity: 0, x: -16, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 1.05, ease }}
        className="absolute z-20 left-4 top-[45%]"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className={`${glass} px-3 py-2.5`}
        >
          <span className="text-[8px] font-bold uppercase tracking-wide text-white/45 block mb-1.5">
            Client Rating
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[20px] font-black text-white leading-none">5.0</span>
            <span className="text-[8px] text-white/30">/5</span>
          </div>
          <div className="flex gap-0.5 mt-1.5" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="8" height="8" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Name badge — lower-left, identifies Mandela ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 1.2 }}
        className="absolute z-20 left-4 top-[68%]"
      >
        <div
          className="bg-black/55 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          <p className="text-[11px] font-bold text-white leading-tight">Mandela Atud</p>
          <p className="text-[8px] text-white/40 tracking-[0.07em] uppercase mt-0.5">
            Founder & CEO · COBRYKZ
          </p>
        </div>
      </motion.div>
```

- [ ] **Step 2: Verify glassmorphism cards render correctly**

Refresh at http://localhost:3000 on mobile viewport.
Expected:
- Performance card appears at right side, ~35% down — shows "100" with green progress bars
- Client Rating card appears at left side, ~45% down — shows "5.0" with gold stars
- Name badge at left side ~68% down — "Mandela Atud" / "FOUNDER & CEO · COBRYKZ"
- Cards are SEMI-TRANSPARENT with blurred background visible through them (frosted glass)
- Cards do NOT look like solid white boxes — backdrop-blur must be visible
- Cards float up and down slowly at different speeds (4.2s vs 4.6s period)
- Lit top edge (bright inset shadow) and subtle dark bottom edge visible on cards

> **Note:** If cards look like white boxes, it means backdrop-filter isn't rendering. This can happen if the card has a fully-opaque ancestor. Verify the root div does not have `isolation: isolate` or `will-change` that blocks backdrop-filter.

---

### Task 4: Text Section (Bottom Anchor)

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx`

**Interfaces:**
- Consumes: gradient layers (Task 2) — the `#06090F` bottom canvas provides contrast for the text
- Produces: `absolute bottom-0 inset-x-0 z-10 px-6 pb-10` container with:
  - Eyebrow: blue dash + "PREMIUM DIGITAL SOLUTIONS" at 10px
  - Headline: "Your Business Deserves to" (13px, white/30) / "COMPETE" (68px, #2563EB, 3D shadow) / "at the Highest Level." (13px, white/30)
  - Body: 14px, white/50, max-w-[270px]
  - Primary CTA: "Book a Discovery Call" → `#contact`, 3D bottom-face box-shadow
  - Secondary CTA: "Our work →" text link
  - Trust row: 4 avatar initials + "Trusted across 10+ industries"
  - All elements staggered motion entrance (delays 0.2s → 0.7s)

- [ ] **Step 1: Add text section after the name badge, inside the root div**

Insert after the name badge `motion.div`, before the closing `</div>` of the root:

```tsx
      {/* ── Text — anchored to bottom of viewport ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-6 pb-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-3.5 h-px bg-[#2563EB]" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB]">
            Premium Digital Solutions
          </span>
        </motion.div>

        {/* Headline — 3D text-shadow on COMPETE gives letters physical thickness */}
        <div className="mb-4">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="block text-[13px] font-medium text-white/30 tracking-wide mb-0.5"
          >
            Your Business Deserves to
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
            className="block text-[68px] font-black leading-[0.86] tracking-[-0.05em] text-[#2563EB]"
            style={{
              textShadow: [
                "0 1px 0 rgba(0,50,170,0.55)",
                "0 2px 0 rgba(0,35,130,0.38)",
                "0 3px 0 rgba(0,22,90,0.22)",
                "0 6px 20px rgba(0,0,0,0.55)",
              ].join(", "),
            }}
          >
            COMPETE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.46, ease }}
            className="block text-[13px] font-medium text-white/30 tracking-wide mt-1"
          >
            at the Highest Level.
          </motion.span>
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.54, ease }}
          className="text-[14px] text-white/50 leading-[1.72] mb-6 max-w-[270px]"
        >
          Premium websites that help local businesses earn trust, attract
          better clients, and grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.62, ease }}
          className="flex items-center gap-4 mb-6"
        >
          {/* Primary — 3D bottom-face shadow makes button look pressable */}
          <a
            href="#contact"
            className="shimmer inline-flex items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150 active:scale-[0.97] active:translate-y-[2px]"
            style={{
              boxShadow: [
                "0 4px 0 #1a3e9e",
                "0 6px 22px rgba(37,99,235,0.42)",
                "inset 0 1px 0 rgba(255,255,255,0.12)",
              ].join(", "),
            }}
          >
            Book a Discovery Call
          </a>

          {/* Secondary */}
          <a
            href="#our-standard"
            className="text-white/35 hover:text-white/68 text-[12px] font-medium transition-colors duration-150 group inline-flex items-center gap-1"
          >
            Our work
            <span
              className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease }}
          className="flex items-center gap-2"
        >
          <div className="flex -space-x-1.5">
            {["MA", "LF", "RK", "JT"].map((init, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-[#334155] to-[#1E293B] border border-[#06090F] flex items-center justify-center text-[5px] font-bold text-white/50"
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.45)" }}
                aria-hidden="true"
              >
                {init}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-white/30">
            Trusted across 10+ industries
          </span>
        </motion.div>

      </div>
```

- [ ] **Step 2: Verify full film poster composition**

Refresh at http://localhost:3000 on mobile viewport (iPhone 14 — 390×844).
Expected:
- One unified composition: face fills background, cards float in shoulder zone, text sits at bottom
- COMPETE is 68px deep blue — visually has physical depth from layered shadow
- "Your Business Deserves to" and "at the Highest Level." are visibly dimmer (white/30) — they frame COMPETE without competing
- CTA button has visible bottom edge (darker `#1a3e9e` face) — looks pressable/3D
- Body copy is legible against the dark gradient canvas
- Everything fits in one viewport — no scrolling needed to see any element
- Trust row avatars overlap correctly with `-space-x-1.5`

---

### Task 5: Portrait Rotation Animation + Build Verification

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx`

**Interfaces:**
- Consumes: portrait `motion.div` from Task 1 (the one with `initial={{ opacity: 0, scale: 0.97 }}`)
- Produces: continuous `rotateY: [-0.6, 0.6, -0.6]` animation on portrait (duration 12s, repeat Infinity, delay 0.85s after entrance), verified TypeScript build passing

- [ ] **Step 1: Add rotateY to the portrait `motion.div` transition**

Find the portrait `motion.div` (first motion element in the file, wrapping the `<Image>`):

```tsx
// BEFORE:
<motion.div
  className="absolute inset-0 z-0"
  initial={{ opacity: 0, scale: 0.97 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    opacity: { duration: 0.85, ease },
    scale: { duration: 0.85, ease },
  }}
>
```

Replace with:

```tsx
// AFTER:
<motion.div
  className="absolute inset-0 z-0"
  initial={{ opacity: 0, scale: 0.97 }}
  animate={{
    opacity: 1,
    scale: 1,
    rotateY: [-0.6, 0.6, -0.6],
  }}
  transition={{
    opacity: { duration: 0.85, ease },
    scale: { duration: 0.85, ease },
    rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.85 },
  }}
  style={{ transformOrigin: "50% 50%" }}
>
```

- [ ] **Step 2: Verify rotation is subtle — "alive" not distracting**

Refresh at http://localhost:3000 on mobile viewport. Watch the portrait for 10+ seconds.
Expected: Portrait barely perceptibly shifts left/right over 12 seconds. The movement is felt, not seen — like a breathing quality. If the rotation is too noticeable, reduce to `[-0.3, 0.3, -0.3]`.

- [ ] **Step 3: Run TypeScript build to verify no errors**

In `cobrykz/`:
```
npm run build
```
Expected output ends with:
```
✓ Compiled successfully
Route (app)                              Size     First Load JS
...
```
No TypeScript errors, no missing module errors, no `ease` type assignment errors.

If you see `Type 'number[]' is not assignable to...` for the `ease` const, verify the top of the file has:
```tsx
const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];
```
The `as [number, number, number, number]` cast is required.

- [ ] **Step 4: Commit**

From `cobrykz/` directory:
```bash
git add components/sections/HeroMobile.tsx
git commit -m "feat: rewrite HeroMobile as film poster composition

Portrait fills 100dvh as background with object-[50%_10%] crop (face and shoulders).
Five atmospheric gradient layers create cinematic depth.
Glass cards float at shoulder level (Performance 100, Client Rating 5.0).
Name badge identifies Mandela at 68% from top.
Text anchors absolute bottom-0 with full viewport width.
COMPETE at 68px with layered 3D text-shadow.
Subtle portrait rotateY animation for alive presence."
```

> If git is not initialized in `cobrykz/`, run `git init && git add -A && git commit -m "initial"` first, then re-run the commit above.

---

## Final Visual QA Checklist

After all tasks complete, verify these on http://localhost:3000 at mobile viewport (390×844):

- [ ] Portrait shows face and shoulders — NOT ceiling, NOT blank sky
- [ ] Portrait fills edge-to-edge, top-to-bottom (no letterboxing)
- [ ] Blue ambient bloom visible at top of screen
- [ ] Cards look like frosted glass (not white boxes)
- [ ] Performance card at right, Client Rating at left — both floating
- [ ] Name badge "Mandela Atud / FOUNDER & CEO · COBRYKZ" visible
- [ ] COMPETE is 68px with visible 3D depth from text shadows
- [ ] CTA button has visible bottom-face shadow (pressable look)
- [ ] All content fits in one viewport at 390×844 — no cut-off
- [ ] Build passes with `npm run build`
- [ ] Desktop hero (HeroDesktop.tsx) is UNCHANGED — verify at full viewport width
