const SYSTEMS = [
  {
    tag: "ORCHESTRATION",
    name: "Apollo Pipeline Orchestrator",
    teaser: "Reps wake up to their day's work, already reviewed.",
    summary:
      "Three scheduled jobs, morning driver, response watcher, weekly digest, that pick accounts, research them, find contacts, write personalized outreach, and stage it in Apollo for human review.",
    problem:
      "Reps were manually deciding which accounts to work each day and drafting outreach from scratch, eating into actual selling time.",
    solution:
      "A two-axis Fit + Signal scoring engine assigns each account a verdict: STRIKE, NURTURE, QUALIFY, or KILL. The morning job pulls the highest-priority accounts, a research agent builds context per account, a drafting agent writes personalized content, and everything stages in Apollo for a human to review and send. A response-watcher job tracks replies; a weekly digest reports pipeline health.",
    endState:
      "Live and running daily. AEs review pre-drafted, prioritized outreach every morning instead of building it from scratch. The system never sends without human confirmation.",
  },
  {
    tag: "ENRICHMENT",
    name: "Account-to-Outbound Pipeline",
    teaser: "Your reps show up and the work is already done.",
    summary:
      "An AI-driven pipeline that finds ICP accounts, identifies the buying committee, enriches contacts, and produces a reasoned SDR account plan automatically, at scale.",
    problem:
      "SDRs spent 2 to 3 hours per account on manual research before they could even start outreach, with inconsistent coverage across verticals.",
    solution:
      'Programmatic ICP account discovery across 5 verticals feeds an AI research layer that identifies the actual buying party per account. A separate enrichment step fills in verified contact data, with a zero-result remediation loop that re-attempts "dead" accounts instead of dropping them. Output is a structured account plan, not just a contact list.',
    endState:
      "11,000 accounts enriched, 93.9% verified contacts. Zero-result remediation recovered 23 of 64 initially dead accounts, adding 246 contacts.",
  },
  {
    tag: "CALL INTELLIGENCE",
    name: "Gong Call Intelligence Pipeline",
    teaser: "Know why you lost the deal before the rep logs it.",
    summary:
      "Bulk extraction and analysis of sales call transcripts to answer what buyers actually object to, and which answers lead to closed-won.",
    problem:
      "Objection handling varied rep to rep with no data behind it, and leadership had no way to know why deals were really being lost beyond anecdote.",
    solution:
      "Built a custom extraction pipeline against Gong's POST-only API, since there's no native bulk export, to pull 300+ call transcripts. Classified discovery questions and objections across 318 calls, tagging 1,139 rep questions by type and outcome, then cross-referenced against closed-won and closed-lost data.",
    endState:
      "90.8% of buyer pains raised in calls went unprobed by reps, a fact leadership didn't have access to before, replacing anecdote with a callable answer.",
  },
  {
    tag: "LEAD SCORING",
    name: "Clay + HubSpot Lead Scoring",
    teaser: "No more arguing about whether a lead is any good.",
    summary:
      "A lead scoring and routing system that replaces a workshop-built MQL definition with one backed by actual revenue data.",
    problem:
      'Sales didn\'t trust marketing\'s leads, marketing couldn\'t prove lead quality, and there was no shared definition of "qualified."',
    solution:
      "Clay handles the data layer, enrichment across 11 fields per lead. HubSpot runs the scoring logic, a formula-driven 0 to 100 ICP score with A/B/C/D tiering, built from patterns in past deals rather than assumption. Separation of concerns means data sources can be swapped without touching the scoring model.",
    endState:
      'Every lead is scored before a rep sees it, against criteria tied to what\'s actually closed before. No more "is this lead any good" argument between teams.',
  },
] as const;

export default function ProofGrid() {
  return (
    <section id="proof">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">WHAT&apos;S ACTUALLY RUNNING</div>
          <h2>Proof</h2>
          <p>Four systems, live at Gather AI. Hover a card, or tap it on mobile, for the full build.</p>
        </div>

        <div className="proof-grid-4">
          {SYSTEMS.map((sys) => (
            <div className="proof-card reveal" tabIndex={0} key={sys.name}>
              <div className="system-tag">{sys.tag}</div>
              <div className="system-name">{sys.name}</div>
              <p className="proof-teaser">{sys.teaser}</p>
              <div className="proof-expand">
                <p className="proof-label">SUMMARY</p>
                <p className="proof-text">{sys.summary}</p>
                <p className="proof-label">PROBLEM</p>
                <p className="proof-text">{sys.problem}</p>
                <p className="proof-label">SOLUTION ARCHITECTURE</p>
                <p className="proof-text">{sys.solution}</p>
                <p className="proof-label">END STATE</p>
                <p className="proof-text">{sys.endState}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
