import Nav from "@/components/Nav";
import DiagnosticForm from "@/components/DiagnosticForm";

export const metadata = {
  title: "What's costing you pipeline? A 2-minute diagnostic",
  description:
    "Two-minute diagnostic: check what's true for your GTM stack, get on the calendar for a call built around what you check.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <div className="diagnostic-page">
      <Nav />
      <header>
        <div className="wrap">
          <div className="eyebrow">DIAGNOSTIC — 2 MINUTES</div>
          <h1>What&apos;s actually costing you pipeline?</h1>
          <p>
            Check what&apos;s true for your team. Your diagnostic call gets built around what you check,
            including things most teams don&apos;t realize are connected until they see the full list.
          </p>
        </div>
      </header>

      <DiagnosticForm />
    </div>
  );
}
