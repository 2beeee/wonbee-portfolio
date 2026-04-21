"use client";

import { cn } from "@/lib/study/cn";

export type StudyMode = "night" | "morning";

export function ModeToggle({
  mode,
  onChange
}: {
  mode: StudyMode;
  onChange: (mode: StudyMode) => void;
}) {
  const items: Array<{ id: StudyMode; label: string; subtitle: string }> = [
    { id: "night", label: "밤 학습 모드", subtitle: "120분 / 정복 위주" },
    { id: "morning", label: "아침 압축 모드", subtitle: "30분 / 회수 위주" }
  ];

  return (
    <div className="inline-flex rounded-2xl border border-border-dark bg-base-black p-1">
      {items.map((item) => {
        const active = mode === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "rounded-xl px-4 py-3 text-left transition sm:min-w-[190px]",
              active ? "bg-combustion/15 text-warm-white" : "text-text-secondary hover:bg-white/5"
            )}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em]">
              {item.label}
            </div>
            <div className={cn("mt-1 text-xs", active ? "text-combustion" : "text-text-muted")}>
              {item.subtitle}
            </div>
          </button>
        );
      })}
    </div>
  );
}
