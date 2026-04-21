"use client";

import { useState } from "react";
import type { Formula } from "../data/formulas";
import { tierMeta } from "../data/tiers";

export function FormulaCard({ formula }: { formula: Formula }) {
  const [flipped, setFlipped] = useState(false);
  const tc = tierMeta[formula.tier].color;

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className="card-glow relative min-h-[120px] rounded-lg border border-border-dark bg-surface p-4 text-left"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{
            background: `${tc}22`,
            color: tc,
            border: `1px solid ${tc}44`
          }}
        >
          {formula.id} · {formula.tier}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
          {formula.unit} · {flipped ? "ANS" : "Q"}
        </span>
      </div>

      <div className="mt-3">
        {flipped ? (
          <p className="font-mono text-sm text-combustion">{formula.back}</p>
        ) : (
          <p className="font-mono text-sm text-warm-white">{formula.front}</p>
        )}
      </div>

      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
        {flipped ? "▸ 다시 뒤집기" : "▸ 탭하면 정답"}
      </p>
    </button>
  );
}
