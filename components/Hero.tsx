import Link from "next/link";
import RadarInstrument from "./RadarInstrument";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1 className="hero-headline hero-in" style={{ ["--d" as string]: "0s" }}>
            GTM Engineering, Not Another Tool
          </h1>
          <p className="hero-sub hero-in" style={{ ["--d" as string]: "0.12s" }}>
            The tools aren&apos;t the problem. The connections between them are. I build those.
          </p>
          <div className="hero-actions hero-in" style={{ ["--d" as string]: "0.24s" }} id="lead-magnet">
            <Link href="/diagnostic" className="btn-primary">
              Book the diagnostic →
            </Link>
            <a href="#problem" className="btn-secondary">
              See what buyers actually say
            </a>
          </div>
        </div>

        <RadarInstrument />
      </div>
    </section>
  );
}
