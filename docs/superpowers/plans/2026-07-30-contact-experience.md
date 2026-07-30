# Cobrykz Contact Experience Implementation Plan

**Goal:** Replace the retired email-draft interaction with a real, accessible inquiry flow that only confirms success after dependable delivery.

**Architecture:** A client form posts JSON to a same-origin Next route handler. Shared validation normalizes and limits every field. The handler adds a honeypot, minimum-completion check, and conservative in-memory IP rate limit, then delivers through the Resend HTTP API when configured. Missing configuration or provider failure returns an honest retryable error; `info@cobrykz.com` remains visible as the direct fallback.

## Task 1: Contact Contract and Content

- Add `components/content/contact.ts` with approved field options, response expectation, and metadata.
- Add shared inquiry types and server-safe validation in `lib/contact/validation.ts`.
- Test required/optional fields, no budget field, solution options from the centralized solution registry, limits, and safe normalization.

## Task 2: Server Submission

- Add `app/api/contact/route.ts`.
- Accept JSON only, validate origin/content, trap the honeypot, reject implausibly fast submissions, rate limit repeated IPs, and call Resend only with server-side environment variables.
- Return success only after a provider 2xx response. Never log the inquiry body or expose provider errors.
- Document `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and optional `CONTACT_TO_EMAIL` in `.env.example`.

## Task 3: Contact Page

- Add `/contact` metadata and a single responsive page tree.
- Implement the four required fields and three optional fields exactly as approved.
- Provide native labels/autocomplete, field-level errors, an error summary, focus management, pending state, honest confirmation, response expectation, and direct email fallback.
- Keep the tone welcoming, low-pressure, and direct.

## Task 4: Gate

- Run focused tests, full tests, lint, TypeScript, and production build.
- Smoke `/contact` and exercise invalid, unconfigured, and abuse-protected API responses.
- Confirm no budget field, no secret reaches client code, and success is impossible without provider acceptance.
