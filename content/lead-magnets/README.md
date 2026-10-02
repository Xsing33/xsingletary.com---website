# Lead magnets

One JSON file per prospect one-pager. Rendered by `app/lead-magnets/[slug]/page.tsx`
at `/lead-magnets/<slug>` (e.g. `getwing.json` -> `/lead-magnets/getwing`).

## Lifecycle (60 days by default)

- Add `<slug>.json` -> push -> Railway auto-deploys -> page live at `/lead-magnets/<slug>`.
- The page is `noindex, nofollow, nocache` — prospect-specific, never in search.
- `expiresAt` is the kill date. The route is `force-dynamic`, so once the date passes the
  page returns a 404 on its own — no redeploy needed.
- Delete the file itself with `node scripts/prune-lead-magnets.mjs` (add `--dry` to preview).

## Fields

`slug`, `company`, `contactName`, `contactTitle`, `role`, `daysOpen`, `createdAt`,
`expiresAt`, `eyebrow`, `headline` (array of `{t, hl?}` segments — `hl` gets the accent
color), `intro`, `build.chain[]` / `build.outputs[]` (`{k?, t, d, core?}`), `steps[]`
(`{n, h, p}`), `timeline[]` (`{w, h, p}`), `outcomes[]` (`{t, d}`), `proof` (`{nums[],
cap}`), `ask` (`{t, p}`).

Copy `getwing.json` as the template. Keep every claim grounded in the real JD and the
proof bank (Gong 90.8%/318 calls; Account-to-Outbound 11,000/93.9%; Apollo Orchestrator;
Clay + HubSpot scoring). Never invent a statistic.