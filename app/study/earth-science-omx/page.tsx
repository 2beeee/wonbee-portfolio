"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/study/cn";
import { ConceptCard } from "./components/ConceptCard";
import { FormulaCard } from "./components/FormulaCard";
import { GraphInteractive } from "./components/GraphInteractive";
import { ModeToggle, type StudyMode } from "./components/ModeToggle";
import { PatternDrill } from "./components/PatternDrill";
import { PinnedItems, type PinnedEntry } from "./components/PinnedItems";
import { TierFilter } from "./components/TierFilter";
import { Timeline } from "./components/Timeline";
import { concepts } from "./data/concepts";
import { formulas } from "./data/formulas";
import { graphs } from "./data/graphs";
import { patterns } from "./data/patterns";
import { scheduleMorning } from "./data/schedule-morning";
import { scheduleNight } from "./data/schedule-night";
import { tierMeta, tierOrder, tierSummary, type Tier } from "./data/tiers";

const recommendedMorningIds = [
  "ocean-core",
  "weather-systems",
  "enso",
  "stratigraphy",
  "absolute-age",
  "sedimentary-structures",
  "salinity",
  "half-life",
  "thermocline-density",
  "ts-diagram"
];

const scopeSummary = {
  examDate: "2026-04-22 (수)",
  examTime: "2교시 09:30~10:20",
  duration: "50분",
  range: "교과서 처음~111p / 유인물 처음~40p",
  mappedRange:
    "교과서 차례 기준: Ⅰ 대기와 해양의 상호작용 전체(14~87p) + Ⅱ 지구의 역사와 한반도의 암석 중 01 지층의 선후 관계와 암석의 나이(88~95p), 02 퇴적 지층과 지질 시대의 환경(96~111p)",
  scoring: "객관식 95점 + 단답형 5점 + 서논술형 0점",
  itemCount: "제공 자료에 문항 수 미기재",
  textbook: "천재교육 『지구과학』 (파일명 기준, 교과서 PDF 차례로 범위 확인)",
  teacher: "출제 교사명은 제공 자료에서 확인 불가"
};

const sourceInventory = [
  {
    name: "2026학년도 1학기 중간고사 일정 가정통신문.pdf",
    category: "공통(문학/지구과학 모두)",
    status: "완독",
    note: "시험 일시 확인: 4/22 수 2교시 09:30~10:20"
  },
  {
    name: "2026학년도 2학년 1학기 중간고사 시험범위 안내 가정통신문.pdf",
    category: "공통(문학/지구과학 모두)",
    status: "완독",
    note: "지구과학 범위·배점 확인: 교과서 111p / 유인물 40p / 95+5"
  },
  {
    name: "2026 2학년 지구과학 학습자료.pdf",
    category: "지구과학",
    status: "1~40p 전부 처리",
    note: "교사 학습자료. 사실상 최우선 소스"
  },
  {
    name: "천재_지구과학_2-111p_고화질.pdf",
    category: "지구과학",
    status: "OCR + 차례/본문 처리",
    note: "교과서 범위 전체 확인. 112p부터 화성암 단원으로 범위 밖"
  },
  {
    name: "메가스터디N제_지구과학_22개정.pdf",
    category: "지구과학",
    status: "직접 확인 + 해설 매칭 처리",
    note: "실제 문제 페이지 시각 확인"
  },
  {
    name: "메가스터디 N제 지구과학 685제_해설(001_048) (1).pdf",
    category: "지구과학",
    status: "1~25p 범위 내 해설 전부 처리",
    note: "문항 유형 빈도 분석 핵심 소스"
  },
  {
    name: "완자_기출픽_지구과학(22개정).pdf",
    category: "지구과학",
    status: "직접 확인 + 해설 매칭 처리",
    note: "실제 문제 페이지 시각 확인"
  },
  {
    name: "완자기출픽 정답과 해설.pdf",
    category: "지구과학",
    status: "1~35p 범위 내 해설 전부 처리",
    note: "문제 반복도와 함정 확인"
  }
];

const classificationRows = [
  "2026학년도 1학기 중간고사 일정 가정통신문.pdf → both",
  "2026학년도 2학년 1학기 중간고사 시험범위 안내 가정통신문.pdf → both",
  "기하/스크린샷 2026-04-20 104117.png → neither",
  "문학/* → literature",
  "지구과학/* 6개 PDF → earth-science"
];

type PinCatalog = Record<string, PinnedEntry>;

export default function EarthScienceOmxPage() {
  const [mode, setMode] = useState<StudyMode>(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      if (m === "morning") return "morning";
    }
    return "night";
  });
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>(["S", "A", "B"]);
  const [completedConcepts, setCompletedConcepts] = useState<string[]>([]);
  const [completedPatterns, setCompletedPatterns] = useState<string[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const pinCatalog = useMemo<PinCatalog>(() => {
    const conceptEntries = concepts.map((concept) => [
      concept.id,
      {
        id: concept.id,
        domId: `concept-${concept.id}`,
        kind: "개념",
        title: concept.title,
        tier: concept.tier,
        summary: concept.quickLine
      }
    ] as const);

    const patternEntries = patterns.map((pattern) => [
      pattern.id,
      {
        id: pattern.id,
        domId: `pattern-${pattern.id}`,
        kind: "유형",
        title: pattern.title,
        tier: pattern.tier,
        summary: pattern.focus
      }
    ] as const);

    const graphEntries = graphs.map((graph) => [
      graph.id,
      {
        id: graph.id,
        domId: `graph-${graph.id}`,
        kind: "그래프",
        title: graph.title,
        tier: graph.tier,
        summary: graph.summary
      }
    ] as const);

    const formulaEntries = formulas.map((formula) => [
      formula.id,
      {
        id: formula.id,
        domId: `formula-${formula.id}`,
        kind: "공식",
        title: formula.title,
        tier: formula.tier,
        summary: formula.expression
      }
    ] as const);

    return Object.fromEntries([
      ...conceptEntries,
      ...patternEntries,
      ...graphEntries,
      ...formulaEntries
    ]);
  }, []);

  const pinnedItems = useMemo(() => pinnedIds.map((id) => pinCatalog[id]).filter(Boolean), [pinCatalog, pinnedIds]);
  const morningItems = useMemo(() => {
    const base = pinnedItems.length > 0 ? pinnedItems : recommendedMorningIds.map((id) => pinCatalog[id]).filter(Boolean);
    return base;
  }, [pinCatalog, pinnedItems]);

  const visibleConcepts = useMemo(
    () => concepts.filter((concept) => selectedTiers.includes(concept.tier)),
    [selectedTiers]
  );
  const visiblePatterns = useMemo(
    () => patterns.filter((pattern) => selectedTiers.includes(pattern.tier)),
    [selectedTiers]
  );
  const visibleGraphs = useMemo(
    () => graphs.filter((graph) => selectedTiers.includes(graph.tier)),
    [selectedTiers]
  );
  const visibleFormulas = useMemo(
    () => formulas.filter((formula) => selectedTiers.includes(formula.tier)),
    [selectedTiers]
  );

  const schedule = mode === "night" ? scheduleNight : scheduleMorning;

  function toggleTier(tier: Tier) {
    setSelectedTiers((current) => {
      if (current.includes(tier)) {
        return current.length === 1 ? current : current.filter((item) => item !== tier);
      }
      return [...current, tier].sort((a, b) => tierOrder.indexOf(a) - tierOrder.indexOf(b));
    });
  }

  function toggleArray(setter: React.Dispatch<React.SetStateAction<string[]>>, id: string) {
    setter((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function jumpTo(domId: string) {
    const element = document.getElementById(domId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const conceptDoneCount = completedConcepts.length;
  const patternDoneCount = completedPatterns.length;

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[28px] border border-border-dark bg-gradient-to-br from-surface via-base-black to-surface-light p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,43,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,212,255,0.12),transparent_32%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-combustion/30 bg-combustion/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-combustion">
              Earth Science Exam-Cram Machine / OMX Isolated Build
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-warm-white sm:text-4xl">
                지구과학 2.5시간 컷 점수 최적화
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary sm:text-base">
                목표는 100점이 아니라 <span className="text-warm-white">내일까지 현실적으로 가장 높은 점수 기대값</span>.
                그래서 S티어 그래프·도표·단면·계산을 먼저 잡고, A는 압축, B는 과감히 버린다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="시험" value={scopeSummary.examDate} sub={scopeSummary.examTime} />
              <Stat label="배점" value={scopeSummary.scoring} sub={scopeSummary.itemCount} />
              <Stat label="범위" value={scopeSummary.range} sub="교과서/유인물 모두 확인" />
              <Stat label="학습 시간" value="오늘 120분 + 아침 30분" sub="총 150분" />
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-black/30 p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">현재 진행</div>
            <div className="mt-4 grid gap-3">
              <MiniMetric label="개념 체크" value={`${conceptDoneCount}/${concepts.length}`} />
              <MiniMetric label="유형 체크" value={`${patternDoneCount}/${patterns.length}`} />
              <MiniMetric label="아침 핀" value={`${pinnedItems.length}개`} />
            </div>
            <div className="mt-5 rounded-2xl border border-combustion/20 bg-combustion/5 p-4 text-sm leading-6 text-text-secondary">
              <span className="font-semibold text-warm-white">핵심 판정:</span> 가장 득점 효율이 높은 축은
              {" "}해수 성질/해양 순환, 중위도 저기압 자료 해석, ENSO, 지층 단면·반감기, 퇴적 구조 판별.
            </div>
          </div>
        </div>
      </section>

      <section id="scope-brief" className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-border-dark bg-surface p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">STEP 0 / 시험 범위 잠금</div>
          <h2 className="mt-2 text-2xl font-semibold text-warm-white">범위·배점·자료 체크</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-text-secondary">
            <p>
              <span className="text-warm-white">시험 시각:</span> {scopeSummary.examDate}, {scopeSummary.examTime}, {scopeSummary.duration}
            </p>
            <p>
              <span className="text-warm-white">정확 범위:</span> {scopeSummary.range}
            </p>
            <p>{scopeSummary.mappedRange}</p>
            <p>
              <span className="text-warm-white">교과서:</span> {scopeSummary.textbook}
            </p>
            <p>
              <span className="text-warm-white">출제 교사:</span> {scopeSummary.teacher}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border-dark bg-surface p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">지구과학 자료 목록 / 누락 점검</div>
          <div className="mt-4 space-y-3">
            {sourceInventory.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border-dark bg-base-black p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border-dark px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lox">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-border-dark px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-warm-white">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-text-secondary">{item.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-border-dark bg-surface-light p-4 text-sm leading-6 text-text-secondary">
            지구과학 관련 개별 필기 사진/손글씨 노트는 발견되지 않았고,
            {" "}교사 제작 <span className="text-warm-white">학습자료 1~40p</span>가 사실상 필기 + 개념 정리 역할을 한다.
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border-dark bg-surface p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">STEP 4 / 모드 토글</div>
              <h2 className="mt-2 text-2xl font-semibold text-warm-white">오늘 밤 vs 내일 아침</h2>
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
          <div className="mt-5">
            <Timeline blocks={schedule} mode={mode} onJump={jumpTo} />
          </div>
        </div>

        <div className="space-y-5">
          <PinnedItems
            items={morningItems}
            onJump={jumpTo}
            onRemove={
              pinnedItems.length > 0
                ? (id) => setPinnedIds((current) => current.filter((item) => item !== id))
                : undefined
            }
          />

          <div className="rounded-3xl border border-border-dark bg-surface p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">파일 분류 로그</div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-text-secondary">
              {classificationRows.map((row) => (
                <li key={row}>• {row}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="tiers-panel" className="rounded-3xl border border-border-dark bg-surface p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">STEP 1 / 우선순위</div>
            <h2 className="mt-2 text-2xl font-semibold text-warm-white">TIER 분류</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-text-secondary">
              근거는 <span className="text-warm-white">교사 학습자료 반복도</span>, <span className="text-warm-white">문제집/해설 반복</span>,
              {" "}그리고 <span className="text-warm-white">그래프·도표·계산 빈도</span>.
            </p>
          </div>
          <TierFilter selected={selectedTiers} onToggle={toggleTier} />
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {tierSummary.map((item) => (
            <article key={item.tier} className="rounded-2xl border border-border-dark bg-base-black p-4">
              <div className={cn("inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]", tierMeta[item.tier].chipClass)}>
                {tierMeta[item.tier].label}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-warm-white">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                {item.evidence.map((evidence) => (
                  <li key={evidence}>• {evidence}</li>
                ))}
              </ul>
              <div className="mt-3 rounded-2xl border border-border-dark bg-surface p-3 text-sm leading-6 text-text-secondary">
                {item.killShot}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">STEP 2 / 개념 카드</div>
            <h2 className="mt-2 text-2xl font-semibold text-warm-white">개념 마스터 카드</h2>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
            표시된 TIER만 보기: {selectedTiers.join(", ")}
          </div>
        </div>
        <div className="grid gap-5">
          {visibleConcepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              done={completedConcepts.includes(concept.id)}
              pinned={pinnedIds.includes(concept.id)}
              onToggleDone={(id) => toggleArray(setCompletedConcepts, id)}
              onTogglePin={(id) => toggleArray(setPinnedIds, id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">STEP 3 / 유형북</div>
          <h2 className="mt-2 text-2xl font-semibold text-warm-white">풀이 알고리즘 패턴북</h2>
        </div>
        <div className="grid gap-5">
          {visiblePatterns.map((pattern) => (
            <PatternDrill
              key={pattern.id}
              pattern={pattern}
              done={completedPatterns.includes(pattern.id)}
              pinned={pinnedIds.includes(pattern.id)}
              onToggleDone={(id) => toggleArray(setCompletedPatterns, id)}
              onTogglePin={(id) => toggleArray(setPinnedIds, id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">그래프 인터랙티브</div>
          <h2 className="mt-2 text-2xl font-semibold text-warm-white">보자마자 읽히게 만드는 시각 훈련</h2>
        </div>
        <div className="grid gap-5">
          {visibleGraphs.map((graph) => (
            <GraphInteractive
              key={graph.id}
              graph={graph}
              pinned={pinnedIds.includes(graph.id)}
              onTogglePin={(id) => toggleArray(setPinnedIds, id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">공식 카드 / 계산 연습</div>
          <h2 className="mt-2 text-2xl font-semibold text-warm-white">단위 실수 방지 구역</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          {visibleFormulas.map((formula) => (
            <FormulaCard
              key={formula.id}
              formula={formula}
              pinned={pinnedIds.includes(formula.id)}
              onTogglePin={(id) => toggleArray(setPinnedIds, id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-border-dark bg-black/30 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{label}</div>
      <div className="mt-2 text-base font-semibold text-warm-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-text-secondary">{sub}</div>
    </div>
  );
}

function MiniMetric({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border-dark bg-base-black px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold text-warm-white">{value}</div>
    </div>
  );
}
