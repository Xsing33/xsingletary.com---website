## Project: xsingletary.com rebuild
## Date: 2026-08-31
## Owner: Xavier Singletary

### 1. Purpose
Rebuild Xavier's personal GTM-engineering consulting site from static HTML mockups into a real, deployable
Next.js codebase that ships to GitHub → Railway. The site's job: convert Series B/C GTM leaders into booked
diagnostic calls by proving (with real, live Gather AI systems) that Xavier builds GTM engineering, not
another SaaS tool.

### 2. Scope
**In:**
- Next.js (App Router, TypeScript) project scaffold, deployed on Railway, source on a new GitHub repo.
- Home page ported pixel-for-parity from `xsingletary-mockup-v2 (1).html` (hero, cost grid, proof cards,
  pain quotes, guide/bio, 3-step plan, FAQ, AEO block, CTA footer).
- Shared design system (fonts, CSS variables, section scaffolding) extracted into global CSS + reusable
  components, so future mockup pages drop in without re-deriving the visual language each time.
- A `/diagnostic` (working name) booking route: custom form capturing diagnostic-checklist fields, on
  submit surfaces a Calendly embed/link for scheduling. Field list TBD — depends on the not-yet-provided
  mockup for this page.
- Form submissions land somewhere durable now (proposed: Railway Postgres table) with a clearly marked
  seam to swap the write target to Notion later — not blocking on Notion being ready today.
- Additional pages added incrementally as Xavier sends more mockups.

**Out (for this pass):**
- Notion integration itself (field mapping happens later; today's form just needs to not lose data).
- Analytics/tracking setup, custom domain DNS cutover, SEO metadata beyond basics — flagged as follow-ups.
- Any content/copy changes beyond what's in the supplied mockups.

### 3. Inputs
- `xsingletary-mockup-v2 (1).html` — static HTML/CSS/JS mockup, home page. Source of truth for design
  tokens, layout, copy, and micro-interactions (scroll reveals, radar sweep, hover-expand proof cards).
- Future: mockup for the `/diagnostic` (book-a-demo) page — diagnostic checklist fields, Calendly link.
- Future: additional page mockups as Xavier sends them.

### 4. Outputs
- A Next.js app, source-controlled in a new GitHub repo, auto-deploying to a new Railway service.
- Live URL on Railway's default domain initially; xsingletary.com DNS cutover is a later, separate step.
- `/` — home page, matching the mockup.
- `/diagnostic` — placeholder page/route wired up now (so nav + CTA links resolve), fully built once its
  mockup + Calendly link arrive.

### 5. System Components
- **Next.js** (App Router, TS) — application framework.
- **Railway** — hosting/deploy target. New service, connected to the new GitHub repo for auto-deploy on
  push (per Xavier's standing preference — plain `git push` isn't reliable there; use the deploy skill's
  verify-and-fallback pattern once connected).
- **GitHub** — source control, new repo. *No `gh` CLI or GitHub token available in this environment* — repo
  creation/initial push needs Xavier to either create the empty repo and hand me the remote URL, or run the
  `gh repo create` step themselves.
- **Calendly** — scheduling, link to be provided by Xavier.
- **Notion** (future) — destination for diagnostic form field data; not wired this pass.
- **Railway Postgres** (proposed interim) — durable store for form submissions until Notion is wired.

### 6. Logic / Rules
- Visual/motion parity with the mockup is the bar for the home page — same breakpoints, same reveal-on-
  scroll behavior, same reduced-motion handling.
- CTAs that currently point at `#lead-magnet` / `xavier-diagnostic-checklist.html` in the mockup get
  repointed to `/diagnostic`.
- Diagnostic form: on valid submit → persist submission → show Calendly for scheduling. Exact field set
  and validation rules are TBD pending that page's mockup — this spec will get a short addendum then
  rather than guessing the schema now.

### 7. Edge Cases & Guardrails
- Reduced-motion users: all animation/parallax must degrade to static (mockup already handles this — must
  carry over, not regress).
- No-JS / hover-incapable (touch) devices: proof cards must remain readable (mockup already has a
  `(hover: none)` fallback — carry over).
- Diagnostic form: block submission with missing required fields; never silently drop a submission if the
  persistence write fails — surface an error to the user rather than a false-success state.

### 8. Success Criteria
- Home page renders in Next.js dev/prod build with no visual regressions vs. the mockup (manual side-by-side
  check across desktop + mobile breakpoints).
- All internal nav/CTA links resolve to a real route (no dead links to files that don't exist in the app).
- Project builds clean (`npm run build`) with no console errors.
- Repo pushes to GitHub and deploys successfully on Railway, reachable at its Railway-issued URL.
- `/diagnostic` route exists and does not 404, even before its final content is built.

---
### Open items / assumptions flagged for Xavier
1. **Railway Postgres for interim form storage** — proposed default; say no and I'll use something lighter
   (e.g., just a Slack notification per submission) instead.
2. **GitHub repo creation** — I have no `gh` CLI or token in this environment. When we get to Step 4
   (deploy), I'll need you to either create an empty repo on github.com and give me the remote URL, or
   install/auth `gh` yourself.
3. **`/diagnostic` route naming** — used as a working name; rename if you have a preferred URL slug.
4. Git commits in this repo will use your global git identity, currently set to your Gather AI email
   (`xavier.singletary@gather.ai`). Flag if you want a personal identity for this repo instead.
