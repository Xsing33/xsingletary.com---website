const CARDS = [
  {
    index: "01",
    title: "Reps are guessing who to call",
    body: "Outbound and account prioritization built on research your reps shouldn't have to do manually: who to call, why, and who else is in the room.",
  },
  {
    index: "02",
    title: "Nobody knows why deals are actually lost",
    body: "Call intelligence pulled straight from Gong: which objections come up, which ones get answered well, and which ones quietly kill deals.",
  },
  {
    index: "03",
    title: "Leads sit in limbo between marketing and sales",
    body: "Scoring and routing built on real deal data, not a workshop guess, so a lead's quality isn't a debate every time one shows up.",
  },
  {
    index: "04",
    title: "Your GTM knowledge lives in someone's head",
    body: "Analyses, reports, and findings that would otherwise get buried in a Slack thread, put somewhere your team can actually find them again.",
  },
  {
    index: "05",
    title: "Expansion revenue gets missed",
    body: "Whitespace inside your existing customer base, surfaced before a competitor finds it first.",
  },
] as const;

export default function CostGrid() {
  return (
    <section id="cost">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>What&apos;s costing you pipeline?</h2>
        </div>

        <div className="cost-grid">
          {CARDS.map((card) => (
            <div className="cost-card reveal" key={card.index}>
              <span className="cost-index">{card.index}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
          <div className="cost-card summary reveal">
            <span className="cost-index">06</span>
            <h3>The stack doesn&apos;t talk to itself</h3>
            <p>
              Whatever the specific gap, the pattern&apos;s the same: extract what&apos;s already there, connect
              the systems that don&apos;t talk, ship it somewhere your team actually uses it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
