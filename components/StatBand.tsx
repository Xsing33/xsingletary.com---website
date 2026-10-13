// Above-the-fold proof. Laid out as a horizontal band on purpose: the
// receipts stack in components/ReceiptsStrip.tsx is built for the narrow
// column inside Guide.tsx and stretches badly across a full page width.
const STATS = [
  { stat: "90.8%", label: "of buyer pains went unprobed" },
  { stat: "11,000", label: "accounts enriched, 93.9% verified" },
  { stat: "9", label: "production systems shipped" },
] as const;

export default function StatBand() {
  return (
    <div className="stat-band">
      {STATS.map((s) => (
        <div className="stat-band-item" key={s.stat}>
          <span className="sb-stat">{s.stat}</span>
          <span className="sb-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
