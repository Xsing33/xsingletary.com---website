# Lead magnets

One JSON file per prospect one-pager. Rendered by `app/lead-magnets/[slug]/page.tsx`
at `/lead-magnets/<slug>` (e.g. `getwing.json` -> `/lead-magnets/getwing`).

**Before writing or editing any magnet, read the standard:**
`~/.hermes/skills/productivity/gtm-engineering/references/lead-magnet-standard.md`
This file is the in-repo summary. The skill file is the source of truth.

## The one rule

Read the posting, not the title. Every claim must trace to a line in that company's JD.
If you cannot point at the line, cut the claim.

## Procedure

1. Fetch the full JD from the ATS API. Never work from the title or a CSV row alone.
2. Extract: tool mentions **with counts** (frequency = core vs nice-to-have), stated
   outcomes/accountabilities, the **hard constraint**, the reporting line/buyer, and
   their vocabulary.
3. Make the hard constraint the `core: true` node of the build chain. Not the easy plumbing.
4. Map 3-4 JD pain points to what you'd ship.
5. Pick the proof that matches the problem. Closest real one; never invent a stat.
6. Headline = the insight in their terms. Body = their language.
7. Run the quality gate below before publishing.

## Hard rules

- **Core vs nice-to-have.** Never present a "Nice-to-Have" tool mention as their stack.
  (The getwing v1 bug: HubSpot/Salesforce were named once, under Nice-to-Have, and the
  copy called them "the CRM".)
- **Never say their system doesn't exist.** JDs say "build and maintain". Assume it exists.
- **Lead with the insight.** "Open N days" is a supporting fact, not a hook.
- **Their words, not ours.** Use their tool names and outcome metrics. Don't lead with
  Extract/Connect/Ship or Source/Engine/Routing.
- **Proof matches the problem.** An enrichment stat is not deliverability experience.
- **One ask, one duration.** Body ask and `cta.label` must agree.
- **Vary the timeline.** It must ladder to their constraint, not a fixed template.
- **Verify the recipient.** A slug-derived name must not appear until a human confirms
  the person and that they are the right buyer.
- **Plain and conversational.** Second person, contractions, short lines. No em dashes,
  no exclamation marks, no "excited / passionate / unlock / elevate / seamless / at
  scale", no "req".
- **Name the role exactly.** `{role}` resolves to the `role` field, which must match the
  JD title verbatim. Never "this role".

## Quality gate (all must pass)

- [ ] Every claim traces to a JD line
- [ ] Core tools separated from nice-to-haves
- [ ] Core build node addresses the hard constraint
- [ ] Headline is an insight, not elapsed time or a self-claim
- [ ] Copy uses their vocabulary
- [ ] Proof matches the problem domain, verbatim from the bank
- [ ] Body ask and CTA agree (one duration)
- [ ] Timeline ladders to their constraint
- [ ] Recipient verified + correct buyer, or omitted
- [ ] No em dashes, no exclamation marks, no banned words

## Lifecycle (60 days by default)

- Add `<slug>.json` -> push -> Railway auto-deploys -> page live at `/lead-magnets/<slug>`.
- `noindex, nofollow, nocache` — prospect-specific, never in search.
- `expiresAt` is the kill date. The route is `force-dynamic`, so once it passes the page
  404s on its own — no redeploy. Delete the file with `node scripts/prune-lead-magnets.mjs`.

## Fields (only `slug`..`intro` are required)

`slug`, `company`, `contactName`, `contactTitle?`, `role`, `daysOpen?`, `createdAt`,
`expiresAt`, `eyebrow`, `headline` (array of `{t, hl?}`), `intro`, and then any of these
optional sections — omit a key and its section disappears, so shorter stays shorter:

- `build` — `{ chain: {k?, t, d, core?}[], outputsLabel?, outputs?: {t, d}[] }`
- `timeline` — `{ w, h, p }[]`  (the three-week plan)
- `steps` — `{ n, h, p }[]`  (only if a magnet needs its own "how it works")
- `outcomes` — `{ t, d }[]`
- `proof` — `{ nums?: {v, l}[], line?: string, cap }`  (use `line` when there's no number)
- `ask` — `{ t, p }`
- `cta` — `{ label, url, micro? }`  (renders 3 times: hero, after the plan, and the ask; omit and no CTA shows)
- `contact` — `{ email }`  (renders in the footer)

## Proof bank (verbatim only)

- Account-to-Outbound: 11,000 accounts enriched, 93.9% of contacts verified
- Gong Call Intelligence: 90.8% of buyer pains unprobed across 318 calls
- Apollo Pipeline Orchestrator: in daily use by AEs
- Clay + HubSpot lead scoring model

## Known failure modes

| Failure | Seen as | Why it kills the call |
|---|---|---|
| Nice-to-have as core | "HubSpot and Salesforce as the CRM" | Reader wrote the posting; they know you skimmed |
| Missing the hard part | Deliverability at 250k never mentioned | You solved the problem they already solved |
| Template timeline | Same 3-week plan every magnet | Signals no one read the posting |
| Unverified name | "FOR MATTHEW" from `/in/matthewlonsinger` | Naming a stranger on a document |
| Two asks | "15 minutes" + "Book a 30-minute call" | Reads as unconsidered |
| Mismatched proof | Enrichment stat as proof of sending at scale | Overclaims; a sharp reader catches it |

## Reference magnet

`getwing.json` is the current best example. Older magnets (harvey, jetsonhome, campfire)
predate the standard and need a pass before they go out.