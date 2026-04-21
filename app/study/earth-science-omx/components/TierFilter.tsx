"use client";

import { cn } from "@/lib/study/cn";
import { tierMeta, type Tier } from "../data/tiers";

export function TierFilter({
  selected,
  onToggle
}: {
  selected: Tier[];
  onToggle: (tier: Tier) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(tierMeta) as Tier[]).map((tier) => {
        const active = selected.includes(tier);
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onToggle(tier)}
            className={cn(
              "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
              active ? tierMeta[tier].chipClass : "border-border-dark bg-base-black text-text-secondary hover:bg-white/5"
            )}
          >
            {tierMeta[tier].label}
          </button>
        );
      })}
    </div>
  );
}
