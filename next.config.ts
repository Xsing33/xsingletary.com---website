import type { NextConfig } from "next";

// The outreach desk runs as its own Railway service (project "outreach-desk").
// It is proxied here so it lives at xsingletary.com/desk without a DNS change.
// The desk holds real prospect data, so it is password protected (HTTP Basic)
// and is never part of this repo.
const DESK = process.env.DESK_URL ?? "https://desk-production-3594.up.railway.app";

const nextConfig: NextConfig = {

  async redirects() {
    return [
      { source: "/gtm-engineer-vs-revops", destination: "/resources/gtm-engineer-vs-revops", permanent: true },
      { source: "/gtm-engineering-cost", destination: "/resources/gtm-engineering-cost", permanent: true },
      { source: "/call-intelligence", destination: "/resources/call-intelligence", permanent: true },
      { source: "/account-scoring", destination: "/resources/account-scoring", permanent: true },
      { source: "/intent-data-replacement", destination: "/resources/intent-data-replacement", permanent: true },

      // Legacy URLs from the two earlier generations of this domain, both still
      // indexed or linked in places. Without these every one of them 404s.
      //
      // Generation 1: WordPress site that lived at the apex until 2023.
      // NOTE: /blog is deliberately NOT redirected. The WordPress-era /blog
      // (a 2023 post index) is gone, and app/blog/page.tsx is now a real
      // index. A redirect here shadows the live page and returns a 308.
      { source: "/feed", destination: "/resources", permanent: true },
      { source: "/category/uncategorized", destination: "/resources", permanent: true },
      { source: "/2019/05", destination: "/resources", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/seo", destination: "/resources", permanent: true },
      { source: "/paid-search", destination: "/resources", permanent: true },
      { source: "/website-development", destination: "/resources", permanent: true },
      { source: "/digital-marketing-services", destination: "/resources", permanent: true },
      { source: "/digital-marketing-career-coaching", destination: "/resources", permanent: true },
      // The consulting service page is the one legacy URL that has a direct
      // modern equivalent: the definitional pillar.
      { source: "/digital-marketing-consulting", destination: "/what-is-gtm-engineering", permanent: true },

      // Generation 2: single-page app that answered on www. www is no longer
      // served by design, so these are dead on the www host, but the apex
      // forms still catch old bookmarks, typed URLs and normalized links.
      { source: "/contact", destination: "/gtm-audit", permanent: true },
      { source: "/services", destination: "/resources", permanent: true },
      { source: "/services/:path*", destination: "/resources", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
    ];
  },

  async rewrites() {
    return [
      // the page itself
      { source: "/desk", destination: `${DESK}/` },
      { source: "/desk/:path*", destination: `${DESK}/:path*` },
      // its api, kept on a separate path so it never collides with site routes
      { source: "/desk-api/:path*", destination: `${DESK}/desk-api/:path*` },
    ];
  },
};

export default nextConfig;
