"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { createAiSessionAction, deleteAiSessionAction } from "@/app/study/actions/ai-sessions";
import type { AiSession, AiTool } from "@/types/study-db";

const TOOLS: AiTool[] = ["claude", "gpt", "gemini", "other"];

export function AiSessionsTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: AiSession[];
}) {
  const [sessions, setSessions] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{
    ai_tool: AiTool;
    title: string;
    topic: string;
    conversation_url: string;
    raw_content: string;
  }>({ ai_tool: "claude", title: "", topic: "", conversation_url: "", raw_content: "" });
  const [, startTransition] = useTransition();

  function create() {
    if (!form.title.trim()) {
      toast.error("제목을 입력해 주세요.");
      return;
    }
    startTransition(async () => {
      try {
        const row = await createAiSessionAction({
          subject_id: subjectId,
          title: form.title,
          ai_tool: form.ai_tool,
          topic: form.topic,
          conversation_url: form.conversation_url,
          raw_content: form.raw_content
        });
        setSessions((p) => [row, ...p]);
        setForm({ ai_tool: "claude", title: "", topic: "", conversation_url: "", raw_content: "" });
        setOpen(false);
        toast.success("세션이 생성되었어요.");
      } catch (e) {
        toast.error("생성 실패", { description: (e as Error).message });
      }
    });
  }

  async function remove(id: string) {
    const prev = sessions;
    setSessions((p) => p.filter((x) => x.id !== id));
    try {
      await deleteAiSessionAction(id, subjectId);
    } catch (e) {
      setSessions(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          AI Sessions · {sessions.length}
        </p>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          + New AI session
        </button>
      </div>

      {open && (
        <div className="rounded-lg border border-border-dark bg-surface p-4">
          <div className="grid gap-2 sm:grid-cols-[120px_1fr]">
            <select
              value={form.ai_tool}
              onChange={(e) => setForm({ ...form, ai_tool: e.target.value as AiTool })}
              className="rounded-md border border-border-dark bg-base-black px-2 py-2 font-mono text-xs text-warm-white"
            >
              {TOOLS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="세션 제목"
              className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
            />
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              placeholder="주제/단원 (선택)"
              className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
            />
            <input
              value={form.conversation_url}
              onChange={(e) => setForm({ ...form, conversation_url: e.target.value })}
              placeholder="대화 공유 URL (선택)"
              className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
            />
          </div>
          <textarea
            value={form.raw_content}
            onChange={(e) => setForm({ ...form, raw_content: e.target.value })}
            rows={10}
            placeholder="여기에 Claude/GPT 대화 원문(마크다운)을 붙여넣으세요."
            className="mt-2 w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={create}
              className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <p className="text-center text-xs text-text-muted">아직 세션이 없어요.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s.id} className="rounded-lg border border-border-dark bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/study/subjects/${subjectId}/sessions/${s.id}`}
                    className="text-sm text-warm-white hover:text-combustion"
                  >
                    {s.title}
                  </Link>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {s.ai_tool} · {s.topic ?? "—"} · {format(parseISO(s.created_at), "yyyy.MM.dd")}
                  </p>
                  {s.key_concepts.length > 0 && (
                    <p className="mt-1 font-mono text-[10px] text-lox">
                      {s.key_concepts.map((c) => `#${c}`).join(" ")}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(s.id)}
                  className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
                >
                  Del
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
