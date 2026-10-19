"use client";

import { useEffect } from "react";
import { BOOKING_URL } from "@/lib/links";

// GA4 currently only records pageviews, so there is no way to tell which page
// produces a booked call. This component adds the missing signal without
// touching any of the CTA markup: one delegated listener catches every click
// on the booking link (and on the soft /gtm-audit entry point) anywhere on the
// site, present or future.

const BOOKING_HOST = (() => {
  try {
    return new URL(BOOKING_URL).host;
  } catch {
    return "calendar.app.google";
  }
})();

const SOFT_CTA_PATH = "/gtm-audit";

// Explicit data-cta-location on the shared components wins; everything else
// falls back to where in the layout the link sits.
function resolveLocation(el: HTMLElement): string {
  if (el.dataset.ctaLocation) return el.dataset.ctaLocation;
  if (el.closest(".nav-panel")) return "mobile_nav";
  if (el.closest("nav")) return "nav";
  if (el.closest(".hero")) return "hero";
  if (el.closest(".resource-card")) return "resources";
  if (el.closest(".cta-block")) return "footer";
  return "inline";
}

function send(eventName: string, params: Record<string, unknown>) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  // Ad blockers strip gtag. Tracking must never break the click.
  if (typeof w.gtag !== "function") return;
  w.gtag("event", eventName, params);
}

function clean(label: string): string {
  return label.replace(/\s+/g, " ").trim().slice(0, 100);
}

export default function LeadTracking() {
  useEffect(() => {
    function handler(e: Event) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      const isBooking = url.host === BOOKING_HOST;
      const isSoftCta = !isBooking && url.pathname === SOFT_CTA_PATH;
      if (!isBooking && !isSoftCta) return;

      const label = clean(anchor.dataset.ctaLabel || anchor.textContent || "");
      const location = resolveLocation(anchor);

      send(isBooking ? "book_call_click" : "audit_cta_click", {
        cta_label: label,
        cta_location: location,
        cta_destination: anchor.href,
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    }

    document.addEventListener("click", handler, true);
    document.addEventListener("auxclick", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("auxclick", handler, true);
    };
  }, []);

  return null;
}
