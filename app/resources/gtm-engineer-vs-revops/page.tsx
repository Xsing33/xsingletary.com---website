import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

// Inline content constants for this page.
type Card = { k: string; t: string; d: string; core?: boolean };
type Row = { t: string; d: string };
type Step = { n: string; h: string; p: string };
type Num = { v: string; l: string };
type SiteLink = { href: string; label: string; d: string };

const EYEBROW = "GTM ENGINEERING · ROLES";
const H1 = "GTM engineer vs RevOps";
const INTRO =
  "The two roles get folded together in job posts and org charts. They solve different problems. Here is the plain difference, and how to tell which one your team is missing.";

const ROLES: Card[] = [
  {
    k: "REVOPS",
    t: "Keeps the engine running",
    d: "Owns process, tool admin, reporting hygiene, and the rules your team works by. Makes sure the CRM reflects reality.",
  },
  {
    k: "GTM ENGINEER",
    t: "Builds the intelligence layer",
    core: true,
    d: "Extracts the data already sitting in your tools, scores accounts, enriches records, and ships signals to the people selling.",
  },
  {
    k: "OVERLAP",
    t: "Both touch your systems",
    d: "Both care about clean data and a working funnel. The difference is what each one is asked to produce from them.",
  },
];

const OWNS: Row[] = [
  {
    t: "RevOps keeps the engine running",
    d: "CRM admin and hygiene, reporting and dashboards, lead routing rules, process, and enablement.",
  },
  {
    t: "A GTM engineer builds the fuel",
    d: "Enrichment, account and lead scoring, call analysis, intent replacement, and delivering signals to reps.",
  },
  {
    t: "They meet at clean data",
    d: "Both need records that reflect reality. The gap is the layer between that data and a rep knowing who to call next.",
  },
];

const SIGNS: Step[] = [
  {
    n: "1",
    h: "Your data lives in five tools",
    p: "The answers exist in the CRM, the call recorder, and the enrichment tool. Nobody has joined them up, so nobody trusts them.",
  },
  {
    n: "2",
    h: "Your scoring does not match wins",
    p: "Leads are ranked by form fills, not by what actually closed. The model was never built from your own closed-won deals.",
  },
  {
    n: "3",
    h: "Your reps still guess",
    p: "Admins spend their day maintaining the CRM, and reps spend theirs opening the wrong accounts. That is the gap a GTM engineer closes.",
  },
];

const PROOF: Num[] = [
  { v: "90.8%", l: "of buyer pains went unprobed" },
  { v: "11,000", l: "accounts enriched, 93.9% verified" },
];

const CAP =
  "From 318 analyzed calls and 1,139 classified rep questions, and an account pipeline run across 11,000 accounts. RevOps kept the CRM honest. The GTM engineering work found what was missing in the conversation.";

const LINKS: SiteLink[] = [
  {
    href: "/what-is-gtm-engineering",
    label: "What is GTM engineering",
    d: "The role, in plain terms.",
  },
  {
    href: "/resources/gtm-engineering-cost",
    label: "What GTM engineering costs",
    d: "How the number gets set.",
  },
  {
    href: "/faq",
    label: "GTM engineering, answered",
    d: "Scoring, intent data, call analysis.",
  },
  {
    href: "/",
    label: "Back to the start",
    d: "How the systems work end to end.",
  },
];

export const metadata: Metadata = {
  title: "GTM engineer vs RevOps: what is the difference",
  description:
    "GTM engineer vs RevOps, explained plainly. RevOps keeps the engine running. A GTM engineer builds the scoring, enrichment, and call intelligence layer that feeds it.",
  alternates: {
    canonical: "https://xsingletary.com/resources/gtm-engineer-vs-revops",
  },
};

export default function GtmEngineerVsRevops() {
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
        name: "GTM engineer vs RevOps",
        item: "https://xsingletary.com/resources/gtm-engineer-vs-revops",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GTM engineer vs RevOps",
    description:
      "The difference between a GTM engineer and RevOps, and how to tell which one your team is missing.",
    url: "https://xsingletary.com/resources/gtm-engineer-vs-revops",
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "GTM engineer vs RevOps" }]} />
        <div className="lm-eyebrow mono">{EYEBROW}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{H1}</h1>
        <p className="faq-intro">{INTRO}</p>

        <section className="lm-sec">
          <h2>The short version</h2>
          <div className="lm-grid3">
            {ROLES.map((r) => (
              <div key={r.k} className={"lm-node" + (r.core ? " core" : "")}>
                <div className="k mono">{r.k}</div>
                <div className="t">{r.t}</div>
                <div className="d">{r.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>What each one owns</h2>
          <div className="lm-grid3">
            {OWNS.map((o) => (
              <div key={o.t} className="lm-node">
                <div className="t">{o.t}</div>
                <div className="d">{o.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>When you need a GTM engineer</h2>
          <div className="lm-grid3">
            {SIGNS.map((s) => (
              <div key={s.n} className="lm-step">
                <div className="n mono">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Proof</h2>
          <div className="lm-proof">
            <div className="lm-nums">
              {PROOF.map((n) => (
                <div key={n.v} className="v">
                  {n.v} <span className="l">{n.l}</span>
                </div>
              ))}
            </div>
            <div className="cap">{CAP}</div>
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
          <p>Not sure which one you are missing? The diagnostic tells you in one call.</p>
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
