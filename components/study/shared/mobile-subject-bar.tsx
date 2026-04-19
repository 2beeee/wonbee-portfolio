"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Subject } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

export function MobileSubjectBar({ subjects }: { subjects: Subject[] }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-border-dark bg-surface/70 lg:hidden">
      <div className="flex gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        <Link
          href="/study"
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition",
            pathname === "/study"
              ? "border-combustion/50 bg-combustion/15 text-combustion"
              : "border-border-dark text-text-secondary"
          )}
        >
          Dashboard
        </Link>
        {subjects.map((s) => {
          const active = pathname.startsWith(`/study/subjects/${s.id}`);
          return (
            <Link
              key={s.id}
              href={`/study/subjects/${s.id}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[11px] transition",
                active ? "border-border-hover bg-white/5 text-warm-white" : "border-border-dark text-text-secondary"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
              {s.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
