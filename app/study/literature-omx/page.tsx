"use client";

import { useMemo, useState } from "react";
import { ModeToggle, type StudyMode } from "./components/ModeToggle";
import { TierFilter } from "./components/TierFilter";
import { Timeline } from "./components/Timeline";
import { WorkCard } from "./components/WorkCard";
import { PatternDrill } from "./components/PatternDrill";
import { Flashcard } from "./components/Flashcard";
import { PinnedItems } from "./components/PinnedItems";
import { nightSchedule } from "./data/schedule-night";
import { morningSchedule } from "./data/schedule-morning";
import { patterns } from "./data/patterns";
import { works } from "./data/works";
import { tierMeta, tierTimePlan, type Tier } from "./data/tiers";

function toggleSetValue<T>(source: Set<T>, value: T) {
  const next = new Set(source);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export default function LiteratureOmxPage() {
  const [mode, setMode] = useState<StudyMode>(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      if (m === "morning") return "morning";
    }
    return "night";
  });
  const [activeTiers, setActiveTiers] = useState<Set<Tier>>(new Set(["S", "A", "B"]));
  const [doneBlockIds, setDoneBlockIds] = useState<Set<string>>(new Set());
  const [doneWorkIds, setDoneWorkIds] = useState<Set<string>>(new Set());
  const [donePatternIds, setDonePatternIds] = useState<Set<string>>(new Set());
  const [pinnedWorkIds, setPinnedWorkIds] = useState<Set<string>>(new Set());
  const [pinnedPatternIds, setPinnedPatternIds] = useState<Set<string>>(new Set());
  const [activeBlockId, setActiveBlockId] = useState<string | null>(nightSchedule[0]?.id ?? null);

  const blocks = mode === "night" ? nightSchedule : morningSchedule;

  const visibleWorks = useMemo(() => {
    const filtered = works.filter((work) => activeTiers.has(work.tier));
    return filtered.sort((a, b) => {
      const aPinned = pinnedWorkIds.has(a.id) ? 1 : 0;
      const bPinned = pinnedWorkIds.has(b.id) ? 1 : 0;
      if (mode === "morning" && aPinned !== bPinned) return bPinned - aPinned;
      const order = { S: 0, A: 1, B: 2 };
      return order[a.tier] - order[b.tier];
    });
  }, [activeTiers, mode, pinnedWorkIds]);

  const visiblePatterns = useMemo(
    () =>
      patterns
        .filter((pattern) => activeTiers.has(pattern.tier))
        .sort((a, b) => {
          const aPinned = pinnedPatternIds.has(a.id) ? 1 : 0;
          const bPinned = pinnedPatternIds.has(b.id) ? 1 : 0;
          if (mode === "morning" && aPinned !== bPinned) return bPinned - aPinned;
          return b.weight - a.weight;
        }),
    [activeTiers, mode, pinnedPatternIds]
  );

  const pinnedWorks = useMemo(() => works.filter((work) => pinnedWorkIds.has(work.id)), [pinnedWorkIds]);
  const pinnedPatterns = useMemo(
    () => patterns.filter((pattern) => pinnedPatternIds.has(pattern.id)),
    [pinnedPatternIds]
  );

  const flashcards = useMemo(() => {
    const sourceWorks =
      mode === "morning" && pinnedWorks.length > 0
        ? pinnedWorks
        : visibleWorks.filter((work) => work.tier !== "B");

    return sourceWorks.flatMap((work) =>
      work.flashcards.map((card) => ({
        ...card,
        tier: work.tier,
        workTitle: work.title
      }))
    );
  }, [mode, pinnedWorks, visibleWorks]);

  const jumpTo = (targetId: string, blockId?: string) => {
    if (blockId) setActiveBlockId(blockId);
    const node = document.getElementById(targetId);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <section id="scope-brief" className="accent-line-left overflow-hidden rounded-2xl border border-border-dark bg-surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                EXAM CRAM · LITERATURE · 2026-04-22 WED 08:20
              </p>
              <h1 className="mt-2 font-mono text-3xl text-warm-white sm:text-4xl">
                문학 2.5시간 최적화 대시보드
              </h1>
              <p className="mt-3 max-w-2xl font-mono text-sm leading-6 text-text-secondary">
                목표는 만점이 아니라 <span className="text-combustion">내일까지 현실적으로 가장 많이 맞는 것</span>.
                필기·유인물·학평이 반복된 작품만 깊게, 나머지는 압축·폐기까지 포함해 설계했다.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-border-dark bg-base-black/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">시험 팩트</p>
                <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
                  <li>• 일시: 2026-04-22(수) 1교시 08:20~09:10</li>
                  <li>• 배점: 객관식 100 / 단답형 0 / 서논술형 0</li>
                  <li>• 문항 수: 제공 자료 미기재</li>
                  <li>• 등교: 2학년 08:00</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border-dark bg-base-black/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">범위</p>
                <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
                  <li>• 교과서 10~17, 26~32, 58~65, 160~204p</li>
                  <li>• 유인물 전부</li>
                  <li>• 3월 학력평가 &lt;자경&gt; 포함</li>
                  <li>• 교사명: 자료 내 직접 표기 미발견</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-border-dark bg-base-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">출판사 / 처리 메모</p>
              <ul className="mt-2 space-y-1 font-mono text-xs leading-6 text-warm-white/90">
                <li>• 교과서 출판사는 자료 내 직접 표기가 없었다.</li>
                <li>
                  • 다만 작품 배열·페이지 구조가 미래엔 공식 문학 자습서/평가문제집 해설 PDF 및 교육부
                  검정도서 목록과 일치해 <span className="text-lox">㈜미래엔(대표저자 방민호)</span>로 강하게 추정된다.
                </li>
                <li>• 유인물은 작품별 명시가 없어 ‘자료 수록 = 출제 가능’로 보고 보수적으로 반영했다.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border-dark bg-base-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">티어 시간 배분</p>
              <ul className="mt-2 space-y-1 font-mono text-xs leading-6 text-warm-white/90">
                <li>• S: {tierTimePlan.S}</li>
                <li>• A: {tierTimePlan.A}</li>
                <li>• B: {tierTimePlan.B}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <section className="rounded-xl border border-border-dark bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">CONTROL PANEL</p>
                  <p className="mt-1 font-mono text-sm text-warm-white">모드 전환 + 티어 절삭</p>
                </div>
                <ModeToggle mode={mode} onChange={setMode} nightMinutes={120} morningMinutes={30} />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <TierFilter
                  active={activeTiers}
                  onToggle={(tier) => setActiveTiers((current) => toggleSetValue(current, tier))}
                />
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {(["S", "A", "B"] as Tier[]).map((tier) => (
                    <span key={tier} className="rounded-sm border border-border-dark px-2 py-1">
                      {tierMeta[tier].label}: {works.filter((work) => work.tier === tier).length}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border-dark bg-surface p-4">
              <Timeline
                blocks={blocks}
                activeId={activeBlockId}
                doneIds={doneBlockIds}
                onJump={jumpTo}
                onToggleDone={(blockId) => setDoneBlockIds((current) => toggleSetValue(current, blockId))}
              />
            </section>

            <PinnedItems
              mode={mode}
              works={pinnedWorks}
              patterns={pinnedPatterns}
              onJump={(targetId) => jumpTo(targetId)}
              onUnpinWork={(id) => setPinnedWorkIds((current) => toggleSetValue(current, id))}
              onUnpinPattern={(id) => setPinnedPatternIds((current) => toggleSetValue(current, id))}
            />

            <Flashcard cards={flashcards} />
          </div>

          <div className="space-y-4">
            <section className="rounded-xl border border-border-dark bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">WORK CARDS</p>
                  <p className="mt-1 font-mono text-sm text-warm-white">작품 카드 · 필터 기준 {visibleWorks.length}개</p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  완료 {doneWorkIds.size} / {works.length}
                </p>
              </div>
              <div className="mt-4 grid gap-4">
                {visibleWorks.map((work) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    pinned={pinnedWorkIds.has(work.id)}
                    done={doneWorkIds.has(work.id)}
                    onPin={() => setPinnedWorkIds((current) => toggleSetValue(current, work.id))}
                    onToggleDone={() => setDoneWorkIds((current) => toggleSetValue(current, work.id))}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border-dark bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">PATTERN BOOK</p>
                  <p className="mt-1 font-mono text-sm text-warm-white">문제 유형 패턴북 · {visiblePatterns.length}개</p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  완료 {donePatternIds.size} / {patterns.length}
                </p>
              </div>

              <div className="mt-4 grid gap-4">
                {visiblePatterns.map((pattern) => (
                  <PatternDrill
                    key={pattern.id}
                    pattern={pattern}
                    pinned={pinnedPatternIds.has(pattern.id)}
                    done={donePatternIds.has(pattern.id)}
                    onPin={() => setPinnedPatternIds((current) => toggleSetValue(current, pattern.id))}
                    onToggleDone={() => setDonePatternIds((current) => toggleSetValue(current, pattern.id))}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-xl border border-border-dark bg-surface p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">RUTHLESS RULE</p>
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-border-dark bg-base-black/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-combustion">버릴 것</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
                <li>· B 작품 세부 줄거리 암기</li>
                <li>· 작가 생애 장문 정리</li>
                <li>· 손글씨 예쁘게 정리</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border-dark bg-base-black/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lox">가져갈 것</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
                <li>· S 작품 시어·공간·상징 1세트씩</li>
                <li>· 갈래 특징 키워드 1줄 정의</li>
                <li>· 함정 선지 패턴 체크</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border-dark bg-base-black/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-combustion">시험장 우선순위</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-warm-white/90">
                <li>· 보기·갈래·시대 단서 먼저 보기</li>
                <li>· 화자/서술자 착각 선지 제거</li>
                <li>· 모르면 S 작품 연관 선지부터 고르기</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
