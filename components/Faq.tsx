const FAQS = [
  {
    q: "What does Xavier Singletary do?",
    a: "Builds GTM engineering systems for Series B/C sales and marketing teams, connecting Gong, Salesforce, Clay, HubSpot, and enrichment tools into one pipeline that tells reps who to call and why, every morning.",
  },
  {
    q: "How is this different from hiring a RevOps person or buying more tools?",
    a: "No new tools, no new hires. The system runs on the stack you already pay for and ships intelligence to reps directly, instead of adding another dashboard to check.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on scope. It's set in the diagnostic, not before it. The structure is fixed: a paid diagnostic first, then a flat-fee build, then an optional monthly retainer to tune it.",
  },
] as const;

export default function Faq() {
  return (
    <section className="border-y" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">QUESTIONS</div>
          <h2>FAQ</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <div className="faq-item reveal" key={item.q}>
              <div className="faq-q">{item.q}</div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
