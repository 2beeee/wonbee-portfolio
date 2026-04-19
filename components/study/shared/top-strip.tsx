"use client";

import { useCountdown } from "@/lib/study/hooks/use-countdown";
import { formatDday } from "@/lib/study/format";
import { parseISO } from "date-fns";
import { useMemo } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/study/auth/logout-button";

interface NextExam {
  name: string;
  exam_date: string;
  exam_start_time: string | null;
  color: string;
}

export function StudyTopStrip({
  email,
  nextExam
}: {
  email: string;
  nextExam: NextExam | null;
}) {
  const target = useMemo(() => {
    if (!nextExam) return null;
    const time = nextExam.exam_start_time ?? "08:20:00";
    return parseISO(`${nextExam.exam_date}T${time}`);
  }, [nextExam]);

  const parts = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="sticky top-0 z-30 border-b border-border-dark frosted-glass">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/study" className="flex items-center gap-3">
          <span
            className="h-6 w-0.5"
            style={{
              background: `linear-gradient(180deg, ${nextExam?.color ?? "#FF6B2B"}, transparent)`
            }}
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              NEXT EXAM {nextExam ? `/ ${nextExam.name}` : ""}
            </p>
            {parts && !parts.isPast ? (
              <p className="hud-value font-mono text-sm text-warm-white">
                <span className="text-combustion">{formatDday(parts.days)}</span>{" "}
                <span className="text-text-secondary">
                  {pad(parts.hours)}:{pad(parts.minutes)}:{pad(parts.seconds)}
                </span>
              </p>
            ) : parts?.isPast ? (
              <p className="font-mono text-sm text-lox">시험 진행 중 또는 완료</p>
            ) : (
              <p className="font-mono text-sm text-text-muted">시험 일정 미정</p>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted sm:inline">
            {email}
          </span>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
