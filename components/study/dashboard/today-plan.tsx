"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setPlanStatusAction } from "@/app/study/actions/study-plan";
import { cn } from "@/lib/study/cn";
import type { StudyPlanItem, Subject } from "@/types/study-db";

const SLOT_LABEL: Record<StudyPlanItem["slot"], string> = {
  morning: "오전",
  afternoon: "오후",
  evening: "저녁",
  late: "심야"
};

export function TodayPlan({
  initial,
  subjects
}: {
  initial: StudyPlanItem[];
  subjects: Subject[];
}) {
  const [items, setItems] = useState(initial);
  const [, startTransition] = useTransition();
  const subjectMap = new Map(subjects.map((s) => [s.id, s]));

  function toggle(item: StudyPlanItem) {
    const next = item.status === "done" ? "pending" : "done";
    const prev = items;
    setItems((p) => p.map((x) => (x.id === item.id ? { ...x, status: next } : x)));
    startTransition(async () => {
      try {
        await setPlanStatusAction(item.id, next);
      } catch (e) {
        setItems(prev);
        toast.error("업데이트 실패", { description: (e as Error).message });
      }
    });
  }

  return (
    <div className="rounded-xl border border-border-dark bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
          오늘의 학습 계획
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary">
          {items.filter((i) => i.status === "done").length} / {items.length}
        </div>
      </div>
      {items.length === 0 ? (
        <p className="py-6 text-center text-xs text-text-muted">
          오늘 예정된 항목이 없어요. CLI에서 <code className="font-mono text-combustion">/study-plan &lt;과목&gt;</code>을 실행하면 채워집니다.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => {
            const subject = item.subject_id ? subjectMap.get(item.subject_id) : null;
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-border-dark bg-base-black/60 p-3"
              >
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  aria-pressed={item.status === "done"}
                  className={cn(
                    "mt-0.5 h-4 w-4 flex-none rounded border transition",
                    item.status === "done"
                      ? "border-lox bg-lox/40"
                      : "border-border-hover bg-transparent hover:border-warm-white"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {subject && (
                      <span
                        className="rounded-full px-1.5 py-0.5"
                        style={{ color: subject.color, borderColor: subject.color, borderWidth: 1 }}
                      >
                        {subject.name}
                      </span>
                    )}
                    <span>{SLOT_LABEL[item.slot]}</span>
                    <span>· {item.duration_minutes}분</span>
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-sm",
                      item.status === "done"
                        ? "text-text-muted line-through"
                        : "text-warm-white"
                    )}
                  >
                    {item.title}
                  </div>
                  {item.detail && (
                    <div className="mt-1 text-xs text-text-secondary">{item.detail}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
