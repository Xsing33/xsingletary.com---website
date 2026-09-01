export default function Plan() {
  return (
    <section className="border-y">
      <div className="wrap" style={{ position: "relative" }}>
        <div className="section-head reveal">
          <h2>Three steps. No pricing games.</h2>
          <p>Structure is fixed. Price comes after the diagnostic, not before it.</p>
        </div>

        <svg className="connector" id="planConnector" viewBox="0 0 1116 2" preserveAspectRatio="none">
          <line x1="0" y1="1" x2="1116" y2="1" stroke="var(--line-bright)" strokeWidth="1" />
          <path
            id="planConnectorPath"
            d="M 0 1 L 1116 1"
            stroke="var(--cyan)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="1116"
            strokeDashoffset="1116"
          />
        </svg>

        <div className="plan-grid">
          <div className="plan-cell reveal">
            <span className="plan-index">01 / DIAGNOSTIC · 1–2 WEEKS</span>
            <h3>I map your stack</h3>
            <p>I map your stack and pipeline, then tell you exactly what&apos;s broken and what to build.</p>
          </div>
          <div className="plan-cell reveal">
            <span className="plan-index">02 / BUILD · 4–12 WEEKS</span>
            <h3>I build it</h3>
            <p>
              You keep everything: the system runs on your stack, not a platform you rent from me. Timeline
              depends on scope, set in the diagnostic.
            </p>
          </div>
          <div className="plan-cell reveal">
            <span className="plan-index">03 / RETAINER · ONGOING</span>
            <h3>I tune it</h3>
            <p>As your team and stack change, the system gets tuned to keep up. Optional, month to month.</p>
          </div>
        </div>

        <div className="guarantee reveal">
          If your reps don&apos;t tell me it saves them 30 minutes a day within the first week, you
          don&apos;t pay the final invoice.
          <div className="kept">
            You keep the ICP report regardless. And if the diagnostic shows this isn&apos;t a fit, you keep
            the findings and walk away. No build, no obligation.
          </div>
        </div>
      </div>
    </section>
  );
}
