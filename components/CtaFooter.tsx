import Link from "next/link";

export default function CtaFooter() {
  return (
    <>
      <section className="cta-block" id="book">
        <div className="wrap">
          <h2>The alternative is a $90K RevOps hire and a 6-month wait to find out if it works.</h2>
          <p>
            The diagnostic tells you exactly what to build first, and what it transfers to your stack, not
            just mine.
          </p>
          <Link href="/diagnostic" className="btn-primary">
            Book the diagnostic
          </Link>
        </div>
      </section>

      <footer>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <span>Xavier Singletary: GTM Engineering, Not Another Tool</span>
          <span className="mono">xsingletary.com</span>
        </div>
      </footer>
    </>
  );
}
