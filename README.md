# Tessium — Follow the signal

A responsive homepage redesign for [tessium.dev](https://tessium.dev), built with React, TypeScript, Vite, GSAP, and Lucide. Original Tessium logo assets are preserved. Custom generated artwork extends the mark into silver data filaments; native SVG traces, diagrams, and chart artwork provide motion.

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
- Signup, documentation, pricing, and company links point to the real Tessium website.

## Presentation boundaries

This is a homepage design concept. Example events, charts, and diagrams are illustrative; no production WebSocket connection or API key is used. JSON field shapes follow the published documentation, while example addresses are abbreviated. Authentication, billing, and additional site pages remain at tessium.dev. The prototype is marked noindex.

Published pricing and latency figures were reviewed on 13 September 2026. Free traffic is limited to 20 GB/month; unlimited traffic applies to paid plans. Replay availability depends on plan. See [the design notes](docs/design.md) for sources and rationale.

The silver sculpture was created using the built-in image generator with Tessium's original mark as a geometry reference. The tool did not expose a specific image-model selector. Its project file is `public/assets/signal-sculpture.png`.

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
