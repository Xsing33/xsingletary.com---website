# SEO Content Agent — Architecture Spec

An AI-powered content engine for xsingletary.com that writes blogs, tracks
performance via GA4 + Search Console, and self-corrects based on what's driving
traffic and diagnostic bookings. Modeled on the Claude Code SEO Harness loop
but adapted to Xavier's stack: Next.js (self-hosted blog), Hermes cron jobs,
and GA4 (no PostHog, no WordPress).

## The loop

```
GA4 + Search Console data
        │
        ▼
  Analytics cron ──► weekly summary: top pages, traffic sources, keyword
  (Hermes, weekly)    impressions, conversion events (diagnostic/bookings)
        │
        ▼
  Idea generator ──► reads summary + 60/30/10 content strategy
  (Hermes, weekly)    proposes 3-5 blog topics with rationale
        │
        ▼
  Xavier review ──── approves/rejects/edits topics
        │
        ▼
  Drafting agent ─── writes full blog post → JSON file in content/blog/
  (Hermes, on-demand)  formats for human + AI readability
        │
        ▼
  Xavier review ──── final sign-off before publish
        │
        ▼
  Publish ────────── git push → Railway deploy → live at /blog/<slug>
        │
        ▼
  Optimizations ──── update sitemap.xml (new blog entry)
  (auto on publish)   update llms.txt (new blog entry)
                      inject JSON-LD Article schema
                      cross-link from relevant FAQ answers if topical match
        │
        ▼
  (loop back to GA4 tracking)
```

## Components

### 1. Blog infrastructure — JSON-driven content type

Pattern matches existing lead-magnet system but public and indexed.

**Route:** `app/blog/[slug]/page.tsx` — Next.js dynamic route

**Data:** `content/blog/<slug>.json` — one file per post

**Schema:**
```json
{
  "slug": "why-reps-guess-who-to-call",
  "title": "Why Your Reps Are Still Guessing Who to Call",
  "date": "2026-10-06",
  "author": "Xavier Singletary",
  "tags": ["outbound", "account-prioritization", "sales"],
  "eyebrow": "ACCOUNT PRIORITIZATION · 5 MIN READ",
  "summary": "Most outbound fails before the first email...",
  "content": "<markdown or structured HTML blocks>",
  "seo": {
    "title": "Why Reps Guess Who to Call | Xavier Singletary",
    "description": "...",
    "canonical": "/blog/why-reps-guess-who-to-call"
  },
  "cta": {
    "label": "Run the diagnostic",
    "url": "https://calendar.app.google/uEChwoVqcWCW9otf9"
  }
}
```

**Page generation on publish:**
- `<title>` from `seo.title`
- `<meta name="description">` from `seo.description`
- JSON-LD `Article` schema (headline, datePublished, author, description)
- BreadcrumbList schema (Home > Blog > Post Title)
- AEO block per post ("Ask any AI about this article")
- CTA at bottom → diagnostic/booking

**Indexing:** `index, follow` on every blog post. Sitemap auto-updated with
`<lastmod>` and `<changefreq>weekly</changefreq>`.

### 2. Analytics cron — GA4 Data API + Search Console

**Schedule:** Weekly (Mondays), Hermes cron job

**Inputs:**
- GA4 Data API (`G-K0NXLY5ZE6`) → page views by path, traffic source/medium,
  event counts (diagnostic form submissions, booking link clicks)
- Google Search Console API → search queries driving impressions/clicks,
  average position, CTR per query

**Output:** A weekly summary written to a dated markdown file
(`content/analytics/2026-W41.md`) covering:
- Top 5 pages by traffic (last 7 and 28 days)
- Top 5 search queries driving impressions
- New blog posts published that week + their early traction
- Conversion events (booking clicks, diagnostic form submits)
- Traffic source mix (% organic, % direct, % referral, % YouTube)
- Notable: any page with high impressions but low CTR (optimization candidate)

**Auth:** Both APIs require OAuth2 with a Google service account. One-time
setup: create service account in Google Cloud Console, grant access to GA4
property and Search Console property, download JSON key, store in
`~/.hermes/` (chmod 600). Hermes cron job reads the key from disk.

**Pitfall:** GA4 Data API has 24-48 hour data latency. Monday summary covers
the prior Mon-Sun window, not "today."

### 3. Idea generator — topic proposals from data + strategy

**Schedule:** Weekly (Mondays, after analytics cron — `context_from` the
analytics job so it reads the fresh summary)

**Inputs:**
- Weekly analytics summary
- 60/30/10 content strategy framework:
  - 60% problem-aware (diagnose pain, give free win)
  - 30% solution-aware (category/comparison content)
  - 10% product-aware (case studies, proof)
- Existing blog inventory (avoid duplicates)
- Competitor blog monitoring (optional future feed)

**Output:** 3-5 topic proposals, each with:
- Working title
- Category (problem-aware / solution-aware / product-aware)
- Rationale (which analytics signal supports this topic)
- Target keyword(s) from Search Console data
- Suggested free win (for problem-aware posts)
- Draft priority (high/medium/low)

**Delivery:** Drops a markdown file for Xavier to review (Slack DM or local
file). He approves/rejects/edits before anything gets drafted.

### 4. Blog drafting agent

**Trigger:** Xavier approves a topic (manual trigger or simple flag file)

**Inputs:**
- Approved topic proposal (title, category, keywords, free win)
- Xavier's voice/style reference:
  - Plain, conversational, second person, short lines
  - No jargon, no em dashes, no exclamation marks
  - No "excited / passionate / unlock / elevate / seamless / at scale"
  - Proof must match problem domain (verbatim from proof bank)
- Site proof bank (from llms.txt and FAQ):
  - 90.8% of buyer pains unprobed (318 calls)
  - 11,000 accounts enriched, 93.9% verified
  - Apollo Pipeline Orchestrator in daily use
  - ICP model from 78 closed-won deals
  - $40K intent contract → (REMOVED — do not reference)

**Output:** A complete `content/blog/<slug>.json` file with all fields
populated. Content is markdown (headings, paragraphs, lists, bold for emphasis).
No images unless Xavier provides them.

**Quality gate (before Xavier review):**
- [ ] Title is an insight, not a self-claim
- [ ] Every claim traces to proof-bank receipt
- [ ] Free win is concrete and copy-paste-able (if problem-aware)
- [ ] CTA is diagnostic → booking link
- [ ] No banned words, no em dashes, no exclamation marks
- [ ] JSON validates, slug is unique

### 5. AEO/GEO automation — AI-search optimization

Runs automatically as part of publish. Xavier already has:
- `public/llms.txt` — add new blog entry under key pages
- `public/sitemap.xml` — add `<url>` for new blog post
- FAQ pages with JSON-LD FAQ schema
- Homepage with Person/ProfessionalService schema

**On each blog publish, the agent:**
1. Appends blog entry to `llms.txt` (under a `## Blog` section)
2. Appends `<url>` block to `sitemap.xml`
3. Injects JSON-LD `Article` schema into the blog page
4. Checks if the blog topic overlaps with any FAQ answer → adds a
   cross-link from the FAQ answer body to the blog post

**Why this matters:** AI search engines (ChatGPT, Claude, Gemini, Perplexity)
pull from llms.txt, structured data, and crawlable text. Blogs formatted
for both human readability and AI extraction get cited more often. The
AeoBlock already on the site ("Ask any AI about me") closes the loop.

## Implementation phases

### Phase 1: Blog infrastructure (ship one manual post)

- [ ] Create `app/blog/[slug]/page.tsx` route
- [ ] Define `content/blog/` directory + JSON schema
- [ ] Add Article JSON-LD schema injection
- [ ] Wire up metadata (title, description, canonical, OG)
- [ ] Write ONE manual blog post to prove the format
- [ ] Add blog entry to sitemap.xml and llms.txt
- [ ] Deploy → live at `/blog/<slug>`

### Phase 2: Analytics cron

- [ ] Set up Google service account + OAuth2
- [ ] Write Hermes cron job: GA4 Data API query → weekly summary
- [ ] Write Hermes cron job: Search Console API query → keyword summary
- [ ] Run once manually, verify data is accurate
- [ ] Set schedule (weekly, Monday AM)

### Phase 3: Drafting pipeline

- [ ] Idea generator cron (reads analytics summary → topic proposals)
- [ ] Blog drafting agent (reads approved topic → writes JSON)
- [ ] Publish automation (updates sitemap, llms.txt, FAQ cross-links)
- [ ] Set `context_from` chain: analytics → ideas → drafts

## What this is NOT

- Not autonomous publishing. Xavier reviews every blog before it ships.
- Not a PostHog replacement. No session replays, no CRO from screen
  recordings.
- Not a WordPress integration. Blog lives in the same Next.js app as the
  rest of the site.
- Not a "set and forget" system. It's a force multiplier — Xavier still
  steers strategy, approves topics, and reviews final drafts.

## Open decisions

1. **Blog content format:** Markdown rendered at build time, or structured
   JSON blocks (like lead-magnets with `{t, d}` sections)? Markdown is simpler
   for drafting; structured blocks are cleaner for the AEO extraction layer.
   Recommendation: markdown in the JSON `content` field, rendered via a
   markdown-to-HTML function at build time.

2. **Commentary/opinion posts vs how-to posts:** The 60/30/10 framework
   favors problem-diagnosis + free-win how-to content. Pure opinion/meta
   commentary (like the video we watched) serves a different audience.
   Recommendation: start with how-to/problem-aware; add commentary later
   if there's demand.

3. **Blog publishing cadence:** The video creator does multiple posts per day.
   For Xavier's audience (Series B/C GTM leaders), 1-2 posts per week is
   more appropriate — depth over volume. The analytics loop still works at
   that pace, it just takes longer to converge on winning topics.

4. **Competitor monitoring feed:** The video includes competitor blogs as a
   content feed. For Xavier, this would mean monitoring other GTM engineering
   / RevOps consultants' blogs. Low priority for phase 1.

## Reference: mapped to the YouTube video's architecture

| Video (Claude Code SEO Harness) | Xavier's version |
|---|---|
| PostHog (analytics + session replay) | GA4 Data API + Search Console API |
| WordPress API (blog publishing) | Next.js JSON-driven blog (same app) |
| Creator OS API (proprietary) | N/A (Hermes cron jobs are the orchestration) |
| Claude Code (agent) | Hermes Agent (same capability, already running) |
| Session replay → CRO | Skipped (YouTube theater for his use case) |
| Auto-publish without review | Xavier reviews every post (non-negotiable) |
| Multiple posts per day | 1-2 posts per week (depth over volume) |
| 9 pillars of SEO | AEO/GEO layer already partially built (llms.txt, FAQ schema) |

## Files this touches

| File | Change |
|---|---|
| `app/blog/[slug]/page.tsx` | New — blog route |
| `content/blog/<slug>.json` | New — per post |
| `content/blog/README.md` | New — blog content standard (like lead-magnet README) |
| `public/sitemap.xml` | Modified — auto-add blog URLs |
| `public/llms.txt` | Modified — auto-add blog section |
| `content/faq.json` | Possibly modified — cross-links from FAQ to blog |
| `~/.hermes/cron/` | New — analytics + idea generator + drafting jobs |