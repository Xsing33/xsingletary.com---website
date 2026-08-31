import Link from "next/link";

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
          <Link href="/#faq">FAQ</Link>
        </div>
        <Link href="/diagnostic" className="nav-cta">
          Get the framework
        </Link>
      </div>
    </nav>
  );
}
