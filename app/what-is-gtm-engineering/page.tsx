import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

// Typed inline content, mirroring components/Guide.tsx. Every string here is
// rendered as an expression so plain apostrophes stay plain.
type Step = { n: string; h: string; p: string };
type Card = { k?: string; t: string; d: string; core?: boolean };
type Num = { v: string; l: string };
type RelatedLink = { href: string; label: string };

const CONTENT = {
  eyebrow: "GTM ENGINEERING · THE SHORT VERSION",
  h1: "What is GTM engineering?",
  intro:
    "GTM engineering is the work of connecting your go to market tools so the data inside them actually reaches the people who sell. It sits between sales ops and data engineering, and it ships working systems, not slides.",
} as const;

const ANSWER: string[] = [
  "Most teams already own the raw material. A CRM full of deals, a call recorder, an enrichment tool, a pile of product usage. The problem is that the pieces do not talk to each other, and nobody owns the gap between them.",
  "A GTM engineer owns that gap. You pull the real signal out of each tool, score it against what a good customer looks like, and route it to a rep in the moment it matters.",
  "That is the whole job. Understand the buying signal, connect the systems, ship the result to the person on the call.",
];

const STEPS: Step[] = [
  {
    n: "01",
    h: "Extract",
    p: "Pull the real signal out of calls, closed won deals, and product usage. Not the fields someone typed into the CRM once and never touched again.",
  },
  {
    n: "02",
    h: "Connect",
    p: "Join those signals across tools that were never built to talk to each other. One score, one record, one place to look.",
  },
  {
    n: "03",
    h: "Ship",
    p: "Send the result to your reps, your sequencer, and your CRM so it changes what happens on the next call. If it does not change behavior, it is not done.",
  },
];

const WHERE: Card[] = [
  {
    k: "SALES OPS",
    t: "Keeps the system running",
    d: "Owns hygiene, reporting, and the rules of the CRM. Essential work, but it usually stops at keeping the lights on.",
  },
  {
    k: "GTM ENGINEERING",
    t: "Builds the signal path",
    d: "Owns the thing that makes the data useful. Extraction, scoring, and routing across the whole stack.",
    core: true,
  },
  {
    k: "DATA ENGINEERING",
    t: "Wires the warehouse",
    d: "Owns the plumbing underneath. Great at moving data, rarely close to the buying conversation.",
  },
];

const PROOF: { nums: Num[]; cap: string } = {
  nums: [
    { v: "90.8%", l: "of buyer pains went unprobed" },
    { v: "11,000 / 93.9%", l: "accounts enriched, verified" },
  ],
  cap: "The first number comes from 318 analyzed calls and 1,139 classified rep questions on the Gong Call Intelligence Pipeline. The second is an account to outbound pipeline that enriched 11,000 accounts at 93.9% verified.",
};

const RELATED: RelatedLink[] = [
  { href: "/faq", label: "GTM engineering FAQ" },
  { href: "/gtm-engineer-vs-revops", label: "GTM engineer vs RevOps" },
  { href: "/gtm-engineering-cost", label: "What it costs" },
  { href: "/call-intelligence", label: "Call intelligence" },
  { href: "/account-scoring", label: "Account scoring" },
  { href: "/intent-data-replacement", label: "Replacing intent data" },
];

export const metadata: Metadata = {
  title: "What is GTM engineering? A plain answer",
  description:
    "GTM engineering is the work of connecting your go to market tools so the data inside them reaches the people who sell. What it is, what a GTM engineer does, and where it sits next to sales ops and data engineering.",
  alternates: { canonical: "https://xsingletary.com/what-is-gtm-engineering" },
};

export default function WhatIsGtmEngineeringPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What is GTM engineering?",
    description: metadata.description,
    url: "https://xsingletary.com/what-is-gtm-engineering",
    mainEntity: {
      "@type": "DefinedTerm",
      name: "GTM engineering",
      description:
        "The practice of extracting buying signal from go to market tools, connecting it across systems, and shipping it to the people who sell.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://xsingletary.com" },
      { "@type": "ListItem", position: 2, name: "What is GTM engineering?", item: "https://xsingletary.com/what-is-gtm-engineering" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Nav />
      <main className="wrap lm-main">
        <div className="lm-eyebrow">{CONTENT.eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{CONTENT.h1}</h1>
        <p className="lm-intro">{CONTENT.intro}</p>

        <div className="lm-cta-row">
          <a className="btn-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Run the diagnostic
          </a>
        </div>

        <section className="lm-sec">
          <h2>The short answer</h2>
          {ANSWER.map((p, i) => (
            <p className="lm-intro" key={i} style={{ marginBottom: 16 }}>
              {p}
            </p>
          ))}
        </section>

        <section className="lm-sec">
          <h2>What a GTM engineer does</h2>
          <div className="lm-grid3">
            {STEPS.map((s) => (
              <div className="lm-step" key={s.n}>
                <div className="n mono">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Where it sits</h2>
          <div className="lm-grid3">
            {WHERE.map((c) => (
              <div className={"lm-node" + (c.core ? " core" : "")} key={c.t}>
                {c.k && <div className="k mono">{c.k}</div>}
                <div className="t">{c.t}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
          <p className="lm-intro" style={{ marginTop: 20 }}>
            The lines blur on small teams, and that is fine. The useful question is not the
            title. It is whether someone owns the path from raw data to the next call.{" "}
            <Link href="/gtm-engineer-vs-revops" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              See the full comparison
            </Link>
            .
          </p>
        </section>

        <section className="lm-sec">
          <h2>What it looks like in practice</h2>
          <div className="lm-proof">
            <div className="lm-nums">
              {PROOF.nums.map((n) => (
                <div className="v" key={n.l}>
                  {n.v} <span className="l">{n.l}</span>
                </div>
              ))}
            </div>
            <div className="cap">{PROOF.cap}</div>
          </div>
        </section>

        <section className="lm-sec">
          <h2>What it costs to build</h2>
          <p className="lm-intro">
            A GTM system is built on the tools you already pay for, over a few weeks, not a
            year. I break the cost down plainly, including what you can skip.{" "}
            <Link href="/gtm-engineering-cost" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              Read the cost breakdown
            </Link>
            .
          </p>
        </section>

        <section className="lm-sec">
          <div className="lm-ask">
            <div className="t">Where to start</div>
            <p>
              Pick the one thing costing your team the most pipeline right now. That is where
              the first build goes. If you want a read on which one it is, book the diagnostic.
            </p>
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
          <h2>Keep reading</h2>
          <div className="lm-cta-row">
            {RELATED.map((l) => (
              <Link className="btn-secondary" href={l.href} key={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        <div className="lm-foot">
          <div>
            <b>Xavier Singletary</b> · GTM engineer
          </div>
          <div className="mono">xsingletary.com</div>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}
