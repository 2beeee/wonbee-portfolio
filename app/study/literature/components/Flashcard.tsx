"use client";

import { useMemo, useState } from "react";
import { Work } from "../data/works";
import { TIER_INFO } from "../data/tiers";

interface Card {
  workId: string;
  workTitle: string;
  tier: Work["tier"];
  q: string;
  a: string;
}

interface Props {
  works: Work[];
}

export default function Flashcard({ works }: Props) {
  const cards = useMemo<Card[]>(
    () =>
      works.flatMap((w) =>
        w.flashcards.map((fc) => ({
          workId: w.id,
          workTitle: w.title,
          tier: w.tier,
          q: fc.q,
          a: fc.a,
        }))
      ),
    [works]
  );

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (cards.length === 0) {
    return (
      <div className="border border-dashed border-[#2A2A2A] rounded-lg p-8 text-center text-[#666] text-sm">
        선택된 작품에 플래시카드가 없습니다.
      </div>
    );
  }

  const current = cards[idx];
  const tierColor = TIER_INFO[current.tier].color;

  const next = () => {
    setRevealed(false);
    setIdx((i) => (i + 1) % cards.length);
  };
  const prev = () => {
    setRevealed(false);
    setIdx((i) => (i - 1 + cards.length) % cards.length);
  };
  const shuffle = () => {
    setRevealed(false);
    setIdx(Math.floor(Math.random() * cards.length));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-[#888]">
        <span className="hud-value">
          {idx + 1} / {cards.length}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
            style={{
              color: tierColor,
              backgroundColor: `${tierColor}15`,
              border: `1px solid ${tierColor}40`,
            }}
          >
            {current.tier}
          </span>
          <span className="text-[#aaa]">{current.workTitle}</span>
        </div>
      </div>

      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full min-h-[200px] border border-[#2A2A2A] rounded-lg bg-[#0F0F0F] p-6 flex flex-col items-center justify-center text-center card-glow transition-all"
      >
        {!revealed ? (
          <>
            <div className="text-[10px] font-bold tracking-wider text-[#FF6B2B] mb-3">
              Q.
            </div>
            <p className="text-base text-[#F5F0E8] leading-relaxed">{current.q}</p>
            <div className="mt-4 text-[10px] text-[#666] tracking-wider">
              클릭해서 답 보기
            </div>
          </>
        ) : (
          <>
            <div className="text-[10px] font-bold tracking-wider text-[#00D4FF] mb-3">
              A.
            </div>
            <p className="text-base text-[#F5F0E8] leading-relaxed">{current.a}</p>
            <div className="mt-4 text-[10px] text-[#666] tracking-wider">
              한 번 더 클릭하면 질문
            </div>
          </>
        )}
      </button>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={prev}
          className="px-3 py-2 text-xs font-bold border border-[#2A2A2A] rounded text-[#888] hover:text-[#F5F0E8] hover:border-[#FF6B2B]"
        >
          ← 이전
        </button>
        <button
          onClick={shuffle}
          className="px-3 py-2 text-xs font-bold border border-[#2A2A2A] rounded text-[#888] hover:text-[#F5F0E8] hover:border-[#FF6B2B]"
        >
          🎲 셔플
        </button>
        <button
          onClick={next}
          className="px-3 py-2 text-xs font-bold border border-[#FF6B2B] rounded text-[#FF6B2B] hover:bg-[#FF6B2B] hover:text-[#0A0A0A]"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}
