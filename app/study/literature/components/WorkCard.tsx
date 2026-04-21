"use client";

import { useState } from "react";
import { Work } from "../data/works";
import { TIER_INFO } from "../data/tiers";

interface Props {
  work: Work;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  defaultExpanded?: boolean;
}

export default function WorkCard({ work, pinned, onTogglePin, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const tierInfo = TIER_INFO[work.tier];

  return (
    <article
      className={`border rounded-lg bg-[#0F0F0F] card-glow ${
        pinned ? "border-[#FFD700]" : "border-[#2A2A2A]"
      }`}
    >
      {/* Header */}
      <header className="p-4 flex items-start gap-3">
        <span
          className="flex-shrink-0 text-xs font-bold tracking-wider px-2 py-1 rounded mt-0.5"
          style={{
            color: tierInfo.color,
            backgroundColor: `${tierInfo.color}15`,
            border: `1px solid ${tierInfo.color}40`,
          }}
        >
          {work.id}
        </span>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left min-w-0"
        >
          <h3 className="text-base font-bold text-[#F5F0E8] mb-0.5 truncate">
            {work.title}
            <span className="ml-2 text-xs font-normal text-[#888]">— {work.author}</span>
          </h3>
          <div className="text-xs text-[#888] flex flex-wrap gap-x-3 gap-y-0.5">
            <span>{work.genre}</span>
            <span>·</span>
            <span>{work.era}</span>
          </div>
          <p className="text-xs text-[#aaa] mt-1.5 leading-relaxed">{work.theme}</p>
        </button>

        <div className="flex-shrink-0 flex flex-col gap-1.5">
          <button
            onClick={() => onTogglePin(work.id)}
            title="아침으로 핀"
            className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-all ${
              pinned
                ? "bg-[#FFD700] text-[#0A0A0A]"
                : "border border-[#3A3A3A] text-[#888] hover:border-[#FFD700] hover:text-[#FFD700]"
            }`}
          >
            📌
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded border border-[#3A3A3A] flex items-center justify-center text-[#888] hover:border-[#FF6B2B] hover:text-[#FF6B2B] text-sm"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </header>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#1A1A1A] pt-3">
          {work.speaker && (
            <Section label="화자">
              <p className="text-xs text-[#ccc]">{work.speaker}</p>
            </Section>
          )}

          {work.keyWords.length > 0 && (
            <Section label="핵심 시어">
              <ul className="space-y-1">
                {work.keyWords.map((kw, i) => (
                  <li key={i} className="text-xs leading-relaxed">
                    <strong className="text-[#FF6B2B]">{kw.word}</strong>
                    <span className="text-[#888] mx-1.5">→</span>
                    <span className="text-[#ccc]">{kw.meaning}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {work.highlights.length > 0 && (
            <Section label="⭐ 강조 포인트">
              <ul className="space-y-1">
                {work.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-[#ccc] leading-relaxed flex gap-1.5">
                    <span className="text-[#FFB347] flex-shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {work.traps.length > 0 && (
            <Section label="🚨 함정·오답 패턴">
              <ul className="space-y-1">
                {work.traps.map((t, i) => (
                  <li key={i} className="text-xs text-[#ccc] leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {work.comparePairs && work.comparePairs.length > 0 && (
            <Section label="🔗 자주 묶이는 작품">
              <ul className="space-y-1">
                {work.comparePairs.map((c, i) => (
                  <li key={i} className="text-xs text-[#ccc] leading-relaxed">
                    {c}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {work.examPoints.length > 0 && (
            <Section label="🎯 출제 핵심">
              <div className="flex flex-wrap gap-1.5">
                {work.examPoints.map((e, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded bg-[#FF6B2B]/10 text-[#FF6B2B] border border-[#FF6B2B]/30"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>
      )}
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-bold tracking-wider text-[#888] uppercase mb-1.5">
        {label}
      </h4>
      {children}
    </div>
  );
}
