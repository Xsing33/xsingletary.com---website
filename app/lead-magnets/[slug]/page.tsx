import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

// Content lives as JSON per magnet in /content/lead-magnets/<slug>.json.
// Read at request time so a magnet self-expires to a 404 exactly at `expiresAt`,
// with no redeploy and no manual cleanup. Prune the files with scripts/prune-lead-magnets.mjs.
//
// COPY STRATEGY (v2): plain words (never "req"), lead with their situation briefly,
// economy of words, one proof, a plain low-friction ask. Sections are optional — omit
// any key and its section disappears, so shorter magnets stay short.
export const dynamic = "force-dynamic";

type Segment = { t: string; hl?: boolean };
type Node = { k?: string; t: string; d: string; core?: boolean };
type Magnet = {
  slug: string;
  company: string;
  contactName: string;
  contactTitle?: string;
  role: string;
  daysOpen?: number;
  createdAt: string;
  expiresAt: string;
  eyebrow: string;
  headline: Segment[];
  intro: string;
  build?: { chain: Node[]; outputsLabel?: string; outputs?: Node[] };
  steps?: { n: string; h: string; p: string }[];
  timeline?: { w: string; h: string; p: string }[];
  outcomes?: { t: string; d: string }[];
  proof?: { nums?: { v: string; l: string }[]; line?: string; cap: string };
  ask?: { t: string; p: string };
  cta?: { label: string; url: string; micro?: string };
  contact?: { email: string };
};

const SLUG_RE = /^[a-z0-9-]+$/;

function load(slug: string): Magnet | null {
  if (!SLUG_RE.test(slug)) return null;
  try {
    const file = path.join(process.cwd(), "content", "lead-magnets", `${slug}.json`);
    return JSON.parse(fs.readFileSync(file, "utf8")) as Magnet;
  } catch {
    return null;
  }
}

function isExpired(m: Magnet): boolean {
  return new Date(`${m.expiresAt}T23:59:59Z`).getTime() < Date.now();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = load(slug);
  if (!m || isExpired(m)) return { title: "Not found", robots: { index: false, follow: false } };
  return {
    title: `${m.company}: a plan for the open ${m.role} role`,
    description: `A one-page plan for ${m.company}'s open ${m.role} role.`,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function LeadMagnetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = load(slug);
  if (!m || isExpired(m)) notFound();

  // {role} in any copy resolves to the exact title from the job description.
  const fill = (s: string) => (s || "").replace(/\{role\}/g, m.role);

  return (
    <div className="lm-page">
      <Nav />
      <main className="wrap lm-main">
        <div className="lm-eyebrow mono">{m.eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">
          {m.headline.map((s, i) => (
            <span key={i} className={s.hl ? "hl" : undefined}>
              {fill(s.t)}
            </span>
          ))}
        </h1>
        <p className="lm-intro">{fill(m.intro)}</p>

        {m.cta && (
          <div className="lm-cta-row">
            <a className="btn-primary" href={m.cta.url} target="_blank" rel="noopener noreferrer">
              {m.cta.label}
            </a>
            {m.cta.micro && <span className="lm-cta-micro">{m.cta.micro}</span>}
          </div>
        )}

        {m.build && (
          <section className="lm-sec">
            <h2>The build</h2>
            <div className="lm-flow">
              {m.build.chain.map((n, i) => (
                <div key={i} className="lm-flow-item">
                  {i > 0 && <div className="lm-arrow">&#9656;</div>}
                  <div className={"lm-node" + (n.core ? " core" : "")}>
                    {n.k && <div className="k mono">{n.k}</div>}
                    <div className="t">{n.t}</div>
                    <div className="d">{n.d}</div>
                  </div>
                </div>
              ))}
            </div>
            {m.build.outputs && m.build.outputs.length > 0 && (
              <>
                <div className="lm-outhead mono">
                  {m.build.outputsLabel || "SHIPS TO THE TOOLS YOU ALREADY USE"}
                </div>
                <div className="lm-grid3">
                  {m.build.outputs.map((n, i) => (
                    <div key={i} className="lm-node">
                      <div className="t">{n.t}</div>
                      <div className="d">{n.d}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {m.steps && (
          <section className="lm-sec">
            <h2>How it works</h2>
            <div className="lm-grid3">
              {m.steps.map((s, i) => (
                <div key={i} className="lm-step">
                  <div className="n mono">{s.n}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {m.timeline && (
          <section className="lm-sec">
            <h2>Three weeks, start to live</h2>
            <div className="lm-grid3">
              {m.timeline.map((t, i) => (
                <div key={i} className="lm-wk">
                  <div className="w mono">{t.w}</div>
                  <div className="h">{t.h}</div>
                  <p>{t.p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {m.cta && (
          <section className="lm-sec">
            <div className="lm-ctaband">
              <div className="t">Want this built for your stack?</div>
              <a className="btn-primary" href={m.cta.url} target="_blank" rel="noopener noreferrer">
                {m.cta.label}
              </a>
            </div>
          </section>
        )}

        {m.outcomes && (
          <section className="lm-sec">
            <h2>What changes</h2>
            <div className="lm-grid3">
              {m.outcomes.map((o, i) => (
                <div key={i} className="lm-node">
                  <div className="t">{o.t}</div>
                  <div className="d">{o.d}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {m.proof && (
          <section className="lm-sec">
            <h2>Proof</h2>
            <div className="lm-proof">
              {m.proof.nums && (
                <div className="lm-nums">
                  {m.proof.nums.map((n, i) => (
                    <div key={i} className="v">
                      {n.v} <span className="l">{n.l}</span>
                    </div>
                  ))}
                </div>
              )}
              {!m.proof.nums && m.proof.line && <div className="lm-big">{m.proof.line}</div>}
              <div className="cap">{m.proof.cap}</div>
            </div>
          </section>
        )}

        {m.ask && (
          <section className="lm-sec">
            <h2>If you want to talk</h2>
            <div className="lm-ask">
              <div className="t">{m.ask.t}</div>
              <p>{m.ask.p}</p>
              {m.cta && (
                <a
                  className="btn-primary lm-ask-btn"
                  href={m.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {m.cta.label}
                </a>
              )}
            </div>
          </section>
        )}

        <div className="lm-foot">
          <div>
            <b>Xavier Singletary</b> · GTM engineer
          </div>
          <div className="mono">
            {m.contact?.email ? (
              <a href={`mailto:${m.contact.email}`}>{m.contact.email}</a>
            ) : (
              "xsingletary.com"
            )}
          </div>
        </div>
      </main>
    </div>
  );
}