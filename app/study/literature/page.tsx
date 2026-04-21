"use client";

import { useMemo, useState } from "react";
import ModeToggle, { Mode } from "./components/ModeToggle";
import Timeline from "./components/Timeline";
import WorkCard from "./components/WorkCard";
import TierFilter from "./components/TierFilter";
import PatternDrill from "./components/PatternDrill";
import Flashcard from "./components/Flashcard";
import PinnedItems from "./components/PinnedItems";
import { NIGHT_BLOCKS } from "./data/schedule-night";
import { MORNING_BLOCKS } from "./data/schedule-morning";
import { WORKS, Work } from "./data/works";
import { PATTERNS } from "./data/patterns";
import { Tier } from "./data/tiers";

type View = "timeline" | "works" | "patterns" | "flash";

export default function LiteraturePage() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      if (m === "morning") return "morning";
    }
    return "night";
  });
  const [view, setView] = useState<View>("timeline");
  const [tierFilter, setTierFilter] = useState<Tier | "ALL">("ALL");
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());
  const [pinnedSet, setPinnedSet] = useState<Set<string>>(new Set());
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const blocks = mode === "night" ? NIGHT_BLOCKS : MORNING_BLOCKS;
  const totalMin = mode === "night" ? 120 : 30;

  const activeBlock = blocks.find((b) => b.id === activeBlockId) ?? null;
  const activeBlockWorks = useMemo<Work[]>(() => {
    if (!activeBlock?.workIds) return [];
    const set = new Set(activeBlock.workIds);
    return WORKS.filter((w) => set.has(w.id));
  }, [activeBlock]);
  const activeBlockPatterns = useMemo(() => {
    if (!activeBlock?.patternIds) return [];
    const set = new Set(activeBlock.patternIds);
    return PATTERNS.filter((p) => set.has(p.id));
  }, [activeBlock]);

  const filteredWorks = useMemo(() => {
    let list = WORKS;
    if (tierFilter !== "ALL") list = list.filter((w) => w.tier === tierFilter);
    // Pinned first
    return [...list].sort((a, b) => {
      const pa = pinnedSet.has(a.id) ? 0 : 1;
      const pb = pinnedSet.has(b.id) ? 0 : 1;
      if (pa !== pb) return pa - pb;
      return 0;
    });
  }, [tierFilter, pinnedSet]);

  // Morning mode: show pinned works first in flashcard
  const flashcardWorks = useMemo(() => {
    if (mode === "morning" && pinnedSet.size > 0) {
      return WORKS.filter((w) => pinnedSet.has(w.id));
    }
    if (tierFilter === "ALL") return WORKS.filter((w) => w.tier === "S" || w.tier === "A");
    return WORKS.filter((w) => w.tier === tierFilter);
  }, [mode, pinnedSet, tierFilter]);

  const tierCounts = useMemo<Record<Tier | "ALL", number>>(() => {
    const c: Record<Tier | "ALL", number> = {
      ALL: WORKS.length,
      S: 0,
      A: 0,
      B: 0,
    };
    for (const w of WORKS) c[w.tier]++;
    return c;
  }, []);

  const togglePin = (id: string) => {
    setPinnedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDone = (id: string) => {
    setDoneSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const doneInMode = blocks.filter((b) => doneSet.has(b.id)).length;
  const remainingMin = blocks
    .filter((b) => !doneSet.has(b.id))
    .reduce((s, b) => s + b.durationMin, 0);

  return (
    <section className="-mx-4 sm:-mx-6 lg:-mx-8 -my-10 sm:-my-12 min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── HERO ─── */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#888]">
            <span className="w-8 h-px bg-[#FF6B2B]" />
            <span>STUDY · LITERATURE · CRAM SESSION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            문학 중간고사 <span className="text-[#FF6B2B]">D-1</span> 추진실
          </h1>

          <p className="text-sm text-[#888] max-w-2xl leading-relaxed">
            4월 22일(수) 1교시 08:20~09:10 · 객관식 100점.
            <br />
            오늘 밤 2시간 + 내일 아침 30분으로 가능한 점수를 끌어올린다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ModeToggle mode={mode} onChange={setMode} />
            <div className="flex items-center gap-3 text-xs text-[#888]">
              <Stat label="진행" value={`${doneInMode}/${blocks.length}`} />
              <Stat label="남은 시간" value={`${remainingMin}min`} />
              <Stat label="핀" value={`${pinnedSet.size}`} />
            </div>
          </div>
        </header>

        {/* ─── VIEW NAV ─── */}
        <nav className="mb-6 flex gap-1 border-b border-[#1A1A1A] overflow-x-auto">
          {([
            ["timeline", "📋 타임라인"],
            ["works", "📚 작품 카드"],
            ["patterns", "🧭 유형북"],
            ["flash", "⚡ 플래시카드"],
          ] as [View, string][]).map(([v, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                view === v
                  ? "border-[#FF6B2B] text-[#F5F0E8]"
                  : "border-transparent text-[#666] hover:text-[#aaa]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ─── BODY ─── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main column */}
          <section className="min-w-0">
            {view === "timeline" && (
              <div className="space-y-6">
                <Timeline
                  blocks={blocks}
                  totalMin={totalMin}
                  doneSet={doneSet}
                  onToggleDone={toggleDone}
                  activeBlockId={activeBlockId}
                  onSelectBlock={(id) =>
                    setActiveBlockId((prev) => (prev === id ? null : id))
                  }
                />

                {/* Active block: drill in */}
                {activeBlock && (activeBlockWorks.length > 0 || activeBlockPatterns.length > 0) && (
                  <div className="border-l-2 border-[#FF6B2B] pl-4 space-y-4">
                    <h2 className="text-sm tracking-wider text-[#FF6B2B]">
                      ▼ {activeBlock.title.replace(/^[^\s]+\s/, "")} 자료
                    </h2>
                    {activeBlockWorks.length > 0 && (
                      <div className="space-y-2">
                        {activeBlockWorks.map((w) => (
                          <WorkCard
                            key={w.id}
                            work={w}
                            pinned={pinnedSet.has(w.id)}
                            onTogglePin={togglePin}
                            defaultExpanded
                          />
                        ))}
                      </div>
                    )}
                    {activeBlockPatterns.length > 0 && (
                      <PatternDrill patterns={activeBlockPatterns} />
                    )}
                  </div>
                )}
              </div>
            )}

            {view === "works" && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between flex-wrap gap-3">
                  <h2 className="text-xl font-bold tracking-tight">📚 작품 카드</h2>
                  <TierFilter
                    active={tierFilter}
                    onChange={setTierFilter}
                    counts={tierCounts}
                  />
                </div>
                <p className="text-xs text-[#666]">
                  {tierFilter === "ALL"
                    ? "전체 작품. 핀한 작품이 위로 정렬됩니다."
                    : `${tierFilter} 등급 작품만 표시 중.`}
                </p>
                <div className="space-y-2">
                  {filteredWorks.map((w) => (
                    <WorkCard
                      key={w.id}
                      work={w}
                      pinned={pinnedSet.has(w.id)}
                      onTogglePin={togglePin}
                      defaultExpanded={w.tier === "S"}
                    />
                  ))}
                </div>
              </div>
            )}

            {view === "patterns" && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between flex-wrap gap-3">
                  <h2 className="text-xl font-bold tracking-tight">🧭 유형북 — 풀이 알고리즘</h2>
                  <span className="text-xs text-[#666]">{PATTERNS.length}개 유형</span>
                </div>
                <p className="text-xs text-[#666] leading-relaxed">
                  객관식 문제는 7~10개 유형 안에 들어옵니다. 각 유형의 풀이 단계 + 함정 패턴을
                  머리에 두고 보기를 소거하세요.
                </p>
                <PatternDrill patterns={PATTERNS} />
              </div>
            )}

            {view === "flash" && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between flex-wrap gap-3">
                  <h2 className="text-xl font-bold tracking-tight">⚡ 플래시카드</h2>
                  <TierFilter
                    active={tierFilter}
                    onChange={setTierFilter}
                    counts={tierCounts}
                  />
                </div>
                <p className="text-xs text-[#666]">
                  {mode === "morning" && pinnedSet.size > 0
                    ? "🌅 모닝 모드: 핀한 작품의 카드만 우선 노출."
                    : "카드를 클릭하면 정답이 보입니다. 셔플로 무작위."}
                </p>
                <Flashcard works={flashcardWorks} />
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-6 self-start">
            <PinnedItems
              works={WORKS}
              pinnedIds={pinnedSet}
              onUnpin={togglePin}
              onClearAll={() => setPinnedSet(new Set())}
            />

            <div className="border border-[#2A2A2A] rounded-lg bg-[#0F0F0F] p-4 space-y-2">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="text-[#00D4FF]">🎯</span> 시험 직전 30초
              </h3>
              <ol className="space-y-1 text-xs text-[#aaa] leading-relaxed">
                <li>1. 갈래 헷갈리지 마 (향가/속요/시조/가사/판소리)</li>
                <li>2. 꽃-낙화, 상춘곡-누항사 비교</li>
                <li>3. 작가 맥락 키워드</li>
                <li>4. 역설 ≠ 반어</li>
                <li>
                  5. 함정 단어 <span className="text-[#FF6B2B]">단정/오로지/항상</span>
                </li>
                <li>6. 〈보기〉 벗어난 해석 ✗</li>
                <li>7. 도산십이곡 = 만고상청 / 전6곡 言志 / 후6곡 言學</li>
                <li>
                  8. <span className="text-[#FFD700]">자경(박인로)</span> = 학평 명시 → 100% 출제
                </li>
              </ol>
            </div>

            <div className="border border-[#2A2A2A] rounded-lg bg-[#0F0F0F] p-4">
              <h3 className="text-sm font-bold mb-2">📂 메모 파일</h3>
              <p className="text-xs text-[#888] leading-relaxed">
                상세 분석은{" "}
                <code className="text-[#00D4FF] text-[11px]">
                  app/study/literature/notes/
                </code>{" "}
                에 작품별 마크다운으로 정리되어 있습니다.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-16 pt-6 border-t border-[#1A1A1A] text-center">
          <p className="text-[10px] text-[#444] tracking-[0.2em]">
            CRAM SESSION · D-1 · 너는 준비됐어 🚀
          </p>
        </footer>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[10px] tracking-wider text-[#666] uppercase">{label}</span>
      <span className="text-sm font-bold hud-value text-[#F5F0E8]">{value}</span>
    </div>
  );
}
