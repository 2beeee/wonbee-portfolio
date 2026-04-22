"use client";

import "katex/dist/katex.min.css";
import "katex/contrib/mhchem";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Priority = "S" | "A" | "B" | "C";

type Note = {
  slug: string;
  file: string;
  label: string;
  icon: string;
  title: string;
  summary: string;
  priority: Priority;
  minutes: number;
  content: string;
};

const EXAM_TARGET = new Date("2026-04-23T09:30:00+09:00");

const PRIORITY_STYLE: Record<Priority, string> = {
  S: "text-[#FF6B2B] border-[#FF6B2B]/40 bg-[#FF6B2B]/10",
  A: "text-[#00D4FF] border-[#00D4FF]/40 bg-[#00D4FF]/10",
  B: "text-[#FFB347] border-[#FFB347]/30 bg-[#FFB347]/5",
  C: "text-[#888] border-[#333] bg-[#111]"
};

export function ChemistryHub({
  notes,
  initialSlug
}: {
  notes: Note[];
  initialSlug: string;
}) {
  const [active, setActive] = useState<string>(initialSlug);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", active);
    window.history.replaceState({}, "", url.toString());
  }, [active]);

  const current = notes.find((n) => n.slug === active) ?? notes[0];

  const countdownLabel = useMemo(() => {
    if (!now) return "··· 계산 중";
    const ms = EXAM_TARGET.getTime() - now.getTime();
    if (ms <= 0) return "시험 시작";
    const totalMin = Math.floor(ms / 60000);
    const days = Math.floor(totalMin / (60 * 24));
    const hours = Math.floor((totalMin % (60 * 24)) / 60);
    const mins = totalMin % 60;
    if (days > 0) return `D-${days} · ${hours}시간 ${mins}분`;
    return `T-${hours}h ${mins}m`;
  }, [now]);

  const selectNote = (slug: string) => {
    setActive(slug);
    if (typeof window !== "undefined") {
      const el = document.getElementById("chemistry-note-article");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              CRAM LAB · 화학 번개특훈
            </p>
            <h1 className="mt-1 font-mono text-2xl tracking-wide text-warm-white">
              Chemistry · Cram Machine
            </h1>
            <p className="mt-2 font-mono text-xs text-text-secondary">
              2026-04-23 목 · 2교시 09:30~10:20 · 교과서 ~93p · 유인물 1~3회 · 객관식 85 + 단답/서논술 15
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              IGNITION · 시험까지
            </p>
            <p className="font-mono text-2xl text-lox">{countdownLabel}</p>
            <p className="font-mono text-[10px] text-text-secondary">
              2026-04-23 09:30 (2교시)
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <h2 className="text-sm font-bold flex items-center gap-2 mb-3 text-warm-white">
          <span className="text-[#FFD700]">🎯</span> 시험 직전 30초 루틴
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary leading-relaxed">
          <li>
            · 아보가드로수 ={" "}
            <span className="text-warm-white font-mono">6.02 × 10²³</span>
          </li>
          <li>
            · 0℃·1atm 기체 1몰 ={" "}
            <span className="text-warm-white font-mono">22.4 L</span>
          </li>
          <li>
            · 전기음성도:{" "}
            <span className="text-warm-white">F &gt; O &gt; Cl &gt; N &gt; C &gt; H</span>
          </li>
          <li>
            · VSEPR 결합각:{" "}
            <span className="text-warm-white">180° / 120° / 109.5° / 107° / 104.5°</span>
          </li>
          <li>
            · 물 전기분해: (−) H₂ <span className="text-warm-white">2</span>부피 : (+) O₂{" "}
            <span className="text-warm-white">1</span>부피
          </li>
          <li>
            · 계수비 = 몰비 = 부피비 <span className="text-combustion">≠ 질량비</span>
          </li>
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {notes.map((note) => {
          const isActive = active === note.slug;
          return (
            <button
              key={note.slug}
              type="button"
              onClick={() => selectNote(note.slug)}
              className={`group relative text-left block rounded-xl border p-5 sm:p-6 min-h-[140px] transition ${
                isActive
                  ? "border-lox/60 bg-lox/5"
                  : "border-border-dark bg-surface hover:border-lox/50 hover:bg-[#141414]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] border ${
                    PRIORITY_STYLE[note.priority]
                  }`}
                >
                  PRIORITY {note.priority}
                </span>
                <span className="font-mono text-[10px] text-text-muted tracking-wider">
                  ~{note.minutes}분
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-warm-white">
                <span className="mr-2 text-lox/70">{note.icon}</span>
                {note.title}
              </h3>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                {note.summary}
              </p>
              <p className="mt-4 font-mono text-[10px] text-lox/80">
                {isActive ? "→ 아래 열람 중" : "→ 열람"}
              </p>
              <div
                className={`absolute top-0 left-0 h-full w-0.5 bg-lox transition ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>

      <nav className="sticky top-2 z-10 flex flex-wrap items-center gap-1 rounded-lg border border-border-dark bg-surface/95 p-1 backdrop-blur">
        {notes.map((n) => (
          <button
            key={n.slug}
            type="button"
            onClick={() => selectNote(n.slug)}
            className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              active === n.slug
                ? "border border-lox/40 bg-lox/15 text-lox"
                : "border border-transparent text-text-secondary hover:text-warm-white"
            }`}
          >
            <span className="mr-1 text-warm-white/70">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <article
        id="chemistry-note-article"
        className="rounded-xl border border-border-dark bg-surface p-5 sm:p-8 scroll-mt-4"
      >
        <MarkdownBody content={current?.content ?? ""} />
      </article>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <h2 className="text-sm font-bold mb-3 text-warm-white">
          📚 권장 학습 순서 (5시간 기준)
        </h2>
        <ol className="space-y-2 text-xs text-text-secondary leading-relaxed list-decimal list-inside">
          <li>
            <span className="text-warm-white font-bold">00 개요</span> (15분) — 시험범위·배점·시간배분 파악
          </li>
          <li>
            <span className="text-warm-white font-bold">01 핵심 개념</span> (60분) — 약한 섹션 식별하며 훑기
          </li>
          <li>
            <span className="text-warm-white font-bold">02 암기 덱</span> (45분) — 상수·전기음성도·VSEPR 암송
          </li>
          <li>
            <span className="text-warm-white font-bold">03 유형 플레이북</span> (60분) — 12유형 해법 루틴 익히기
          </li>
          <li>
            <span className="text-warm-white font-bold">05 드릴</span> (45분) — 36문제 풀며 약점 유형 확인
          </li>
          <li>
            <span className="text-warm-white font-bold">04 실수 체크</span> (20분) — 4대 킬러 실수 점검
          </li>
          <li>
            <span className="text-warm-white font-bold">06 최종 스프린트</span> (15분) — 당일 아침 루틴 확인
          </li>
        </ol>
      </section>

      <footer className="rounded-lg border border-border-dark bg-surface p-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          CRAM LAB · 85~90점 안정권 🧪
        </p>
        <p className="mt-2 text-[10px] text-text-muted">
          <Link href="/study/midterm" className="hover:text-warm-white transition">
            ← 중간고사 허브로 돌아가기
          </Link>
        </p>
      </footer>
    </div>
  );
}

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="chemistry-md font-sans text-warm-white/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: (props) => (
            <h1
              {...props}
              className="mt-2 font-mono text-xl tracking-wide text-warm-white"
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="mt-8 border-b border-border-dark pb-2 font-mono text-lg tracking-wide text-lox"
            />
          ),
          h3: (props) => (
            <h3 {...props} className="mt-6 font-mono text-base text-combustion" />
          ),
          p: (props) => <p {...props} className="my-3 leading-relaxed" />,
          ul: (props) => (
            <ul {...props} className="my-3 list-disc pl-6 leading-relaxed" />
          ),
          ol: (props) => (
            <ol {...props} className="my-3 list-decimal pl-6 leading-relaxed" />
          ),
          li: (props) => <li {...props} className="my-1" />,
          code: ({ children, ...rest }) => (
            <code
              {...rest}
              className="rounded bg-base-black/70 px-1.5 py-0.5 font-mono text-[0.9em] text-lox"
            >
              {children}
            </code>
          ),
          pre: (props) => (
            <pre
              {...props}
              className="my-4 overflow-auto rounded-lg border border-border-dark bg-base-black/70 p-3 font-mono text-xs text-warm-white/80"
            />
          ),
          blockquote: (props) => (
            <blockquote
              {...props}
              className="my-4 border-l-2 border-lox/60 bg-lox/5 px-4 py-2 text-warm-white/80"
            />
          ),
          table: (props) => (
            <div className="my-4 overflow-x-auto rounded-md border border-border-dark">
              <table {...props} className="w-full border-collapse font-mono text-xs" />
            </div>
          ),
          thead: (props) => <thead {...props} className="bg-base-black/50 text-lox" />,
          th: (props) => (
            <th
              {...props}
              className="border-b border-border-dark px-3 py-2 text-left"
            />
          ),
          td: (props) => (
            <td
              {...props}
              className="border-b border-border-dark px-3 py-2 align-top text-warm-white/85"
            />
          ),
          a: (props) => (
            <a
              {...props}
              className="text-combustion underline decoration-dotted underline-offset-2 hover:text-lox"
            />
          ),
          hr: (props) => (
            <hr {...props} className="my-8 border-0 border-t border-border-dark" />
          ),
          strong: (props) => (
            <strong {...props} className="font-bold text-warm-white" />
          ),
          em: (props) => <em {...props} className="italic text-combustion" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
