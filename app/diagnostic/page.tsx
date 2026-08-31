import Nav from "@/components/Nav";

export const metadata = {
  title: "Book the Diagnostic — Xavier Singletary",
  description:
    "Book a GTM engineering diagnostic with Xavier Singletary. Map your stack, find what's broken, and see what to build first.",
};

export default function DiagnosticPage() {
  return (
    <>
      <Nav />
      <section className="hero" style={{ paddingBottom: "60px" }}>
        <div className="wrap narrow">
          <div className="section-eyebrow">STEP 01 / DIAGNOSTIC</div>
          <h1 className="hero-headline" style={{ fontSize: "38px" }}>
            Book the diagnostic
          </h1>
          <p className="hero-sub">
            This is where the diagnostic checklist and booking form go. It&apos;s not wired up yet — reach
            out directly below in the meantime.
          </p>
          <div className="hero-actions">
            <a href="mailto:xaviersingletary33@gmail.com?subject=GTM%20diagnostic" className="btn-primary">
              Email Xavier →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
