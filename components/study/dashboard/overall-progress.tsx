import type { Subject, Task } from "@/types/study-db";

export function OverallProgress({
  subjects,
  tasks
}: {
  subjects: Subject[];
  tasks: Task[];
}) {
  const perSubject = subjects.map((s) => {
    const st = tasks.filter((t) => t.subject_id === s.id);
    if (st.length === 0) return 0;
    return st.filter((t) => t.completed).length / st.length;
  });
  const mean = perSubject.length === 0 ? 0 : perSubject.reduce((a, b) => a + b, 0) / perSubject.length;
  const pct = Math.round(mean * 100);

  return (
    <section className="rounded-xl border border-border-dark bg-surface p-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        <span>Overall Progress</span>
        <span className="hud-value text-warm-white">{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-dark">
        <div
          className="h-full rounded-full bg-gradient-to-r from-combustion to-lox transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
