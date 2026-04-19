"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  updateAiSessionAction,
  promoteSessionToConceptNoteAction
} from "@/app/study/actions/ai-sessions";
import { copyPromptToClipboard } from "@/lib/study/hooks/use-clipboard";
import { promptForFlashcards, promptForSessionSummary } from "@/lib/study/prompts";
import type { AiSession, Flashcard } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

export function SessionDetail({ session }: { session: AiSession }) {
  const [data, setData] = useState(session);
  const [rawEditing, setRawEditing] = useState(false);
  const [rawDraft, setRawDraft] = useState(session.raw_content ?? "");
  const [summary, setSummary] = useState(session.summary ?? "");
  const [concepts, setConcepts] = useState(session.key_concepts.join(", "));
  const [followUps, setFollowUps] = useState(session.follow_up_questions.join("\n"));
  const [flashJson, setFlashJson] = useState(JSON.stringify(session.generated_flashcards, null, 2));
  const [, startTransition] = useTransition();

  function saveRaw() {
    startTransition(async () => {
      try {
        await updateAiSessionAction(session.id, session.subject_id, { raw_content: rawDraft });
        setData({ ...data, raw_content: rawDraft });
        setRawEditing(false);
        toast.success("저장됨");
      } catch (e) {
        toast.error("저장 실패", { description: (e as Error).message });
      }
    });
  }

  function saveSummary() {
    const tags = concepts
      .split(",")
      .map((c) => c.trim().replace(/^#/, ""))
      .filter(Boolean);
    const fu = followUps
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    startTransition(async () => {
      try {
        await updateAiSessionAction(session.id, session.subject_id, {
          summary: summary || null,
          key_concepts: tags,
          follow_up_questions: fu
        });
        setData({ ...data, summary, key_concepts: tags, follow_up_questions: fu });
        toast.success("요약 저장됨");
      } catch (e) {
        toast.error("저장 실패", { description: (e as Error).message });
      }
    });
  }

  function saveFlashcards() {
    let parsed: Flashcard[] = [];
    try {
      const v = JSON.parse(flashJson);
      if (!Array.isArray(v)) throw new Error("JSON must be an array");
      parsed = v
        .filter((x): x is Flashcard => x && typeof x.front === "string" && typeof x.back === "string")
        .map((x) => ({ front: x.front, back: x.back }));
    } catch (e) {
      toast.error("JSON 파싱 실패", { description: (e as Error).message });
      return;
    }
    startTransition(async () => {
      try {
        await updateAiSessionAction(session.id, session.subject_id, { generated_flashcards: parsed });
        setData({ ...data, generated_flashcards: parsed });
        toast.success(`플래시카드 ${parsed.length}장 저장됨`);
      } catch (e) {
        toast.error("저장 실패", { description: (e as Error).message });
      }
    });
  }

  function promoteToConceptNote() {
    startTransition(async () => {
      try {
        await promoteSessionToConceptNoteAction(session.id, session.subject_id);
        toast.success("개념노트로 이동되었어요.", { description: "'개념노트' 탭에서 확인하세요." });
      } catch (e) {
        toast.error("실패", { description: (e as Error).message });
      }
    });
  }

  return (
    <div className="space-y-5">
      <header className="rounded-xl border border-border-dark bg-surface p-5">
        <Link
          href={`/study/subjects/${session.subject_id}`}
          className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
        >
          ← 과목으로 돌아가기
        </Link>
        <h1 className="mt-2 font-mono text-xl tracking-wide text-warm-white">{data.title}</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {data.ai_tool} · {data.topic ?? "—"} · {format(parseISO(data.created_at), "yyyy.MM.dd HH:mm")}
        </p>
        {data.conversation_url && (
          <a
            href={data.conversation_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block font-mono text-[10px] uppercase tracking-wider text-lox hover:underline"
          >
            Conversation URL →
          </a>
        )}
      </header>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          AI Workflows
        </p>
        <div className="flex flex-wrap gap-2">
          <ActionButton
            label="핵심 요약 생성 요청"
            onClick={() =>
              copyPromptToClipboard(
                promptForSessionSummary(data.raw_content ?? ""),
                "요약 프롬프트 복사됨"
              )
            }
          />
          <ActionButton
            label="플래시카드로 변환"
            onClick={() =>
              copyPromptToClipboard(
                promptForFlashcards(data.raw_content ?? ""),
                "플래시카드 프롬프트 복사됨"
              )
            }
          />
          <ActionButton label="개념노트로 보내기" onClick={promoteToConceptNote} tone="lox" />
        </div>
      </section>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Summary · Tags</p>
        </div>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          placeholder="핵심 요약 (프롬프트로 받은 결과를 여기에 붙여넣기)"
          className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <input
          value={concepts}
          onChange={(e) => setConcepts(e.target.value)}
          placeholder="핵심 개념 태그 (쉼표로 구분)"
          className="mt-2 w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
        />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Follow-up Questions
        </p>
        <textarea
          value={followUps}
          onChange={(e) => setFollowUps(e.target.value)}
          rows={3}
          placeholder="다시 확인할 질문 (한 줄에 하나)"
          className="mt-1 w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={saveSummary}
            className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
          >
            Save Summary
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Raw Conversation (Markdown)
          </p>
          <button
            type="button"
            onClick={() => {
              if (rawEditing) saveRaw();
              else {
                setRawDraft(data.raw_content ?? "");
                setRawEditing(true);
              }
            }}
            className="rounded-md border border-border-dark px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
          >
            {rawEditing ? "Save" : "Edit"}
          </button>
        </div>
        {rawEditing ? (
          <textarea
            value={rawDraft}
            onChange={(e) => setRawDraft(e.target.value)}
            rows={16}
            className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
          />
        ) : (
          <div className="prose prose-invert prose-sm max-w-none text-sm text-text-secondary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.raw_content ?? "(원문이 없어요. Edit을 눌러 붙여넣으세요.)"}
            </ReactMarkdown>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Generated Flashcards · {data.generated_flashcards.length}
        </p>
        <textarea
          value={flashJson}
          onChange={(e) => setFlashJson(e.target.value)}
          rows={8}
          placeholder='[{"front": "...", "back": "..."}, ...]'
          className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-xs text-warm-white"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={saveFlashcards}
            className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
          >
            Save Flashcards
          </button>
        </div>
        {data.generated_flashcards.length > 0 && (
          <ul className="mt-3 space-y-2">
            {data.generated_flashcards.map((f, i) => (
              <li key={i} className="rounded-md border border-border-dark bg-base-black p-3 text-xs">
                <p className="text-warm-white">{f.front}</p>
                <p className="mt-1 text-text-secondary">— {f.back}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  tone = "combustion"
}: {
  label: string;
  onClick: () => void;
  tone?: "combustion" | "lox";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition",
        tone === "combustion"
          ? "border-combustion/40 bg-combustion/15 text-combustion hover:bg-combustion/25"
          : "border-lox/40 bg-lox/10 text-lox hover:bg-lox/20"
      )}
    >
      {label}
    </button>
  );
}
