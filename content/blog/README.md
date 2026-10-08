# Blog content standard

Blog posts live at `content/blog/<slug>.json` and render at `/blog/<slug>`.
They follow the same pattern as lead magnets (JSON-driven, one file per post)
but are public and indexed.

## Fields

`schema_version: 1` for any forward-compatibility (future).

**Required:** `title`, `date` (YYYY-MM-DD), `author`, `tags`, `eyebrow`,
`summary`, `content` (HTML), `seo` (title, description, canonical),
`cta` (label, url).

## Procedure

1. Confirm the topic against the 60/30/10 content strategy.
2. Check the keyword map for target queries.
3. Draft in Xavier's voice: plain, conversational, second person, short lines.
   No jargon, no em dashes, no exclamation marks. No banned words.
4. Every claim must trace to the proof bank (see site llms.txt).
5. Every problem-aware post must include a free win.
6. Include HTML semantic elements (h2, p, ul, strong) for screen readers and
   AI extraction. The blog renders HTML directly.
7. CTA must be "Run the diagnostic" -> booking link.
8. Quality gate before publish:
   - [ ] Title is an insight, not a self-claim
   - [ ] Free win is concrete and copy-paste-able (if problem-aware)
   - [ ] No banned words, no em dashes, no exclamation marks
   - [ ] JSON validates, slug is unique
   - [ ] Tags are relevant (1-3 tags)

## On publish

- The blog page auto-injects Article + BreadcrumbList JSON-LD schema.
- Sitemap.xml auto-includes the new blog post URL (dynamic route).
- llms.txt must be updated with the new blog entry (manual until Phase 3 automation).
- FAQ cross-links: if the blog overlaps with any FAQ answer topic, add a link
  from the FAQ answer to the blog (manual until Phase 3 automation).

## Proof bank (verbatim only)

- 318 sales calls analyzed: 90.8% of buyer pains unprobed by reps
- 11,000 accounts enriched, 93.9% of contacts verified
- Apollo Pipeline Orchestrator: in daily use by AEs
- ICP model from 78 closed-won deals; data contradicted team assumptions
- Clay + HubSpot lead scoring: every lead scored before a rep sees it
- Gong Call Intelligence Pipeline: 1,139 rep questions classified across 318 calls

## Lifecycle

No auto-expiry (unlike lead magnets). Posts are evergreen until marked as
`superseded` or `archived`. To retire a post, add `"status": "archived"` to
its JSON and it'll 404.