"use client";

import { Tier, TIER_INFO } from "../data/tiers";

interface Props {
  active: Tier | "ALL";
  onChange: (t: Tier | "ALL") => void;
  counts: Record<Tier | "ALL", number>;
}

export default function TierFilter({ active, onChange, counts }: Props) {
  const buttons: (Tier | "ALL")[] = ["ALL", "S", "A", "B"];

  return (
    <div className="inline-flex gap-1.5 flex-wrap">
      {buttons.map((t) => {
        const isActive = active === t;
        const color = t === "ALL" ? "#F5F0E8" : TIER_INFO[t as Tier].color;
        const label = t === "ALL" ? "전체" : TIER_INFO[t as Tier].label;

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-all border ${
              isActive ? "" : "border-[#2A2A2A] text-[#888] hover:text-[#F5F0E8]"
            }`}
            style={
              isActive
                ? {
                    color: "#0A0A0A",
                    backgroundColor: color,
                    borderColor: color,
                  }
                : undefined
            }
          >
            {label}
            <span className="ml-1.5 opacity-70 hud-value">({counts[t]})</span>
          </button>
        );
      })}
    </div>
  );
}
