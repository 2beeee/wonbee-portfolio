"use client";

import Link from "next/link";
import { useMemo } from "react";
import { parseISO } from "date-fns";
import { cn } from "@/lib/study/cn";
import { formatDday, daysUntil, nextExamDateTime } from "@/lib/study/format";
import type { Subject, Task } from "@/types/study-db";

interface ExamGroup {
  key: string;
  date: Date;
  isoDate: string;
  subjects: Subject[];
}

export function ExamTimeline({
  subjects,
  tasks,
  onSelectDate,
  selectedIso
}: {
  subjects: Subject[];
  tasks: Task[];
  onSelectDate?: (iso: string | null) => void;
  selectedIso?: string | null;
}) {
  const groups = useMemo<ExamGroup[]>(() => {
    const map = new Map<string, ExamGroup>();
    for (const s of subjects) {
      if (!s.exam_date) continue;
      const existing = map.get(s.exam_date);
      if (existing) {
        existing.subjects.push(s);
      } else {
        map.set(s.exam_date, {
          key: s.exam_date,
          isoDate: s.exam_date,
          date: parseISO(s.exam_date),
          subjects: [s]
        });
      }
    }
    const undated = subjects.filter((s) => !s.exam_date);
    const arr = Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    if (undated.length > 0) {
      arr.push({ key: "undated", isoDate: "", date: new Date(0), subjects: undated });
    }
    return arr;
  }, [subjects]);

  const dow = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Exam Timeline · {subjects.length}
        </h2>
        {selectedIso && (
          <button
            type="button"
            onClick={() => onSelectDate?.(null)}
            className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
          >
            Clear filter
          </button>
        )}
      </div>

      <ol className="space-y-3">
        {groups.map((g) => {
          const dt = g.subjects.find((s) => s.exam_date)
            ? nextExamDateTime(g.subjects[0])
            : null;
          const d = dt ? daysUntil(dt) : null;
          const isSelected = selectedIso === g.isoDate;
          const isPast = d !== null && d < 0;

          return (
            <li key={g.key}>
              <div className="rounded-xl border border-border-dark bg-surface p-4">
                <button
                  type="button"
                  disabled={!g.isoDate}
                  onClick={() =>
                    onSelectDate?.(isSelected ? null : g.isoDate || null)
                  }
                  className={cn(
                    "flex w-full items-baseline justify-between gap-3 text-left",
                    g.isoDate && "cursor-pointer hover:text-warm-white"
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    {g.isoDate ? (
                      <>
                        <span className="font-mono text-base text-warm-white">
                          {g.date.getMonth() + 1}/{g.date.getDate()}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                          ({dow[g.date.getDay()]})
                        </span>
                      </>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                        시험 일정 미정
                      </span>
                    )}
                    {isSelected && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-combustion">
                        · filtering
                      </span>
                    )}
                  </div>
                  {d !== null && !isPast && (
                    <span className="hud-value font-mono text-lg text-combustion">
                      {formatDday(d)}
                    </span>
                  )}
                  {isPast && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      완료
                    </span>
                  )}
                </button>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {g.subjects.map((s) => {
                    const subjTasks = tasks.filter((t) => t.subject_id === s.id);
                    const total = subjTasks.length;
                    const done = subjTasks.filter((t) => t.completed).length;
                    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                    const focus = [...subjTasks]
                      .filter((t) => !t.completed)
                      .sort(
                        (a, b) => a.priority - b.priority || a.order - b.order
                      )[0];
                    return (
                      <Link
                        key={s.id}
                        href={`/study/subjects/${s.id}`}
                        className="card-glow group relative flex flex-col gap-2 rounded-lg border border-border-dark bg-base-black/40 p-3"
                      >
                        <div
                          className="absolute left-0 top-0 h-full w-0.5"
                          style={{ background: s.color }}
                        />
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-medium tracking-wide text-warm-white">
                            {s.name}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                            {s.exam_period ?? ""}
                            {s.exam_start_time ? ` · ${s.exam_start_time.slice(0, 5)}` : ""}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between font-mono text-[10px] text-text-muted">
                            <span>PROGRESS</span>
                            <span className="hud-value">
                              {done}/{total} · {pct}%
                            </span>
                          </div>
                          <div className="mt-1 h-1 overflow-hidden rounded-full bg-border-dark">
                            <div
                              className="h-full rounded-full transition-[width] duration-500"
                              style={{ width: `${pct}%`, background: s.color }}
                            />
                          </div>
                        </div>
                        {focus && (
                          <p className="truncate rounded-full border border-border-dark bg-base-black/60 px-3 py-1 text-xs text-text-secondary">
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                              Focus ·{" "}
                            </span>
                            {focus.title}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
