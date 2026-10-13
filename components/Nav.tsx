import Link from "next/link";
import { BOOKING_URL } from "@/lib/links";
import MobileMenu from "./MobileMenu";

export const NAV_LINKS = [
  { href: "/#problem", label: "Problem" },
  { href: "/#proof", label: "Proof" },
  { href: "/what-is-gtm-engineering", label: "GTM engineering" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="logo">
          <span className="logo-mark"></span>Xavier Singletary
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <a href={BOOKING_URL} className="nav-cta" target="_blank" rel="noopener noreferrer">
          Book the diagnostic
        </a>
        <MobileMenu links={NAV_LINKS} bookingUrl={BOOKING_URL} />
      </div>
    </nav>
  );
}
