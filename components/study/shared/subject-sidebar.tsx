"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatExamLabel } from "@/lib/study/format";
import { cn } from "@/lib/study/cn";
import type { Subject } from "@/types/study-db";

export function SubjectSidebar({ subjects }: { subjects: Subject[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-border-dark bg-surface/50 lg:block">
      <div className="sticky top-[4rem] max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          Subjects · {subjects.length}
        </p>
        <nav>
          <ul className="space-y-1">
            <li>
              <Link
                href="/study"
                className={cn(
                  "block rounded-md px-3 py-2 font-mono text-xs tracking-wider transition",
                  pathname === "/study"
                    ? "bg-combustion/15 text-combustion"
                    : "text-text-secondary hover:bg-white/5 hover:text-warm-white"
                )}
              >
                Dashboard
              </Link>
            </li>
            {subjects.map((s) => {
              const active = pathname.startsWith(`/study/subjects/${s.id}`);
              return (
                <li key={s.id}>
                  <Link
                    href={`/study/subjects/${s.id}`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-xs transition",
                      active
                        ? "bg-white/5 text-warm-white"
                        : "text-text-secondary hover:bg-white/5 hover:text-warm-white"
                    )}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{s.name}</p>
                      <p className="truncate font-mono text-[10px] text-text-muted">
                        {formatExamLabel(s)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
