"use client";

import type { Work } from "../data/works";
import { tierMeta } from "../data/tiers";

function LabelRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border-dark bg-base-black/60 p-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <p className="mt-1 font-mono text-xs text-warm-white">{value}</p>
    </div>
  );
}

export function WorkCard({
  work,
  pinned,
  done,
  onPin,
  onToggleDone
}: {
  work: Work;
  pinned: boolean;
  done: boolean;
  onPin: () => void;
  onToggleDone: () => void;
}) {
  const meta = tierMeta[work.tier];

  return (
    <article
      id={`work-${work.id}`}
      className={`card-glow rounded-xl border p-4 transition ${
        done ? "border-border-dark bg-surface/70 opacity-85" : "border-border-dark bg-surface"
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span
              className="rounded-sm border px-1.5 py-0.5 font-mono"
              style={{
                color: meta.color,
                background: `${meta.color}22`,
                borderColor: `${meta.color}44`
              }}
            >
              {meta.label}
            </span>
            <span className="font-mono text-text-muted">{work.scopeBadge}</span>
            <span className="font-mono text-text-muted">{work.sourceBadge}</span>
            {work.scopeConfidence ? (
              <span className="rounded-sm border border-border-dark px-1.5 py-0.5 font-mono text-[9px] text-text-secondary">
                {work.scopeConfidence}
              </span>
            ) : null}
          </div>
          <h3 className="mt-1 font-mono text-lg text-warm-white">{work.title}</h3>
          <p className="mt-1 font-mono text-xs text-text-secondary">{work.priorityReason}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPin}
            className={`rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              pinned
                ? "border-lox/40 bg-lox/15 text-lox"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {pinned ? "📌 아침고정" : "📍 핀"}
          </button>
          <button
            type="button"
            onClick={onToggleDone}
            className={`rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              done
                ? "border-combustion/40 bg-combustion/15 text-combustion"
                : "border-border-dark text-text-secondary hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {done ? "✓ 완료" : "체크"}
          </button>
        </div>
      </header>

      {work.tier !== "B" ? (
        <section className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          <LabelRow label="갈래" value={work.genre} />
          <LabelRow label="성격 / 제재" value={`${work.character} / ${work.subject}`} />
          <LabelRow label="작가 / 화자·시점" value={`${work.author} / ${work.speakerOrViewpoint}`} />
          <div className="sm:col-span-2 xl:col-span-3 rounded-md border border-border-dark bg-base-black/60 p-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">주제</p>
            <p className="mt-1 font-mono text-xs text-warm-white">{work.theme}</p>
          </div>
        </section>
      ) : null}

      {work.tier === "S" ? (
        <div className="mt-4 space-y-4">
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">구조 분석</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {(work.structureAnalysis ?? []).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">표현상 특징</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {(work.expressionFeatures ?? []).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">핵심 시어 / 소재</p>
            <div className="mt-2 overflow-hidden rounded-lg border border-border-dark">
              <table className="w-full border-collapse">
                <thead className="bg-base-black/80">
                  <tr>
                    <th className="border-b border-border-dark px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                      시어 / 소재
                    </th>
                    <th className="border-b border-border-dark px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                      의미 / 기능
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {work.keyMeanings.map((row) => (
                    <tr key={row.term} className="align-top">
                      <td className="border-t border-border-dark px-3 py-2 font-mono text-xs text-combustion">
                        {row.term}
                      </td>
                      <td className="border-t border-border-dark px-3 py-2 font-mono text-xs text-warm-white/90">
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">주제와 작가 의식</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {(work.authorConsciousness ?? []).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-lox/30 bg-lox/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">⭐ 선생님 강조 포인트</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {work.teacherPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-combustion/30 bg-combustion/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">함정 / 오답 유도</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {(work.traps ?? []).map((item) => (
                <li key={item}>⚠︎ {item}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {work.tier === "A" ? (
        <div className="mt-4 space-y-4">
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">핵심 시어 / 소재</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {work.keyMeanings.map((row) => (
                <div key={row.term} className="rounded-md border border-border-dark bg-base-black/60 p-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-combustion">{row.term}</p>
                  <p className="mt-1 font-mono text-xs text-warm-white/90">{row.meaning}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-lox/30 bg-lox/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">⭐ 체크 포인트</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
              {work.teacherPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {work.tier === "B" ? (
        <div className="mt-4 rounded-lg border border-border-dark bg-base-black/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">한 줄 요약</p>
          <p className="mt-2 font-mono text-sm text-warm-white">{work.quickLine}</p>
          {work.note ? <p className="mt-2 font-mono text-xs text-text-secondary">{work.note}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
