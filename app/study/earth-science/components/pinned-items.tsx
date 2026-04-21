"use client";

import type { Concept } from "../data/concepts";
import type { Pattern } from "../data/patterns";

export function PinnedItems({
  pinnedConcepts,
  pinnedPatterns,
  onJump,
  onUnpinConcept,
  onUnpinPattern
}: {
  pinnedConcepts: Concept[];
  pinnedPatterns: Pattern[];
  onJump: (anchorId: string) => void;
  onUnpinConcept: (id: string) => void;
  onUnpinPattern: (id: string) => void;
}) {
  const total = pinnedConcepts.length + pinnedPatterns.length;

  return (
    <section className="rounded-lg border border-lox/30 bg-lox/5 p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">
          📌 MORNING PIN · 내일 아침용
        </p>
        <p className="font-mono text-[10px] text-text-muted">{total}개</p>
      </div>

      {total === 0 ? (
        <p className="mt-2 font-mono text-xs text-text-secondary">
          오늘밤 불안한 개념·유형에 📍 핀을 달면 내일 아침 모드에서
          여기로 자동 소환됩니다.
        </p>
      ) : (
        <ul className="mt-2 space-y-1">
          {pinnedConcepts.map((c) => (
            <li
              key={`c-${c.id}`}
              className="flex items-center justify-between gap-2 rounded-md border border-border-dark bg-base-black/40 px-2 py-1.5"
            >
              <button
                type="button"
                onClick={() => onJump(`concept-${c.id}`)}
                className="flex-1 text-left"
              >
                <p className="font-mono text-xs text-warm-white">
                  <span className="text-lox">개념 {c.id}</span> · {c.title}
                </p>
                <p className="font-mono text-[10px] text-text-muted">
                  {c.oneLiner}
                </p>
              </button>
              <button
                type="button"
                onClick={() => onUnpinConcept(c.id)}
                className="shrink-0 rounded-md border border-border-dark px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted hover:text-warm-white"
              >
                ✕
              </button>
            </li>
          ))}
          {pinnedPatterns.map((p) => (
            <li
              key={`p-${p.id}`}
              className="flex items-center justify-between gap-2 rounded-md border border-border-dark bg-base-black/40 px-2 py-1.5"
            >
              <button
                type="button"
                onClick={() => onJump(`pattern-${p.id}`)}
                className="flex-1 text-left"
              >
                <p className="font-mono text-xs text-warm-white">
                  <span className="text-combustion">유형 {p.id}</span> ·{" "}
                  {p.title}
                </p>
              </button>
              <button
                type="button"
                onClick={() => onUnpinPattern(p.id)}
                className="shrink-0 rounded-md border border-border-dark px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted hover:text-warm-white"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
