"use client";

import { useMemo } from "react";
import { parseISO } from "date-fns";
import { useCountdown } from "@/lib/study/hooks/use-countdown";
import { formatDday } from "@/lib/study/format";

export function PrimaryCountdown({
  nextExam
}: {
  nextExam:
    | { name: string; exam_date: string; exam_start_time: string | null; color: string; exam_period: string | null }
    | null;
}) {
  const target = useMemo(() => {
    if (!nextExam) return null;
    return parseISO(`${nextExam.exam_date}T${nextExam.exam_start_time ?? "08:20:00"}`);
  }, [nextExam]);

  const parts = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");

  if (!nextExam || !parts) {
    return (
      <section className="rounded-xl border border-border-dark bg-surface px-6 py-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">NO UPCOMING EXAM</p>
        <p className="mt-2 font-mono text-2xl text-warm-white">일정이 등록되지 않았어요.</p>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden rounded-xl border border-border-dark bg-surface px-6 py-8 accent-line-left"
      style={{ borderColor: "#2A2A2A" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            NEXT EXAM
          </p>
          <p className="mt-1 font-mono text-sm tracking-wider" style={{ color: nextExam.color }}>
            {nextExam.name} · {nextExam.exam_period ?? ""}
          </p>
        </div>
        <p className="hud-value font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          {nextExam.exam_date} · {(nextExam.exam_start_time ?? "08:20").slice(0, 5)}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <p className="hud-value font-mono text-6xl font-medium text-combustion">
          {formatDday(parts.days)}
        </p>
        <p className="hud-value font-mono text-3xl tracking-wider text-warm-white">
          {pad(parts.hours)}:{pad(parts.minutes)}:{pad(parts.seconds)}
        </p>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        2학년 등교 08:00
      </p>
    </section>
  );
}
