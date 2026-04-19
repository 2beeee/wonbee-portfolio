"use client";

import { useMemo, useState, useTransition } from "react";
import { parseISO } from "date-fns";
import { toast } from "sonner";
import { useCountdown } from "@/lib/study/hooks/use-countdown";
import { formatDday } from "@/lib/study/format";
import { updateSubjectAction } from "@/app/study/actions/subjects";
import type { Subject } from "@/types/study-db";

export function SubjectHeader({ subject }: { subject: Subject }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: subject.name,
    exam_date: subject.exam_date ?? "",
    exam_period: subject.exam_period ?? "",
    exam_start_time: (subject.exam_start_time ?? "").slice(0, 5),
    location: subject.location ?? "",
    notes: subject.notes ?? ""
  });
  const [, startTransition] = useTransition();

  const target = useMemo(() => {
    if (!subject.exam_date) return null;
    return parseISO(`${subject.exam_date}T${subject.exam_start_time ?? "08:20:00"}`);
  }, [subject]);
  const parts = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");

  function save() {
    startTransition(async () => {
      try {
        await updateSubjectAction(subject.id, {
          name: form.name,
          exam_date: form.exam_date || null,
          exam_period: form.exam_period || null,
          exam_start_time: form.exam_start_time ? `${form.exam_start_time}:00` : null,
          location: form.location || null,
          notes: form.notes || null
        });
        setEditing(false);
        toast.success("저장됨");
      } catch (e) {
        toast.error("저장 실패", { description: (e as Error).message });
      }
    });
  }

  return (
    <header className="rounded-xl border border-border-dark bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-8 w-0.5" style={{ background: subject.color }} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              SUBJECT
            </p>
            {editing ? (
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-b border-border-hover bg-transparent font-mono text-2xl tracking-wide text-warm-white focus:border-combustion focus:outline-none"
              />
            ) : (
              <h1 className="font-mono text-2xl tracking-wide text-warm-white">{subject.name}</h1>
            )}
          </div>
        </div>
        {parts && !parts.isPast ? (
          <div className="text-right">
            <p className="hud-value font-mono text-3xl text-combustion">{formatDday(parts.days)}</p>
            <p className="hud-value font-mono text-xs text-text-secondary">
              {pad(parts.hours)}:{pad(parts.minutes)}:{pad(parts.seconds)}
            </p>
          </div>
        ) : parts?.isPast ? (
          <p className="font-mono text-sm text-lox">시험 경과</p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 text-xs sm:grid-cols-4">
        <Field label="날짜">
          {editing ? (
            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
              className="w-full rounded-md border border-border-dark bg-base-black px-2 py-1 font-mono text-warm-white"
            />
          ) : (
            <span className="hud-value font-mono text-warm-white">{subject.exam_date ?? "—"}</span>
          )}
        </Field>
        <Field label="교시">
          {editing ? (
            <input
              value={form.exam_period}
              onChange={(e) => setForm({ ...form, exam_period: e.target.value })}
              className="w-full rounded-md border border-border-dark bg-base-black px-2 py-1 font-mono text-warm-white"
            />
          ) : (
            <span className="hud-value font-mono text-warm-white">{subject.exam_period ?? "—"}</span>
          )}
        </Field>
        <Field label="시작시간">
          {editing ? (
            <input
              type="time"
              value={form.exam_start_time}
              onChange={(e) => setForm({ ...form, exam_start_time: e.target.value })}
              className="w-full rounded-md border border-border-dark bg-base-black px-2 py-1 font-mono text-warm-white"
            />
          ) : (
            <span className="hud-value font-mono text-warm-white">
              {subject.exam_start_time ? subject.exam_start_time.slice(0, 5) : "—"}
            </span>
          )}
        </Field>
        <Field label="장소">
          {editing ? (
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-md border border-border-dark bg-base-black px-2 py-1 font-mono text-warm-white"
              placeholder="예: 2-3반"
            />
          ) : (
            <span className="hud-value font-mono text-warm-white">{subject.location ?? "—"}</span>
          )}
        </Field>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {editing ? (
          <>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-combustion hover:bg-combustion/25"
            >
              Save
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-warm-white"
          >
            Edit
          </button>
        )}
      </div>
    </header>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
