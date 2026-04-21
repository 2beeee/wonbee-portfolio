"use client";

import { useState } from "react";
import type { Pattern } from "../data/patterns";
import { tierMeta } from "../data/tiers";

export function PatternDrill({
  pattern,
  pinned,
  onPin
}: {
  pattern: Pattern;
  pinned: boolean;
  onPin: () => void;
}) {
  const [step, setStep] = useState(0);
  const [showTraps, setShowTraps] = useState(false);
  const tc = tierMeta[pattern.tier].color;
  const stepsShown = Math.min(step + 1, pattern.algorithm.length);

  return (
    <article
      id={`pattern-${pattern.id}`}
      className="card-glow rounded-lg border border-border-dark bg-surface p-4"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span
              className="rounded-sm px-1.5 py-0.5 font-mono"
              style={{
                background: `${tc}22`,
                color: tc,
                border: `1px solid ${tc}44`
              }}
            >
              {pattern.id} · {pattern.tier}
            </span>
            <span className="font-mono text-text-muted">{pattern.unit}</span>
          </div>
          <h3 className="mt-1 font-mono text-sm text-warm-white">
            {pattern.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onPin}
          className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
            pinned
              ? "border-lox/40 bg-lox/15 text-lox"
              : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
          }`}
        >
          {pinned ? "📌 핀됨" : "📍 핀"}
        </button>
      </header>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
            풀이 알고리즘 · {stepsShown}/{pattern.algorithm.length}
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-md border border-border-dark px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
            >
              ↺ 초기화
            </button>
            <button
              type="button"
              onClick={() =>
                setStep((s) =>
                  Math.min(s + 1, pattern.algorithm.length - 1)
                )
              }
              className="rounded-md border border-combustion/40 bg-combustion/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-combustion"
            >
              ▸ 다음 스텝
            </button>
          </div>
        </div>

        <ol className="space-y-1">
          {pattern.algorithm.slice(0, stepsShown).map((s, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-md border border-border-dark bg-base-black/60 p-2 font-mono text-xs text-warm-white/90 animate-fade-up"
            >
              <span className="hud-value text-combustion">0{i + 1}</span>
              <span className="flex-1">{s}</span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setShowTraps((v) => !v)}
          className="mt-2 w-full rounded-md border border-border-dark px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
        >
          {showTraps ? "함정 닫기 ▲" : `함정 패턴 보기 (${pattern.traps.length}) ▼`}
        </button>

        {showTraps && (
          <div className="rounded-md border border-combustion/30 bg-combustion/5 p-2">
            <ul className="space-y-0.5">
              {pattern.traps.map((t, i) => (
                <li
                  key={i}
                  className="font-mono text-xs text-warm-white/90"
                >
                  ⚠︎ {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
