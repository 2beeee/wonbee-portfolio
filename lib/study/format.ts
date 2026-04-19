import { differenceInCalendarDays, format, parseISO } from "date-fns";

export function nextExamDateTime(subj: { exam_date: string | null; exam_start_time: string | null }): Date | null {
  if (!subj.exam_date) return null;
  const time = subj.exam_start_time ?? "08:20:00";
  return parseISO(`${subj.exam_date}T${time}`);
}

export function formatExamLabel(subj: { exam_date: string | null; exam_period: string | null; exam_start_time: string | null }): string {
  if (!subj.exam_date) return "시험 일정 미정";
  const d = parseISO(subj.exam_date);
  const dow = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const period = subj.exam_period ? ` · ${subj.exam_period}` : "";
  const start = subj.exam_start_time ? ` · ${subj.exam_start_time.slice(0, 5)}` : "";
  return `${format(d, "MM.dd")} (${dow})${period}${start}`;
}

export function daysUntil(target: Date, now: Date = new Date()): number {
  return differenceInCalendarDays(target, now);
}

export function formatDday(days: number): string {
  if (days === 0) return "D-Day";
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
}
