import RadarInstrument from "./RadarInstrument";
import { BOOKING_URL } from "@/lib/links";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1 className="hero-headline hero-in" style={{ ["--d" as string]: "0s" }}>
            Your reps are guessing who to call.
          </h1>
          <p className="hero-sub hero-in" style={{ ["--d" as string]: "0.12s" }}>
            I build the system that ends the guessing. It picks the account, finds the buyer, writes the
            message, and hands it to your rep every morning. On your stack, not a new tool.
          </p>
          <div className="hero-actions hero-in" style={{ ["--d" as string]: "0.24s" }} id="lead-magnet">
            <a href={BOOKING_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Run the diagnostic
            </a>
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
