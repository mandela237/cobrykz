---
name: COBRYKZ
description: Founder-led websites and practical digital systems for local businesses
colors:
  conviction-blue: "#1F5EFF"
  conviction-blue-dark: "#1748CC"
  deep-ink: "#0B1728"
  charcoal: "#132136"
  clean-surface: "#FFFFFF"
  cool-surface: "#F7FAFF"
  subtle-surface: "#EEF4FB"
  trust-tint: "#EAF2FF"
  day-border: "#DCE5F0"
  body-slate: "#53647A"
  evergreen: "#177B57"
  footer-void: "#081321"
typography:
  display: "Geist Sans"
  editorial-accent: "Playfair Display Italic"
  body: "Geist Sans"
rounded:
  control: "8px"
  surface: "8px"
  status: "9999px"
---

# COBRYKZ Design System

## Creative North Star

**The Clear Handshake**

COBRYKZ should feel like meeting a highly capable founder who explains the work
plainly, takes responsibility, and pays attention to the details. The experience
is premium because it is precise, not because it is mysterious.

The primary audience is local service businesses: health practices, trades,
professional services, hospitality, beauty, and community organizations.
Advanced web applications, AI tools, and automation remain visible as a
secondary capability.

The site's single job is to turn a skeptical visitor into a serious project
conversation with Mandela Atud.

## Trust Model

COBRYKZ does not rely on invented scale, anonymous testimonials, or zero-value
counters. Until a larger body of named client work exists, trust comes from:

1. A visible founder who remains responsible for the work.
2. Clear language about scope, process, timelines, and fit.
3. The quality of the website visitors are currently using.
4. Honest limits: no claims that cannot be independently supported.
5. A contact flow that says exactly what happens next.

## Visual Direction

The page is light-first. White and cool blue surfaces create openness; deep ink
sections establish authority at moments that benefit from contrast. The page
should feel welcoming to a local business owner without losing technical
credibility.

### Color Roles

- **Conviction Blue (`#1F5EFF`)**: primary actions, links, and small emphasis.
- **Deep Ink (`#0B1728`)**: primary text and authority sections.
- **Cool Surface (`#F7FAFF`)**: quiet section background and hero foundation.
- **Trust Tint (`#EAF2FF`)**: selected or explanatory surfaces.
- **Body Slate (`#53647A`)**: supporting text on light backgrounds.
- **Evergreen (`#177B57`)**: verified, available, or reassuring status only.
- **Day Border (`#DCE5F0`)**: structural dividers.
- **Footer Void (`#081321`)**: final page anchor.

Blue marks action. Green marks reassurance. Neither color is decorative fill.

## Typography

Geist Sans carries headings, body copy, controls, and labels. Playfair Display
Italic is used sparingly for one human or editorial emphasis inside major
headlines and quotes.

- Hero: `42px` mobile to `68px` wide desktop, extra bold, line-height near `1`.
- Section heading: `34px` mobile to `48px` desktop, extra bold.
- Card or row title: `17px` to `28px`, bold.
- Body: `14px` to `17px`, line-height `1.7` to `1.85`.
- Utility label: `11px`, bold, uppercase.

Letter spacing stays at the font default. Hierarchy comes from size, weight,
spacing, and contrast.

## Layout

The page follows a decision sequence:

1. **Hero**: who COBRYKZ serves and the outcome it creates.
2. **Trust strip**: four practical working commitments.
3. **Services**: website first, advanced systems second, ongoing support third.
4. **Relationship**: what a founder-led engagement feels like.
5. **Industries**: recognition for local-business visitors.
6. **Standard**: quality visitors can inspect directly.
7. **Process**: ordered steps and honest timing.
8. **Founder**: the person accountable for the work.
9. **Fit**: who benefits and who should choose another option.
10. **FAQ**: remaining objections.
11. **Contact**: a direct, transparent project note.

Sections use a `1200px` maximum content width with `20px` mobile and `40px`
desktop page gutters. Dividers provide most structure. Cards are reserved for
framed tools, forms, and the founder portrait.

## Mobile System

Phones do not render a compressed version of the desktop page. Below `768px`,
the site uses a separate composition, content rhythm, and interaction model
while retaining the same brand colors. The mobile hero alone uses a lighter
editorial type pairing chosen for image overlays.

### Mobile Type And Spacing

- Content width: `calc(100% - 32px)`, capped at `430px`.
- Section rhythm: `64px` vertical padding.
- Hero headline: Manrope `300` at fixed `30px` to `33px`, with Cormorant
  Garamond italic for the emphasized line.
- Section heading: fixed `30px`, line-height `1.12`.
- Body copy: fixed `14px`, line-height `1.6`.
- Supporting copy: `11px` to `13px`.
- Controls: minimum `44px` height and `8px` radius.

Font sizes never scale from viewport width. Phone hierarchy comes from editing,
grouping, and contrast rather than desktop-sized type.

### Mobile Flow

1. A full-image founder portrait remains sharp through the face while a bright,
   borderless veil supports text over the suit.
2. A concise lightweight message, one action, and one assurance line remain
   inside the image without becoming a dashboard.
3. Services use a segmented control so one focused panel is visible at a time.
4. The working agreement presents three direct promises with supporting detail.
5. Industries use a horizontal swipe row with six relevant categories.
6. Quality checks remain visible together in a phone-first review panel.
7. Process steps use an accordion with the first step open by default.
8. The founder story keeps the portrait, accountability message, and promises.
9. Fit guidance uses two tabs with three clear criteria in each.
10. FAQ keeps five complete answers with the first question open by default.
11. Contact includes the full reassurance strip, project fields, and email fallback.

A bottom action rail appears only after the hero and hides when the contact
section enters view. It provides direct access to Services, Process, and Start a
project without competing with the primary content.

### Mobile Performance

- The Three.js hero scene does not initialize below `1024px`.
- Hidden desktop content remains visually and interactively unavailable.
- Mobile controls use lightweight React state with no animation library.
- Continuous motion is not required for the phone experience.

## Signature Element

The hero includes a full-bleed Three.js architectural field made from transparent
planes, frames, and connecting lines. It suggests structure, systems, and
craftsmanship without competing with the founder portrait.

Rules:

- Keep opacity low.
- Use slow pointer response and vertical drift only.
- Render at a capped pixel ratio.
- Dispose all renderer resources on unmount.
- Show a static rendered frame when reduced motion is requested.
- Never place important text inside the canvas.

## Components

### Navigation

- Light translucent surface with a border after scrolling.
- Four descriptive links: Services, Standard, Process, About.
- One primary action: Start a project.
- Mobile menu uses a full white surface with clear 44px minimum targets.

### Buttons

- `8px` radius.
- Primary: Conviction Blue, white text, restrained blue shadow.
- Secondary: white, Day Border, Deep Ink text.
- Hover shimmer is allowed on primary calls to action.
- Labels describe the result: "Start a project" and "Open project email."

### Editorial Rows

Services, standards, and principles use full-width rows separated by borders.
This avoids repeating generic card grids and makes comparison easier.

### Dark Bands

Industries, founder, contact, and footer use Deep Ink or Footer Void. Text uses
white with supporting copy at sufficient opacity. Blue and green remain small
signals.

### Contact Form

The form builds a drafted email to `hello@cobrykz.com`. The interface explicitly
states that nothing is sent until the visitor reviews and sends the email.
Never display a success state for a message that was not actually delivered.

## Motion

Motion is light and functional:

- The Three.js field provides the main ambient movement.
- Buttons and links use short color, shadow, or position transitions.
- The mobile menu and FAQ change state without hiding content before hydration.
- No scroll-triggered content begins at `opacity: 0`.
- No typewriter effects, scroll hijacking, or decorative looping elements.

`prefers-reduced-motion` disables continuous movement and collapses transition
durations.

## Accessibility

- WCAG AA minimum contrast.
- All interactive targets are at least `44px` on mobile.
- Visible keyboard focus uses a blue outline.
- Forms use associated labels and native validation.
- Accordion buttons expose `aria-expanded` and answer relationships.
- Decorative canvas and backgrounds are hidden from assistive technology.
- Headings remain visible without JavaScript.
- Layouts must not introduce horizontal overflow from `320px` upward.

## Guardrails

- Do not add anonymous or fabricated testimonials.
- Do not publish performance scores unless they were measured on the deployed
  production site.
- Do not use counters that begin at zero as social proof.
- Do not add dead social, privacy, booking, or portfolio links.
- Do not turn advanced technology into the primary message.
- Do not use stock photography; founder photography is the human anchor.
- Do not add more animation unless it clarifies state or hierarchy.
- Do not drift back to a dark-dominant agency aesthetic.
