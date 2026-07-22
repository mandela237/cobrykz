# Mobile Split Video Hero Design

## Objective

Recompose the COBRYKZ mobile hero so the message sits on the left and the brand film occupies the right. The video should feel dominant and intentional without making the copy difficult to read on screens from 320px to 767px wide.

## Scope

This change affects only `MobileHero`. The desktop hero, downstream mobile sections, page copy, contact flow, and video source remain unchanged.

## Composition

- Use a two-column mobile hero with a 46/54 text-to-video split.
- Keep the hero approximately 520px tall so the video has substantial presence without pushing Services excessively far below the fold.
- Place all copy and the primary action in the left column.
- Let the video fill the right column from top to bottom.
- Use `object-cover` with an explicit focal position that keeps the animated COBRYKZ mark recognizable throughout the loop.
- Keep the division between text and video clean. Do not extend the video beneath the copy and do not add glass effects.

## Content Hierarchy

The left column contains, in order:

1. The founder-led label.
2. A shortened trust-focused headline.
3. One short supporting sentence.
4. One primary “Start a project” action.

Remove the secondary circular exploration action from the hero. Services remains immediately after the hero and does not need a second hero-level link.

## Responsive Behavior

- From 350px through 767px, preserve the 46/54 split.
- Below 350px, preserve the split while reducing headline size, horizontal padding, and button padding.
- Do not stack the video above or below the copy at any supported mobile width.
- Prevent horizontal overflow and keep the primary action within the left column.

## Video Behavior

- Continue using `/hero-video.mp4` with `/hero-video-poster.jpg` as the poster.
- Keep `autoPlay`, `muted`, `loop`, and `playsInline`.
- Keep the watermark-removed optimized asset.
- Under `prefers-reduced-motion`, show the poster frame rather than relying on motion for meaning.
- The film is decorative brand media; the headline carries the business message independently.

## Visual Treatment

- Retain the existing navy, blue, white, and pale-gray palette.
- Use a subtle boundary between columns instead of a card, shadow, or rounded container.
- Keep typography crisp and high contrast.
- Avoid pills, reassurance rows, gradients over the copy, and decorative icon clusters.

## Acceptance Criteria

- Mobile hero displays text on the left and video on the right at 320px, 375px, 430px, and 767px widths.
- The video visually occupies more than half of the hero width.
- The headline and CTA remain readable and do not overlap the video.
- No horizontal overflow occurs.
- The secondary circular arrow is absent.
- Desktop hero output is unchanged.
- Existing presentation-quality tests, lint, and production build pass.
