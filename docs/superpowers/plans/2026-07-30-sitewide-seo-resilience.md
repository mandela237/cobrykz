# Cobrykz Site-wide SEO and Resilience Plan

**Goal:** Complete the approved technical SEO system and give visitors useful, on-brand recovery paths when a route or runtime fails.

## Task 1: Shared SEO Foundation

- Centralize the canonical origin and metadata builder.
- Add global Organization and WebSite structured data using only visible, supported facts.
- Give Home, Solutions, and all six solution pages canonical and social metadata.
- Provide a restrained generated social image.

## Task 2: Discovery Controls

- Add `robots.ts` and `sitemap.ts`.
- Include stable public pages and all solution routes.
- Include Projects and Insights indexes/details only when their approved publication thresholds are met.
- Never emit draft slugs.

## Task 3: Contextual Structured Data

- Add BreadcrumbList and Service data to solution pages.
- Add BreadcrumbList and Article data only to published insight articles.
- Keep claims aligned with visible content and omit ratings, offers, locations, and fabricated evidence.

## Task 4: Recovery States

- Add an accessible not-found page with paths to Solutions and Contact.
- Add a calm global error boundary with retry and home actions.
- Preserve one responsive content tree and the shared visual language.

## Task 5: Gate

- Test discovery inventory, canonical/social metadata, supported schemas, and recovery actions.
- Run all tests, lint, TypeScript, build, route smoke checks, and draft-route exclusions.
