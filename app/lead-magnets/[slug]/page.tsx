import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

// Content lives as JSON per magnet in /content/lead-magnets/<slug>.json.
// Read at request time so a magnet self-expires to a 404 exactly at `expiresAt`,
// with no redeploy and no manual cleanup. Prune the files with scripts/prune-lead-magnets.mjs.
export const dynamic = "force-dynamic";

type Segment = { t: string; hl?: boolean };
type Node = { k?: string; t: string; d: string; core?: boolean };
type Magnet = {
  slug: string;
  company: string;
  contactName: string;
  contactTitle: string;
  role: string;
  daysOpen: number;
  createdAt: string;
  expiresAt: string;
  eyebrow: string;
  headline: Segment[];
  intro: string;
  build: { chain: Node[]; outputsLabel: string; outputs: Node[] };
  steps: { n: string; h: string; p: string }[];
  timeline: { w: string; h: string; p: string }[];
  outcomes: { t: string; d: string }[];
  proof: { nums: { v: string; l: string }[]; cap: string };
  ask: { t: string; p: string };
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
    title: `${m.company} — the system I'd ship`,
    description: `A one-page system sketch for ${m.company}'s open ${m.role} req.`,
    // Prospect-specific: never index, never archive.
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

  return (
    <div className="lm-page">
      <Nav />
      <main className="wrap lm-main">
        <div className="lm-eyebrow mono">{m.eyebrow}</div>
        <div className="lm-rule" />
        <h1 className="lm-h1">
          {m.headline.map((s, i) => (
            <span key={i} className={s.hl ? "hl" : undefined}>
              {s.t}
            </span>
          ))}
        </h1>
        <p className="lm-intro">{m.intro}</p>

        <section className="lm-sec">
          <h2>The build I&apos;d ship</h2>
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
          <div className="lm-outhead mono">{m.build.outputsLabel}</div>
          <div className="lm-grid3">
            {m.build.outputs.map((n, i) => (
              <div key={i} className="lm-node">
                <div className="t">{n.t}</div>
                <div className="d">{n.d}</div>
              </div>
            ))}
          </div>
        </section>

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

        <section className="lm-sec">
          <h2>What changes for your team</h2>
          <div className="lm-grid3">
            {m.outcomes.map((o, i) => (
              <div key={i} className="lm-node">
                <div className="t">{o.t}</div>
                <div className="d">{o.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-sec">
          <h2>Proof</h2>
          <div className="lm-proof">
            <div className="lm-nums">
              {m.proof.nums.map((n, i) => (
                <div key={i} className="v">
                  {n.v} <span className="l">{n.l}</span>
                </div>
              ))}
            </div>
            <div className="cap">{m.proof.cap}</div>
          </div>
        </section>

        <section className="lm-sec">
          <h2>The ask</h2>
          <div className="lm-ask">
            <div className="t">{m.ask.t}</div>
            <p>{m.ask.p}</p>
          </div>
        </section>

        <div className="lm-foot">
          <div>
            <b>Xavier Singletary</b> — GTM Engineer
          </div>
          <div className="mono">xsingletary.com</div>
        </div>
      </main>
    </div>
  );
}