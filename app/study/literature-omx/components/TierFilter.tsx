"use client";

import { tierMeta, type Tier } from "../data/tiers";

export function TierFilter({
  active,
  onToggle
}: {
  active: Set<Tier>;
  onToggle: (tier: Tier) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["S", "A", "B"] as Tier[]).map((tier) => {
        const meta = tierMeta[tier];
        const on = active.has(tier);
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onToggle(tier)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              on
                ? "border-transparent text-base-black"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
            style={on ? { background: meta.color } : {}}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
