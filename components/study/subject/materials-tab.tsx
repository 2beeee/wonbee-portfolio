"use client";

import { useState } from "react";
import type { ReferenceMaterial } from "@/types/study-db";

function formatSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function kindBadge(kind: ReferenceMaterial["kind"]): string {
  switch (kind) {
    case "교과서":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200";
    case "부교재":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
    case "프린트":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

export function MaterialsTab({ initial }: { initial: ReferenceMaterial[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null);
  const selected = initial.find((m) => m.id === selectedId) ?? null;

  if (initial.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        이 과목에 업로드된 참고자료가 없습니다. CLI에서{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
          scripts/upload-materials.ts
        </code>
        로 올려보세요.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {initial.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedId(m.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
              selectedId === m.id
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600"
            }`}
          >
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${kindBadge(m.kind)}`}>
              {m.kind}
            </span>
            <span className="font-medium">{m.title}</span>
            {m.file_size ? (
              <span className="text-[10px] opacity-60">{formatSize(m.file_size)}</span>
            ) : null}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              {selected.page_label ? <span>범위: {selected.page_label}</span> : null}
            </div>
            <a
              href={`/study/api/materials/${selected.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
            >
              새 탭에서 열기 ↗
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <iframe
              key={selected.id}
              src={`/study/api/materials/${selected.id}#toolbar=1&view=FitH`}
              title={selected.title}
              className="h-[75vh] w-full bg-gray-50 dark:bg-gray-950"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
