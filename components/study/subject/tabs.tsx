"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/study/cn";

export interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs, initial }: { tabs: Tab[]; initial?: string }) {
  const [active, setActive] = useState(initial ?? tabs[0]?.key);
  const current = tabs.find((t) => t.key === active);

  return (
    <div>
      <div className="-mx-4 overflow-x-auto border-b border-border-dark px-4 sm:-mx-6 sm:px-6">
        <ul className="flex min-w-max gap-1">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={cn(
                    "relative rounded-t-md px-4 py-2 font-mono text-xs tracking-wider transition",
                    isActive
                      ? "text-combustion"
                      : "text-text-secondary hover:text-warm-white"
                  )}
                >
                  {t.label}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-combustion" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pt-5">{current?.content}</div>
    </div>
  );
}
