"use client";

import { useState } from "react";
import { cn } from "@/lib/study/cn";
import { tierMeta } from "../data/tiers";
import type { Concept } from "../data/concepts";

export function ConceptCard({
  concept,
  done,
  pinned,
  onToggleDone,
  onTogglePin
}: {
  concept: Concept;
  done: boolean;
  pinned: boolean;
  onToggleDone: (id: string) => void;
  onTogglePin: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(concept.tier !== "B");

  const isS = concept.tier === "S";
  const isA = concept.tier === "A";

  return (
    <article
      id={`concept-${concept.id}`}
      className={cn(
        "rounded-3xl border bg-surface p-5 transition",
        done ? "border-lox/40" : "border-border-dark"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]", tierMeta[concept.tier].chipClass)}>
              {concept.code}
            </span>
            <span className="rounded-full border border-border-dark bg-base-black px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
              {concept.unit}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-warm-white">{concept.title}</h3>
          <p className="text-sm leading-6 text-text-secondary">{concept.rationale}</p>
          <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            <span>교과서 {concept.textbookPages}</span>
            <span>·</span>
            <span>학습자료 {concept.handoutPages}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleDone(concept.id)}
            className={cn(
              "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
              done
                ? "border-lox/40 bg-lox/10 text-lox"
                : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
            )}
          >
            {done ? "완료" : "체크"}
          </button>
          <button
            type="button"
            onClick={() => onTogglePin(concept.id)}
            className={cn(
              "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
              pinned
                ? "border-combustion/40 bg-combustion/10 text-combustion"
                : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
            )}
          >
            {pinned ? "아침 핀됨" : "아침에 볼 것"}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="rounded-full border border-border-dark bg-base-black px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary transition hover:text-warm-white"
          >
            {expanded ? "접기" : "펼치기"}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border-dark bg-base-black px-4 py-3 text-sm leading-6 text-warm-white">
        {concept.quickLine}
      </div>

      {expanded && (
        <div className="mt-5 space-y-5">
          <Section title="정의">
            <p className="text-sm leading-7 text-text-secondary">{concept.definition}</p>
          </Section>

          {concept.mechanism && isS && (
            <Section title="핵심 메커니즘">
              <ol className="space-y-2 text-sm leading-7 text-text-secondary">
                {concept.mechanism.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-combustion">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {concept.formulas && (isS || isA) && (
            <Section title="공식 / 관계식">
              <div className="grid gap-3">
                {concept.formulas.map((formula) => (
                  <div key={formula.label} className="rounded-2xl border border-border-dark bg-surface-light p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-lox">{formula.label}</div>
                    <div className="mt-2 text-sm font-semibold text-warm-white">{formula.expression}</div>
                    <div className="mt-1 text-xs text-text-secondary">
                      단위: {formula.unit} · {formula.note}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {concept.graph && (isS || isA) && (
            <Section title="그래프 / 도표">
              <div className="rounded-2xl border border-border-dark bg-base-black p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-combustion">
                  {concept.graph.title}
                </div>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-text-secondary">
                  {concept.graph.ascii}
                </pre>
                <ul className="mt-3 space-y-1 text-sm leading-6 text-text-secondary">
                  {concept.graph.insights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </Section>
          )}

          {concept.traps && isS && (
            <Section title="자주 나오는 함정">
              <ul className="space-y-2 text-sm leading-7 text-text-secondary">
                {concept.traps.map((trap) => (
                  <li key={trap}>• {trap}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="⭐ 선생님 강조 포인트">
            <p className="text-sm leading-7 text-text-secondary">{concept.teacherPoint}</p>
          </Section>

          {(isS || isA) && (
            <Section title="전형적 문항 형태">
              <ul className="space-y-2 text-sm leading-7 text-text-secondary">
                {concept.questionTypes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="출처">
            <p className="text-xs leading-6 text-text-muted">{concept.sourceRefs.join(" / ")}</p>
          </Section>
        </div>
      )}
    </article>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">{title}</h4>
      {children}
    </section>
  );
}
