"use client";

import { useState } from "react";
import type { Concept } from "../data/concepts";
import { tierMeta } from "../data/tiers";

export function ConceptCard({
  concept,
  pinned,
  mastered,
  onPin,
  onMaster
}: {
  concept: Concept;
  pinned: boolean;
  mastered: boolean;
  onPin: () => void;
  onMaster: () => void;
}) {
  const [open, setOpen] = useState(concept.tier === "S");
  const tc = tierMeta[concept.tier].color;

  return (
    <article
      id={`concept-${concept.id}`}
      className={`card-glow rounded-lg border p-4 transition ${
        mastered
          ? "border-border-dark bg-surface/50 opacity-70"
          : "border-border-dark bg-surface"
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 text-left"
        >
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span
              className="rounded-sm px-1.5 py-0.5 font-mono"
              style={{
                background: `${tc}22`,
                color: tc,
                border: `1px solid ${tc}44`
              }}
            >
              {concept.id} · {concept.tier}
            </span>
            <span className="font-mono text-text-muted">{concept.unit}</span>
          </div>
          <h3 className="mt-1 font-mono text-sm text-warm-white">
            {concept.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-text-secondary">
            {concept.oneLiner}
          </p>
        </button>
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            onClick={onPin}
            title="내일 아침 복습용 핀"
            className={`rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              pinned
                ? "border-lox/40 bg-lox/15 text-lox"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {pinned ? "📌 핀됨" : "📍 핀"}
          </button>
          <button
            type="button"
            onClick={onMaster}
            className={`rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              mastered
                ? "border-combustion/40 bg-combustion/15 text-combustion"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {mastered ? "✓ 완료" : "완료"}
          </button>
        </div>
      </header>

      {open && (
        <div className="mt-3 space-y-2 border-t border-border-dark pt-3">
          {concept.body && (
            <p className="font-mono text-xs leading-relaxed text-warm-white/90">
              {concept.body}
            </p>
          )}

          {concept.formulas && concept.formulas.length > 0 && (
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                FORMULAS
              </p>
              <ul className="mt-1 space-y-0.5">
                {concept.formulas.map((f, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs text-warm-white"
                  >
                    ▸ {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {concept.traps && concept.traps.length > 0 && (
            <div className="rounded-md border border-combustion/30 bg-combustion/5 p-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-combustion">
                함정 / TRAPS
              </p>
              <ul className="mt-1 space-y-0.5">
                {concept.traps.map((t, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs text-warm-white/90"
                  >
                    ⚠︎ {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {concept.emphasis && (
            <div className="rounded-md border border-lox/30 bg-lox/5 p-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-lox">
                선생님 강조
              </p>
              <p className="mt-1 font-mono text-xs text-warm-white/90">
                ★ {concept.emphasis}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
