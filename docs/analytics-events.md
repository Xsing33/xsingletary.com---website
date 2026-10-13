# Analytics events

GA4 property `G-K0NXLY5ZE6`. Pageviews are automatic. The two events below are
the ones that matter for lead optimization, and they are sent by a single
client component, `components/LeadTracking.tsx`, mounted once in `app/layout.tsx`.

## Why it works this way

There are about 20 booking links across the site, and more will be added. Rather
than wrap every anchor in a tracked component, one delegated click listener
catches any click on the booking host or on the soft `/gtm-audit` entry point,
wherever it appears. New CTAs are tracked automatically. No CTA markup depends
on it, and if the listener fails the link still works.

## Events

| Event | Fires when | Params |
|---|---|---|
| `book_call_click` | any click on a link to the booking host | `cta_label`, `cta_location`, `cta_destination`, `page_path`, `page_location` |
| `audit_cta_click` | any click on an internal link to `/gtm-audit` | same |

`cta_location` values:

- `hero`: home hero primary button
- `nav`: desktop nav button
- `mobile_nav`: hamburger panel button
- `footer`: the shared CTA block at the bottom of every page
- `inline`: a CTA inside page body content

The shared components set `data-cta-location` explicitly. Inline CTAs fall back
to the section they sit in. `page_path` is what tells you which page produced
the click, which is the whole point: it is the per-page lead signal that did not
exist before.

## One-time step in the GA4 UI

`book_call_click` has to be marked as a key event, otherwise it shows up in
reports but is not counted as a conversion:

1. GA4 → Admin → Data display → Events
2. Find `book_call_click`, toggle **Mark as key event**
3. Repeat for `audit_cta_click` if we want soft conversions counted too

Pitfall: an event does not appear in that list until GA4 has received it at
least once, so this step can only be done after the first real click lands
(realistically 24-48 hours after this ships).

## Notes

- ad blockers strip `gtag`. The listener checks for it and returns quietly, so
  tracking failure never breaks the click.
- the listener does not call `preventDefault`. Booking links open in a new tab,
  so the page is still alive when the event fires.