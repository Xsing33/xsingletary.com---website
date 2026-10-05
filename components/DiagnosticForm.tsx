"use client";

import { useState } from "react";

type Item = { text: string; system: string };

// Flat list, no category grouping shown to the visitor. Still tagged with a
// system internally for backend scoring/routing once Notion is wired up.
const ITEMS: Item[] = [
  { text: "Reps spend hours on manual research before they can reach out.", system: "Account-to-Outbound Pipeline" },
  { text: "No clear system for deciding which accounts to prioritize.", system: "Orchestrator" },
  { text: "Reps often don't know who the real decision-makers are.", system: "Account-to-Outbound Pipeline" },
  { text: "New accounts don't come with enough context to act on right away.", system: "Account-to-Outbound Pipeline" },
  { text: "No clear picture of why deals are won or lost.", system: "Gong Call Intelligence" },
  { text: "Objection handling varies by rep, with no data behind it.", system: "Gong Call Intelligence" },
  { text: "No easy way to see what buyers push back on most.", system: "Gong Call Intelligence" },
  { text: "Sales and marketing disagree on lead quality.", system: "Clay + HubSpot Scoring" },
  { text: "Leads take too long to reach the right rep.", system: "Clay + HubSpot Scoring" },
  { text: "No data-backed definition of a qualified lead.", system: "Clay + HubSpot Scoring" },
  { text: "GTM knowledge is scattered across people and documents.", system: "GTM Home Base" },
  { text: "Hard to find past reports or analysis when you need them.", system: "GTM Home Base" },
  { text: "Unclear which accounts have room to expand.", system: "Facilities / Account Intelligence" },
  { text: "No systematic way to spot expansion opportunities early.", system: "Facilities / Account Intelligence" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function DiagnosticForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [nudge, setNudge] = useState("");

  const formValid = name.trim().length > 0 && email.includes("@");
  const anyChecked = checked.size > 0;
  const canSubmit = formValid && anyChecked && status !== "submitting";

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  async function handleSubmit() {
    // Button stays enabled on purpose. A disabled button with no explanation
    // is a drop-off point; tell them what's missing instead.
    if (!canSubmit) {
      setNudge(
        !anyChecked
          ? "Check at least one thing that's true for your team, then send it."
          : "Add your name and a work email so I know where to follow up."
      );
      return;
    }
    setNudge("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/diagnostic-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          items: Array.from(checked).map((i) => ITEMS[i]),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="wrap">
      <div className="checklist-panel">
        <div className="checklist-head">
          <h2>What&apos;s true for your team?</h2>
          <p>Check everything that applies. Nothing here commits you to anything.</p>
        </div>
        <div id="checklist">
          {ITEMS.map((item, i) => (
            <div className={`check-item${checked.has(i) ? " checked" : ""}`} key={item.text}>
              <input type="checkbox" id={`item-${i}`} checked={checked.has(i)} onChange={() => toggle(i)} />
              <label htmlFor={`item-${i}`}>{item.text}</label>
            </div>
          ))}
        </div>
        <p className="check-count">
          {checked.size === 0
            ? "Nothing checked yet."
            : `${checked.size} of ${ITEMS.length} checked. Your call gets built around these.`}
        </p>
      </div>

      <div className="form-panel">
        {status === "success" ? (
          <>
            <div className="form-title">DIAGNOSTIC RECEIVED</div>
            <h2>You&apos;re on the list</h2>
            <p className="confirm-panel">
              Thanks, <strong>{name}</strong> — got your diagnostic. I&apos;ll follow up at{" "}
              <strong>{email}</strong> directly to get a call on the calendar.
            </p>
          </>
        ) : (
          <>
            <div className="form-title">START YOUR DIAGNOSTIC</div>
            <h2>Get on the calendar</h2>
            <p className="form-note">
              Add your details and I&apos;ll follow up to book a 30-minute call. The
              diagnostic itself costs nothing.
            </p>

            <div className="field">
              <label htmlFor="fName">Name</label>
              <input
                type="text"
                id="fName"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="fEmail">Work email</label>
              <input
                type="email"
                id="fEmail"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="fCompany">Company</label>
              <input
                type="text"
                id="fCompany"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={handleSubmit}>
              {status === "submitting" ? "Sending…" : "Book Your Diagnostic"}
            </button>

            {nudge && <p className="error-note">{nudge}</p>}

            {status === "error" && (
              <p className="error-note">
                Something didn&apos;t go through. Email me directly at{" "}
                <a href="mailto:xaviersingletary33@gmail.com">xaviersingletary33@gmail.com</a> instead.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}