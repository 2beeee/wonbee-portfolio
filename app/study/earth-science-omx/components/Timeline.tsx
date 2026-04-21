"use client";

import { cn } from "@/lib/study/cn";
import type { StudyBlock } from "../data/schedule-night";
import type { StudyMode } from "./ModeToggle";

export function Timeline({
  blocks,
  mode,
  onJump
}: {
  blocks: StudyBlock[];
  mode: StudyMode;
  onJump: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {blocks.map((block) => (
        <button
          key={block.id}
          type="button"
          onClick={() => onJump(block.jumpId)}
          className={cn(
            "w-full rounded-2xl border p-4 text-left transition",
            mode === "night"
              ? "border-border-dark bg-surface hover:border-combustion/40 hover:bg-surface-light"
              : "border-border-dark bg-surface hover:border-lox/40 hover:bg-surface-light"
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  {block.start} - {block.end}
                </span>
                <span className="rounded-full border border-border-dark bg-base-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                  {block.minutes}분
                </span>
              </div>
              <h3 className="text-lg font-semibold text-warm-white">{block.title}</h3>
              <p className="text-sm leading-6 text-text-secondary">{block.summary}</p>
            </div>
            <div className="flex max-w-md flex-wrap gap-2">
              {block.focusLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border-dark bg-base-black px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
