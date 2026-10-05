import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://xsingletary.com";
const TAGLINE = "GTM engineering systems for Series B/C sales teams";
const DESC =
  "I build the systems that tell sales reps who to call, why now, and what to say, on the tools you already pay for.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${TAGLINE} | Xavier Singletary`,
    template: "%s | Xavier Singletary",
  },
  description: DESC,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Xavier Singletary",
    title: `${TAGLINE} | Xavier Singletary`,
    description: DESC,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Xavier Singletary — GTM engineering systems for Series B/C sales teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TAGLINE} | Xavier Singletary`,
    description: DESC,
    images: ["/og.png"],
  },
};

// Who he is and what he sells, for answer engines and search.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Xavier Singletary",
      jobTitle: "GTM Engineer",
      url: SITE,
      description:
        "GTM engineer who builds pipeline systems for Series B/C sales and marketing teams: account scoring, lead scoring, call intelligence, and contact enrichment on the tools a company already pays for.",
      knowsAbout: [
        "GTM engineering",
        "account prioritization",
        "lead scoring",
        "call intelligence",
        "sales pipeline automation",
        "contact enrichment",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Xavier Singletary — GTM Engineering",
      url: SITE,
      description: DESC,
      founder: { "@id": `${SITE}/#person` },
      areaServed: "US",
      serviceType: "GTM engineering systems",
      image: `${SITE}/og.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Xavier Singletary",
      publisher: { "@id": `${SITE}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grid-bg"></div>
        <div className="scanlines"></div>
        <div className="vignette"></div>
        {children}
      </body>
    </html>
  );
}