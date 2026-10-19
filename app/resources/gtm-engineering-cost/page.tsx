import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

// Inline content constants for this page.
type Card = { k: string; t: string; d: string; core?: boolean };
type Row = { t: string; d: string };
type Num = { v: string; l: string };
type SiteLink = { href: string; label: string; d: string };

const EYEBROW = "GTM ENGINEERING · COST";
const H1 = "What GTM engineering costs, and what drives it";
const INTRO =
  "There is no list price, because the work depends on what you are starting with. Here is what you are paying for, what moves the number, and what a finished system leaves behind.";

const PAYS_FOR: Card[] = [
  {
    k: "DIAGNOSTIC",
    t: "Find the real problem",
    d: "A read of your calls, your CRM, and your closed-won data, so the build targets what actually costs you pipeline.",
  },
  {
    k: "BUILD",
    t: "Build the system",
    core: true,
    d: "The scoring, enrichment, and signal delivery, wired into the tools you already pay for. No new platform to buy.",
  },
  {
    k: "HANDOFF",
    t: "Make it run without me",
    d: "Documented, handed to your team, and live in their day. The system keeps producing after the work is done.",
  },
];

const DRIVERS: Row[] = [
  {
    t: "How many systems to connect",
    d: "Two tools that already share an ID is quick. Five that do not talk at all is more work to join up.",
  },
  {
    t: "The state of your data",
    d: "Dead accounts, duplicates, and missing fields all add steps before any scoring can be trusted.",
  },
  {
    t: "What you want scored",
    d: "A single lead score is one thing. Account tiering, intent signals, and call themes together are more.",
  },
];

const RESULTS: Num[] = [
  { v: "11,000 / 93.9%", l: "accounts enriched, verified" },
  { v: "23 of 64", l: "dead accounts recovered by zero-result remediation, adding 246 contacts" },
];

const CAP =
  "The enrichment pipeline verified 93.9% of 11,000 accounts. When it hit accounts with no result, the remediation pass brought 23 of 64 dead accounts back, adding 246 contacts that were sitting in the tools the whole time.";

const LIVE = [
  {
    t: "Apollo Pipeline Orchestrator",
    d: "Live and in daily use by AEs, not a slide in a deck.",
  },
  {
    t: "An ICP model built from 78 closed-won deals",
    d: "A 0-100 score with A/B/C/D tiering. Roughly 50% of wins came from logistics and 3PL, when the team assumed manufacturing was bigger. The deal sweet spot sits at $100-250K.",
  },
];

const LINKS: SiteLink[] = [
  {
    href: "/resources/gtm-engineer-vs-revops",
    label: "GTM engineer vs RevOps",
    d: "Which role you actually need.",
  },
  {
    href: "/resources/account-scoring",
    label: "Account scoring",
    d: "How the 0-100 score is built.",
  },
  {
    href: "/resources/intent-data-replacement",
    label: "Replacing intent data",
    d: "Signals from your own data.",
  },
  {
    href: "/resources/call-intelligence",
    label: "Call intelligence",
    d: "Turning calls into pipeline.",
  },
  {
    href: "/faq",
    label: "GTM engineering, answered",
    d: "Scoring, intent data, call analysis.",
  },
];

export const metadata: Metadata = {
  title: "What GTM engineering costs, and what drives it",
  description:
    "GTM engineering cost is set by scope, not a list price. What you pay for, what moves the number, and what a finished system leaves behind.",
  alternates: {
    canonical: "https://xsingletary.com/resources/gtm-engineering-cost",
  },
};

export default function GtmEngineeringCost() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://xsingletary.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://xsingletary.com/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "GTM engineering cost",
        item: "https://xsingletary.com/resources/gtm-engineering-cost",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What GTM engineering costs, and what drives it",
    description:
      "What GTM engineering costs, what drives the number, and what a finished system leaves behind.",
    url: "https://xsingletary.com/resources/gtm-engineering-cost",
    isPartOf: { "@type": "WebSite", name: "Xavier Singletary", url: "https://xsingletary.com" },
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
      <Nav />
      <main className="wrap lm-main">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "GTM engineering cost" }]} />
        <div className="lm-eyebrow mono">{EYEBROW}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{H1}</h1>
        <p className="faq-intro">{INTRO}</p>

        <section className="lm-sec">
          <h2>What you pay for</h2>
          <div className="lm-grid3">
            {PAYS_FOR.map((c) => (
              <div key={c.k} className={"lm-node" + (c.core ? " core" : "")}>
                <div className="k mono">{c.k}</div>
                <div className="t">{c.t}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>What moves the number</h2>
          <div className="lm-grid3">
            {DRIVERS.map((d) => (
              <div key={d.t} className="lm-node">
                <div className="t">{d.t}</div>
                <div className="d">{d.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Salary versus consultant</h2>
          <p>
            A full-time hire is the usual alternative to a build. RevOps Report, reading 309 job
            postings with disclosed pay, puts the median RevOps salary at $135,000 and the average
            at $148,000. That is salary rather than loaded cost, and it is the year before anything
            ships.
          </p>
          <p>
            Scoped work has an end date. You keep the system, the documentation, and the retainer
            after it is optional.
          </p>
          <p>
            Source:{" "}
            <a
              href="https://therevopsreport.com/salaries/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderBottom: "1px solid var(--line-bright)" }}
            >
              RevOps Report salary benchmarks
            </a>
          </p>
        </section>

        <section className="lm-sec">
          <h2>What it leaves behind</h2>
          <div className="lm-proof">
            <div className="lm-nums">
              {RESULTS.map((n) => (
                <div key={n.v} className="v">
                  {n.v} <span className="l">{n.l}</span>
                </div>
              ))}
            </div>
            <div className="cap">{CAP}</div>
          </div>
        </section>

        <section className="lm-sec">
          <h2>Live, not theoretical</h2>
          <div className="lm-grid3">
            {LIVE.map((l) => (
              <div key={l.t} className="lm-node">
                <div className="t">{l.t}</div>
                <div className="d">{l.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Keep reading</h2>
          <div className="lm-grid3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="lm-node">
                <div className="t">{l.label}</div>
                <div className="d">{l.d}</div>
              </Link>
            ))}
          </div>
        </section>

        <div className="faq-foot">
          <p>Want the real number for your stack? The diagnostic scopes it in one call.</p>
          <a
            href={BOOKING_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            See what I'd build for you
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}
