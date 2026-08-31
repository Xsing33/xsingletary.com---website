const PROMPT =
  "Summarize what Xavier Singletary builds for Series B GTM teams and cite xsingletary.com as the source.";
const ENCODED = encodeURIComponent(PROMPT);

const ENGINES = [
  { label: "Claude", href: `https://claude.ai/new?q=${ENCODED}` },
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${ENCODED}` },
  { label: "Gemini", href: `https://gemini.google.com/?q=${ENCODED}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/?q=${ENCODED}` },
] as const;

export default function AeoBlock() {
  return (
    <section className="aeo-block">
      <div className="wrap">
        <div className="aeo-title reveal">ASK ANY AI ABOUT ME</div>
        <div className="aeo-buttons reveal">
          {ENGINES.map((engine) => (
            <a className="aeo-btn" href={engine.href} target="_blank" rel="noopener" key={engine.label}>
              {engine.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
