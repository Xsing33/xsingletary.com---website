import fs from "fs";
import path from "path";

const BASE = "https://xsingletary.com";

interface Post {
  slug: string;
  date: string;
}

function getBlogPosts(): Post[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const p = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(".json", ""), date: p.date };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function url(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const posts = getBlogPosts();

  const entries = [
    url(`${BASE}/`, today, "weekly", "1.0"),
    url(`${BASE}/faq`, today, "monthly", "0.9"),
    ...posts.map((p) =>
      url(`${BASE}/blog/${p.slug}`, p.date || today, "monthly", "0.7")
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}