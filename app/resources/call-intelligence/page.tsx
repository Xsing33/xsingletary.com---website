import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

// Typed inline content, mirroring components/Guide.tsx. Every string here is
// rendered as an expression so plain apostrophes stay plain.
type Node = { k?: string; t: string; d: string; core?: boolean };
type Card = { t: string; d: string };
type Num = { v: string; l: string };
type RelatedLink = { href: string; label: string };

const CONTENT = {
  eyebrow: "CALL INTELLIGENCE",
  h1: "Your calls already hold the answers.",
  intro:
    "Every discovery call is a record of what your buyer actually cares about. Call intelligence is the work of turning those recordings into structured signal your team can act on, instead of leaving it in a folder nobody opens.",
} as const;

const PROBLEM: string[] = [
  "Here is the uncomfortable part. When I ran the numbers on 318 analyzed calls and 1,139 classified rep questions, 90.8% of buyer pains went unprobed.",
  "A buyer says the current tool is too slow, or that a competitor promised a faster rollout, and the rep moves on to the next question. The signal is right there in the recording, and it never turns into a talking point, a follow up, or a deal risk your team can see.",
  "That is not a rep problem. It is a system problem. Nobody is pulling the pains out of the calls and putting them somewhere useful.",
];

const EXTRACT: Card[] = [
  {
    t: "Named pains",
    d: "The exact words a buyer uses for the problem. Not a category, the phrase itself.",
  },
  {
    t: "Objections",
    d: "Price, timing, a missing feature, a bad past rollout. Caught the first time, not the third call.",
  },
  {
    t: "Competitors",
    d: "Who else is in the room, and what they were promised. Tracked as it changes deal to deal.",
  },
  {
    t: "Next steps",
    d: "What was agreed and who owns it. Written where the rep and the CRM both see it.",
  },
  {
    t: "Deal risk",
    d: "The language that shows a deal cooling off, surfaced while there is still time to act.",
  },
  {
    t: "What works",
    d: "The questions and framings that move real deals, so the rest of the team can copy them.",
  },
];

const CHAIN: Node[] = [
  { k: "CAPTURE", t: "Call recorded", d: "Your existing recorder captures the conversation as it happens." },
  { k: "READ", t: "Transcript and topics", d: "The call is read for the moments that carry signal." },
  { k: "SCORE", t: "Classify against your model", d: "Each pain, objection, and question is tagged and matched to the pattern that matters.", core: true },
  { k: "ROUTE", t: "Shipped to your team", d: "The result lands in the CRM and with the rep while the deal is still open." },
];

const PROOF: { nums: Num[]; cap: string } = {
  nums: [
    { v: "90.8%", l: "of buyer pains went unprobed" },
    { v: "318 / 1,139", l: "calls analyzed, rep questions classified" },
  ],
  cap: "From the Gong Call Intelligence Pipeline. 318 analyzed calls, 1,139 classified rep questions, and a clear read on how much buying signal was sitting unread.",
};

const RELATED: RelatedLink[] = [
  { href: "/resources/intent-data-replacement", label: "Replacing intent data" },
  { href: "/resources/account-scoring", label: "Account scoring" },
  { href: "/what-is-gtm-engineering", label: "What is GTM engineering?" },
  { href: "/faq", label: "GTM engineering FAQ" },
];

export const metadata: Metadata = {
  title: "Call intelligence: turn calls into pipeline",
  description:
    "Call intelligence turns discovery recordings into structured signal your reps can act on. 90.8% of buyer pains went unprobed across 318 analyzed calls. How to catch them and route them to the deal.",
  alternates: { canonical: "https://xsingletary.com/resources/call-intelligence" },
};

export default function CallIntelligencePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Call intelligence",
    serviceType: "GTM engineering",
    description: metadata.description,
    url: "https://xsingletary.com/resources/call-intelligence",
    provider: {
      "@type": "Person",
      name: "Xavier Singletary",
      url: "https://xsingletary.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://xsingletary.com" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://xsingletary.com/resources" },
      { "@type": "ListItem", position: 3, name: "Call intelligence", item: "https://xsingletary.com/resources/call-intelligence" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Nav />
      <main className="wrap lm-main">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Call intelligence" }]} />
        <div className="lm-eyebrow">{CONTENT.eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{CONTENT.h1}</h1>
        <p className="lm-intro">{CONTENT.intro}</p>

        <div className="lm-cta-row">
          <a className="btn-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            See what I'd build for you
          </a>
        </div>

        <section className="lm-sec">
          <h2>The problem</h2>
          {PROBLEM.map((p, i) => (
            <p className="lm-intro" key={i} style={{ marginBottom: 16 }}>
              {p}
            </p>
          ))}
        </section>

        <section className="lm-sec">
          <h2>What you can pull out of a call</h2>
          <div className="lm-grid3">
            {EXTRACT.map((c) => (
              <div className="lm-node" key={c.t}>
                <div className="t">{c.t}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>How it runs</h2>
          <div className="lm-flow">
            {CHAIN.map((n, i) => (
              <div className="lm-flow-item" key={n.t}>
                {i > 0 && <div className="lm-arrow">&#9656;</div>}
                <div className={"lm-node" + (n.core ? " core" : "")}>
                  {n.k && <div className="k mono">{n.k}</div>}
                  <div className="t">{n.t}</div>
                  <div className="d">{n.d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Proof</h2>
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
          <h2>Where it connects</h2>
          <p className="lm-intro">
            Call signal is strongest when it feeds the rest of the system. The pains you hear
            in calls sharpen who you target and how you score them.{" "}
            <Link href="/resources/account-scoring" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              See how scoring works
            </Link>
            , or read how it replaces paid intent data.{" "}
            <Link href="/resources/intent-data-replacement" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              Replacing intent data
            </Link>
            .
          </p>
        </section>

        <section className="lm-sec">
          <div className="lm-ask">
            <div className="t">The first call you should read</div>
            <p>
              Start with the calls you already lost or stalled. The pains in those recordings
              tell you what to fix first, and often where the next deals will come from.
            </p>
            <a
              className="btn-primary lm-ask-btn"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              See what I'd build for you
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
