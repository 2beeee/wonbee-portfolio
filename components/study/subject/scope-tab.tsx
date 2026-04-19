"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createScopeItemAction, deleteScopeItemAction } from "@/app/study/actions/scope";
import type { ScopeItem, ScopeSource } from "@/types/study-db";

const SOURCES: ScopeSource[] = ["교과서", "프린트", "필기", "문제집", "기타"];

export function ScopeTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: ScopeItem[];
}) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<{ source_type: ScopeSource; title: string; page_range: string; detail: string }>({
    source_type: "교과서",
    title: "",
    page_range: "",
    detail: ""
  });
  const [, startTransition] = useTransition();

  async function add() {
    if (!form.title.trim()) return;
    startTransition(async () => {
      try {
        const row = await createScopeItemAction({
          subject_id: subjectId,
          source_type: form.source_type,
          title: form.title,
          page_range: form.page_range,
          detail: form.detail
        });
        setItems((prev) => [...prev, row]);
        setForm({ source_type: form.source_type, title: "", page_range: "", detail: "" });
      } catch (e) {
        toast.error("추가 실패", { description: (e as Error).message });
      }
    });
  }

  async function remove(id: string) {
    const prev = items;
    setItems((p) => p.filter((x) => x.id !== id));
    try {
      await deleteScopeItemAction(id, subjectId);
    } catch (e) {
      setItems(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  const grouped = SOURCES.map((src) => [src, items.filter((i) => i.source_type === src)] as const);

  return (
    <div className="space-y-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
        className="grid gap-2 rounded-lg border border-border-dark bg-surface p-4 sm:grid-cols-[110px_1fr_140px_auto]"
      >
        <select
          value={form.source_type}
          onChange={(e) => setForm({ ...form, source_type: e.target.value as ScopeSource })}
          className="rounded-md border border-border-dark bg-base-black px-2 py-2 font-mono text-xs text-warm-white"
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="단원명 또는 제목"
          className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <input
          value={form.page_range}
          onChange={(e) => setForm({ ...form, page_range: e.target.value })}
          placeholder="p.12-38"
          className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
        />
        <button
          type="submit"
          className="rounded-md border border-combustion/40 bg-combustion/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          Add
        </button>
      </form>

      {grouped.map(([src, arr]) => (
        <section key={src}>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            {src} · {arr.length}
          </p>
          {arr.length === 0 ? (
            <p className="text-xs text-text-muted">등록된 항목 없음</p>
          ) : (
            <ul className="divide-y divide-border-dark rounded-lg border border-border-dark bg-surface">
              {arr.map((it) => (
                <li key={it.id} className="flex items-center gap-3 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-warm-white">{it.title}</p>
                    {it.page_range && (
                      <p className="font-mono text-[10px] text-text-muted">{it.page_range}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
