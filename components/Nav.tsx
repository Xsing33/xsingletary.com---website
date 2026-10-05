import Link from "next/link";
import { BOOKING_URL } from "@/lib/links";

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="logo">
          <span className="logo-mark"></span>Xavier Singletary
        </Link>
        <div className="nav-links">
          <Link href="/#problem">Problem</Link>
          <Link href="/#proof">Proof</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <a href={BOOKING_URL} className="nav-cta" target="_blank" rel="noopener noreferrer">
          Book a 30-minute call
        </a>
      </div>
    </nav>
  );
}
