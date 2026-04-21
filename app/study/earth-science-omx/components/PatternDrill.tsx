"use client";

import { useState } from "react";
import { cn } from "@/lib/study/cn";
import type { Pattern } from "../data/patterns";

export function PatternDrill({
  pattern,
  done,
  pinned,
  onToggleDone,
  onTogglePin
}: {
  pattern: Pattern;
  done: boolean;
  pinned: boolean;
  onToggleDone: (id: string) => void;
  onTogglePin: (id: string) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const stars = "★".repeat(pattern.frequency) + "☆".repeat(5 - pattern.frequency);

  return (
    <article
      id={`pattern-${pattern.id}`}
      className={cn(
        "rounded-3xl border bg-surface p-5 transition",
        done ? "border-lox/40" : "border-border-dark"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-combustion">{stars}</div>
          <h3 className="text-xl font-semibold text-warm-white">{pattern.title}</h3>
          <p className="text-sm leading-6 text-text-secondary">{pattern.definition}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{pattern.focus}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleDone(pattern.id)}
            className={cn(
              "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
              done
                ? "border-lox/40 bg-lox/10 text-lox"
                : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
            )}
          >
            {done ? "완료" : "체크"}
          </button>
          <button
            type="button"
            onClick={() => onTogglePin(pattern.id)}
            className={cn(
              "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
              pinned
                ? "border-combustion/40 bg-combustion/10 text-combustion"
                : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
            )}
          >
            {pinned ? "아침 핀됨" : "핀"}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border-dark bg-base-black p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-lox">풀이 알고리즘</h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
                  className="rounded-full border border-border-dark px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={() => setStepIndex((value) => Math.min(pattern.algorithm.length - 1, value + 1))}
                  className="rounded-full border border-combustion/40 bg-combustion/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-combustion"
                >
                  다음
                </button>
              </div>
            </div>
            <ol className="mt-3 space-y-2">
              {pattern.algorithm.map((step, index) => {
                const active = index <= stepIndex;
                return (
                  <li
                    key={step}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm leading-6 transition",
                      active
                        ? "border-combustion/30 bg-combustion/10 text-warm-white"
                        : "border-border-dark bg-surface text-text-secondary"
                    )}
                  >
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-combustion">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                );
              })}
            </ol>
          </div>

          {pattern.calculationSteps && (
            <div className="rounded-2xl border border-border-dark bg-surface-light p-4">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">계산 문제 전개</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                {pattern.calculationSteps.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border-dark bg-surface-light p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">함정 패턴</h4>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
              {pattern.traps.map((trap) => (
                <li key={trap}>• {trap}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border-dark bg-base-black p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">이번 시험 범위 예제</h4>
            <div className="mt-3 space-y-3">
              {pattern.examples.map((example) => (
                <div key={`${example.source}-${example.prompt}`} className="rounded-2xl border border-border-dark bg-surface p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-lox">{example.source}</div>
                  <p className="mt-2 text-sm leading-6 text-warm-white">{example.prompt}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">→ {example.punchline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
