"use client";

import type { Block } from "../data/schedule-night";

export function Timeline({
  blocks,
  activeId,
  doneIds,
  onJump,
  onToggleDone
}: {
  blocks: Block[];
  activeId: string | null;
  doneIds: Set<string>;
  onJump: (id: string) => void;
  onToggleDone: (id: string) => void;
}) {
  const total = blocks.reduce((s, b) => s + b.minutes, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          TIMELINE · 총 {total}분 · 블록 {blocks.length}개
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          완료 {doneIds.size} / {blocks.length}
        </p>
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-full border border-border-dark bg-base-black">
        {blocks.map((b) => {
          const flex = b.minutes;
          const done = doneIds.has(b.id);
          const active = activeId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onJump(b.id)}
              title={`${b.start} · ${b.minutes}분 · ${b.label}`}
              className="h-full border-r border-border-dark/50 transition hover:opacity-80 last:border-r-0"
              style={{
                flex,
                background: done
                  ? "#FF6B2B"
                  : active
                  ? "#00D4FF"
                  : "#1A1A1A"
              }}
            />
          );
        })}
      </div>

      <ol className="grid gap-2">
        {blocks.map((b) => {
          const done = doneIds.has(b.id);
          const active = activeId === b.id;
          const tierColor =
            b.tier === "S"
              ? "#FF6B2B"
              : b.tier === "A"
              ? "#00D4FF"
              : b.tier === "B"
              ? "#A0A0A0"
              : "#666666";
          return (
            <li
              key={b.id}
              id={`block-${b.id}`}
              className={`card-glow rounded-lg border p-3 transition ${
                active
                  ? "border-combustion/60 bg-combustion/5"
                  : done
                  ? "border-border-dark bg-surface/60 opacity-70"
                  : "border-border-dark bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onJump(b.id)}
                  className="flex-1 text-left"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
                    <span className="hud-value font-mono text-combustion">
                      T+{b.start}
                    </span>
                    <span
                      className="rounded-sm px-1.5 py-0.5 font-mono text-[9px]"
                      style={{
                        background: `${tierColor}22`,
                        color: tierColor,
                        border: `1px solid ${tierColor}44`
                      }}
                    >
                      {b.tier}
                    </span>
                    <span className="font-mono text-text-muted">
                      {b.minutes}분 · {b.unit}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-warm-white">
                    {b.label}
                  </p>
                  <ul className="mt-2 space-y-0.5 font-mono text-xs text-text-secondary">
                    {b.items.map((it, i) => (
                      <li key={i}>· {it}</li>
                    ))}
                  </ul>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleDone(b.id)}
                  className={`shrink-0 rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
                    done
                      ? "border-combustion/40 bg-combustion/15 text-combustion"
                      : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
                  }`}
                >
                  {done ? "✓ 완료" : "체크"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
