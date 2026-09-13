# Tessium — Follow the signal

A homepage presentation concept for tessium.dev. Build the story around many on-chain events converging into one usable connection. Preserve the original mark and wordmark. Use their taper and curvature in diagrams and a bespoke generated silver filament sculpture.

## Tokens

- Background / graphite: #08090b
- Surface / graphite raised: #101115
- Surface / inset: #0c0d10
- Text / silver: #f4f3f7
- Text / secondary: #a0a1ab
- Accent / signal violet: #b8a3ed
- Accent / success: #98c4b0
- Borders: white at 10%, emphasized at 18%
- Type: Manrope variable for interface and editorial headings. Geist Mono for code and actual data.
- Scale: 12, 13, 14, 16, 18, 20, 24, 36, 48, 60, 88px; fluid display sizes.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144px.
- Content width: 1160px. Main editorial text: 600px. Page gutters: 48px desktop, 24px mobile.
- Radii: buttons 8px, segmented controls 6px, product surfaces 16px.

## Story and composition

1. Centered category-clear headline, support sentence, free key CTA. Wide signature artwork underneath, with discreet source/signal annotations.
2. A full-width interactive stream explorer. Change scope, select a stream, inspect clearly labeled illustrative events.
3. A source-to-application diagram explains decoding and filtering. Three fine strands connect each source card to the Tessium core, then continue as three strands to the application. GSAP draws paths as the diagram enters view; moving pulses show direction.
4. Three bounded outcome cards: one wide market example, then paired alert and wallet examples. Purpose-built line drawings remain the main content of each illustration.
5. Reliability visualized with a reconnect/replay sequence and published latency figures. Avoid invented uptime or customer proof.
6. Copyable TypeScript/Python quickstart with acknowledged demo data, then Free, Starter, Pro, and Scale plan cards plus a separate Custom invitation. Close with an original vector horizon: a restrained, symmetrical fan of fine paths converges on a soft radial beacon beneath the “Follow the signal” CTA.

## Interaction and motion

Only actual controls and links get hover affordances. Use native scrolling; no scroll hijacking. GSAP draws the pipeline and gently translates the signature artwork with scrolling. CSS motion is limited to signal pulses and demonstration events. Respect prefers-reduced-motion automatically; no user-facing motion controls. JSON previews stop updating while being read. Mobile removes spatial complexity while retaining content and functionality. Keyboard navigation, visible focus, copy feedback, and accessible disclosure menus.

## Sources and claim boundaries

Reviewed 2026-09-13: https://tessium.dev/, /pricing, /solutions, /docs/quickstart, /docs/streams/, /docs/protocol/cursor.

- Eight stream names and scopes reflect published documentation.
- Published median latency 0.63s; p99 0.90s. These are site-reported observations, not guarantees.
- Free has 20 GB per month. Paid plans have no traffic limit. Avoid suggesting every plan is unmetered.
- Pricing checked against https://tessium.dev/pricing during annotation implementation: Free $0; Starter $39/month; Pro $79/month; Scale $239/month; Custom from $1,000. The homepage displays monthly prices and links to the full comparison and annual billing details.
- Replay windows vary by plan; never promise unlimited recovery.
- All animated events and charts are illustrative, not a connection to the production API.
- Logo and venue assets come from the existing public homepage.
- Outbound signup/docs/pricing routes resolve to Tessium's real site. This concept does not implement authentication or billing.

## Artwork

Generated with the built-in image tool, using the original mark as geometry reference. Exact request: an ultra-refined wide cinematic sculpture of the three converging logo streams, made from fine silver filaments, graphite ribbons, and restrained pale lavender edges, against black, with no typography or UI. File: public/assets/signal-sculpture.png. The tool does not expose an image-model selector.

Hero keeps its original contain composition and light edge mask. The opaque source raster uses lighten blending against an isolated graphite backdrop, with a mild black-point correction, so its darker background disappears without recropping the sculpture. Annotations use the existing surface, border, and silver text tokens in static pills. The closing visual is a separate SVG component, not a reuse of this raster.
