# COBRYKZ Premium Component-System Refinement

## Objective

Refine the reusable interface components so the completed COBRYKZ editorial website feels like one cohesive premium system at close inspection.

This is not a redesign. The page must remain visually identical at a macro level. Do not change section structure, typography, copy, color palette, hero composition, content hierarchy, overall spacing, or interaction behavior.

## Direction

Use token-led targeted normalization. Introduce only a small number of shared CSS values where multiple components have the same visual intent and currently duplicate or inconsistently express that intent. Prefer local refinement whenever a shared token would add abstraction without eliminating genuine drift.

Consistency does not mean uniformity. Components may retain different elevation, border, radius, control-height, and interaction treatments when those differences communicate hierarchy or context.

## Binding Principles

- Keep the token layer intentionally small.
- Create a token only when it removes genuine duplication between treatments with identical visual intent.
- Do not consolidate values merely because they are numerically close.
- Preserve intentional hierarchy between primary, secondary, quiet, elevated, and destination components.
- If a refinement makes a component more noticeable, reject or reduce it.
- Prefer local classes over new abstractions unless a shared value clearly improves long-term consistency.
- Do not introduce new React component primitives for abstraction alone.
- Preserve existing functionality, content, and interaction behavior.
- Compare the finished page against the approved editorial build and require macro-level visual equivalence.

## Scope Boundary

This phase may refine:

- Primary and secondary buttons.
- Text links and navigation links.
- Inputs, textareas, selects, labels, helper text, and existing status text.
- Existing visual states: focus, hover, active, disabled, required, invalid, success, and helper text.
- FAQ and Process accordions.
- Existing cards and contained surfaces.
- Existing pills, badges, and section labels.
- Dividers, borders, corner radii, and shadows.
- Transition timing.
- A small CSS token layer where justified.

This phase must not:

- Redesign or reorder sections.
- Change typography, copy, color palette, hero composition, content hierarchy, or overall spacing.
- Add validation messages, validation logic, or interaction behavior.
- Add new gradients, glassmorphism, decorative effects, component types, or content.
- Introduce dramatic scaling, hover lifts, exaggerated glow, or heavy shadows.
- Refactor broadly for theoretical reuse.
- Make every card, button, surface, or border identical.

## Audit Summary

### Buttons and Links

Primary buttons currently mix `transition-all`, `transition-colors`, and absent explicit transitions. Only some use pressed translation, and shimmer is not applied consistently. Desktop text links generally use restrained color transitions while several mobile equivalents change without an explicit transition.

Refinement should establish one quiet timing treatment for equivalent color-state changes and one intentional pressed-state policy for equivalent primary actions. Preserve differences in fill, width, control height, and elevation that express hierarchy. Reassess shimmer only as an existing button treatment: retain, reduce, or remove it consistently where the same action role is intended. Do not add motion.

### Focus Treatment

The global focus-visible rule applies the same 8px radius to links, circular controls, rectangular controls, and dark surfaces. This can conflict with intentional geometry and does not provide context-specific ring contrast.

Refinement should preserve one accessible focus language while allowing geometry and surface context to determine ring shape and contrast. Text links must remain clearly focusable without gaining a button-like silhouette.

### Forms

Desktop and mobile contact controls repeat similar values but lack a complete visual-state contract. Hover, disabled, required, native invalid, and existing success/helper treatments are not systematically expressed.

Refinement is visual only:

- Preserve all form fields, labels, attributes, content, submission behavior, and status behavior.
- Keep desktop controls at their existing standard height and mobile controls at their existing compact height.
- Normalize equivalent input, textarea, and select border, radius, background, focus, and transition intent.
- Style native required/invalid states without adding messages or triggering premature error emphasis.
- Provide a restrained disabled appearance for existing or future native disabled attributes without changing component behavior.
- Preserve existing success status text and helper copy, while aligning their visual role.

### Accordions

Desktop FAQ, mobile FAQ, and mobile Process use the same Plus/Minus language but differ in row feedback and transition treatment. Their different dimensions are intentional responsive choices.

Refinement should align equivalent hover, focus, border, and transition intent while preserving current dimensions, open-state logic, content, accessibility relationships, and responsive density.

### Surfaces, Borders, and Shadows

The page intentionally uses different surface weights. Services, Process, Fit, FAQ, contact, hero media, navigation, and mobile action controls should not be flattened into one treatment.

Only consolidate shadow, border, or radius values when the components serve the same elevation role. A likely maximum is three shared elevation intents:

1. Quiet contained surface.
2. Primary elevated editorial surface.
3. Dark destination or high-priority surface.

These are roles, not mandatory tokens. If two surfaces need distinct values to preserve hierarchy, keep them local.

The dominant 8px surface/control radius should remain. Full radii remain reserved for status marks and pills. Do not force the global focus treatment to impose an 8px radius on every element.

### Labels, Pills, Badges, and Dividers

Desktop section labels repeat the same visual intent through local class strings; mobile uses the existing `m-kicker`. A small shared section-label treatment is justified only if it preserves every current visual value.

Process phase pills, status circles, hero trust badges, and other compact labels remain intentionally different. Do not unify them merely because they are small rounded elements.

Equivalent light and dark dividers may share values only when their hierarchy and surface context match. Preserve stronger structural rules where they organize content.

## Minimal Token Strategy

The initial token candidates are deliberately limited:

- Equivalent control transition timing.
- Light- and dark-surface focus-ring colors.
- Existing compact and standard control heights, only if consolidation removes real duplication.
- Repeated control/surface radius, without overriding full-radius exceptions.
- Repeated quiet and elevated shadow values, only where visual roles match exactly.
- Equivalent light and dark control borders, only where intent matches.

During implementation, each candidate must pass this test:

1. Is the value repeated?
2. Do the repeated uses have the same visual purpose?
3. Would one token prevent meaningful drift?
4. Can it be introduced without changing macro appearance?

If any answer is no, keep the value local.

## Component Plan

### Primary and Secondary Actions

- Inventory primary actions across navigation, hero, contact, mobile hero, mobile navigation, and mobile action bar.
- Normalize only equivalent transition and pressed-state behavior.
- Preserve role-specific heights, widths, backgrounds, and shadows.
- Keep secondary and quiet actions visually subordinate.
- Do not add hover lift, scale, glow, or new decoration.

### Text and Navigation Links

- Align equivalent color-transition timing.
- Preserve the navigation underline and existing hierarchy.
- Add no new underlines, icons, or motion.
- Ensure keyboard focus remains visible without converting links into button-like elements.

### Form Controls

- Establish equivalent control-state presentation for desktop and mobile contact forms.
- Preserve the existing dark form field appearance and current heights.
- Use native selectors and existing attributes for visual invalid/required/disabled states.
- Do not add validation copy, state variables, event handlers, or submission changes.
- Keep helper and status text content unchanged.

### Accordions

- Align equivalent row and state-control feedback.
- Preserve responsive sizing differences and existing open/close logic.
- Keep animation minimal and honor reduced motion.

### Surfaces and Supporting Elements

- Map current surfaces by visual role before changing values.
- Consolidate only exact-role duplicates.
- Preserve the editorial depth hierarchy established in the prior phase.
- Keep pills, badges, section labels, dividers, and borders unchanged unless the audit identifies a true same-role mismatch.

## Architecture

Prefer a few CSS custom properties or narrowly scoped utility classes in `app/globals.css`. Avoid a new generalized component library. Existing React components retain their structure and ownership.

Local component classes remain appropriate for intentional, section-specific treatments. Shared tokens must describe stable visual intent rather than a particular page location.

## State and Accessibility Requirements

- Keyboard focus must be visible on light and dark surfaces.
- Focus styling must follow the element's intended geometry.
- Hover and active states must not be the only way information is communicated.
- Disabled controls must remain legible and clearly inactive when the native attribute is present.
- Native invalid styling must be restrained and must not introduce new error content.
- Existing success and helper text remain readable and subordinate.
- Reduced-motion preferences must suppress or minimize transitions and animation.
- Existing ARIA relationships, form labels, accessible names, and control behavior must remain unchanged.

## Verification

### Source and Behavior

- Add targeted source-contract tests for the small token set and critical state treatments.
- Verify no new validation logic, messages, handlers, component types, gradients, or broad abstractions are introduced.
- Run the complete test suite, tracked-source lint, production build, and diff hygiene.

### Responsive State Matrix

Review representative desktop and mobile widths for:

- Default, hover, active, keyboard-focus, and disabled action states.
- Default, hover, focus, required, native invalid, disabled, helper, and existing success form states.
- Closed, open, hover, and keyboard-focus accordion states.
- Surface, divider, border, radius, and shadow consistency.
- Reduced-motion behavior.
- Horizontal overflow and control clipping.

### Macro Comparison

Capture before-and-after full-page screenshots at 1440px and 375px using the same viewport and page state. Compare section boundaries, major spacing, typography, hero framing, visual hierarchy, and dominant focal points.

Acceptance requires the page to feel visually identical at macro scale. Refinements should become apparent only through close inspection of component states and details.

## Deliverables

1. Final list of tokens introduced, with every consuming component and justification.
2. Component-by-component refinement report.
3. Explicit list of audited components intentionally left unchanged.
4. State-matrix QA results.
5. Before-and-after desktop and mobile screenshots.
6. Confirmation that functionality, content, macro composition, and hierarchy were preserved.

## Acceptance Criteria

- The component system feels cohesive without becoming uniform.
- The token layer remains small and justified by genuine same-intent duplication.
- Intentional differences in hierarchy remain intact.
- Equivalent buttons, links, controls, and accordions use consistent state language.
- Form refinement is visual only; no validation messages, logic, or behavior change.
- No component becomes more visually dominant than before.
- No new gradients, effects, component types, or broad abstractions appear.
- The finished page matches the approved editorial build at macro level on desktop and mobile.
- Accessibility, reduced motion, tests, lint, build, responsive checks, and state checks pass.
