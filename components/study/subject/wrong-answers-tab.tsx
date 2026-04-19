"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createWrongAnswerAction,
  deleteWrongAnswerAction,
  updateWrongAnswerAction
} from "@/app/study/actions/wrong-answers";
import { copyPromptToClipboard } from "@/lib/study/hooks/use-clipboard";
import { promptForWrongAnswer } from "@/lib/study/prompts";
import type { ReviewStatus, WrongAnswer } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

const STATUSES: ReviewStatus[] = ["미복습", "복습중", "해결"];

export function WrongAnswersTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: WrongAnswer[];
}) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState({ question: "", correct_answer: "", my_answer: "", source: "" });
  const [, startTransition] = useTransition();

  function add() {
    if (!form.question.trim()) return;
    startTransition(async () => {
      try {
        const row = await createWrongAnswerAction({
          subject_id: subjectId,
          question: form.question,
          correct_answer: form.correct_answer,
          my_answer: form.my_answer,
          source: form.source
        });
        setItems((p) => [row, ...p]);
        setForm({ question: "", correct_answer: "", my_answer: "", source: "" });
      } catch (e) {
        toast.error("추가 실패", { description: (e as Error).message });
      }
    });
  }

  async function remove(id: string) {
    const prev = items;
    setItems((p) => p.filter((x) => x.id !== id));
    try {
      await deleteWrongAnswerAction(id, subjectId);
    } catch (e) {
      setItems(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  async function cycleStatus(wa: WrongAnswer) {
    const idx = STATUSES.indexOf(wa.review_status);
    const next = STATUSES[(idx + 1) % STATUSES.length];
    setItems((p) => p.map((x) => (x.id === wa.id ? { ...x, review_status: next } : x)));
    try {
      await updateWrongAnswerAction(wa.id, subjectId, { review_status: next });
    } catch (e) {
      setItems((p) => p.map((x) => (x.id === wa.id ? { ...x, review_status: wa.review_status } : x)));
      toast.error("업데이트 실패", { description: (e as Error).message });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border-dark bg-surface p-4">
        <textarea
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          placeholder="문제"
          rows={3}
          className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <input
            value={form.correct_answer}
            onChange={(e) => setForm({ ...form, correct_answer: e.target.value })}
            placeholder="정답"
            className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
          />
          <input
            value={form.my_answer}
            onChange={(e) => setForm({ ...form, my_answer: e.target.value })}
            placeholder="내 답"
            className="rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
          />
          <input
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            placeholder="출처"
            className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
          />
        </div>
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

      {items.length === 0 ? (
        <p className="text-center text-xs text-text-muted">등록된 오답이 없어요.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((wa) => (
            <li key={wa.id} className="rounded-lg border border-border-dark bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-warm-white">{wa.question}</p>
                  <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                    <p className="text-text-secondary">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">정답 </span>
                      {wa.correct_answer ?? "—"}
                    </p>
                    <p className="text-text-secondary">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">내 답 </span>
                      {wa.my_answer ?? "—"}
                    </p>
                  </div>
                  {wa.source && (
                    <p className="mt-1 font-mono text-[10px] text-text-muted">출처: {wa.source}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => cycleStatus(wa)}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition",
                      wa.review_status === "해결"
                        ? "border-lox/40 bg-lox/10 text-lox"
                        : wa.review_status === "복습중"
                        ? "border-combustion/40 bg-combustion/10 text-combustion"
                        : "border-border-hover text-text-secondary"
                    )}
                  >
                    {wa.review_status}
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyPromptToClipboard(promptForWrongAnswer(wa), "오답 풀이 프롬프트 복사됨")
                      }
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-lox"
                    >
                      Claude에 질문
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(wa.id)}
                      className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
                    >
                      Del
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
