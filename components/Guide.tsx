export default function Guide() {
  return (
    <section id="guide">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">WHO&apos;S BUILDING THIS</div>
          <h2>The guide, not the hero</h2>
        </div>

        <div className="guide-grid">
          <div className="guide-bio reveal">
            <p>
              I&apos;m a <strong>GTM Engineer at Gather AI</strong>. My approach is simple: extract the
              intelligence already sitting in your tools, connect it across systems that don&apos;t talk to
              each other, and ship it to the people who need it.
            </p>
            <p>Now I build the same kind of systems for Series B/C GTM teams living the same problem.</p>

            <div className="transparency-box">
              <span className="mono-tag">TRANSPARENCY</span>
              Everything below is live at one company: Gather AI, where I&apos;m the GTM Engineer. No client
              roster, no agency case studies. These are systems I built, shipped, and run myself. The
              diagnostic exists to prove they transfer to your stack, not just mine.
            </div>
          </div>

          <div className="receipts reveal">
            <div className="receipt">
              <div className="receipt-stat">90.8%</div>
              <div className="receipt-source">
                of buyer pains went unprobed
                <br />
                GONG CALL INTELLIGENCE
              </div>
            </div>
            <div className="receipt">
              <div className="receipt-stat">11,000 / 93.9%</div>
              <div className="receipt-source">
                accounts enriched, verified
                <br />
                ACCOUNT-TO-OUTBOUND PIPELINE
              </div>
            </div>
            <div className="receipt">
              <div className="receipt-stat">Live</div>
              <div className="receipt-source">
                in daily use by AEs
                <br />
                APOLLO PIPELINE ORCHESTRATOR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
