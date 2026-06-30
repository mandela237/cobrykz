---
name: COBRYKZ
description: Premium websites and digital systems that help local businesses compete at the highest level
colors:
  conviction-blue: "#2563EB"
  conviction-blue-dark: "#1D4ED8"
  display-accent: "#3B82F6"
  midnight-foundation: "#0F172A"
  footer-void: "#0A0F1C"
  deep-dark: "#060C1A"
  pitch-dark: "#080E1C"
  ink-surface: "#1E293B"
  muted-ink: "#64748B"
  ghost-ink: "#94A3B8"
  clean-surface: "#F8FAFC"
  subtle-surface: "#F1F5F9"
  trust-tint: "#EFF6FF"
  day-border: "#E2E8F0"
  pure-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3.625rem, 8vw, 7rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.375rem)"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(0.8125rem, 1.5vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.conviction-blue}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.conviction-blue-dark}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ghost-ink}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  input-default:
    backgroundColor: "#08111F"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  industry-tag:
    backgroundColor: "#0B1426"
    textColor: "{colors.ghost-ink}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
---

# Design System: COBRYKZ

## 1. Overview

**Creative North Star: "The Contender's Pitch"**

COBRYKZ is a one-person agency that builds websites for local businesses who feel outmatched by their competition. The design reflects that reality: this is not a brand that whispers; it is a brand that walks into a dark room and commands it. Every section is a round in a bout — the visitor arrives skeptical, and leaves convinced. Not because of claims, but because the site itself is the proof. The site's one job is to convert a skeptical visitor into a booked discovery call; nothing exists on the page that doesn't serve that goal.

The palette is deep-night dark for approximately 70% of the page, cut through by a single electric blue that appears only where something demands attention. Density is calibrated: light sections (Services, WhyCOBRYKZ, FAQ) give the eye a moment of air; dark sections build authority. The founder's portrait is not an asset — it is the hero. The site frames Mandela Atud, not a brand character; the headline says COMPETE and means it.

This system explicitly rejects three aesthetics. **Big-agency corporate sites** (stock photos of handshakes, vague mission statements, cold and impersonal — nothing that feels like a real person is behind it). **Generic SaaS / startup templates** (cream body backgrounds, hero-metric dashboards, identical card grids, eyebrows on every section — the saturated AI scaffold). **Over-animated portfolio showpieces** (motion that competes with content, style that overshadows the founder's message). If it could be a Squarespace template, it is wrong. If the motion feels like a design demo, it is wrong.

**Key Characteristics:**
- Dark-dominant: ~70% of sections are deep-navy or near-black
- Single accent color (Conviction Blue) applied with severe restraint — less than 10% of any surface
- Portrait-anchored: the founder's face appears in both hero breakpoints and the Founder section
- Proof-first: every bold claim (timelines, Lighthouse scores, real testimonials) has visible evidence directly beneath it
- One typeface, zero decorative flourish — all hierarchy carried through weight and size alone
- Film-grain texture across all surfaces for premium material feel without glassmorphism

---

## 2. Colors: The Deep Night Palette

A near-monochrome dark system held together by one high-stakes accent.

### Primary
- **Conviction Blue** (`#2563EB`): The site's only significant accent. Used on primary CTAs, nav link hover underlines, icon badge backgrounds, and interactive highlights. Its rarity is its authority — appearing on less than 10% of any dark section surface, it reads as a command, not decoration.
- **Conviction Blue Dark** (`#1D4ED8`): Hover state for all primary buttons. Provides tactile depth — the transition from Conviction Blue to Conviction Blue Dark is the system's physical "press."
- **Display Accent** (`#3B82F6`): Used exclusively on the hero display headline ("COMPETE"). Slightly lighter than Conviction Blue — at 80–112px and 900 weight, the full-saturation version would read as too heavy; this offsets perceived weight while maintaining spectacle. Prohibited on interactive elements.

### Secondary
- **Indigo Aurora** (`#6366F1`): Never applied as a solid surface or text color. Present only as the secondary layer in ambient radial-gradient backgrounds across all dark sections — paired with Conviction Blue to create a blue-indigo atmospheric tension that prevents dark backgrounds from reading as flat black. A texture, not a color.

### Neutral
- **Midnight Foundation** (`#0F172A`): The brand's navy anchor. Default body text color on light sections; background for Industries, Founder, and FinalCTA sections. The stable, mid-dark reference point for the entire palette.
- **Pitch Dark** (`#080E1C`): Hero desktop and Process section background. Slightly cooler and deeper than Midnight Foundation — creates visual hierarchy between sections without a visible divider.
- **Deep Dark** (`#060C1A`): SocialProof and Testimonials section backgrounds. Sits between Pitch Dark and Hero Mobile's void for the darkest recurring section background.
- **Footer Void** (`#0A0F1C`): Footer background. The deepest permanent surface — grounds the page below the contact section.
- **Ink Surface** (`#1E293B`): Card and container surfaces within dark sections. Sits four to five tonal steps above the surrounding section backgrounds; visible as a distinct surface without requiring a border.
- **Muted Ink** (`#64748B`): Supporting body text and secondary labels on light sections. Medium-contrast slate.
- **Ghost Ink** (`#94A3B8`): Placeholder text, supplementary captions, dimmed labels. Never used as primary readable text.
- **Clean Surface** (`#F8FAFC`): Light section backgrounds (Services, OurStandard). Near-white with a faint cool cast — not a warm or cream tint.
- **Subtle Surface** (`#F1F5F9`): FAQ accordion open-state panels, hover surfaces on light cards.
- **Trust Tint** (`#EFF6FF`): Background tint on FAQ open-state and trust-signal chips. The system's lightest blue reference — connects these surfaces to Conviction Blue without saturating.
- **Day Border** (`#E2E8F0`): Dividers on light sections. Barely visible on Clean Surface — purely structural.
- **Pure White** (`#FFFFFF`): Default page background; base for light sections between the dark ones.

### Named Rules
**The One Signal Rule.** Conviction Blue is prohibited on more than 10% of any visible surface. Its function is to mark what demands action. Dilute it and the entire system loses its authority — it becomes decoration instead of command.

**The Warm-Less Rule.** There are no warm-tinted neutrals in this system. Every neutral leans cool or stays at zero chroma. Warmth in this brand is communicated through the founder's photography and voice, not through background color. Never use a cream, sand, or warm-paper bg tone.

---

## 3. Typography

**Font:** Geist Sans (loaded via `next/font/google` as `--font-geist-sans`), with `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif` as fallback.

**Character:** A modern geometric sans that reads engineered without feeling cold. Its tight spacing at heavy weights makes headlines feel precise and deliberate, while its regular-weight body copy stays approachable. One family carries everything; the contrast axis is weight (400 → 900) and size alone.

### Hierarchy

- **Display** (900 weight, `clamp(3.625rem, 8vw, 7rem)`, line-height 0.86, tracking −0.035em): Reserved for the hero display word "COMPETE." Letters read as three-dimensional objects at this size and weight — enhanced with a `text-shadow` stack simulating physical depth. One instance per page.
- **Headline** (800 weight, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.1, tracking −0.04em): Section h2 headings. Very tight tracking makes headlines feel dense and edited. `text-wrap: balance` applied universally to prevent orphan lines.
- **Title** (700 weight, `clamp(1rem, 2vw, 1.375rem)`, line-height 1.35, tracking −0.02em): Card titles, step titles, callout headers (h3 level). The bridge between headline authority and body legibility.
- **Body** (400 weight, `clamp(0.8125rem, 1.5vw, 1rem)`, line-height 1.75 on dark / 1.8 on light): Paragraph copy. Maximum container width ~420px on desktop (approximately 65–70ch at base size). On dark backgrounds, line-height tightens slightly (1.65–1.75); on light backgrounds, it opens to 1.75–1.85 for reading ease.
- **Label** (700 weight, `11px` fixed, line-height 1, tracking +0.12em, uppercase): Used for ordered act labels (Founder section's 5-act story), step metadata, and structural anchors. Not applied as an eyebrow on every section — only where content is truly part of a named sequence.

### Named Rules
**The Single Voice Rule.** One typeface, no ornament. Geist Sans from the smallest 11px label to the largest 112px display headline. No display serif, no script accent, no mono overlay. Weight and size are the only variables.

**The Weight Ceiling Rule.** Display weight (900 / black) is used for exactly one element: the hero display word. Section headlines are 800 (extrabold), not 900. Exceeding this would collapse the hierarchy — the display word loses its primacy when everything else is also black.

---

## 4. Elevation

This system is flat-by-architecture. There is no shadow vocabulary on section containers, cards at rest, or text elements. Depth is communicated through two mechanisms: **tonal layering** (stacking progressively lighter dark surfaces on deeper dark backgrounds) and the **aurora ambient system** (dual-color radial gradients positioned at section edges, simulating atmospheric light from off-screen sources).

The five dark surface levels, deepest to lightest:
1. `#060C1A` / `#06090F` — SocialProof, Testimonials, Hero mobile
2. `#080E1C` — Hero desktop, Process
3. `#0A0F1C` — Footer
4. `#0F172A` — Industries, Founder, FinalCTA (navy)
5. `#0B1426` / `#08111F` — Card surfaces within dark sections, readable only against their darker parent

Box shadows appear in exactly two contexts: (a) the three floating hero cards (`0 8px 24px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)`) that are physically elevated above the portrait; and (b) primary CTA buttons (`0 4px 20–28px rgba(37,99,235,0.35–0.42)`) where a colored glow beneath the button face makes it feel pressable rather than flat.

### Shadow Vocabulary

- **CTA Glow** (`0 4px 20px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.06)`): Primary CTA buttons. The Conviction Blue outer glow creates a light source beneath the button face; the inset highlight adds the sense of a curved front face.
- **Floating Card** (`0 8px 24px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)`): The three hero ambient cards. Grounds elevated elements above the portrait plane.
- **Step Card** (`0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)`): Process step cards and form containers. Outer pixel-wide stroke + inset top highlight — the appearance of depth without any blur.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Box shadows appear only on elements that are physically above the surface (floating cards, elevated CTAs). A card sitting on a dark section background never gets a shadow — the tonal contrast between card and background provides all separation needed.

---

## 5. Components

### Buttons

The most important interactive element. Every primary CTA uses the same treatment across all 13 sections.

- **Shape:** Gently rounded rectangle (12px radius). Not a pill — pills read as SaaS filter chips. Not square — square reads as corporate form fields. 12px is confident and modern without demanding attention.
- **Primary:** Conviction Blue (`#2563EB`) background, pure white text, 14px / 600-weight, `14px 28px` padding on desktop, `12px 20px` on mobile. CTA Glow shadow. Hover: Conviction Blue Dark (`#1D4ED8`), 150ms ease.
- **Shimmer on Hover:** A `rgba(255,255,255,0.14)` diagonal sweep (`btn-shimmer`, 0.55s ease-out) crosses the button face on hover — subtle, perceptible, physical.
- **Active State:** `scale(0.97–0.99) translateY(1–2px)` on `:active`. The button presses into the surface.
- **Ghost / Text Link:** White/70% text, no background, no border. Arrow `→` shifts 2px right on hover. Used for secondary CTAs sharing a row with a primary button.

### Industry Tags / Chips

18-item centered tag cloud in the Industries section. Contrast with rectangular buttons signals "browse/discover" vs. "act."

- **Shape:** Full pill (9999px radius).
- **Surface:** `rgba(11,20,38,0.90)`, `1px solid rgba(255,255,255,0.14)`. Hover: `#0E1A30` bg, `rgba(255,255,255,0.22)` border.
- **Content:** 6px Conviction Blue dot (flex-shrink: 0) + 13px / 500-weight text at `rgba(255,255,255,0.75)`.
- **Entrance:** Scale 0.85 → 1 stagger per tag, 0.04s delay, ease [0,0,0.2,1].

### Process Step Cards

2×2 (mobile) / 1×4 (desktop) grid of 4 step cards.

- **Shape:** 16px radius, `rgba(11,20,38,0.90)` bg, `1px solid rgba(255,255,255,0.12)` border. Step Card shadow.
- **Hover:** Background to `#0E1A30`, border to `rgba(255,255,255,0.20)`, top-edge blue gradient stripe (`linear-gradient(90deg, transparent, rgba(37,99,235,0.7), transparent)` at 1px height) reveals. Conveys interactivity without motion.
- **Decorative BG Number:** 80–96px, 900-weight, `rgba(255,255,255,0.028)` — barely visible watermark behind content, adds textural depth.
- **Duration Badge:** Pill chip inside each card — light blue text (`#60A5FA`), blue-tinted background (`rgba(37,99,235,0.12)`), blue border (`rgba(37,99,235,0.20)`), 10px / 600-weight.

### Form Inputs

Contact form in the FinalCTA section.

- **Style:** Stroke input — `1px solid rgba(255,255,255,0.16)` border, `#08111F` background, 14px / 400-weight, placeholder at `rgba(255,255,255,0.50)`.
- **Focus:** Border to `rgba(59,130,246,0.70)`, background to `#060D19`, `2px ring rgba(37,99,235,0.20)`. The border-plus-ring combination reads on both dark and low-contrast monitors.
- **Radius:** 12px — matches button radius for visual consistency across the form container.
- **Labels:** 12px / 600-weight at `rgba(255,255,255,0.75)`.
- **Required Marker:** `#DC2626` asterisk, `aria-hidden="true"` — the HTML `required` attribute carries the semantic signal; the visible asterisk is purely visual.

### Navigation

- **Surface:** `rgba(7,16,31,0.94–0.98)` with `backdrop-filter: blur(20px)` — the one intentional blur in the system. Justified for the fixed-position navbar because it separates navigation from content below without a hard opaque border that would feel heavy.
- **Links:** 13–14px / 500-weight at `rgba(255,255,255,0.80)`. Hover: full white + blue underline expands from center (`.nav-underline` utility: `left/right: 50% → 12px` transition at 200ms ease).
- **CTA:** Same button-primary treatment, fixed to the right of the desktop nav.
- **Mobile Overlay:** Full-viewport Midnight Foundation (`#0F172A`) slide-in, z-index 40. Links at 18–20px / 600-weight, centered.

### Floating Glass Cards (Signature Component)

Three ambient cards positioned over the hero portrait on desktop (Performance 100, Satisfaction 5.0, Site Launched). The most distinctive component in the system.

- **Surface:** `rgba(8,17,31,0.95)` — a translucent dark panel that reads against the portrait. `1px solid rgba(255,255,255,0.18)` border. Floating Card shadow.
- **Motion:** Each card oscillates on an independent infinite `y: [0, -9, 0]` path (easeInOut) at 3.8–4.4s periods with staggered delays. They never move in unison — the desynchronized float creates organic, living depth.
- **Entrance:** Scale 0.88 → 1.0 + directional translate from outside viewport, staggered at 0.9s / 1.05s / 1.2s from page load.
- **Content:** A number, a label, a supporting visual (bar segments, star icons, or status dot). No explanatory copy. Each card reads in under one second.

---

## 6. Do's and Don'ts

### Do:
- **Do** use Conviction Blue on less than 10% of any dark section surface. Its rarity is its command — the moment it appears, the eye knows to act.
- **Do** frame the founder's portrait as the primary hero element. Mandela's face, name, and direct voice appear as first-class design decisions across hero, Founder, and FinalCTA sections.
- **Do** back every bold claim with immediate, visible evidence. "Done in 1–2 weeks" must be followed by the step-by-step proof within the same section. Assertion without evidence reads as bluster.
- **Do** use the dual-color aurora system on every dark section: Conviction Blue (`rgba(37,99,235,...)`) as the primary bloom + Indigo Aurora (`rgba(99,102,241,...)`) as the secondary. Single-color glows read flat.
- **Do** apply `text-wrap: balance` to all h2 headlines across the site.
- **Do** include the CTA Glow box-shadow on every primary button — it is what makes buttons feel "tactile and decisive" rather than flat colored rectangles.
- **Do** keep motion to ease `[0.0, 0.0, 0.2, 1.0]` and entrance durations of 0.4–0.65s. Faster feels cheap; slower feels broken.
- **Do** include the `body::after` film-grain overlay (SVG fractalNoise at `opacity: 0.042`, `mix-blend-mode: overlay`, `background-size: 200px 200px`). It is the texture separating premium dark from flat dark.
- **Do** respect `prefers-reduced-motion` — all animations collapse to `0.01ms` duration; content must be fully visible without any transitions firing.

### Don't:
- **Don't** use cream, warm-tinted, or sand-toned backgrounds. This is the generic SaaS/startup template anti-reference by name — the saturated AI scaffold. Light sections in this system use Cool Surface (`#F8FAFC`) or Pure White — no warm paper tones.
- **Don't** use stock photography of handshakes, office teams, or abstract hero illustrations. This is the big-agency corporate anti-reference verbatim. Real photography of the real founder is mandatory; everything else is a placeholder.
- **Don't** add eyebrow kickers above every section heading. The tracked-caps "PROCESS / PRICING / ABOUT" label above every h2 is the 2023-era AI scaffold. In this system, labels appear only where content is an ordered sequence (Founder's 5-act story, Process step cards). One deliberate kicker is voice; an eyebrow on every section is grammar.
- **Don't** add animation that competes with content. All motion in this system is entrance-only or ambient float — never looping decorative effects, text typewriter animations, or scroll-hijacking parallax. This is the over-animated portfolio anti-reference verbatim.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). The hero display headline achieves its 3D presence through a solid `#3B82F6` color plus a `text-shadow` depth stack — that is the correct and correct-only approach.
- **Don't** use glassmorphism decoratively. The only blur in the system is the navbar's `backdrop-filter: blur(20px)`, which is structurally justified. Cards on dark sections are opaque dark panels with inset highlights — no blur, no frosted glass.
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe on cards, list items, or callouts. Rewrite with background tints, full borders, leading icons, or numbered decorators.
- **Don't** build identical card grids — the same icon + heading + text layout repeated in a 3-column grid. Every section in this system uses a distinct layout: editorial featured card, stacked editorial rows, bordered vertical list, 2×4 step grid, tag cloud, accordion. Repetition of the same card shape is the SaaS cliché.
- **Don't** add a section because it seems expected. Every section earns its place by moving the visitor closer to booking a discovery call. If it doesn't build trust, prove quality, or lower an objection, it should not exist.
