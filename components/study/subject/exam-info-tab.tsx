"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateSubjectAction } from "@/app/study/actions/subjects";
import type { Subject } from "@/types/study-db";

export function ExamInfoTab({ subject }: { subject: Subject }) {
  const [notes, setNotes] = useState(subject.notes ?? "");
  const breakdown = subject.score_breakdown ?? {};
  const [bkMC, setBkMC] = useState(String(breakdown["객관식"] ?? ""));
  const [bkDesc, setBkDesc] = useState(String(breakdown["서술형"] ?? ""));
  const [, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      try {
        const nextBk: Record<string, number> = {};
        if (bkMC) nextBk["객관식"] = Number(bkMC);
        if (bkDesc) nextBk["서술형"] = Number(bkDesc);
        await updateSubjectAction(subject.id, {
          notes,
          score_breakdown: Object.keys(nextBk).length ? nextBk : null
        });
        toast.success("저장됨");
      } catch (e) {
        toast.error("저장 실패", { description: (e as Error).message });
      }
    });
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-border-dark bg-surface p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Score Breakdown
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">객관식 (%)</span>
            <input
              type="number"
              value={bkMC}
              onChange={(e) => setBkMC(e.target.value)}
              className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-sm text-warm-white"
            />
          </label>
          <label className="block space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">서술형 (%)</span>
            <input
              type="number"
              value={bkDesc}
              onChange={(e) => setBkDesc(e.target.value)}
              className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 font-mono text-sm text-warm-white"
            />
          </label>
        </div>
      </section>
      <section className="rounded-lg border border-border-dark bg-surface p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
          placeholder="특별히 기억해야 할 안내사항, 유의점 등"
        />
      </section>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          className="rounded-md border border-combustion/40 bg-combustion/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          Save
        </button>
      </div>
    </div>
  );
}
