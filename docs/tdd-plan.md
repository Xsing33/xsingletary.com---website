## TDD Execution Plan: xsingletary.com rebuild

### Phase 1: Project scaffold
**Build:** Next.js 15 (App Router, TypeScript) project via `create-next-app`, stripped of template
boilerplate. `docs/` folder carries this spec + plan forward.
**Test:** `npm run dev` serves a blank app with no errors; `npm run build` succeeds.
**Gate:** Pass before any component work.

### Phase 2: Design system port
**Build:** Extract the mockup's `<style>` block into `app/globals.css` — fonts, CSS custom properties,
section scaffolding, motion utilities — unchanged.
**Test:** A throwaway test page using a few of the ported classes (nav, btn-primary, section-eyebrow)
visually matches the mockup's styling.
**Gate:** Pass before building real page components against it.

### Phase 3: Home page port
**Build:** Break the mockup into components (Nav, Hero, CostGrid, ProofGrid, PainList, Guide, Plan, FAQ,
AeoBlock, CtaFooter) rendered from `app/page.tsx`. Port the inline `<script>` behavior (scroll-reveal via
IntersectionObserver, radar blip tooltips, plan connector line, grid parallax) as a client component/hook,
preserving `prefers-reduced-motion` and `(hover: none)` handling.
**Test:** Side-by-side visual check against the original HTML file at desktop (1180px+) and mobile
(<860px) breakpoints. Scroll-reveal, radar tooltip hover, and proof-card hover/tap-to-expand all function.
**Gate:** Pass before repointing CTAs.

### Phase 4: CTA rewiring + diagnostic placeholder route
**Build:** Repoint `#lead-magnet` hero CTA and `xavier-diagnostic-checklist.html` footer CTA to `/diagnostic`.
Add a minimal `/diagnostic` route (placeholder content, on-brand styling) so no link 404s.
**Test:** Click both CTAs from the deployed/dev build; land on `/diagnostic` with no dead link, no console
error.
**Gate:** Pass before deploy.

### Phase 5: GitHub + Railway deploy
**Build:** Push to a new GitHub repo (blocked on Xavier providing a repo, per spec's open item #2); connect
Railway service to it via the Railway MCP tools; confirm auto-deploy fires on push, falling back to
`railway up` if not (per the `railway-ship` pattern).
**Test:** Railway-issued URL loads the live site; matches the local build.
**Gate:** Pass = site is live and reachable.

### Final Integration Test
Input: Fresh clone of the repo, `npm install && npm run build`.
Expected output: Clean build, home page and `/diagnostic` both render and match the mockup's visual/motion
behavior; both CTAs route correctly; deployed Railway URL serves the same thing.
Pass criteria: All of the above true with zero manual patching after clone.

### Deferred (separate phase once its mockup arrives)
- `/diagnostic` full build: real diagnostic-checklist form fields, submission persistence, Calendly embed
  on success. Gets its own short TDD addendum once the field list is known — not guessed now.
