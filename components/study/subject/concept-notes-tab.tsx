"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createConceptNoteAction,
  deleteConceptNoteAction,
  updateConceptNoteAction
} from "@/app/study/actions/concept-notes";
import { copyPromptToClipboard } from "@/lib/study/hooks/use-clipboard";
import { promptForConceptNote } from "@/lib/study/prompts";
import type { ConceptNote } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

function renderWithWikilinks(subjectId: string, text: string): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    const t = String(inner).trim();
    const href = `/study/subjects/${subjectId}/notes?title=${encodeURIComponent(t)}`;
    return `[${t}](${href})`;
  });
}

export function ConceptNotesTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: ConceptNote[];
}) {
  const [notes, setNotes] = useState(initial);
  const [selected, setSelected] = useState<string | null>(initial[0]?.id ?? null);
  const current = notes.find((n) => n.id === selected) ?? null;
  const [editingNew, setEditingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [, startTransition] = useTransition();

  async function createNote() {
    if (!newTitle.trim()) return;
    startTransition(async () => {
      try {
        const row = await createConceptNoteAction({
          subject_id: subjectId,
          title: newTitle,
          content: ""
        });
        setNotes((p) => [row, ...p]);
        setSelected(row.id);
        setNewTitle("");
        setEditingNew(false);
      } catch (e) {
        toast.error("생성 실패", { description: (e as Error).message });
      }
    });
  }

  async function saveCurrent(patch: { title: string; content: string; tags: string[] }) {
    if (!current) return;
    try {
      await updateConceptNoteAction(current.id, subjectId, patch);
      setNotes((p) => p.map((n) => (n.id === current.id ? { ...n, ...patch } : n)));
      toast.success("저장됨");
    } catch (e) {
      toast.error("저장 실패", { description: (e as Error).message });
    }
  }

  async function removeCurrent() {
    if (!current) return;
    const prev = notes;
    setNotes((p) => p.filter((n) => n.id !== current.id));
    setSelected(prev.find((n) => n.id !== current.id)?.id ?? null);
    try {
      await deleteConceptNoteAction(current.id, subjectId);
    } catch (e) {
      setNotes(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-lg border border-border-dark bg-surface p-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Notes · {notes.length}
          </p>
          <button
            type="button"
            onClick={() => setEditingNew(!editingNew)}
            className="font-mono text-[10px] uppercase tracking-wider text-combustion"
          >
            + New
          </button>
        </div>
        {editingNew && (
          <div className="mt-2 space-y-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="새 노트 제목"
              className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
            />
            <button
              type="button"
              onClick={createNote}
              className="w-full rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
            >
              Create
            </button>
          </div>
        )}
        <ul className="mt-3 space-y-1">
          {notes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setSelected(n.id)}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-xs transition",
                  n.id === selected
                    ? "bg-white/5 text-warm-white"
                    : "text-text-secondary hover:bg-white/5"
                )}
              >
                <p className="truncate">{n.title}</p>
                {n.tags.length > 0 && (
                  <p className="truncate font-mono text-[10px] text-text-muted">
                    {n.tags.map((t) => `#${t}`).join(" ")}
                  </p>
                )}
              </button>
            </li>
          ))}
          {notes.length === 0 && (
            <li className="py-3 text-center text-xs text-text-muted">노트가 없어요.</li>
          )}
        </ul>
      </aside>

      {current ? (
        <NoteEditor
          key={current.id}
          note={current}
          subjectId={subjectId}
          onSave={saveCurrent}
          onDelete={removeCurrent}
          renderer={renderWithWikilinks}
        />
      ) : (
        <div className="rounded-lg border border-border-dark bg-surface p-6 text-center text-xs text-text-muted">
          노트를 선택하거나 새로 만들어 주세요.
        </div>
      )}
    </div>
  );
}

function NoteEditor({
  note,
  subjectId,
  onSave,
  onDelete,
  renderer
}: {
  note: ConceptNote;
  subjectId: string;
  onSave: (patch: { title: string; content: string; tags: string[] }) => Promise<void>;
  onDelete: () => Promise<void>;
  renderer: (subjectId: string, text: string) => string;
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content ?? "");
  const [tags, setTags] = useState(note.tags.join(", "));
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <div className="rounded-lg border border-border-dark bg-surface p-4">
      <div className="flex items-start gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border-b border-border-hover bg-transparent pb-1 text-lg text-warm-white focus:border-combustion focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
            className="rounded-md border border-border-dark px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
          <button
            type="button"
            onClick={() =>
              copyPromptToClipboard(
                promptForConceptNote({ title, content }),
                "개념 설명 프롬프트 복사됨"
              )
            }
            className="rounded-md border border-border-dark px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-lox"
          >
            Claude에 질문
          </button>
        </div>
      </div>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="태그 (쉼표로 구분)"
        className="mt-2 w-full rounded-md border border-border-dark bg-base-black px-3 py-1.5 font-mono text-xs text-warm-white"
      />
      {mode === "edit" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="# 제목&#10;마크다운. [[개념명]]으로 링크 가능."
          className="mt-3 w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-sm text-warm-white"
        />
      ) : (
        <div className="prose prose-invert prose-sm mt-3 max-w-none text-sm text-text-secondary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {renderer(subjectId, content || "(비어 있음)")}
          </ReactMarkdown>
        </div>
      )}
      <div className="mt-3 flex justify-between">
        <button
          type="button"
          onClick={onDelete}
          className="font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-combustion"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() =>
            onSave({
              title,
              content,
              tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            })
          }
          className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          Save
        </button>
      </div>
    </div>
  );
}
