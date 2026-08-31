const PAINS = [
  {
    quote:
      "My AEs own a full book of accounts and now have to do their own outbound: researching, finding contacts, writing messaging, on top of actually selling.",
    source: "→ ACCOUNT-TO-OUTBOUND PIPELINE",
  },
  {
    quote:
      "We don't know which objections actually kill deals with which type of buyer. We're guessing at messaging instead of knowing.",
    source: "→ GONG CALL INTELLIGENCE PIPELINE",
  },
  {
    quote: "Every rep handles objections differently, and nobody's checked which answers actually lead to closed-won.",
    source: "→ GONG CALL INTELLIGENCE PIPELINE",
  },
  {
    quote:
      "I want to know what VPs of Ops push back on most, and the only way to find out is listening to hundreds of calls myself.",
    source: '→ "ASK YOUR GONG CALLS" APP',
  },
] as const;

export default function PainList() {
  return (
    <section className="border-y" id="problem">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">WHAT WE&apos;RE HEARING</div>
          <h2>What buyers actually say</h2>
          <p>Pulled from real conversations at Gather AI, not generic pain-point copy.</p>
        </div>

        <div className="pain-list">
          {PAINS.map((pain) => (
            <div className="pain-item reveal" key={pain.source + pain.quote.slice(0, 12)}>
              <div className="pain-quote">{pain.quote}</div>
              <div className="pain-source">{pain.source}</div>
            </div>
          ))}
        </div>

        <div className="stakes-line reveal">
          The alternative is a $90K RevOps hire and six months of hoping they figure it out.
        </div>
      </div>
    </section>
  );
}
