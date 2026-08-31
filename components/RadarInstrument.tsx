"use client";

import { useState } from "react";

type Blip = {
  name: string;
  metric: string;
  cx: number;
  cy: number;
  variant?: "amber" | "cyan";
};

const BLIPS: Blip[] = [
  { name: "Apollo Pipeline Orchestrator", metric: "live in daily use", cx: 255, cy: 140, variant: "amber" },
  { name: "Account-to-Outbound Pipeline", metric: "93.9% verified", cx: 150, cy: 255, variant: "cyan" },
  { name: "Gong Call Intelligence", metric: "1,139 questions classified", cx: 280, cy: 240, variant: "amber" },
];

export default function RadarInstrument() {
  const [active, setActive] = useState<Blip | null>(null);

  return (
    <div className="instrument hero-in" style={{ ["--d" as string]: "0.2s" }}>
      <svg viewBox="0 0 400 400">
        <circle className="ring" cx="200" cy="200" r="180" />
        <circle className="ring" cx="200" cy="200" r="130" />
        <circle className="ring" cx="200" cy="200" r="80" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="#212B38" strokeWidth="1" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="#212B38" strokeWidth="1" />
        <g className="sweep-group">
          <line x1="200" y1="200" x2="200" y2="20" stroke="url(#sweepGrad)" strokeWidth="2" />
        </g>
        <defs>
          <linearGradient id="sweepGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#5AD1E0" stopOpacity="0" />
            <stop offset="100%" stopColor="#5AD1E0" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {BLIPS.map((blip) => (
          <g
            key={blip.name}
            className="blip-hit"
            onMouseEnter={() => setActive(blip)}
            onMouseLeave={() => setActive(null)}
          >
            <circle className={`blip${blip.variant === "cyan" ? " c" : ""}`} cx={blip.cx} cy={blip.cy} r="3.5" />
            <circle cx={blip.cx} cy={blip.cy} r="14" fill="transparent" />
          </g>
        ))}
        <circle cx="200" cy="200" r="3" fill="#E7ECF2" />
      </svg>
      <div className={`blip-tooltip${active ? " show" : ""}`}>
        <div className="blip-tooltip-name">{active?.name}</div>
        <div className="blip-tooltip-metric">{active?.metric}</div>
      </div>
    </div>
  );
}
