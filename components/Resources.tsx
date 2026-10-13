import Link from "next/link";

const PAGES = [
  {
    kicker: "START HERE",
    href: "/what-is-gtm-engineering",
    title: "What is GTM engineering",
    body: "The plain definition, what the work involves, and how it differs from a tool admin or a data engineer.",
  },
  {
    kicker: "COMPARISON",
    href: "/gtm-engineer-vs-revops",
    title: "GTM engineer vs RevOps",
    body: "Which role solves which problem, and how to tell which one your team is actually missing.",
  },
  {
    kicker: "PRICING",
    href: "/gtm-engineering-cost",
    title: "What a build costs",
    body: "What drives the price, what a finished system leaves behind, and salary versus consultant.",
  },
  {
    kicker: "GUIDE",
    href: "/call-intelligence",
    title: "Call intelligence",
    body: "Turning call recordings into named pains, objections and competitor mentions you can act on.",
  },
  {
    kicker: "GUIDE",
    href: "/account-scoring",
    title: "Account scoring",
    body: "How Fit and Signal scoring from closed-won data tells reps which account to work and why.",
  },
  {
    kicker: "GUIDE",
    href: "/intent-data-replacement",
    title: "Replacing intent data",
    body: "Public signals you own and can score yourself, instead of a subscription you rent.",
  },
  {
    kicker: "FREE",
    href: "/gtm-audit",
    title: "Start with a free read",
    body: "An outside-in look at your public signals only. No stack access needed to start.",
  },
] as const;

export default function Resources() {
  return (
    <section id="resources">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Go deeper</h2>
          <p>One page per problem, with more room than a homepage has.</p>
        </div>

        <div className="resource-grid">
          {PAGES.map((p) => (
            <Link href={p.href} className="resource-card reveal" key={p.href}>
              <span className="resource-kicker">{p.kicker}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
