import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

const SITE = "https://xsingletary.com";
const CANONICAL = `${SITE}/resources/intent-data-replacement`;

type Card = { t: string; d: string };
type Section = { h: string; paras: string[]; cards?: Card[] };
type Stat = { v: string; l: string };
type PageLink = { t: string; d: string; href: string };

const eyebrow = "INTENT DATA REPLACEMENT";
const h1 = "Replace paid intent data with signals you own.";
const intro =
  "A vendor tells you a company is showing intent. It does not tell you who to call, what to say, or why now. And it sells the same list to your competitors. The signals you need are public. The scoring is yours to build.";

const sections: Section[] = [
  {
    h: "WHAT PAID INTENT MISSES",
    paras: [
      "Paid intent data answers one weak question. Is this company interested in something like what you sell?",
      "It does not name the person who owns the problem. It does not tell you what to say when you reach them. And the same signal lands with every competitor on the list on the same day.",
    ],
  },
  {
    h: "THE SIGNALS YOU CAN OWN",
    paras: [
      "Your best signals are already public. They just are not connected to anything yet.",
    ],
    cards: [
      {
        t: "Hiring in operations",
        d: "A role open 21 days or more is budgeted and unstaffed. That is a team feeling pressure right now.",
      },
      {
        t: "Earnings language",
        d: "When a company talks about inventory problems or labor shortages on its earnings call, the pain is on the record.",
      },
      {
        t: "Expansion and leadership",
        d: "A new facility, or a new operations leader, changes who owns the problem and when budget frees up.",
      },
    ],
  },
  {
    h: "HOW THE SCORE GETS BUILT",
    paras: [
      "A research layer scans those public sources, pulls the signal, and scores it against your ICP weights. The output is the same 0 to 100 number an intent vendor hands you. The difference is it is tuned to your buyers and your verticals.",
      "The weights come from your closed-won deals, not a generic model. I built an ICP from 78 closed-won deals. The data said roughly 50% of wins came from logistics and 3PL, when the team assumed manufacturing was bigger. VP Operations and COO dominated the buys. The deal sweet spot was $100-250K.",
      "The same scoring runs on the Apollo Pipeline Orchestrator. Fit plus Signal, with STRIKE, NURTURE, QUALIFY, and KILL verdicts, live and in daily use by account executives.",
    ],
  },
  {
    h: "A SCORE IS ONLY AS GOOD AS THE CONTACTS",
    paras: [
      "A signal without a verified contact is a dead end. The enrichment layer checks every email before a rep sees it. 11,000 accounts enriched, 93.9% verified.",
      "When a batch came back empty, a remediation pass retried with looser filters. It recovered 23 of 64 dead accounts and added 246 contacts that would have been thrown away.",
    ],
  },
  {
    h: "WHAT REPLACES WHAT",
    paras: [
      "The vendor contract goes away. In its place you keep a scoring model built on your own wins, a set of public signals you can watch yourself, and the contacts to act on them.",
      "The model is yours. So is the data. Nothing is rented back to you month after month.",
    ],
  },
];

const proof: { nums: Stat[]; cap: string } = {
  nums: [
    { v: "11,000", l: "accounts enriched" },
    { v: "93.9%", l: "contacts verified" },
  ],
  cap: "Signals are only useful when you can reach the right person. Every contact is verified first.",
};

const ask = {
  t: "Want to drop the intent contract?",
  p: "I build the replacement on the tools you already own. You keep the model, the signals, and the contacts.",
};

const related: PageLink[] = [
  {
    t: "Account scoring",
    d: "Fit and Signal scoring built from your closed-won data.",
    href: "/resources/account-scoring",
  },
  {
    t: "Call intelligence",
    d: "Mine calls for the pain and the competitors you keep losing to.",
    href: "/resources/call-intelligence",
  },
  {
    t: "What GTM engineering costs",
    d: "What an engagement runs, and what you own after it ends.",
    href: "/resources/gtm-engineering-cost",
  },
];

export const metadata: Metadata = {
  title: "Replace paid intent data with signals you own",
  description:
    "How to replace paid intent data with in-house signals: public hiring, earnings, expansion, and funding triggers scored against your own closed-won ICP.",
  alternates: { canonical: CANONICAL },
};

export default function IntentDataReplacementPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://xsingletary.com/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Intent data replacement",
        item: CANONICAL,
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Replace paid intent data with signals you own",
    description: metadata.description,
    url: CANONICAL,
    isPartOf: { "@type": "WebSite", name: "Xavier Singletary", url: SITE },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Intent data replacement systems",
    serviceType: "In-house buying signal and intent scoring",
    provider: { "@type": "Person", name: "Xavier Singletary", url: SITE },
    areaServed: "US",
    url: CANONICAL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Nav />
      <main className="wrap lm-main">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Intent data replacement" }]} />
        <div className="lm-eyebrow mono">{eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{h1}</h1>
        <p className="faq-intro">{intro}</p>

        <div className="blog-body">
          {sections.map((s) => (
            <section className="lm-sec" key={s.h}>
              <h2>{s.h}</h2>
              {s.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.cards && (
                <div className="lm-grid3">
                  {s.cards.map((c) => (
                    <div className="lm-node" key={c.t}>
                      <div className="t">{c.t}</div>
                      <div className="d">{c.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="lm-sec">
            <h2>PROOF</h2>
            <div className="lm-proof">
              <div className="lm-nums">
                {proof.nums.map((n) => (
                  <div className="v" key={n.l}>
                    {n.v} <span className="l">{n.l}</span>
                  </div>
                ))}
              </div>
              <div className="cap">{proof.cap}</div>
            </div>
          </section>

          <section className="lm-sec">
            <h2>IF YOU WANT TO TALK</h2>
            <div className="lm-ask">
              <div className="t">{ask.t}</div>
              <p>{ask.p}</p>
              <a
                className="btn-primary lm-ask-btn"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Run the diagnostic
              </a>
            </div>
          </section>

          <section className="lm-sec">
            <h2>KEEP READING</h2>
            <div className="lm-grid3">
              {related.map((r) => (
                <Link href={r.href} className="lm-node" key={r.href}>
                  <div className="t">{r.t}</div>
                  <div className="d">{r.d}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="faq-foot">
          <p>Ready to stop paying for a list your competitors get too?</p>
          <a
            href={BOOKING_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Run the diagnostic
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}
