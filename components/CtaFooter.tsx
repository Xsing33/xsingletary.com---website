import { BOOKING_URL } from "@/lib/links";

export default function CtaFooter() {
  return (
    <>
      <section className="cta-block" id="book">
        <div className="wrap">
          <p className="cta-guarantee">
            If your reps don&apos;t tell me it saves them 30 minutes a day in the first week,
            you don&apos;t pay the final invoice. You keep the ICP report regardless.
          </p>
          <a href={BOOKING_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Run the diagnostic
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