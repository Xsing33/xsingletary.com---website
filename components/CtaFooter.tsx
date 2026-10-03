import { BOOKING_URL } from "@/lib/links";

export default function CtaFooter() {
  return (
    <>
      <section className="cta-block" id="book">
        <div className="wrap">
          <a href={BOOKING_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book a 30-minute call
          </a>
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
