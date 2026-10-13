import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

const SITE = "https://xsingletary.com";
const CANONICAL = `${SITE}/resources/account-scoring`;

type Card = { t: string; d: string };
type Section = { h: string; paras: string[]; cards?: Card[] };
type Stat = { v: string; l: string };
type PageLink = { t: string; d: string; href: string };

const eyebrow = "ACCOUNT SCORING";
const h1 = "Account scoring that tells reps who to work, and why.";
const intro =
  "Most teams score accounts on gut feel. Real scoring runs on two axes, Fit and Signal, and it comes from your own closed-won deals. Here is how it works, and what it replaces.";

const sections: Section[] = [
  {
    h: "WHY GUT FEEL FAILS",
    paras: [
      "Every morning your reps open the CRM and pick an account. The name they recognize. The one at the top of the list. The one that feels hot today.",
      "That is not prioritization. That is a hunch with a login. The real cost is not the couple of wasted calls. It is the accounts that match your ICP and never get worked, because nothing surfaced them.",
    ],
  },
  {
    h: "FIT AND SIGNAL",
    paras: [
      "A working account score runs on two axes. Fit is how well the account matches your ICP. Signal is what the account is doing right now.",
      "Combined into one number, the score decides who gets worked first and who gets dropped.",
    ],
    cards: [
      {
        t: "Fit",
        d: "Industry, revenue, headcount, tech stack, facility count. Whatever your closed-won data says actually matters.",
      },
      {
        t: "Signal",
        d: "Hiring in operations roles, expansion news, earnings talk about inventory or labor, fresh funding, a new leader in the function.",
      },
      {
        t: "The verdict",
        d: "STRIKE means work it first. NURTURE means auto-enroll. QUALIFY means enroll. KILL means drop it and stop spending time there.",
      },
    ],
  },
  {
    h: "WHERE THE WEIGHTS COME FROM",
    paras: [
      "Not from a whiteboard workshop. From the deals you already won.",
      "Pull every closed-won deal. Find the attributes that show up in the wins and not the losses. Weight them by how often they appear. Scale to 0 to 100. Then set the verdict thresholds.",
      "I built the Apollo Pipeline Orchestrator this way. Two-axis scoring on Fit and Signal, with STRIKE, NURTURE, QUALIFY, and KILL verdicts. It is live and in daily use by account executives, not a demo.",
      "On the lead side, a Clay and HubSpot model scored every lead before a rep saw it. 11 enrichment fields per lead, a formula-driven 0 to 100 ICP score, and A, B, C, D tiers.",
    ],
  },
  {
    h: "WHAT CHANGES",
    paras: [
      "The system picks the next account every morning. Reps stop choosing and start executing.",
      "Two reps stop working the same account. Accounts that fit get worked in order instead of by feel.",
      "When sales and marketing argue about lead quality, you point at the model and the deals behind it. The argument ends there.",
    ],
  },
];

const proof: { nums: Stat[]; cap: string } = {
  nums: [
    { v: "11,000", l: "accounts enriched" },
    { v: "93.9%", l: "contacts verified" },
  ],
  cap: "The enrichment layer behind the score. Contacts are verified before a rep ever dials.",
};

const ask = {
  t: "Want this built for your team?",
  p: "I build account scoring systems for Series B and C teams. They run on the tools you already pay for, and you keep everything at the end.",
};

const related: PageLink[] = [
  {
    t: "Replace paid intent data",
    d: "Trade the vendor list for signals you own.",
    href: "/resources/intent-data-replacement",
  },
  {
    t: "Call intelligence",
    d: "Turn call transcripts into patterns you can act on.",
    href: "/resources/call-intelligence",
  },
  {
    t: "What GTM engineering is",
    d: "The systems between your tools and your reps.",
    href: "/what-is-gtm-engineering",
  },
];

export const metadata: Metadata = {
  title: "Account scoring: Fit and Signal for outbound prioritization",
  description:
    "How account scoring works: a two-axis Fit and Signal model built from closed-won data, with STRIKE, NURTURE, QUALIFY, and KILL verdicts, so reps know which account to work and why.",
  alternates: { canonical: CANONICAL },
};

export default function AccountScoringPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://xsingletary.com/resources" },
      { "@type": "ListItem", position: 3, name: "Account scoring", item: CANONICAL },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Account scoring that tells reps who to work, and why",
    description: metadata.description,
    url: CANONICAL,
    isPartOf: { "@type": "WebSite", name: "Xavier Singletary", url: SITE },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Account scoring systems",
    serviceType: "Account scoring and outbound prioritization",
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Account scoring" }]} />
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
                See what I'd build for you
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
          <p>Ready to stop guessing which account to work?</p>
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
