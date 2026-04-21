"use client";

import { Block } from "../data/schedule-night";

interface Props {
  blocks: Block[];
  totalMin: number;
  doneSet: Set<string>;
  onToggleDone: (id: string) => void;
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

const TYPE_META: Record<Block["type"], { label: string; color: string }> = {
  warmup: { label: "WARMUP", color: "#888888" },
  "tier-s": { label: "TIER S", color: "#FF6B2B" },
  "tier-a": { label: "TIER A", color: "#00D4FF" },
  pattern: { label: "PATTERN", color: "#FFB347" },
  drill: { label: "DRILL", color: "#FF6B2B" },
  review: { label: "REVIEW", color: "#FFD700" },
  break: { label: "BREAK", color: "#666666" },
};

export default function Timeline({
  blocks,
  totalMin,
  doneSet,
  onToggleDone,
  activeBlockId,
  onSelectBlock,
}: Props) {
  const doneCount = blocks.filter((b) => doneSet.has(b.id)).length;
  const progress = (doneCount / blocks.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight">📋 학습 타임라인</h2>
        <div className="text-sm text-[#888] hud-value">
          {doneCount} / {blocks.length} · 총 {totalMin}분
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8F5E] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timeline blocks */}
      <ol className="space-y-2">
        {blocks.map((block) => {
          const meta = TYPE_META[block.type];
          const isDone = doneSet.has(block.id);
          const isActive = block.id === activeBlockId;
          const startStr = `${String(Math.floor(block.startMin / 60)).padStart(2, "0")}:${String(block.startMin % 60).padStart(2, "0")}`;

          return (
            <li
              key={block.id}
              className={`relative border rounded-lg transition-all card-glow ${
                isActive
                  ? "border-[#FF6B2B] bg-[#1a1208]"
                  : isDone
                    ? "border-[#1A1A1A] bg-[#0A0A0A] opacity-50"
                    : "border-[#2A2A2A] bg-[#0F0F0F]"
              }`}
            >
              <button
                onClick={() => onSelectBlock(block.id)}
                className="w-full text-left p-4 flex gap-4 items-start"
              >
                {/* Time + duration column */}
                <div className="flex-shrink-0 w-20">
                  <div className="text-[#888] text-xs hud-value">+{startStr}</div>
                  <div className="text-[#F5F0E8] text-sm font-bold hud-value">
                    {block.durationMin}min
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        color: meta.color,
                        backgroundColor: `${meta.color}15`,
                        border: `1px solid ${meta.color}40`,
                      }}
                    >
                      {meta.label}
                    </span>
                    <h3 className={`text-sm font-bold ${isDone ? "line-through" : ""}`}>
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#888] leading-relaxed">{block.desc}</p>
                </div>

                {/* Done checkbox */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDone(block.id);
                  }}
                  className={`flex-shrink-0 w-6 h-6 rounded border flex items-center justify-center cursor-pointer ${
                    isDone
                      ? "bg-[#FF6B2B] border-[#FF6B2B] text-[#0A0A0A]"
                      : "border-[#3A3A3A] hover:border-[#FF6B2B]"
                  }`}
                >
                  {isDone && (
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <path
                        d="M3 8l3.5 3.5L13 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
