import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

const SITE = "https://xsingletary.com";
const CANONICAL = `${SITE}/resources`;

const intro =
  "The long answers. One page per problem, written for someone who has to make a decision about this, not someone browsing a category.";

const GUIDES = [
  {
    kicker: "COMPARISON",
    href: "/resources/gtm-engineer-vs-revops",
    title: "GTM engineer vs RevOps",
    body: "Which role solves which problem, and how to tell which one your team is actually missing.",
  },
  {
    kicker: "PRICING",
    href: "/resources/gtm-engineering-cost",
    title: "What a build costs",
    body: "What drives the price, what a finished system leaves behind, and salary versus consultant.",
  },
  {
    kicker: "GUIDE",
    href: "/resources/call-intelligence",
    title: "Call intelligence",
    body: "Turning call recordings into named pains, objections and competitor mentions you can act on.",
  },
  {
    kicker: "GUIDE",
    href: "/resources/account-scoring",
    title: "Account scoring",
    body: "How Fit and Signal scoring from closed-won data tells reps which account to work and why.",
  },
  {
    kicker: "GUIDE",
    href: "/resources/intent-data-replacement",
    title: "Replacing intent data",
    body: "Public signals you own and can score yourself, instead of a subscription you rent.",
  },
] as const;

export const metadata: Metadata = {
  title: "Resources: GTM engineering guides",
  description:
    "Guides on GTM engineering: how it compares to RevOps, what a build costs, call intelligence, account scoring, and replacing paid intent data.",
  alternates: { canonical: CANONICAL },
};

export default function ResourcesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: CANONICAL },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resources",
    description: metadata.description,
    url: CANONICAL,
    isPartOf: { "@type": "WebSite", name: "Xavier Singletary", url: SITE },
    hasPart: GUIDES.map((g) => ({
      "@type": "WebPage",
      name: g.title,
      url: `${SITE}${g.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Nav />
      <main className="wrap lm-main">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources" }]} />
        <div className="lm-eyebrow mono">RESOURCES</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">GTM engineering guides and resources</h1>
        <p className="faq-intro">{intro}</p>

        <div className="blog-body">
          <section className="lm-sec">
            <h2>START WITH THE DEFINITION</h2>
            <p>
              If you are still working out whether this is a role, a project, or a
              service, read this one first. Everything else assumes you already know.
            </p>
            <div className="lm-grid3">
              <article className="lm-node card-stretch">
                <div className="t">
                  <Link href="/what-is-gtm-engineering" className="card-anchor">
                    What is GTM engineering
                  </Link>
                </div>
                <div className="d">
                  The plain definition, what the work involves, and how it differs
                  from a tool admin or a data engineer.
                </div>
              </article>
            </div>
          </section>

          <section className="lm-sec">
            <h2>THE GUIDES</h2>
            <div className="lm-grid3">
              {GUIDES.map((g) => (
                <article className="lm-node card-stretch" key={g.href}>
                  <div className="t">
                    <Link href={g.href} className="card-anchor">
                      {g.title}
                    </Link>
                  </div>
                  <div className="d">{g.body}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="lm-sec">
            <h2>OR START SMALLER</h2>
            <p>
              No stack access, no call, no cost. Send me the site and I will tell
              you where the funnel leaks.
            </p>
            <div className="lm-grid3">
              <article className="lm-node card-stretch">
                <div className="t">
                  <Link href="/gtm-audit" className="card-anchor">
                    Free outside-in read
                  </Link>
                </div>
                <div className="d">
                  A review of your public signals only. You keep the findings
                  whether or not we work together.
                </div>
              </article>
            </div>
          </section>
        </div>

        <div className="faq-foot">
          <p>Want this built for your team instead of read about?</p>
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
