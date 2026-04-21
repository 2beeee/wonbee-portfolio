"use client";

import { useState } from "react";
import { Pattern } from "../data/patterns";

interface Props {
  patterns: Pattern[];
}

const PRIORITY_COLOR = {
  1: "#FF6B2B",
  2: "#FFB347",
  3: "#888888",
} as const;

const PRIORITY_LABEL = {
  1: "1순위",
  2: "2순위",
  3: "3순위",
} as const;

export default function PatternDrill({ patterns }: Props) {
  const [openId, setOpenId] = useState<string | null>(patterns[0]?.id ?? null);

  return (
    <ul className="space-y-2">
      {patterns.map((p) => {
        const isOpen = openId === p.id;
        const color = PRIORITY_COLOR[p.priority];

        return (
          <li
            key={p.id}
            className="border border-[#2A2A2A] rounded-lg bg-[#0F0F0F] card-glow"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : p.id)}
              className="w-full text-left p-4 flex items-center gap-3"
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center font-bold text-sm hud-value"
                style={{
                  color,
                  backgroundColor: `${color}15`,
                  border: `1px solid ${color}40`,
                }}
              >
                {p.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold">{p.title}</h3>
                <span
                  className="text-[10px] tracking-wider"
                  style={{ color }}
                >
                  {PRIORITY_LABEL[p.priority]}
                </span>
              </div>
              <span className="text-[#888] text-xs">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-[#1A1A1A] pt-3">
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider text-[#888] uppercase mb-2">
                    🧭 풀이 단계
                  </h4>
                  <ol className="space-y-1.5">
                    {p.steps.map((s, i) => (
                      <li key={i} className="text-xs text-[#ccc] leading-relaxed flex gap-2">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center hud-value"
                          style={{
                            color,
                            backgroundColor: `${color}10`,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {p.traps.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider text-[#888] uppercase mb-2">
                      🚨 함정 패턴
                    </h4>
                    <ul className="space-y-1">
                      {p.traps.map((t, i) => (
                        <li
                          key={i}
                          className="text-xs text-[#ccc] leading-relaxed pl-3 border-l-2 border-[#FF6B2B]/40"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {p.examples && p.examples.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider text-[#888] uppercase mb-2">
                      📝 예시
                    </h4>
                    <ul className="space-y-1">
                      {p.examples.map((e, i) => (
                        <li key={i} className="text-xs leading-relaxed">
                          <strong className="text-[#00D4FF]">{e.work}</strong>
                          <span className="text-[#888] mx-1.5">→</span>
                          <span className="text-[#ccc]">{e.tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
