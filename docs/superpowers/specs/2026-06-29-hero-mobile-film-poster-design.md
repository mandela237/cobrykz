# COBRYKZ Mobile Hero — Film Poster Design
**Date:** 2026-06-29  
**Status:** Approved by user  
**File:** `components/sections/HeroMobile.tsx`

---

## Design Thesis

The mobile hero is a film poster. Mandela Atud's face and shoulders fill the entire viewport. Everything else — text, cards, CTA — layers above it. The portrait is not a card, not a section, not a container. It is the background of the entire screen.

---

## Layout

- **Container:** `height: 100dvh`, `overflow: hidden`, `pt-16` (64px navbar offset), `bg-[#06090F]`
- **Portrait:** `position: absolute`, `inset: 0`, `top: 64px` — fills full viewport below navbar
- **Image crop:** `object-cover object-[50%_10%]` — anchors 10% from top of source image so face and shoulders dominate, ceiling excluded
- **Text:** `position: absolute`, `bottom: 0`, `px-6 pb-10` — anchored to bottom of viewport
- **Cards:** `position: absolute`, `z-20` — float at 35–45% from top (shoulder zone)

```
┌─────────────────────────┐  ← top of viewport
│  [navbar 64px]          │
├─────────────────────────┤
│                         │  ← blue ambient bloom from top
│    [face & shoulders]   │  ← 10–55% of viewport
│                         │
│ [card L]    [card R]    │  ← 35–45%, floating cards
│                         │
│▓▓▓▓▓ gradient ▓▓▓▓▓▓▓▓│  ← 35–100%, cinematic dark gradient
│                         │
│  — PREMIUM DIGITAL —    │  ← eyebrow
│  Your Business          │
│  COMPETE                │  ← 68px, 3D text shadow
│  at the Highest Level.  │
│                         │
│  Body copy, 2 lines     │
│  [Book a Discovery Call]│  ← 3D bottom-face button
│  Our work →             │
│  ◉◉◉◉ Trusted 10+       │  ← trust row
└─────────────────────────┘  ← bottom of viewport
```

---

## Portrait & Atmosphere

### Image
- `src`: `/mandela-portrait.jpg`
- `fill`: true (requires positioned parent)
- `priority`: true (above fold)
- `object-fit`: cover
- `object-position`: `50% 10%` — shows face and shoulders

### Gradient Layers (applied in order, bottom to top of stack)

1. **Blue ambient bloom** — top of screen, simulates studio light above Mandela  
   `radial-gradient(ellipse 110% 48% at 50% 0%, rgba(37,99,235,0.20) 0%, transparent 55%)`

2. **Left edge fade**  
   `linear-gradient(to right, #06090F, transparent)` — width: `w-10`

3. **Right edge fade**  
   `linear-gradient(to left, #06090F, transparent)` — width: `w-10`

4. **Cinematic bottom gradient** — the main text canvas  
   `linear-gradient(to top, #06090F 0%, #06090F 35%, rgba(6,9,15,0.97) 52%, rgba(6,9,15,0.72) 66%, transparent 82%)`

5. **Directional lighting overlay** — light from upper-left, creates 3D depth illusion  
   `linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 42%, rgba(0,0,0,0.14) 100%)`

6. **Dot grid** — `dot-grid` CSS class, `opacity-15` — barely visible, adds material texture

### 3D Animation
- Subtle continuous portrait rotation: `rotateY: [-0.6, 0.6, -0.6]`, duration 12s, `ease: "easeInOut"`, repeat Infinity
- This is barely perceptible — creates "alive" feeling without being distracting
- Entrance: `opacity 0→1`, `scale 0.97→1`, duration 0.85s

---

## Floating Glass Cards

### Shared card style
```
backdrop-blur-xl
bg-white/[0.06]
rounded-2xl
shadow-[0_12px_36px_rgba(0,0,0,0.65), 0_3px_10px_rgba(0,0,0,0.4),
        inset_0_1px_0_rgba(255,255,255,0.12), inset_0_-1px_0_rgba(0,0,0,0.18)]
```
- Bright top inset shadow = lit surface facing upward
- Dark bottom inset shadow = shadow underneath
- Large outer shadow = elevated off the portrait surface

### Card 1 — Performance Score
- Position: `right-4`, `top-[35%]`
- Content: green dot + "Performance" label, "100" in 20px black, 5 green progress bars
- Float animation: `y: [0, -7, 0]`, duration 4.2s
- Entrance: slides in from right, delay 0.9s

### Card 2 — Client Rating
- Position: `left-4`, `top-[45%]`
- Content: "Client Rating" label, "5.0" in 20px black, 5 gold stars
- Float animation: `y: [0, -7, 0]`, duration 4.6s, delay offset 1.4s
- Entrance: slides in from left, delay 1.05s

### Name Badge
- Position: `left-4`, `top-[68%]`
- Style: `bg-black/55 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]`
- Content: "Mandela Atud" bold 11px + "FOUNDER & CEO · COBRYKZ" 8px uppercase
- Entrance: fade in, delay 1.2s

---

## Text Section

All elements use individual `motion.div` with `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`, staggered delays from 0.2s to 0.7s.

### Eyebrow
- `— PREMIUM DIGITAL SOLUTIONS` with left dash accent
- `text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB]`

### Headline
```
Your Business Deserves to     ← text-[13px] font-medium text-white/30
COMPETE                       ← text-[68px] font-black leading-[0.86] tracking-[-0.05em] text-[#2563EB]
at the Highest Level.         ← text-[13px] font-medium text-white/30
```

**COMPETE text-shadow (3D depth stack):**
```
0 1px 0 rgba(0,50,170,0.55)   ← first face layer
0 2px 0 rgba(0,35,130,0.38)   ← second face layer
0 3px 0 rgba(0,22,90,0.22)    ← third face layer
0 6px 20px rgba(0,0,0,0.55)   ← ambient drop shadow
```

### Body
- `text-[14px] text-white/50 leading-[1.72]`
- Max 2 lines: "Premium websites that help local businesses earn trust, attract better clients, and grow."

### CTAs
**Primary — Book a Discovery Call:**
- `bg-[#2563EB] hover:bg-[#1D4ED8]`
- `text-[14px] font-semibold px-6 py-3.5 rounded-xl`
- 3D bottom-face shadow: `0 4px 0 #1a3e9e, 0 6px 22px rgba(37,99,235,0.42), inset 0 1px 0 rgba(255,255,255,0.12)`
- `active:scale-[0.97] active:translate-y-[2px]` — button depresses on tap
- `.shimmer` class for hover sweep

**Secondary — Our work →:**
- Text link, `text-white/35 hover:text-white/68`

### Trust Row
- 4 avatar initials (MA, LF, RK, JT) with `-space-x-1.5` overlap
- `text-[10px] text-white/30` — "Trusted across 10+ industries"

---

## Technical Notes

- `"use client"` required — Framer Motion
- `height: 100dvh` not `h-screen` — handles mobile browser chrome correctly
- `overflow: hidden` on root — prevents any animation overflow
- Portrait `z-0`, cards `z-20`, text `z-10` — clear stacking order
- No `overflow: hidden` on the portrait motion div — separate inner div handles image clipping
- Entrance animations: portrait fades in first (0.85s), cards follow (0.9s, 1.05s), text staggers from 0.2s
- `prefers-reduced-motion`: honour via globals.css existing rule (already in codebase)

---

## What This Replaces

Previous `HeroMobile.tsx` had:
- Portrait constrained to `47dvh` section — felt like a box, not a background
- `object-top` crop — was showing ceiling, not face
- Glass cards with poor rendering — looked like white boxes
- Disconnected portrait/text sections

This design eliminates all three problems: portrait is the entire screen, crop is fixed with `50% 10%`, cards have proper glassmorphism, and portrait+text are one unified composition.
