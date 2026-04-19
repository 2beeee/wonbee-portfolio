"use client";

import { useMemo, useState, useTransition, useEffect } from "react";
import { parseISO, differenceInCalendarDays, isSameDay } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { toggleTask } from "@/lib/study/db/tasks";
import { useRealtimeTable } from "@/lib/study/hooks/use-realtime-table";
import type { Subject, Task } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

interface Props {
  initialTasks: Task[];
  subjects: Subject[];
  userId: string;
  selectedDate?: Date | null;
}

export function FocusList({ initialTasks, subjects, userId, selectedDate }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [, startTransition] = useTransition();

  // Sync from parent after realtime refresh
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const refresh = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("order", { ascending: true });
    if (data) setTasks(data as Task[]);
  };

  useRealtimeTable("tasks", userId, refresh);

  const subjectMap = useMemo(() => new Map(subjects.map((s) => [s.id, s])), [subjects]);
  const today = useMemo(() => new Date(), []);

  const filtered = useMemo(() => {
    const list = tasks.filter((t) => {
      if (selectedDate) {
        if (!t.due_date) return false;
        return isSameDay(parseISO(t.due_date), selectedDate);
      }
      if (t.completed) return false;
      const subj = subjectMap.get(t.subject_id);
      const due = t.due_date ? parseISO(t.due_date) : null;
      const dueToday = due && differenceInCalendarDays(due, today) <= 0;
      const examSoon =
        subj?.exam_date && differenceInCalendarDays(parseISO(subj.exam_date), today) <= 3;
      return Boolean(dueToday || examSoon);
    });
    return list.sort((a, b) => {
      const sa = subjectMap.get(a.subject_id);
      const sb = subjectMap.get(b.subject_id);
      const daysA = sa?.exam_date ? differenceInCalendarDays(parseISO(sa.exam_date), today) : 99;
      const daysB = sb?.exam_date ? differenceInCalendarDays(parseISO(sb.exam_date), today) : 99;
      if (daysA !== daysB) return daysA - daysB;
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.created_at.localeCompare(b.created_at);
    });
  }, [tasks, subjectMap, today, selectedDate]);

  async function handleToggle(t: Task) {
    setTasks((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x))
    );
    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        await toggleTask(supabase, t.id, !t.completed);
      } catch (e) {
        setTasks((prev) =>
          prev.map((x) => (x.id === t.id ? { ...x, completed: t.completed } : x))
        );
        toast.error("업데이트 실패", { description: (e as Error).message });
      }
    });
  }

  const heading = selectedDate
    ? `${selectedDate.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}의 할 일`
    : "Focus · 오늘 · 시험 3일 이내";

  return (
    <section className="rounded-xl border border-border-dark bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{heading}</p>
        <p className="hud-value font-mono text-[10px] text-text-muted">{filtered.length}</p>
      </div>
      {filtered.length === 0 ? (
        <p className="py-4 text-center text-xs text-text-muted">표시할 할 일이 없어요.</p>
      ) : (
        <ul className="divide-y divide-border-dark">
          {filtered.map((t) => {
            const subj = subjectMap.get(t.subject_id);
            return (
              <li key={t.id} className="flex items-center gap-3 py-2">
                <button
                  type="button"
                  onClick={() => handleToggle(t)}
                  className={cn(
                    "h-4 w-4 shrink-0 rounded border transition",
                    t.completed
                      ? "border-combustion bg-combustion/40"
                      : "border-border-hover hover:border-combustion"
                  )}
                  aria-label="Toggle task"
                />
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: subj?.color ?? "#666" }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm",
                      t.completed ? "text-text-muted line-through" : "text-warm-white"
                    )}
                  >
                    {t.title}
                  </p>
                  {subj && (
                    <Link
                      href={`/study/subjects/${subj.id}`}
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
                    >
                      {subj.name}
                    </Link>
                  )}
                </div>
                {t.priority === 1 && (
                  <span className="rounded-full border border-combustion/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-combustion">
                    HI
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
