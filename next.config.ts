import type { NextConfig } from "next";

// The outreach desk runs as its own Railway service (project "outreach-desk").
// It is proxied here so it lives at xsingletary.com/desk without a DNS change.
// The desk holds real prospect data, so it is password protected (HTTP Basic)
// and is never part of this repo.
const DESK = process.env.DESK_URL ?? "https://desk-production-3594.up.railway.app";

const nextConfig: NextConfig = {
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
