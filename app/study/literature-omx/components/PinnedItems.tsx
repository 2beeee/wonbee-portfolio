"use client";

import type { Pattern } from "../data/patterns";
import type { Work } from "../data/works";

export function PinnedItems({
  mode,
  works,
  patterns,
  onJump,
  onUnpinWork,
  onUnpinPattern
}: {
  mode: "night" | "morning";
  works: Work[];
  patterns: Pattern[];
  onJump: (targetId: string) => void;
  onUnpinWork: (id: string) => void;
  onUnpinPattern: (id: string) => void;
}) {
  return (
    <section
      id="pinned-section"
      className={`rounded-xl border p-4 ${
        mode === "morning" ? "border-lox/40 bg-lox/5" : "border-border-dark bg-surface"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {mode === "morning" ? "MORNING QUEUE" : "PINNED"}
          </p>
          <p className={`mt-1 font-mono text-sm ${mode === "morning" ? "text-lox" : "text-warm-white"}`}>
            내일 아침에 볼 것
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {works.length + patterns.length}개
        </p>
      </div>

      {works.length === 0 && patterns.length === 0 ? (
        <p className="mt-3 font-mono text-xs text-text-secondary">
          밤 학습 중 막히는 카드나 유형을 핀하면 여기에 자동으로 쌓입니다.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {works.map((work) => (
            <div key={work.id} className="flex items-center justify-between gap-2 rounded-md border border-border-dark bg-base-black/60 p-2">
              <button type="button" onClick={() => onJump(`work-${work.id}`)} className="flex-1 text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">WORK</p>
                <p className="mt-1 font-mono text-sm text-warm-white">{work.title}</p>
              </button>
              <button
                type="button"
                onClick={() => onUnpinWork(work.id)}
                className="rounded-md border border-border-dark px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
              >
                해제
              </button>
            </div>
          ))}

          {patterns.map((pattern) => (
            <div key={pattern.id} className="flex items-center justify-between gap-2 rounded-md border border-border-dark bg-base-black/60 p-2">
              <button type="button" onClick={() => onJump(`pattern-${pattern.id}`)} className="flex-1 text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">PATTERN</p>
                <p className="mt-1 font-mono text-sm text-warm-white">{pattern.title}</p>
              </button>
              <button
                type="button"
                onClick={() => onUnpinPattern(pattern.id)}
                className="rounded-md border border-border-dark px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
              >
                해제
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
