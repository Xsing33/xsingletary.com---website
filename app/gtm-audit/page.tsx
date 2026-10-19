import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

// Typed inline content, mirroring components/Guide.tsx. Every string here is
// rendered as an expression so plain punctuation stays plain.
type Card = { k?: string; t: string; d: string; core?: boolean };
type Step = { n: string; h: string; p: string };
type Num = { v: string; l: string };
type RelatedLink = { href: string; label: string };

const CONTENT = {
  eyebrow: "FREE OUTSIDE-IN GTM AUDIT",
  h1: "A free GTM audit: where your pipeline leaks",
  intro:
    "Send me your public signals. I read your site, your search footprint, and your funnel the way a buyer sees it, then send back where pipeline is leaking. No stack access needed to start.",
} as const;

const WHAT: string[] = [
  "Most GTM reviews only begin once you hand over your CRM, your call recordings, and your whole stack. That is a big first yes, and it is a slow one.",
  "This is the small yes instead. I look only at what is already public: your site, how you show up in search, and the path a real buyer walks from first click to booked call. You give me access to nothing to get started.",
  "Then I send back a plain read on where the leak is. The places a good buyer would have moved forward and instead dropped off, and the places your funnel asks for trust before it has earned any.",
];

const LOOK: Card[] = [
  {
    t: "Your site",
    d: "What a first-time visitor understands in ten seconds. The claim, the proof, and whether the next step is obvious.",
  },
  {
    t: "Your search footprint",
    d: "The terms you show up for, the ones you miss, and what a buyer sees when they line you up against the alternatives.",
  },
  {
    t: "Your funnel as a buyer sees it",
    d: "Every step from first click to booked call. Where a buyer has to guess, hunt, or trust you before you have earned it.",
    core: true,
  },
];

const STEPS: Step[] = [
  {
    n: "01",
    h: "You send public links",
    p: "Your site, plus anything else public you want me to read. No logins, no access, no calls required.",
  },
  {
    n: "02",
    h: "I read it like a buyer",
    p: "I walk your funnel the way a stranger would, and note where a good buyer stalls or leaves.",
  },
  {
    n: "03",
    h: "You get the findings back",
    p: "A short written read on where pipeline is leaking, and the order I would fix it in.",
  },
];

const PROOF: { nums: Num[]; cap: string } = {
  nums: [
    { v: "90.8%", l: "of buyer pains went unprobed" },
    { v: "11,000 / 93.9%", l: "accounts enriched, verified" },
  ],
  cap: "Same eye that reads your funnel here. 90.8% came from 318 analyzed calls and 1,139 classified rep questions. 11,000 accounts were enriched at 93.9% verified. The Apollo Pipeline Orchestrator is live and in daily use by AEs.",
};

const RELATED: RelatedLink[] = [
  { href: "/resources/call-intelligence", label: "Call intelligence" },
  { href: "/resources/account-scoring", label: "Account scoring" },
  { href: "/resources/intent-data-replacement", label: "Replacing intent data" },
  { href: "/resources/gtm-engineering-cost", label: "What it costs" },
  { href: "/what-is-gtm-engineering", label: "What is GTM engineering?" },
];

export const metadata: Metadata = {
  title: "Free outside-in GTM audit",
  description:
    "A free outside-in GTM read. I review your public signals only: your site, your search footprint, and the path a buyer walks, then send back where it leaks.",
  alternates: { canonical: "https://xsingletary.com/gtm-audit" },
};

export default function GtmAuditPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free outside-in GTM audit",
    serviceType: "GTM engineering",
    description: metadata.description,
    url: "https://xsingletary.com/gtm-audit",
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
      { "@type": "ListItem", position: 2, name: "Free outside-in GTM audit", item: "https://xsingletary.com/gtm-audit" },
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Free outside-in GTM audit" }]} />
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
          <h2>What this is</h2>
          {WHAT.map((p, i) => (
            <p className="lm-intro" key={i} style={{ marginBottom: 16 }}>
              {p}
            </p>
          ))}
        </section>

        <section className="lm-sec">
          <h2>What I look at</h2>
          <div className="lm-grid3">
            {LOOK.map((c) => (
              <div className={"lm-node" + (c.core ? " core" : "")} key={c.t}>
                <div className="t">{c.t}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>How it works</h2>
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
          <h2>The findings are yours</h2>
          <p className="lm-intro">
            You keep what I send back whether or not we ever work together. It is yours to
            act on, hand to your team, or sit on. No strings and no follow up you did not
            ask for.
          </p>
          <p className="lm-intro" style={{ marginTop: 16 }}>
            If you want the leak fixed, the paid diagnostic is the natural next step. That
            is where I go inside your stack, find the accounts, and build the system. The
            free read stands on its own either way.
          </p>
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

        <div className="faq-foot">
          <p>
            Want the read on your funnel? Start with the free outside-in audit, and keep the
            findings whatever you decide.
          </p>
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
