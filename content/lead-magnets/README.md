# Lead magnets

One JSON file per prospect one-pager. Rendered by `app/lead-magnets/[slug]/page.tsx`
at `/lead-magnets/<slug>` (e.g. `getwing.json` -> `/lead-magnets/getwing`).

## Copy strategy

- Plain words. Never "req" (people don't know it). Say role, posting, the job.
- Lead with their situation, briefly and factually. No gotcha, no hard sell.
- Economy of words. If a line doesn't add a fact, cut it. They opened it; respect their time.
- Write like one person to another. Contractions, short sentences. No em dashes, no
  "excited / passionate / unlock / elevate / seamless / at scale". No exclamation marks.
- One proof, grounded. Never invent a statistic (bank below).
- Plain, low-friction ask with an easy way to reply.

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
- `contact` — `{ email }`  (renders in the footer)

## Proof bank (verbatim only)

- Account-to-Outbound: 11,000 accounts enriched, 93.9% of contacts verified
- Gong Call Intelligence: 90.8% of buyer pains unprobed across 318 calls
- Apollo Pipeline Orchestrator: in daily use by AEs
- Clay + HubSpot lead scoring model

Copy `getwing.json` as the template.