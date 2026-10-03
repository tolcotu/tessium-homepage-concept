# Tessium — Follow the signal

A responsive public website redesign for [tessium.dev](https://tessium.dev), built with React, TypeScript, Vite, GSAP, and Lucide. Original Tessium logo assets are preserved. A native SVG extends the mark into monochrome data filaments, with identical geometry on every screen.

[View the hosted concept](https://tolcotu.github.io/tessium-homepage-concept/)

## Run locally

```sh
npm install
npm run dev
```

The dev server binds to localhost. For the production build:

```sh
npm run build
npm run preview
```

## What works

- Eight selectable streams organized into token, market, and wallet scopes.
- Activity and JSON views, illustrative events, copy feedback, and a candlestick preview.
- Copyable TypeScript and Python quickstart examples.
- GSAP scroll animation, native SVG signal pulses, and operating-system reduced-motion support.
- Responsive navigation, keyboard-operated tabs, visible focus, and a skip link.
- Public designs for streams, pricing, solutions, coverage, about, journal, article overviews, contact, terms, and privacy.
- Monthly/yearly pricing, comparison table, FAQs, venue search, journal filters, and a validated email-draft contact flow.
- Signup and documentation stay on the real Tessium website.

## Presentation boundaries

This is a public website design concept. Example events, charts, and diagrams are illustrative; no production WebSocket connection or API key is used. JSON field shapes follow the published documentation, while example addresses are abbreviated. Authentication, billing, and documentation remain at tessium.dev. Article and legal layouts contain clearly marked short overviews with links to the complete official text. The contact page prepares an email draft and does not submit to a backend. The prototype is marked noindex.

Pricing and coverage were checked again on 3 October 2026; homepage latency figures were reviewed on 13 September 2026. Free traffic is limited to 20 GB/month; unlimited traffic applies to paid plans. Replay availability depends on plan. See [the design notes](docs/design.md) for sources and rationale.

The former generated sculpture remains in the repository as a reference, but is not rendered. `SignalMark.tsx` draws the current hero entirely in SVG. Public pages use `?page=pricing` style URLs so direct links and refreshes work on GitHub Pages without server rewrites.

## Verification

- TypeScript and optimized Vite production build pass.
- Browser layout checked at 320, 390, 768, 1024, and 1440 CSS pixels, without horizontal overflow.
- All eight stream selectors and JSON envelopes verified in the browser.
- Mobile menu, keyboard arrow navigation, code language switching, and copy-success feedback verified.
- No browser console errors observed during final interaction checks.

## Structure

- `src/App.tsx`: page narrative, navigation, motion orchestration.
- `src/components/StreamExplorer.tsx`: interactive product demonstration.
- `src/components/example-events.ts`: illustrative event payloads based on public schemas.
- `src/components/Diagrams.tsx`: native SVG product illustrations.
- `src/components/Quickstart.tsx`: developer code examples.
- `src/styles.css`: responsive visual system.
- `docs/design.md`: design direction and content provenance.

## October 3 revision

The palette contains only neutral grays, black, and white; colors are converted at the source rather than filtered over the page. See `src/PublicPages.tsx`, `src/public-pages.css`, and `src/routing.ts` for public-page designs.
