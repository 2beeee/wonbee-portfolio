"use client";

import { useMemo, useState } from "react";
import { concepts, conceptsById, type Concept } from "../data/concepts";
import { patterns, patternsById } from "../data/patterns";
import { graphs } from "../data/graphs";
import { formulas } from "../data/formulas";
import { nightSchedule, nightTotalMinutes } from "../data/schedule-night";
import {
  morningSchedule,
  morningTotalMinutes
} from "../data/schedule-morning";
import { tierMeta, type Tier } from "../data/tiers";
import { ModeToggle, type Mode } from "./mode-toggle";
import { TierFilter } from "./tier-filter";
import { Timeline } from "./timeline";
import { ConceptCard } from "./concept-card";
import { PatternDrill } from "./pattern-drill";
import { GraphInteractive } from "./graph-interactive";
import { FormulaCard } from "./formula-card";
import { PinnedItems } from "./pinned-items";

type View = "timeline" | "concepts" | "patterns" | "graphs" | "formulas";

export function Dashboard() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      if (m === "morning") return "morning";
    }
    return "night";
  });
  const [view, setView] = useState<View>("timeline");
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [doneBlocks, setDoneBlocks] = useState<Set<string>>(new Set());
  const [masteredConcepts, setMasteredConcepts] = useState<Set<string>>(
    new Set()
  );
  const [pinnedConcepts, setPinnedConcepts] = useState<Set<string>>(
    new Set()
  );
  const [pinnedPatterns, setPinnedPatterns] = useState<Set<string>>(
    new Set()
  );
  const [activeTiers, setActiveTiers] = useState<Set<Tier>>(
    new Set(["S", "A", "B"] as Tier[])
  );

  const schedule = mode === "night" ? nightSchedule : morningSchedule;
  const totalMins = mode === "night" ? nightTotalMinutes : morningTotalMinutes;

  const filteredConcepts = useMemo(
    () => concepts.filter((c) => activeTiers.has(c.tier)),
    [activeTiers]
  );
  const filteredPatterns = useMemo(
    () => patterns.filter((p) => activeTiers.has(p.tier)),
    [activeTiers]
  );

  const pinnedConceptList = useMemo(
    () =>
      Array.from(pinnedConcepts)
        .map((id) => conceptsById.get(id))
        .filter((c): c is Concept => !!c),
    [pinnedConcepts]
  );
  const pinnedPatternList = useMemo(
    () =>
      Array.from(pinnedPatterns)
        .map((id) => patternsById.get(id))
        .filter((p): p is NonNullable<ReturnType<typeof patternsById.get>> => !!p),
    [pinnedPatterns]
  );

  function toggleSet<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  }

  function jumpToAnchor(id: string) {
    if (id.startsWith("concept-")) setView("concepts");
    else if (id.startsWith("pattern-")) setView("patterns");
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function jumpToBlock(id: string) {
    setActiveBlockId(id);
    const block = schedule.find((b) => b.id === id);
    if (!block) return;

    if (block.conceptIds && block.conceptIds.length > 0) {
      // pre-filter only the tiers represented in this block so details are relevant
      const tiers = new Set(
        block.conceptIds
          .map((cid) => conceptsById.get(cid)?.tier)
          .filter((t): t is Tier => !!t)
      );
      if (tiers.size > 0) setActiveTiers(new Set([...tiers, ...activeTiers]));
    }
  }

  const masteredCount = masteredConcepts.size;
  const masteredSCount = concepts.filter(
    (c) => c.tier === "S" && masteredConcepts.has(c.id)
  ).length;
  const totalS = concepts.filter((c) => c.tier === "S").length;

  const pinTotal = pinnedConcepts.size + pinnedPatterns.size;

  const examTarget = new Date("2026-04-22T09:10:00+09:00");

  return (
    <div className="noise-overlay space-y-6">
      {/* ── HERO ───────────────────────── */}
      <header className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              추진 연구소 · 지구과학 번개특훈
            </p>
            <h1 className="mt-1 font-mono text-2xl tracking-wide text-warm-white">
              Earth Science · Cram Machine
            </h1>
            <p className="mt-2 font-mono text-xs text-text-secondary">
              2026-04-22 수 · 2교시 · 교과서~p.111 / 유인물~p.40 · 객관식 95 +
              서논술형 5
            </p>
          </div>
          <CountdownBadge target={examTarget} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Stat
            label="TIER S 정복"
            value={`${masteredSCount} / ${totalS}`}
            accent="combustion"
          />
          <Stat
            label="총 개념 완료"
            value={`${masteredCount} / ${concepts.length}`}
            accent="lox"
          />
          <Stat
            label="블록 완료"
            value={`${doneBlocks.size} / ${schedule.length}`}
            accent="lox"
          />
          <Stat label="모닝 핀" value={`${pinTotal}`} accent="combustion" />
        </div>
      </header>

      {/* ── MODE + FILTERS ──────────────── */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <ModeToggle
          mode={mode}
          onChange={setMode}
          nightMinutes={nightTotalMinutes}
          morningMinutes={morningTotalMinutes}
        />
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            TIER
          </p>
          <TierFilter
            active={activeTiers}
            onToggle={(t) => setActiveTiers(toggleSet(activeTiers, t))}
          />
        </div>
      </section>

      {/* ── VIEW TABS ───────────────────── */}
      <nav className="flex flex-wrap items-center gap-1 rounded-lg border border-border-dark bg-surface p-1">
        {(
          [
            ["timeline", `타임라인 · ${totalMins}분`],
            ["concepts", `개념 · ${filteredConcepts.length}`],
            ["patterns", `유형 · ${filteredPatterns.length}`],
            ["graphs", `그래프 · ${graphs.length}`],
            ["formulas", `공식 · ${formulas.length}`]
          ] as [View, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              view === v
                ? "border border-combustion/40 bg-combustion/15 text-combustion"
                : "border border-transparent text-text-secondary hover:text-warm-white"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <PinnedItems
        pinnedConcepts={pinnedConceptList}
        pinnedPatterns={pinnedPatternList}
        onJump={jumpToAnchor}
        onUnpinConcept={(id) =>
          setPinnedConcepts((s) => toggleSet(s, id))
        }
        onUnpinPattern={(id) =>
          setPinnedPatterns((s) => toggleSet(s, id))
        }
      />

      {/* ── MAIN VIEW ───────────────────── */}
      {view === "timeline" && (
        <Timeline
          blocks={schedule}
          activeId={activeBlockId}
          doneIds={doneBlocks}
          onJump={jumpToBlock}
          onToggleDone={(id) =>
            setDoneBlocks((s) => toggleSet(s, id))
          }
        />
      )}

      {view === "concepts" && (
        <div className="grid gap-3 md:grid-cols-2">
          {filteredConcepts.map((c) => (
            <ConceptCard
              key={c.id}
              concept={c}
              pinned={pinnedConcepts.has(c.id)}
              mastered={masteredConcepts.has(c.id)}
              onPin={() =>
                setPinnedConcepts((s) => toggleSet(s, c.id))
              }
              onMaster={() =>
                setMasteredConcepts((s) => toggleSet(s, c.id))
              }
            />
          ))}
          {filteredConcepts.length === 0 && <EmptyState />}
        </div>
      )}

      {view === "patterns" && (
        <div className="grid gap-3 md:grid-cols-2">
          {filteredPatterns.map((p) => (
            <PatternDrill
              key={p.id}
              pattern={p}
              pinned={pinnedPatterns.has(p.id)}
              onPin={() =>
                setPinnedPatterns((s) => toggleSet(s, p.id))
              }
            />
          ))}
          {filteredPatterns.length === 0 && <EmptyState />}
        </div>
      )}

      {view === "graphs" && (
        <div className="grid gap-4">
          {graphs.map((g) => (
            <GraphInteractive key={g.id} graph={g} />
          ))}
        </div>
      )}

      {view === "formulas" && (
        <div className="grid gap-3 md:grid-cols-3">
          {formulas.map((f) => (
            <FormulaCard key={f.id} formula={f} />
          ))}
        </div>
      )}

      <footer className="rounded-lg border border-border-dark bg-surface p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          FOOTER · 시험장 직전 체크
        </p>
        <ul className="mt-2 grid gap-1 font-mono text-xs text-warm-white/90 sm:grid-cols-2">
          <li>✓ 난류 vs 한류 표 (한류 염분 낮음)</li>
          <li>✓ 한랭/온난 전선 모두 풍향 시계방향</li>
          <li>✓ 에크만 북 오른쪽 90° / 남 왼쪽 90°</li>
          <li>✓ 엘니뇨 = 동태평양 뜨거워짐 → 나머지 유도</li>
          <li>✓ 밀란코비치 41k · 26k · 100k</li>
          <li>✓ 반감기 1:1 · 1:3 · 1:7 → 1·2·3반감기</li>
          <li>✓ 방추충=고생대 페름기</li>
          <li>✓ 해양·빙하 δ¹⁸O 부호 반대</li>
        </ul>
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent: "combustion" | "lox";
}) {
  const color = accent === "combustion" ? "#FF6B2B" : "#00D4FF";
  return (
    <div className="rounded-md border border-border-dark bg-base-black/40 p-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p
        className="hud-value mt-1 font-mono text-lg"
        style={{ color }}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full rounded-md border border-dashed border-border-dark p-6 text-center">
      <p className="font-mono text-xs text-text-secondary">
        선택된 TIER에 해당하는 항목이 없습니다. 위 필터를 조정해보세요.
      </p>
    </div>
  );
}

function CountdownBadge({ target }: { target: Date }) {
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  const label =
    diffMs <= 0
      ? "시험 시작"
      : h > 24
      ? `D-${Math.ceil(h / 24)}`
      : `T-${h}h ${m}m`;

  return (
    <div className="text-right">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
        IGNITION · 시험까지
      </p>
      <p className="hud-value font-mono text-2xl text-combustion">{label}</p>
      <p className="font-mono text-[10px] text-text-secondary">
        2026-04-22 09:10 (2교시)
      </p>
    </div>
  );
}
