"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Mode = "night" | "morning";

type Card = {
  href: string;
  subject: "문학" | "지구과학" | "대수" | "화학";
  builder: "OMC" | "OMX" | "OPUS" | "CRAM";
  tag: string;
  accent: string;
  summary: string;
};

const CARDS: Card[] = [
  {
    href: "/study/literature",
    subject: "문학",
    builder: "OMC",
    tag: "LIT · OMC",
    accent: "#FF6B2B",
    summary: "작품 카드 · 유형북 · 플래시카드"
  },
  {
    href: "/study/literature-omx",
    subject: "문학",
    builder: "OMX",
    tag: "LIT · OMX",
    accent: "#FFB347",
    summary: "타임라인 · 작품 40+ · 유형 패턴"
  },
  {
    href: "/study/earth-science",
    subject: "지구과학",
    builder: "OMC",
    tag: "EARTH · OMC",
    accent: "#00D4FF",
    summary: "개념 · 그래프 · 공식 · 유형"
  },
  {
    href: "/study/earth-science-omx",
    subject: "지구과학",
    builder: "OMX",
    tag: "EARTH · OMX",
    accent: "#7DE3FF",
    summary: "타임라인 · S/A 우선 · 그래프 인터랙션"
  },
  {
    href: "/study/algebra",
    subject: "대수",
    builder: "OPUS",
    tag: "ALGEBRA · OPUS",
    accent: "#FF6B2B",
    summary: "개념 · 15유형 플레이북 · 드릴 20題 · 5h 스프린트"
  },
  {
    href: "/study/chemistry",
    subject: "화학",
    builder: "CRAM",
    tag: "CHEM · CRAM",
    accent: "#00D4FF",
    summary: "4/23(목) 2교시 · 몰 · VSEPR · 분자극성 · 12유형 · 36문제"
  }
];

// 시험 시간(한국 시간): 2026-04-22 (수)
// 1교시 문학 08:20, 2교시 지구과학 09:30.
// 가장 먼저 시작하는 시험 시각을 D-0 기준점으로 삼는다.
const EXAM_START_KST = new Date("2026-04-22T08:20:00+09:00");

function formatCountdown(msLeft: number): string {
  if (msLeft <= 0) return "시험 시작";
  const totalMin = Math.floor(msLeft / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `D-${days} · ${hours}시간 ${mins}분`;
  return `${hours}시간 ${mins}분`;
}

export function MidtermHub() {
  const [mode, setMode] = useState<Mode>("night");
  const [memo, setMemo] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const msLeft = useMemo(() => {
    if (!now) return null;
    return EXAM_START_KST.getTime() - now.getTime();
  }, [now]);

  const autoMode: Mode | null = useMemo(() => {
    if (!now) return null;
    const h = now.getHours();
    if (h >= 5 && h < 12) return "morning";
    return "night";
  }, [now]);

  useEffect(() => {
    if (autoMode) setMode(autoMode);
  }, [autoMode]);

  return (
    <section className="-mx-4 sm:-mx-6 lg:-mx-8 -my-10 sm:-my-12 min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-8 space-y-3">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#888]">
            <span className="w-8 h-px bg-[#FF6B2B]" />
            <span>MIDTERM · CRAM LAB · 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            26 중간고사 <span className="text-[#FF6B2B]">학습 허브</span>
          </h1>

          <p className="text-sm text-[#888] max-w-2xl leading-relaxed">
            4/22(수) 1교시 문학 · 2교시 지구과학 · 4/23(목) 2교시 화학(09:30~10:20).
            <br />
            OMC/OMX/OPUS/CRAM 빌더가 만든 5개의 학습 머신.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="rounded-lg border border-[#FF6B2B]/40 bg-[#FF6B2B]/10 px-3 py-2 font-mono text-xs tracking-wider text-[#FF6B2B]">
              {msLeft == null ? "··· 계산 중" : formatCountdown(msLeft)}
            </div>

            <div className="inline-flex rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] p-1">
              <button
                type="button"
                onClick={() => setMode("night")}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-md transition ${
                  mode === "night"
                    ? "bg-[#FF6B2B] text-[#0A0A0A]"
                    : "text-[#888] hover:text-[#F5F0E8]"
                }`}
              >
                밤 학습
              </button>
              <button
                type="button"
                onClick={() => setMode("morning")}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-md transition ${
                  mode === "morning"
                    ? "bg-[#FF6B2B] text-[#0A0A0A]"
                    : "text-[#888] hover:text-[#F5F0E8]"
                }`}
              >
                아침 압축
              </button>
            </div>
            {autoMode && (
              <span className="text-[11px] text-[#555]">
                현재 시간 기준 추천:{" "}
                <span className="text-[#888]">{autoMode === "morning" ? "아침" : "밤"}</span>
              </span>
            )}
          </div>
        </header>

        {/* 4 카드 — 모바일은 1열, sm부터 2열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={`${card.href}?mode=${mode}`}
              className="group relative block rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] p-5 sm:p-6 min-h-[160px] transition hover:border-[#FF6B2B]/50 hover:bg-[#141414] active:bg-[#181818]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[10px] tracking-[0.25em]"
                  style={{ color: card.accent }}
                >
                  {card.tag}
                </span>
                <span className="text-[10px] text-[#444] tracking-wider">
                  {mode === "morning" ? "→ 아침 모드로" : "→ 밤 모드로"}
                </span>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">
                {card.subject}
              </h2>
              <p className="mt-1 text-xs text-[#888]">빌더: {card.builder}</p>
              <p className="mt-3 text-sm text-[#aaa] leading-relaxed">{card.summary}</p>
              <div
                className="mt-4 h-0.5 w-full origin-left scale-x-0 transition group-hover:scale-x-100"
                style={{ background: card.accent }}
              />
            </Link>
          ))}
        </div>

        {/* 오늘 약점 메모 */}
        <div className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] p-4">
          <label className="block text-[10px] tracking-[0.3em] text-[#666] mb-2">
            오늘 약점 한 줄 메모
          </label>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="예: 누항사 화자 태도 / 퇴적구조 6종 구분"
            className="w-full bg-transparent text-base text-[#F5F0E8] placeholder:text-[#444] outline-none"
          />
          <p className="mt-2 text-[10px] text-[#555]">
            새로고침하면 사라집니다. 지금 머리에 남기기 위한 메모.
          </p>
        </div>

        {/* 시험 직전 체크리스트 */}
        <div className="mt-6 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] p-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <span className="text-[#FFD700]">🎯</span> 시험 직전 30초
          </h3>
          <ul className="mt-2 space-y-1 text-xs text-[#aaa] leading-relaxed">
            <li>· 객관식만 제대로. 찍지 말고 소거.</li>
            <li>· 〈보기〉 벗어난 해석 금지.</li>
            <li>· 함정 단어: 단정/오로지/항상.</li>
            <li>· 지구과학은 그래프 축 + 단위 먼저.</li>
            <li>· 화학은 계수비 ≠ 질량비 · Cl(3.2) &gt; N(3.0) · CO₂는 무극성.</li>
          </ul>
        </div>

        <footer className="mt-12 pt-6 border-t border-[#1A1A1A] text-center">
          <p className="text-[10px] text-[#444] tracking-[0.2em]">
            CRAM LAB · 너는 준비됐어 🚀
          </p>
        </footer>
      </div>
    </section>
  );
}
