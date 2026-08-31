## Demo Review: xsingletary.com rebuild — Phase 1 (scaffold + home page port)

### Test Case 1 — Home page visual parity
Input: `npm run dev`, screenshot `/` at 1440px and 390px via headless Chromium.
Expected: Matches `xsingletary-mockup-v2 (1).html` structurally and visually, section-for-section.
Actual: Pixel-matching layout, type, spacing, and colors at both breakpoints. Only diff: hero CTA copy
changed from "Get the 90.8% Call Breakdown →" to "Book the diagnostic →" (intentional — see note below).
Pass/Fail: **Pass**

### Test Case 2 — `/diagnostic` route resolves
Input: nav CTA, hero CTA, and footer CTA clicks; direct load of `/diagnostic`.
Expected: No 404s; on-brand placeholder page.
Actual: All three CTAs route to `/diagnostic`; renders styled placeholder with a working `mailto:` fallback.
Pass/Fail: **Pass**

### Test Case 3 — Build health
Input: `npx tsc --noEmit`, `npm run build`, `npm run lint`.
Expected: Zero errors.
Actual: Clean on all three (`tsc` needed one `next build` pass first to generate route types — expected
with Next.js 16's typed routes, not an error).
Pass/Fail: **Pass**

### Test Case 4 — Console/runtime errors
Input: Chromium `console`/`pageerror` listeners across all captured pages.
Expected: None.
Actual: None.
Pass/Fail: **Pass**

### Edge Cases
- Reduced-motion / touch-only fallback CSS carried over verbatim from the mockup — not independently
  re-tested this pass (visual/structural port only, logic unchanged from source).

### Final Verdict
- [x] Passes success criteria from `docs/spec.md` for this phase (home page port, build health, no dead
      links)
- [ ] Known gaps / deferred items:
  - `/diagnostic` is a placeholder — real diagnostic-checklist form (fields TBD), Notion write, and
    Calendly embed are a separate phase once that mockup + Calendly link arrive.
  - Hero CTA copy changed to "Book the diagnostic →" since the lead-magnet framing no longer applies —
    flagging in case you want different wording.
  - Not yet pushed to GitHub / deployed to Railway — blocked on an empty GitHub repo (no `gh` CLI or token
    in this environment).
  - Font loading still via CSS `@import` (ported verbatim from mockup) rather than `next/font` — works,
    but a later pass could switch for perf.
- [ ] Approved to ship / merge / activate — pending your review of the screenshots + these open items.
