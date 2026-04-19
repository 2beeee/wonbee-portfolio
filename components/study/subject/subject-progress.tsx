import type { Task } from "@/types/study-db";

export function SubjectProgress({ tasks }: { tasks: Task[] }) {
  const done = tasks.filter((t) => t.completed).length;
  const pct = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);
  return (
    <div className="rounded-lg border border-border-dark bg-surface p-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        <span>Subject Progress</span>
        <span className="hud-value text-warm-white">
          {done}/{tasks.length} · {pct}%
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border-dark">
        <div
          className="h-full rounded-full bg-combustion transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
