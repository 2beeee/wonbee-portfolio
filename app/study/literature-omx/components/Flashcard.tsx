"use client";

import { useEffect, useMemo, useState } from "react";
import type { FlashcardItem } from "../data/works";

export function Flashcard({
  cards
}: {
  cards: FlashcardItem[];
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [cards]);

  const current = useMemo(() => cards[index] ?? null, [cards, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName ?? "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.code === "Space") {
        event.preventDefault();
        setFlipped((value) => !value);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, Math.max(cards.length - 1, 0)));
        setFlipped(false);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
        setFlipped(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cards.length]);

  if (!current) {
    return (
      <section id="flash-section" className="rounded-xl border border-border-dark bg-surface p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">FLASHCARDS</p>
        <p className="mt-2 font-mono text-sm text-warm-white">선택된 티어에 카드가 없습니다.</p>
      </section>
    );
  }

  return (
    <section id="flash-section" className="rounded-xl border border-border-dark bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">FLASHCARDS</p>
          <p className="mt-1 font-mono text-sm text-warm-white">
            스페이스 = 뒤집기 · ←/→ = 이동
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {index + 1} / {cards.length}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className="mt-4 w-full rounded-xl border border-border-dark bg-base-black/70 p-5 text-left transition hover:border-border-hover"
      >
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
          <span className="rounded-sm border border-lox/40 bg-lox/15 px-1.5 py-0.5 font-mono text-lox">
            {current.tier}
          </span>
          <span className="font-mono text-text-muted">{current.workTitle}</span>
          <span className="font-mono text-text-muted">{current.tag}</span>
        </div>
        <p className="mt-4 font-mono text-lg text-warm-white">
          {flipped ? current.back : current.front}
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
          {flipped ? "ANSWER" : "PROMPT"}
        </p>
      </button>

      <div className="mt-3 flex justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            setIndex((value) => Math.max(value - 1, 0));
            setFlipped(false);
          }}
          className="rounded-md border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
        >
          ← 이전
        </button>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="rounded-md border border-combustion/40 bg-combustion/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-combustion"
        >
          뒤집기
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex((value) => Math.min(value + 1, cards.length - 1));
            setFlipped(false);
          }}
          className="rounded-md border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary hover:text-warm-white"
        >
          다음 →
        </button>
      </div>
    </section>
  );
}
