"use client";

import { useState } from "react";
import type { Pattern } from "../data/patterns";
import { tierMeta } from "../data/tiers";

export function PatternDrill({
  pattern,
  pinned,
  done,
  onPin,
  onToggleDone
}: {
  pattern: Pattern;
  pinned: boolean;
  done: boolean;
  onPin: () => void;
  onToggleDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [showTraps, setShowTraps] = useState(false);
  const meta = tierMeta[pattern.tier];
  const stepsShown = Math.min(step + 1, pattern.algorithm.length);

  return (
    <article
      id={`pattern-${pattern.id}`}
      className={`card-glow rounded-xl border p-4 transition ${
        done ? "border-border-dark bg-surface/70 opacity-85" : "border-border-dark bg-surface"
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span
              className="rounded-sm border px-1.5 py-0.5 font-mono"
              style={{
                color: meta.color,
                background: `${meta.color}22`,
                borderColor: `${meta.color}44`
              }}
            >
              {pattern.id} · {meta.label}
            </span>
            <span className="font-mono text-text-muted">{pattern.unit}</span>
            <span className="font-mono text-text-muted">{pattern.frequency}</span>
          </div>
          <h3 className="mt-1 font-mono text-base text-warm-white">
            {pattern.important ? "⭐ " : ""}
            {pattern.title}
          </h3>
          <p className="mt-2 font-mono text-xs leading-6 text-text-secondary">{pattern.definition}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPin}
            className={`rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              pinned
                ? "border-lox/40 bg-lox/15 text-lox"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {pinned ? "📌 핀됨" : "📍 핀"}
          </button>
          <button
            type="button"
            onClick={onToggleDone}
            className={`rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              done
                ? "border-combustion/40 bg-combustion/15 text-combustion"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {done ? "✓ 완료" : "체크"}
          </button>
        </div>
      </header>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
            풀이 5단계 · {stepsShown}/{pattern.algorithm.length}
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
              onClick={() => setStep((current) => Math.min(current + 1, pattern.algorithm.length - 1))}
              className="rounded-md border border-combustion/40 bg-combustion/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-combustion"
            >
              ▸ 다음
            </button>
          </div>
        </div>

        <ol className="space-y-1">
          {pattern.algorithm.slice(0, stepsShown).map((item, index) => (
            <li
              key={item}
              className="flex gap-2 rounded-md border border-border-dark bg-base-black/60 p-2 font-mono text-xs text-warm-white/90"
            >
              <span className="hud-value text-combustion">0{index + 1}</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setShowTraps((current) => !current)}
          className="w-full rounded-md border border-border-dark px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
        >
          {showTraps ? "함정 닫기 ▲" : `함정 패턴 (${pattern.traps.length}) ▼`}
        </button>

        {showTraps ? (
          <div className="rounded-md border border-combustion/30 bg-combustion/5 p-3">
            <ul className="space-y-1">
              {pattern.traps.map((trap) => (
                <li key={trap} className="font-mono text-xs text-warm-white/90">
                  ⚠︎ {trap}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <section className="rounded-md border border-border-dark bg-base-black/60 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">이번 시험 적용 예시</p>
          <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
            {pattern.examples.map((example) => (
              <li key={example}>· {example}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
