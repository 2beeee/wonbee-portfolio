"use client";

import { Work } from "../data/works";
import { TIER_INFO } from "../data/tiers";

interface Props {
  works: Work[];
  pinnedIds: Set<string>;
  onUnpin: (id: string) => void;
  onClearAll: () => void;
}

export default function PinnedItems({ works, pinnedIds, onUnpin, onClearAll }: Props) {
  const pinned = works.filter((w) => pinnedIds.has(w.id));

  return (
    <div className="border border-[#FFD700]/40 rounded-lg bg-[#0F0F0F] p-4">
      <header className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <span className="text-[#FFD700]">📌</span>
          <span>아침으로 핀</span>
          <span className="text-[#888] font-normal">({pinned.length})</span>
        </h3>
        {pinned.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-[#888] hover:text-[#FF6B2B] tracking-wider"
          >
            모두 비우기
          </button>
        )}
      </header>

      {pinned.length === 0 ? (
        <p className="text-xs text-[#666] py-3 text-center leading-relaxed">
          헷갈리거나 다시 봐야 할 작품을 핀해보세요.
          <br />
          모닝 모드에서 우선 표시됩니다.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {pinned.map((w) => {
            const tierColor = TIER_INFO[w.tier].color;
            return (
              <li
                key={w.id}
                className="flex items-center gap-2 text-xs py-1.5 px-2 rounded hover:bg-[#1A1A1A]"
              >
                <span
                  className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded hud-value"
                  style={{
                    color: tierColor,
                    backgroundColor: `${tierColor}15`,
                  }}
                >
                  {w.id}
                </span>
                <span className="flex-1 truncate text-[#F5F0E8]">{w.title}</span>
                <span className="text-[#666] truncate hidden sm:inline">{w.author}</span>
                <button
                  onClick={() => onUnpin(w.id)}
                  className="flex-shrink-0 w-5 h-5 rounded text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10"
                  title="핀 해제"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
