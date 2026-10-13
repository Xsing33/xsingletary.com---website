import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

type Item = {
  q: string;
  a: string[];
  cta: string;
  id: string;
  links?: { label: string; href: string }[];
};
type Tier = { name: string; items: Item[] };

function load(): Tier[] {
  const p = path.join(process.cwd(), "content", "faq.json");
  return JSON.parse(fs.readFileSync(p, "utf8")).tiers as Tier[];
}

export const metadata: Metadata = {
  title: "GTM engineering FAQ: scoring, intent data, call analysis",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://xsingletary.com" },
              { "@type": "ListItem", position: 2, name: "FAQ", item: "https://xsingletary.com/faq" },
            ],
          }),
        }}
      />
      <Nav />
      <main className="wrap faq-main">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
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
              <details className="faq-item" key={item.q} id={item.id}>
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-body">
                  {item.a.map((p, i) => (
                    <p className="faq-a" key={i}>
                      {p}
                    </p>
                  ))}
                  {item.links && item.links.length > 0 && (
                    <div className="faq-links">
                      {item.links.map((link) => (
                        <Link
                          className="faq-link"
                          href={link.href}
                          key={link.href}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.cta && (
                    <a
                      className="faq-cta"
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.cta}
                    </a>
                  )}
                </div>
              </details>
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
            See what I'd build for you
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}