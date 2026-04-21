"use client";

import { cn } from "@/lib/study/cn";

export type PinnedEntry = {
  id: string;
  domId: string;
  kind: string;
  title: string;
  tier: string;
  summary: string;
};

export function PinnedItems({
  items,
  onJump,
  onRemove
}: {
  items: PinnedEntry[];
  onJump: (id: string) => void;
  onRemove?: (id: string) => void;
}) {
  return (
    <section id="morning-pin-board" className="rounded-3xl border border-border-dark bg-surface p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-combustion">내일 아침에 볼 것</div>
          <h3 className="mt-1 text-xl font-semibold text-warm-white">핀 보드</h3>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{items.length}개 선택됨</div>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border-dark bg-base-black p-4 text-sm leading-7 text-text-secondary">
          아직 핀이 없다. 밤 학습 중 헷갈리는 카드·유형·그래프·공식을 눌러서 아침 30분 리스트를 만든다.
        </div>
      ) : (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border-dark bg-base-black p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-lox">
                    {item.kind} · TIER {item.tier}
                  </div>
                  <h4 className="mt-1 text-base font-semibold text-warm-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{item.summary}</p>
                </div>
                {onRemove ? (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="rounded-full border border-border-dark px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary transition hover:text-combustion"
                  >
                    제거
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onJump(item.domId)}
                className="mt-3 rounded-full border border-combustion/40 bg-combustion/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-combustion"
              >
                해당 위치로 점프
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
