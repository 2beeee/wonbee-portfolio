import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { AiSession, Subject } from "@/types/study-db";

export function RecentSessions({
  sessions,
  subjects
}: {
  sessions: AiSession[];
  subjects: Subject[];
}) {
  const map = new Map(subjects.map((s) => [s.id, s]));
  return (
    <section className="rounded-xl border border-border-dark bg-surface p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        Recent AI Sessions
      </p>
      {sessions.length === 0 ? (
        <p className="py-4 text-center text-xs text-text-muted">
          아직 없어요. 과목 페이지에서 새 세션을 만들어 보세요.
        </p>
      ) : (
        <ul className="divide-y divide-border-dark">
          {sessions.map((s) => {
            const subj = map.get(s.subject_id);
            return (
              <li key={s.id}>
                <Link
                  href={`/study/subjects/${s.subject_id}/sessions/${s.id}`}
                  className="flex items-center gap-3 py-2.5 hover:bg-white/5"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: subj?.color ?? "#666" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-warm-white">{s.title}</p>
                    <p className="truncate font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {subj?.name} · {s.ai_tool}
                    </p>
                  </div>
                  <p className="hud-value font-mono text-[10px] text-text-muted">
                    {format(parseISO(s.created_at), "MM.dd")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
