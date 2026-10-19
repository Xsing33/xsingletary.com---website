import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
import { BOOKING_URL } from "@/lib/links";

interface Post {
  slug: string;
  title: string;
  date: string;
  eyebrow: string;
  summary: string;
}

const SITE = "https://xsingletary.com";
const CANONICAL = `${SITE}/blog`;

const INTRO =
  "Notes on outbound, account prioritization, and the systems that tell a rep who to work and why. Written from real builds, not theory.";

function getAllPosts(): Post[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const p = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Post;
      p.slug = f.replace(".json", "");
      return p;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const metadata: Metadata = {
  title: "Blog: outbound and account prioritization",
  description:
    "Notes on outbound, account prioritization, and the systems that tell a rep who to work and why.",
  alternates: { canonical: CANONICAL },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: CANONICAL },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    description: metadata.description,
    url: CANONICAL,
    isPartOf: { "@type": "WebSite", name: "Xavier Singletary", url: SITE },
    hasPart: posts.map((p) => ({
      "@type": "WebPage",
      name: p.title,
      url: `${SITE}/blog/${p.slug}`,
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
        <div className="lm-eyebrow mono">BLOG</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">Notes from the work.</h1>
        <p className="faq-intro">{INTRO}</p>

        <div className="blog-body">
          <section className="lm-sec">
            <h2>POSTS</h2>
            <div className="lm-grid3">
              {posts.map((p) => (
                <Link href={`/blog/${p.slug}`} className="lm-node" key={p.slug}>
                  <div className="t">{p.title}</div>
                  <div className="d">{p.eyebrow || p.date}</div>
                </Link>
              ))}
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
            See what I&apos;d build for you
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}
