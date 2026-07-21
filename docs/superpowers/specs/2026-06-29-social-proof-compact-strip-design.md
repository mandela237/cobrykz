# SocialProof — Compact Stats Strip

**Date:** 2026-06-29  
**Status:** Approved by user  
**File:** `components/sections/SocialProof.tsx`

---

## Problem

The current SocialProof section uses `text-[80px]` for the 5.0 score and a two-column desktop layout that collapses into a full viewport height on mobile. It dominates the page when it should be a supporting element.

## Solution

Replace the entire section with a single compact horizontal bar — ~64px tall — showing 4 stats side by side with thin dividers.

---

## Visual

```
┌──────────────────────────────────────────────┐
│  ★ 5.0  │  10+  │  5+   │  12+              │
│  Rating  │ Indus.│ Years │ Projects          │
└──────────────────────────────────────────────┘
```

---

## Container

- `<section>` with `id="social-proof"` and `aria-label="Trust indicators"`
- `bg-[#080E1C] border-y border-white/[0.06] py-3.5`
- Inner: `max-w-7xl mx-auto px-6 flex items-center justify-between`

---

## Four Stat Items

All four in a single flex row, `justify-between`.

### Item 1 — Client Rating
- Top line: `★` (SVG, `fill="#2563EB"`, 12×12) + space + `5.0` — `text-[18px] font-black text-white`
- Bottom line: `Client Rating` — `text-[9px] font-medium uppercase tracking-[0.08em] text-white/35`

### Item 2 — Industries Served
- Top line: `10+` — `text-[18px] font-black text-white`
- Bottom line: `Industries` — `text-[9px] font-medium uppercase tracking-[0.08em] text-white/35`

### Item 3 — Years Building
- Top line: `5+` — `text-[18px] font-black text-white`
- Bottom line: `Years Building` — `text-[9px] font-medium uppercase tracking-[0.08em] text-white/35`

### Item 4 — Projects Delivered
- Top line: `12+` — `text-[18px] font-black text-white`
- Bottom line: `Projects` — `text-[9px] font-medium uppercase tracking-[0.08em] text-white/35`

---

## Dividers

Three vertical dividers between items: `<div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />`

---

## What is Removed

- `CountUp` animated component and all its hooks (`useState`, `useEffect`, `useRef`, `useInView`)
- `"use client"` directive — component becomes a server component
- All imports: `useEffect`, `useRef`, `useState` from react; `useInView` from framer-motion
- `StatItem` interface
- The `supportingStats` array
- The two-column desktop grid layout

---

## What Does NOT Change

- Section `id="social-proof"` (nav anchor)
- `aria-label="Trust indicators"`
- The four stat values: 5.0, 10+, 5+, 12+
- Background color family (`#080E1C` is consistent with site dark palette)
