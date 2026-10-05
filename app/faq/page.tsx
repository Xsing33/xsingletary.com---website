import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

type Item = { q: string; a: string[]; cta: string };
type Tier = { name: string; items: Item[] };

function load(): Tier[] {
  const p = path.join(process.cwd(), "content", "faq.json");
  return JSON.parse(fs.readFileSync(p, "utf8")).tiers as Tier[];
}

export const metadata: Metadata = {
  title: "GTM Engineering FAQ — Xavier Singletary",
  description:
    "Direct answers on GTM engineering: account scoring, lead scoring from closed-won data, replacing intent data, call analysis, ICP models, and what a GTM engineer actually does.",
  alternates: { canonical: "https://xsingletary.com/faq" },
};

export default function FaqPage() {
  const tiers = load();
  const all = tiers.flatMap((t) => t.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: [...i.a, i.cta].filter(Boolean).join(" "),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="wrap faq-main">
        <div className="faq-eyebrow mono">GTM ENGINEERING · ANSWERS</div>
        <div className="lm-rule" />
        <h1 className="faq-h1">GTM engineering, answered.</h1>
        <p className="faq-intro">
          Straight answers to the questions sales and marketing leaders ask before they
          build a GTM system. How scoring works, how to replace intent data, how to turn
          calls into pipeline, and what a GTM engineer actually does all day.
        </p>

        {tiers.map((tier) => (
          <section className="faq-tier" key={tier.name}>
            <h2 className="faq-tier-h">{tier.name}</h2>
            {tier.items.map((item) => (
              <article className="faq-item" key={item.q}>
                <h3 className="faq-q">{item.q}</h3>
                {item.a.map((p, i) => (
                  <p className="faq-a" key={i}>
                    {p}
                  </p>
                ))}
                {item.cta && <p className="faq-cta">{item.cta}</p>}
              </article>
            ))}
          </section>
        ))}

        <div className="faq-foot">
          <p>
            Want this built for your team? One system, live in three weeks, on the tools
            you already pay for.
          </p>
          <a
            href={BOOKING_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a 30-minute call
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}