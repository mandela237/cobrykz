# Checkpoint 1 Component Token Audit

## Scope and baseline

This audit covers only the ten Checkpoint 1 candidates. It introduces no new
visual values and does not change React structure, content, typography, layout,
interaction behavior, or component hierarchy.

The immutable baseline was captured before any edit to `app/globals.css`.

| Item | Desktop | Mobile |
| --- | --- | --- |
| URL | `http://127.0.0.1:3107/` | `http://127.0.0.1:3107/` |
| Base commit | `06bbdef` | `06bbdef` |
| Viewport | 1440 × 900 | 375 × 812 |
| Full-page PNG | 1440 × 8283 | 375 × 5891 |
| Path | `.superpowers/component-system/baseline-desktop.png` | `.superpowers/component-system/baseline-mobile.png` |

- Browser: Headless Chrome `145.0.7632.6` on Windows 10, reported by
  `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/145.0.7632.6 Safari/537.36`.
- Page state: initial home route, no menus or accordions open, no field values,
  no hover or keyboard focus, fonts and network idle, lazy content loaded by one
  full-page traversal, then returned to the top. Both hero videos were paused at
  `currentTime = 0` before capture.
- Capture method: the existing safe `browse` Chromium binary, with no new
  dependency. Full-page PNGs were assembled losslessly from same-width viewport
  captures; fixed navigation was retained at the top and suppressed in later
  segments so it was not duplicated.

## Candidate decisions

### `--control-transition` — accept

- Existing value: `0.2s ease`.
- Repeated consumers: the `left`, `right`, and `opacity` transitions on
  `.nav-underline::after`, rendered by the four desktop navigation links in
  `components/Navbar.tsx`.
- Visual role: one quiet timing curve for the three coordinated properties of
  the existing navigation-state indicator.
- Reason: the properties are one state treatment with identical intent. A
  single timing token prevents one property from drifting without changing the
  resolved transition.

### `--focus-ring-light` — accept

- Existing value: `rgba(31, 94, 255, 0.78)`.
- Repeated consumers: focus-visible links, buttons, inputs, selects, and
  textareas on light surfaces, including Navbar, desktop and mobile hero actions,
  Services actions and mobile tabs, Process actions and mobile accordion rows,
  Good Fit mobile tabs, FAQ rows, and MobileActionBar controls.
- Visual role: the existing blue focus-ring color on light surfaces.
- Reason: the global `:focus-visible` rule already supplies one repeated focus
  language to many components. Naming its color prevents state-color drift while
  keeping the exact current value.

### `--focus-ring-dark` — accept

- Existing value: `rgba(31, 94, 255, 0.78)`.
- Repeated consumers: focus-visible controls within existing `bg-navy` and
  `bg-footer-bg` destinations: desktop Industries, Founder, FinalCTA, and Footer;
  mobile Founder, Contact, and Footer.
- Visual role: the current focus-ring color where the surrounding surface is
  dark.
- Reason: light- and dark-surface focus are different roles even though their
  resolved color is currently identical. Keeping separate tokens avoids
  incorrectly coupling those roles. A narrow dark-surface selector consumes the
  token at the same resolved value.

### `--control-height-compact` — accept

- Existing value: `44px`.
- Repeated consumers: `.m-control` on the three MobileServices category tabs,
  the two MobileFit tabs, and the MobileContact name field, email field, and
  submit action.
- Visual role: the existing compact mobile control/touch-target height.
- Reason: these controls deliberately share the same compact sizing contract.
  The token names that stable value at the existing shared rule and prevents
  cross-component drift.

### `--control-height-standard` — reject

- Repeated candidates: `min-h-12` appears on desktop Hero actions, the mobile
  navigation CTA, desktop FinalCTA fields and submit action, and MobileHero.
- Visual role: nominal 48px controls across primary actions and form fields.
- Reason: the duplication currently lives in component utility strings, and the
  consumers mix action and field roles. Checkpoint 1 cannot consume a token
  without broad selectors or out-of-scope TSX edits. An unused token would add no
  drift-prevention value.

### `--radius-control` — reject

- Repeated candidates: `8px`/`rounded-lg` appears on actions, form controls,
  accordion state controls, media frames, cards, and contained surfaces;
  `.m-control` and the global focus rule also both resolve to 8px.
- Visual role: several distinct roles that happen to share a number.
- Reason: control shape, surface shape, media framing, and focus geometry are not
  one intent. `.m-control` already centralizes its own radius, so another token
  would either be redundant or flatten intentional differences.

### `--shadow-quiet` — reject

- Repeated candidates: MobileServices and MobileFit share
  `0 16px 42px rgba(11,23,40,0.08)`; FAQ surfaces, selected mobile tabs, and the
  secondary Hero action use different quiet shadows.
- Visual role: low-emphasis contained surfaces and selected controls.
- Reason: only one pair is numerically identical, while the surrounding quiet
  treatments encode different surface and control roles. Consuming the pair
  would require out-of-scope component edits and would not justify a global
  token in this checkpoint.

### `--shadow-elevated` — reject

- Repeated candidates: Hero media, Services, Process, Good Fit, FinalCTA, and
  MobileActionBar all use elevated shadows.
- Visual role: editorial media, overlap cards, destination forms, and fixed
  navigation.
- Reason: the values intentionally differ in spread, blur, opacity, and depth.
  No exact repeated value maps to one stable elevated role, so consolidation
  would erase hierarchy.

### `--border-control-light` — reject

- Repeated candidates: `border-border` appears on Navbar controls, the secondary
  Hero action, FAQ and Process controls, MobileServices and MobileFit tabs, and
  MobileActionBar.
- Visual role: control boundaries mixed with many structural dividers and
  section borders.
- Reason: the same palette color carries different hierarchy and structural
  roles. A global control-border token cannot be consumed cleanly without
  relabeling component markup, and aliasing all `border-border` uses would be
  semantically false.

### `--border-control-dark` — reject

- Repeated candidates: `border-white/14` appears on desktop and mobile contact
  fields, but also on the Footer CTA and Founder media; other dark controls and
  dividers use `/10` or `/12`.
- Visual role: dark form boundaries, quiet dark actions, media frames, and
  structural rules.
- Reason: only the contact fields have identical control intent, and their
  values live in component utility strings. A Checkpoint 1 token would be unused
  or require out-of-scope component edits; broad consolidation would merge
  distinct roles.

## Accepted token map

| Token | Exact value | Shared CSS consumer |
| --- | --- | --- |
| `--control-transition` | `0.2s ease` | `.nav-underline::after` |
| `--focus-ring-light` | `rgba(31, 94, 255, 0.78)` | `:focus-visible` |
| `--focus-ring-dark` | `rgba(31, 94, 255, 0.78)` | dark-surface `:focus-visible` override |
| `--control-height-compact` | `44px` | `.m-control` |

No rejected candidate is declared, and every accepted token has a direct CSS
consumer.
