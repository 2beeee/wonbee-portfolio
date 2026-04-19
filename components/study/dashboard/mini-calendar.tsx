"use client";

import { addDays, format, isSameDay, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { cn } from "@/lib/study/cn";
import type { Subject } from "@/types/study-db";

export function MiniCalendar({
  subjects,
  onSelectDate
}: {
  subjects: Subject[];
  onSelectDate?: (date: Date | null) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i)), [today]);
  const [selected, setSelected] = useState<Date | null>(null);

  function subjectsOnDate(d: Date) {
    return subjects.filter((s) => s.exam_date && isSameDay(parseISO(s.exam_date), d));
  }

  const dow = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <section className="rounded-xl border border-border-dark bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          7-DAY WINDOW
        </p>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              onSelectDate?.(null);
            }}
            className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
          >
            Clear
          </button>
        )}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const subs = subjectsOnDate(d);
          const isSelected = selected && isSameDay(selected, d);
          const isToday = isSameDay(d, today);
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => {
                const next = isSelected ? null : d;
                setSelected(next);
                onSelectDate?.(next);
              }}
              className={cn(
                "flex flex-col items-center rounded-lg border px-2 py-3 text-center transition",
                isSelected
                  ? "border-combustion/60 bg-combustion/10"
                  : isToday
                  ? "border-border-hover bg-white/5"
                  : "border-border-dark hover:bg-white/5"
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {dow[d.getDay()]}
              </span>
              <span className="hud-value mt-1 font-mono text-base text-warm-white">
                {format(d, "dd")}
              </span>
              <div className="mt-2 flex h-2 items-center gap-1">
                {subs.slice(0, 3).map((s) => (
                  <span
                    key={s.id}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
