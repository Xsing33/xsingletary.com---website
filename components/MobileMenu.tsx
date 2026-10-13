"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

// Mobile-only disclosure menu. Desktop never sees it: the toggle is
// display:none above the breakpoint and the panel is display:none outside
// the media query, which also covers resizing from mobile to desktop with
// the menu open.
export default function MobileMenu({
  links,
  bookingUrl,
}: {
  links: NavLink[];
  bookingUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        // focus would otherwise be lost when the panel unmounts
        btnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>

      {open && (
        <div className="nav-panel" id="mobile-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a
            href={bookingUrl}
            className="btn-primary nav-panel-cta"
            data-cta-location="mobile_nav"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book the diagnostic
          </a>
        </div>
      )}
    </>
  );
}
