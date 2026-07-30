# Mobile Homepage Visual Remediation

## Scope

Remediate the 390px Homepage visual gate without changing frozen copy,
information architecture, chapter order, desktop presentation, or the
Solutions hub.

## Mobile header

At widths below 768px, render a 60px sticky header with the existing Cobrykz
logo and a 44px menu control. The control opens an architectural panel anchored
below the header. The panel exposes every existing primary navigation
destination, all existing solution destinations, and the shared primary CTA.

The control uses `aria-expanded` and `aria-controls`. Opening moves focus to the
first menu destination. Escape, outside pointer interaction, and destination
selection close the panel; Escape returns focus to the control. The desktop
header remains the existing navigation and CTA at 768px and above.

## Opening and Atlas

Compact only mobile spacing so the opening copy, actions, artifact label, and
top of the signature Atlas meaningfully enter a 390x844 first viewport after
the 60px header. Retain all copy, actions, and current readable type sizes.

Render Atlas nodes inside planes derived from the existing definition layers
and node kinds. Use the existing connection data and state values for connector
rails and controlled emphasis. Keep the same node controls, selection detail,
and relationship explanation. Add no labels or information beyond the shared
definition.

## Chapter differentiation

Keep one disclosure behavior but distinguish chapter composition through
existing wrappers and CSS:

- Outcomes lead with the open result as a stronger result plane.
- Solutions remain a ruled capability ledger.
- Why Cobrykz uses an offset spatial trust composition.
- AI remains an inset framed decision artifact.
- Process remains a connected delivery rail.

## Mobile footer

Below 768px, compact the footer into a two-column sitemap while preserving the
logo, tagline, shared CTA, all solution and company destinations, email link,
copyright, and 44px targets. Desktop footer markup and appearance remain
unchanged.

## Verification

Add contracts before production edits for:

- Mobile header height, menu semantics, dismissal behavior, focus management,
  navigation parity, and desktop breakpoint preservation.
- Atlas layer grouping and connection-state hooks.
- Compact opening hooks that do not reduce readable type.
- Distinct outcome, solution, trust, AI, and process compositions.
- Mobile footer two-column composition and destination parity.

Run the focused contracts, full test suite, TypeScript, ESLint, production
build, responsive-relevant contract checks, and a desktop-diff audit. Existing
multiple-lockfile build warnings are out of scope.
