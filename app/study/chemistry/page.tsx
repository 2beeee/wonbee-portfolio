import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "화학 번개특훈 · Cram Machine",
  description:
    "2026학년도 2학년 1학기 중간고사 화학 50분 시험 집중 학습 대시보드 (4/23 목 2교시)"
};

type Note = {
  file: string;
  title: string;
  summary: string;
  priority: "S" | "A" | "B" | "C";
  minutes: number;
};

const NOTES: Note[] = [
  {
    file: "00_overview.md",
    title: "00. 개요 · 시험범위 · 시간배분",
    summary: "4/23 목 09:30~10:20 · 교과서 ~93p · 유인물 1~3회 · 85+15점",
    priority: "S",
    minutes: 15
  },
  {
    file: "01_core_concepts.md",
    title: "01. 핵심 개념 정리",
    summary: "몰 · 반응식 · 양적관계 · 전기음성도 · 루이스 · VSEPR · 극성 (15섹션)",
    priority: "S",
    minutes: 60
  },
  {
    file: "02_memorize_deck.md",
    title: "02. 암기 덱 ★",
    summary: "상수 · 원자량 · 이온식 · 전기음성도 · VSEPR 치트표 · 함정 TOP 10",
    priority: "A",
    minutes: 45
  },
  {
    file: "03_pattern_playbook.md",
    title: "03. 유형 플레이북 ★",
    summary: "12개 유형 · 식별신호 · 4-step 해법 · 대표 문제 · 유형 매칭 치트시트",
    priority: "A",
    minutes: 60
  },
  {
    file: "04_trap_checklist.md",
    title: "04. 실수 체크리스트",
    summary: "4대 킬러 실수 · 빈출 함정 10 · 단위 환산 · 서논술 답안 템플릿",
    priority: "B",
    minutes: 20
  },
  {
    file: "05_drill_set.md",
    title: "05. 드릴 세트",
    summary: "유형 12개 × 3단계 난이도 = 36문제 · 접힌 해설 포함",
    priority: "B",
    minutes: 45
  },
  {
    file: "06_final_sprint.md",
    title: "06. 최종 스프린트",
    summary: "4/22 저녁 ~ 4/23 아침 · 분 단위 플랜 · 시험 직전 30초 루틴",
    priority: "S",
    minutes: 20
  }
];

const PRIORITY_STYLE: Record<Note["priority"], string> = {
  S: "text-[#FF6B2B] border-[#FF6B2B]/40 bg-[#FF6B2B]/10",
  A: "text-[#00D4FF] border-[#00D4FF]/40 bg-[#00D4FF]/10",
  B: "text-[#FFB347] border-[#FFB347]/30 bg-[#FFB347]/5",
  C: "text-[#888] border-[#333] bg-[#111]"
};

export default function ChemistryCramPage() {
  return (
    <main className="-mx-4 sm:-mx-6 lg:-mx-8 -my-10 sm:-my-12 min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-8 space-y-3">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#888]">
            <span className="w-8 h-px bg-[#00D4FF]" />
            <span>CHEMISTRY · CRAM LAB · 2026-1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            화학 <span className="text-[#00D4FF]">중간고사</span>
          </h1>

          <p className="text-sm text-[#888] max-w-2xl leading-relaxed">
            4월 23일(목) 2교시 09:30~10:20 · 50분 · 교과서 ~93p · 유인물 1~3회
            <br />
            객관식 85점 + 단답·서논술 15점 = 100점 · 5등급 상대평가
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="rounded-lg border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-2 font-mono text-xs tracking-wider text-[#00D4FF]">
              몰 → 반응식 → 양적관계 → 전기음성도 → VSEPR → 분자극성
            </div>
          </div>
        </header>

        {/* 30초 치트시트 */}
        <section className="mb-8 rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] p-5">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-3">
            <span className="text-[#FFD700]">🎯</span> 시험 직전 30초 루틴
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#aaa] leading-relaxed">
            <li>· 아보가드로수 = <span className="text-[#F5F0E8] font-mono">6.02 × 10²³</span></li>
            <li>· 0℃·1atm 기체 1몰 = <span className="text-[#F5F0E8] font-mono">22.4 L</span></li>
            <li>· 전기음성도: <span className="text-[#F5F0E8]">F &gt; O &gt; Cl &gt; N &gt; C &gt; H</span></li>
            <li>· VSEPR 결합각: <span className="text-[#F5F0E8]">180° / 120° / 109.5° / 107° / 104.5°</span></li>
            <li>· 물 전기분해: (−) H₂ <span className="text-[#F5F0E8]">2</span>부피 : (+) O₂ <span className="text-[#F5F0E8]">1</span>부피</li>
            <li>· 계수비 = 몰비 = 부피비 <span className="text-[#FF6B2B]">≠ 질량비</span></li>
          </ul>
        </section>

        {/* 노트 카드 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {NOTES.map((note) => (
            <div
              key={note.file}
              className="group relative block rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] p-5 sm:p-6 min-h-[140px] transition hover:border-[#00D4FF]/50 hover:bg-[#141414]"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] border ${
                    PRIORITY_STYLE[note.priority]
                  }`}
                >
                  PRIORITY {note.priority}
                </span>
                <span className="text-[10px] text-[#555] tracking-wider">
                  ~{note.minutes}분
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">{note.title}</h3>
              <p className="mt-2 text-xs text-[#888] leading-relaxed">{note.summary}</p>
              <p className="mt-4 font-mono text-[10px] text-[#444]">
                app/study/chemistry/notes/{note.file}
              </p>
              <div className="absolute top-0 left-0 h-full w-0.5 bg-[#00D4FF]/0 group-hover:bg-[#00D4FF] transition" />
            </div>
          ))}
        </div>

        {/* 학습 순서 추천 */}
        <section className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] p-5">
          <h2 className="text-sm font-bold mb-3">📚 권장 학습 순서 (5시간 기준)</h2>
          <ol className="space-y-2 text-xs text-[#aaa] leading-relaxed list-decimal list-inside">
            <li><span className="text-[#F5F0E8] font-bold">00 개요</span> (15분) — 시험범위·배점·시간배분 파악</li>
            <li><span className="text-[#F5F0E8] font-bold">01 핵심 개념</span> (60분) — 약한 섹션 식별하며 훑기</li>
            <li><span className="text-[#F5F0E8] font-bold">02 암기 덱</span> (45분) — 상수·전기음성도·VSEPR 암송</li>
            <li><span className="text-[#F5F0E8] font-bold">03 유형 플레이북</span> (60분) — 12유형 해법 루틴 익히기</li>
            <li><span className="text-[#F5F0E8] font-bold">05 드릴</span> (45분) — 36문제 풀며 약점 유형 확인</li>
            <li><span className="text-[#F5F0E8] font-bold">04 실수 체크</span> (20분) — 4대 킬러 실수 점검</li>
            <li><span className="text-[#F5F0E8] font-bold">06 최종 스프린트</span> (15분) — 당일 아침 루틴 확인</li>
          </ol>
        </section>

        <footer className="mt-12 pt-6 border-t border-[#1A1A1A] text-center">
          <p className="text-[10px] text-[#444] tracking-[0.2em]">
            CRAM LAB · 85~90점 안정권 🧪
          </p>
          <p className="mt-2 text-[10px] text-[#555]">
            <Link href="/study/midterm" className="hover:text-[#F5F0E8] transition">
              ← 중간고사 허브로 돌아가기
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
