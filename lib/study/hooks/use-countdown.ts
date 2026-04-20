"use client";

import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeParts(target: Date): CountdownParts {
  const nowDate = new Date();
  const now = nowDate.getTime();
  const totalMs = target.getTime() - now;
  const abs = Math.abs(totalMs);
  // "D-N" counts calendar days between today and the exam date, matching the
  // Korean school convention (4/20 → 4/22 is always D-2, regardless of time).
  const calendarDays = Math.abs(differenceInCalendarDays(target, nowDate));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);
  const seconds = Math.floor((abs / 1000) % 60);
  return { totalMs, days: calendarDays, hours, minutes, seconds, isPast: totalMs <= 0 };
}

export function useCountdown(target: Date | null): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(() =>
    target ? computeParts(target) : null
  );

  useEffect(() => {
    if (!target) {
      setParts(null);
      return;
    }
    setParts(computeParts(target));
    const t = setInterval(() => setParts(computeParts(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  return parts;
}
