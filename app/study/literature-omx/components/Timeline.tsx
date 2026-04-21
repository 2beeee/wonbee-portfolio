"use client";

import type { TimelineBlock } from "../data/schedule-night";

export function Timeline({
  blocks,
  activeId,
  doneIds,
  onJump,
  onToggleDone
}: {
  blocks: TimelineBlock[];
  activeId: string | null;
  doneIds: Set<string>;
  onJump: (targetId: string, blockId: string) => void;
  onToggleDone: (blockId: string) => void;
}) {
  const total = blocks.reduce((sum, block) => sum + block.minutes, 0);

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
        {blocks.map((block) => {
          const done = doneIds.has(block.id);
          const active = activeId === block.id;
          return (
            <button
              key={block.id}
              type="button"
              onClick={() => onJump(block.targetId, block.id)}
              title={`${block.start} · ${block.minutes}분 · ${block.label}`}
              className="h-full border-r border-border-dark/50 transition hover:opacity-80 last:border-r-0"
              style={{
                flex: block.minutes,
                background: done ? "#FF6B2B" : active ? "#00D4FF" : "#1A1A1A"
              }}
            />
          );
        })}
      </div>

      <ol className="grid gap-2">
        {blocks.map((block) => {
          const done = doneIds.has(block.id);
          const active = activeId === block.id;
          return (
            <li
              key={block.id}
              className={`card-glow rounded-lg border p-3 transition ${
                active
                  ? "border-lox/60 bg-lox/5"
                  : done
                    ? "border-border-dark bg-surface/60 opacity-70"
                    : "border-border-dark bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button type="button" onClick={() => onJump(block.targetId, block.id)} className="flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
                    <span className="hud-value font-mono text-combustion">T+{block.start}</span>
                    <span
                      className="rounded-sm border px-1.5 py-0.5 font-mono text-[9px]"
                      style={{
                        color: block.accent,
                        background: `${block.accent}22`,
                        borderColor: `${block.accent}44`
                      }}
                    >
                      {block.focus}
                    </span>
                    <span className="font-mono text-text-muted">
                      {block.minutes}분 · {block.unit}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-warm-white">{block.label}</p>
                  <ul className="mt-2 space-y-0.5 font-mono text-xs text-text-secondary">
                    {block.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleDone(block.id)}
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
