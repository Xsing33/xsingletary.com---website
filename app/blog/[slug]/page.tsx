import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CtaFooter from "@/components/CtaFooter";

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  eyebrow: string;
  summary: string;
  content: string; // HTML
  seo: { title: string; description: string; canonical: string };
  cta: { label: string; url: string };
}

function loadPost(slug: string): Post | null {
  const p = path.join(process.cwd(), "content", "blog", `${slug}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as Post;
}

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

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = loadPost(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: post.seo.canonical },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = loadPost(params.slug);
  if (!post) return <p>Not found.</p>;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author, url: "https://xsingletary.com" },
    description: post.summary,
    mainEntityOfPage: { "@type": "WebPage", "@id": post.seo.canonical },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://xsingletary.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://xsingletary.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: post.seo.canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Nav />
      <main className="wrap lm-main">
        <div className="lm-eyebrow">{post.eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">{post.title}</h1>
        <p className="faq-intro">{post.summary}</p>

        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((t) => (
              <span key={t} className="blog-tag">{t}</span>
            ))}
          </div>
        )}

        <div className="faq-foot">
          <p>Ready to stop guessing?</p>
          <a
            href={post.cta.url}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.cta.label}
          </a>
        </div>
      </main>
      <CtaFooter />
    </>
  );
}