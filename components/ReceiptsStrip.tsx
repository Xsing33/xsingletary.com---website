// Single source of truth for the proof receipts.
// Rendered high on the homepage (just below the hero) and again inside
// components/Guide.tsx, so the markup lives in one place.
export default function ReceiptsStrip({ className }: { className?: string }) {
  return (
    <div className={className ? `receipts ${className}` : "receipts"}>
      <div className="receipt">
        <div className="receipt-stat">90.8%</div>
        <div className="receipt-source">
          of buyer pains went unprobed
          <br />
          GONG CALL INTELLIGENCE
        </div>
      </div>
      <div className="receipt">
        <div className="receipt-stat">11,000 / 93.9%</div>
        <div className="receipt-source">
          accounts enriched, verified
          <br />
          ACCOUNT-TO-OUTBOUND PIPELINE
        </div>
      </div>
      <div className="receipt">
        <div className="receipt-stat">Live</div>
        <div className="receipt-source">
          in daily use by AEs
          <br />
          APOLLO PIPELINE ORCHESTRATOR
        </div>
      </div>
    </div>
  );
}
