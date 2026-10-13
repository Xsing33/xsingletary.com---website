import ReceiptsStrip from "./ReceiptsStrip";

export default function Guide() {
  return (
    <section id="guide">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Hey, I&apos;m Xavier</h2>
        </div>

        <div className="guide-grid">
          <div className="guide-bio reveal">
            <p>
              I&apos;m a <strong>GTM Engineer</strong>. My approach is simple: extract the intelligence
              already sitting in your tools, connect it across systems that don&apos;t talk to each other,
              and ship it to the people who need it.
            </p>
            <p>Now I build the same kind of systems for Series B/C GTM teams living the same problem.</p>
          </div>

          <ReceiptsStrip className="reveal" />
        </div>
      </div>
    </section>
  );
}
