"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { recordAttemptAction } from "@/app/study/actions/practice-questions";
import { cn } from "@/lib/study/cn";
import type { PracticeQuestion } from "@/types/study-db";

const PAGE_SIZE = 10;
const DIFFICULTY_LABEL: Record<PracticeQuestion["difficulty"], string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard"
};
const TYPE_LABEL: Record<PracticeQuestion["question_type"], string> = {
  short: "단답",
  multiple: "선택",
  long: "서술",
  proof: "증명"
};

export function PracticeTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: PracticeQuestion[];
}) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [, startTransition] = useTransition();

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const visible = useMemo(
    () => items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [items, page]
  );

  const attempted = items.filter((q) => q.times_attempted > 0).length;

  function mark(q: PracticeQuestion, correct: boolean) {
    const prev = items;
    setItems((p) =>
      p.map((x) =>
        x.id === q.id
          ? {
              ...x,
              times_attempted: x.times_attempted + 1,
              times_correct: x.times_correct + (correct ? 1 : 0),
              last_attempted_at: new Date().toISOString()
            }
          : x
      )
    );
    startTransition(async () => {
      try {
        await recordAttemptAction(q.id, subjectId, correct);
        toast.success(correct ? "정답 기록됨" : "오답 기록됨");
      } catch (e) {
        setItems(prev);
        toast.error("기록 실패", { description: (e as Error).message });
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-border-dark bg-surface px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary">
        <span>
          총 {total}문제 · 시도 {attempted} / 미시도 {total - attempted}
        </span>
        <span>
          {page + 1} / {totalPages}
        </span>
      </div>

      {total === 0 ? (
        <p className="rounded-lg border border-border-dark bg-surface px-4 py-6 text-center text-xs text-text-muted">
          연습문제가 아직 없어요. CLI에서 <code className="font-mono text-combustion">/generate-questions</code> 또는 <code className="font-mono text-combustion">/import-textbook</code> 실행 후 여기에 채워집니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {visible.map((q, i) => {
            const open = activeId === q.id;
            const idx = page * PAGE_SIZE + i + 1;
            const accuracy =
              q.times_attempted > 0
                ? Math.round((q.times_correct / q.times_attempted) * 100)
                : null;
            return (
              <li
                key={q.id}
                className="rounded-lg border border-border-dark bg-surface p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      <span>#{idx}</span>
                      {q.topic && <span>· {q.topic}</span>}
                      <span>· {TYPE_LABEL[q.question_type]}</span>
                      <span
                        className={cn(
                          "rounded-full border px-1.5 py-0.5",
                          q.difficulty === "easy" && "border-lox/40 text-lox",
                          q.difficulty === "medium" && "border-combustion/40 text-combustion",
                          q.difficulty === "hard" && "border-red-500/40 text-red-300"
                        )}
                      >
                        {DIFFICULTY_LABEL[q.difficulty]}
                      </span>
                      {accuracy !== null && (
                        <span>
                          · 정답률 {accuracy}% ({q.times_correct}/{q.times_attempted})
                        </span>
                      )}
                    </div>
                    <div className="prose prose-invert max-w-none text-sm text-warm-white [&_code]:text-combustion">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.question}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {open ? (
                  <div className="mt-3 space-y-3">
                    {reveal && q.answer ? (
                      <div className="rounded-md border border-combustion/30 bg-combustion/5 p-3">
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-combustion">
                          모범답안
                        </div>
                        <div className="prose prose-invert max-w-none text-sm text-warm-white [&_code]:text-combustion">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReveal(true)}
                        className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
                      >
                        정답 보기
                      </button>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          mark(q, true);
                          setActiveId(null);
                          setReveal(false);
                        }}
                        className="flex-1 rounded-md border border-lox/40 bg-lox/10 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-lox hover:bg-lox/20"
                      >
                        맞음
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          mark(q, false);
                          setActiveId(null);
                          setReveal(false);
                        }}
                        className="flex-1 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-red-300 hover:bg-red-500/20"
                      >
                        틀림
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(null);
                          setReveal(false);
                        }}
                        className="rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(q.id);
                        setReveal(false);
                      }}
                      className="rounded-md border border-border-dark bg-base-black px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
                    >
                      풀어보기
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md border border-border-dark bg-surface px-3 py-1.5 text-text-secondary hover:text-warm-white disabled:opacity-40"
          >
            이전
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md border border-border-dark bg-surface px-3 py-1.5 text-text-secondary hover:text-warm-white disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
