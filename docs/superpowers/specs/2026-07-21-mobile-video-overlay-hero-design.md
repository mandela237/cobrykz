# Mobile Video Overlay Hero Design

## Objective

Replace the latest split mobile hero with a cohesive, full-bleed composition in which the copy sits over the brand film. The result should feel cinematic and premium while keeping the message and primary action immediately readable on phones from 320px to 767px wide.

## Scope

This change affects only the mobile hero and its presentation-quality contract. The desktop hero, downstream mobile sections, copy, contact flow, video source, and navigation remain unchanged.

## Composition

- Use one full-bleed video stage rather than separate copy and video columns.
- Use an `80svh` hero with a `560px` minimum height. For viewports shorter than `650px`, use `100svh` and compact the vertical gaps so the complete content group remains visible.
- Position the complete content group at the bottom-left with 20px horizontal spacing at standard phone widths and safe spacing above the bottom edge.
- Keep the content width constrained so lines remain intentional and do not cover the video unnecessarily.
- Preserve clear space beneath the mobile navigation.

## Content Hierarchy

The overlay contains, in order:

1. The compact founder-led label.
2. The headline “A website that earns trust.”
3. One concise supporting sentence.
4. One primary “Start a project” action.

Retain the existing lightweight mobile type pairing and italic editorial emphasis for “earns trust.” Use white as the primary overlay color, with restrained blue emphasis only where it remains legible against the film.

## Video And Contrast Treatment

- Present the 16:9 `/hero-video.mp4` at its natural composition with `object-contain` using `/hero-video-poster.jpg` as its fallback, rather than enlarging it to cover the tall phone stage.
- Position the contained film toward the upper part of the hero so the full brand animation remains visible above the copy.
- Use one soft navy treatment that grows darker only toward the bottom behind the copy.
- Fade the gradient into the video rather than creating a visible panel boundary.
- Keep the upper and right portions of the film substantially unobscured so the video remains the dominant visual.
- Do not use a frosted card, border, rounded content container, or uniform dark tint over the whole film.

## Responsive Behavior

- Preserve the bottom-left overlay at 320px, 375px, 430px, and 767px widths.
- Use fixed responsive type steps rather than viewport-scaled text.
- Allow the CTA to span the available content width while retaining at least a 44px touch height.
- Keep all text and controls inside the hero without clipping, horizontal overflow, or collision with the navigation.
- On unusually short screens, the minimum-height and spacing rules must prioritize complete content visibility over cinematic height.

## Motion And Accessibility

- Keep `autoPlay`, `muted`, `loop`, and `playsInline` for ordinary motion preferences.
- Under `prefers-reduced-motion`, present the poster as the stable visual rather than requiring continuous playback.
- Treat the film as decorative media; the headline independently communicates the business message.
- Maintain WCAG AA contrast for the overlay copy in representative video frames.
- Preserve visible keyboard focus and a minimum 44px CTA target.

## Verification

- Update the presentation-quality test so it rejects the split-column contract and requires the full-bleed overlay structure.
- Visually inspect representative mobile widths, including 320px, 375px, 430px, and 767px.
- Verify a representative short viewport so the complete overlay remains reachable and visible.
- Run the focused presentation-quality test, lint, and production build.
- Confirm the desktop hero output remains unchanged.

## Acceptance Criteria

- Mobile shows one full-bleed video hero with the complete copy group overlaid at bottom-left.
- The film remains visually dominant and is not hidden by a card or a uniform heavy tint.
- A soft navy gradient makes every line readable without a hard boundary around the text.
- The headline, supporting sentence, and CTA remain visible and unclipped at all supported mobile widths.
- The CTA reaches the mobile contact section and meets the 44px touch-target requirement.
- Reduced-motion users receive a stable poster treatment.
- No horizontal overflow occurs.
- Desktop hero behavior and downstream page sections are unchanged.
