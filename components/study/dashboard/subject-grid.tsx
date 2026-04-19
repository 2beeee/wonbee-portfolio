"use client";

import Link from "next/link";
import { formatExamLabel, nextExamDateTime, daysUntil, formatDday } from "@/lib/study/format";
import type { Subject, Task } from "@/types/study-db";

export function SubjectGrid({
  subjects,
  tasks
}: {
  subjects: Subject[];
  tasks: Task[];
}) {
  return (
    <section>
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        Subjects · {subjects.length}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((s) => {
          const subjTasks = tasks.filter((t) => t.subject_id === s.id);
          const total = subjTasks.length;
          const done = subjTasks.filter((t) => t.completed).length;
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          const focus = [...subjTasks]
            .filter((t) => !t.completed)
            .sort((a, b) => a.priority - b.priority || a.order - b.order)[0];
          const dt = nextExamDateTime(s);
          const d = dt ? daysUntil(dt) : null;

          return (
            <Link
              key={s.id}
              href={`/study/subjects/${s.id}`}
              className="card-glow group relative flex flex-col gap-3 rounded-xl border border-border-dark bg-surface p-4"
            >
              <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: s.color }} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium tracking-wide text-warm-white">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {formatExamLabel(s)}
                  </p>
                </div>
                {d !== null && (
                  <p className="hud-value font-mono text-sm text-combustion">{formatDday(d)}</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-text-muted">
                  <span>PROGRESS</span>
                  <span className="hud-value">
                    {done}/{total} · {pct}%
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border-dark">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${pct}%`, background: s.color }}
                  />
                </div>
              </div>
              {focus && (
                <p className="truncate rounded-full border border-border-dark bg-base-black/40 px-3 py-1 text-xs text-text-secondary">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                    Focus ·
                  </span>
                  {focus.title}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
