"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/study/cn";
import type { FormulaData } from "../data/formulas";

export function FormulaCard({
  formula,
  pinned,
  onTogglePin
}: {
  formula: FormulaData;
  pinned: boolean;
  onTogglePin: (id: string) => void;
}) {
  const [reveal, setReveal] = useState(false);
  const [seed, setSeed] = useState(0);
  const drill = useMemo(() => buildDrill(formula.drillKind, seed), [formula.drillKind, seed]);

  return (
    <article id={`formula-${formula.id}`} className="rounded-3xl border border-border-dark bg-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-combustion">{formula.unit}</div>
          <h3 className="text-xl font-semibold text-warm-white">{formula.title}</h3>
          <p className="text-sm leading-6 text-text-secondary">{formula.whenToUse}</p>
        </div>
        <button
          type="button"
          onClick={() => onTogglePin(formula.id)}
          className={cn(
            "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
            pinned
              ? "border-combustion/40 bg-combustion/10 text-combustion"
              : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
          )}
        >
          {pinned ? "아침 핀됨" : "핀"}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-border-dark bg-base-black p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-lox">식 / 관계</div>
          <div className="mt-2 text-lg font-semibold text-warm-white">{formula.expression}</div>
          <div className="mt-2 text-sm leading-6 text-text-secondary">
            예시: {formula.example}
            <br />
            메모: {formula.note}
          </div>
        </div>

        {drill && (
          <div className="rounded-2xl border border-border-dark bg-surface-light p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">계산 연습 모드</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSeed((value) => value + 1);
                    setReveal(false);
                  }}
                  className="rounded-full border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary"
                >
                  숫자 바꾸기
                </button>
                <button
                  type="button"
                  onClick={() => setReveal((value) => !value)}
                  className="rounded-full border border-combustion/40 bg-combustion/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-combustion"
                >
                  {reveal ? "가리기" : "정답 보기"}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-warm-white">{drill.prompt}</p>
            {reveal ? (
              <div className="mt-3 space-y-2 rounded-2xl border border-lox/30 bg-lox/10 p-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-lox">풀이</div>
                <ul className="space-y-1 text-sm leading-6 text-text-secondary">
                  {drill.steps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
                <div className="text-sm font-semibold text-warm-white">정답: {drill.answer}</div>
              </div>
            ) : (
              <p className="mt-3 text-xs text-text-muted">직접 계산 후 정답 보기 버튼을 눌러라.</p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function buildDrill(kind: FormulaData["drillKind"], seed: number) {
  if (kind === "salinity") {
    const cases = [
      {
        prompt: "해수 2 kg의 염분이 35 psu일 때, 녹아 있는 염류는 몇 g인가?",
        answer: "70 g",
        steps: ["35 psu = 1 kg당 35 g", "2 kg × 35 g = 70 g"]
      },
      {
        prompt: "해수 0.5 kg의 염분이 34 psu일 때, 염류는 몇 g인가?",
        answer: "17 g",
        steps: ["34 psu = 1 kg당 34 g", "0.5 kg × 34 g = 17 g"]
      },
      {
        prompt: "해수 3 kg의 염분이 36 psu일 때, 염류는 몇 g인가?",
        answer: "108 g",
        steps: ["36 psu = 1 kg당 36 g", "3 kg × 36 g = 108 g"]
      }
    ];
    return cases[seed % cases.length];
  }

  if (kind === "half-life") {
    const cases = [
      {
        prompt: "반감기가 5,000년인 방사성 동위원소가 1/8 남았다. 경과 시간은?",
        answer: "15,000년",
        steps: ["1/8 = (1/2)^3", "3번 반감기", "5,000 × 3 = 15,000"]
      },
      {
        prompt: "반감기가 2억 년인 동위원소가 처음의 1/4 남았다. 경과 시간은?",
        answer: "4억 년",
        steps: ["1/4 = (1/2)^2", "2번 반감기", "2억 × 2 = 4억"]
      },
      {
        prompt: "반감기가 1,000년인 동위원소가 처음 80 g에서 10 g으로 줄었다. 경과 시간은?",
        answer: "3,000년",
        steps: ["80→40→20→10", "3번 반감기", "1,000 × 3 = 3,000"]
      }
    ];
    return cases[seed % cases.length];
  }

  return null;
}
