"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createKeyPointAction,
  deleteKeyPointAction,
  updateKeyPointAction
} from "@/app/study/actions/key-points";
import { copyPromptToClipboard } from "@/lib/study/hooks/use-clipboard";
import { promptForKeyPoint } from "@/lib/study/prompts";
import type { KeyPoint } from "@/types/study-db";

export function KeyPointsTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: KeyPoint[];
}) {
  const [items, setItems] = useState(initial);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, KeyPoint[]>();
    for (const it of items) {
      const key = it.category ?? "기타";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    return Array.from(map.entries());
  }, [items]);

  function add() {
    if (!title.trim()) return;
    startTransition(async () => {
      try {
        const row = await createKeyPointAction({
          subject_id: subjectId,
          title,
          content,
          category: category || undefined
        });
        setItems((prev) => [...prev, row]);
        setTitle("");
        setContent("");
        setCategory("");
      } catch (e) {
        toast.error("추가 실패", { description: (e as Error).message });
      }
    });
  }

  async function remove(id: string) {
    const prev = items;
    setItems((p) => p.filter((x) => x.id !== id));
    try {
      await deleteKeyPointAction(id, subjectId);
    } catch (e) {
      setItems(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border-dark bg-surface p-4">
        <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리"
            className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="핵심 제목"
            className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="마크다운으로 작성 가능"
          className="mt-2 w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={add}
            className="rounded-md border border-combustion/40 bg-combustion/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-combustion hover:bg-combustion/25"
          >
            Add
          </button>
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="text-center text-xs text-text-muted">등록된 핵심 정리가 없어요.</p>
      )}

      {grouped.map(([cat, arr]) => (
        <section key={cat} className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            {cat} · {arr.length}
          </p>
          <ul className="space-y-2">
            {arr.map((kp) => (
              <li key={kp.id} className="rounded-lg border border-border-dark bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-medium text-warm-white">{kp.title}</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyPromptToClipboard(promptForKeyPoint(kp), "예상 문제 프롬프트 복사됨")
                      }
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-lox"
                    >
                      Claude에 질문
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(editingId === kp.id ? null : kp.id)}
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-warm-white"
                    >
                      {editingId === kp.id ? "Close" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(kp.id)}
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
                    >
                      Del
                    </button>
                  </div>
                </div>
                {editingId === kp.id ? (
                  <EditInline
                    initial={kp}
                    onSave={async (patch) => {
                      try {
                        await updateKeyPointAction(kp.id, subjectId, patch);
                        setItems((p) => p.map((x) => (x.id === kp.id ? { ...x, ...patch } : x)));
                        setEditingId(null);
                        toast.success("저장됨");
                      } catch (e) {
                        toast.error("저장 실패", { description: (e as Error).message });
                      }
                    }}
                  />
                ) : kp.content ? (
                  <div className="prose prose-invert prose-sm mt-2 max-w-none text-sm text-text-secondary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{kp.content}</ReactMarkdown>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function EditInline({
  initial,
  onSave
}: {
  initial: KeyPoint;
  onSave: (patch: Partial<KeyPoint>) => void | Promise<void>;
}) {
  const [title, setTitle] = useState(initial.title);
  const [category, setCategory] = useState(initial.category ?? "");
  const [content, setContent] = useState(initial.content ?? "");

  return (
    <div className="mt-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="카테고리"
          className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSave({ title, content: content || null, category: category || null })}
          className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          Save
        </button>
      </div>
    </div>
  );
}
