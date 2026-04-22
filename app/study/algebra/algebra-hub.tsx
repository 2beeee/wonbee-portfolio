"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Note = {
  slug: string;
  file: string;
  label: string;
  icon: string;
  content: string;
};

const EXAM_TARGET = new Date("2026-04-23T08:20:00+09:00");

export function AlgebraHub({ notes }: { notes: Note[] }) {
  const initial = useMemo(() => {
    if (typeof window === "undefined") return notes[0]?.slug ?? "overview";
    const h = new URLSearchParams(window.location.search).get("tab");
    if (h && notes.some((n) => n.slug === h)) return h;
    return notes[0]?.slug ?? "overview";
  }, [notes]);

  const [active, setActive] = useState<string>(initial);
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

  return (
    <div className="noise-overlay space-y-6">
      <header className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              추진 연구소 · 대수 번개특훈
            </p>
            <h1 className="mt-1 font-mono text-2xl tracking-wide text-warm-white">
              Algebra · Cram Machine
            </h1>
            <p className="mt-2 font-mono text-xs text-text-secondary">
              2026-04-23 목 · 1교시 · 미래엔 황선욱 처음~p.97 · 객관식 75 + 단답/서논술 25
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              IGNITION · 시험까지
            </p>
            <p className="hud-value font-mono text-2xl text-combustion">
              {countdownLabel}
            </p>
            <p className="font-mono text-[10px] text-text-secondary">
              2026-04-23 08:20 (1교시)
            </p>
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap items-center gap-1 rounded-lg border border-border-dark bg-surface p-1">
        {notes.map((n) => (
          <button
            key={n.slug}
            type="button"
            onClick={() => setActive(n.slug)}
            className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              active === n.slug
                ? "border border-combustion/40 bg-combustion/15 text-combustion"
                : "border border-transparent text-text-secondary hover:text-warm-white"
            }`}
          >
            <span className="mr-1 text-warm-white/70">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <article className="rounded-xl border border-border-dark bg-surface p-5 sm:p-8">
        <MarkdownBody content={current?.content ?? ""} />
      </article>

      <footer className="rounded-lg border border-border-dark bg-surface p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          FOOTER · 시험장 직전 체크
        </p>
        <ul className="mt-2 grid gap-1 font-mono text-xs text-warm-white/90 sm:grid-cols-2">
          <li>✓ 밑 조건 a &gt; 0, a ≠ 1 · 진수 N &gt; 0</li>
          <li>✓ 0 &lt; a &lt; 1 부등호 뒤집기</li>
          <li>✓ 사분면 ASTC 부호</li>
          <li>✓ 주기 2π/|b|, tan은 π/|b|</li>
          <li>✓ √(a²) = |a|</li>
          <li>✓ 치환 aˣ = t → t &gt; 0</li>
          <li>✓ 로그방정식 정의역 검산</li>
          <li>✓ 서논술 백지 금지</li>
        </ul>
      </footer>
    </div>
  );
}

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="algebra-md font-sans text-warm-white/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
              className="mt-8 border-b border-border-dark pb-2 font-mono text-lg tracking-wide text-combustion"
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="mt-6 font-mono text-base text-lox"
            />
          ),
          p: (props) => (
            <p {...props} className="my-3 leading-relaxed" />
          ),
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
              className="rounded bg-base-black/70 px-1.5 py-0.5 font-mono text-[0.9em] text-combustion"
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
              className="my-4 border-l-2 border-combustion/60 bg-combustion/5 px-4 py-2 text-warm-white/80"
            />
          ),
          table: (props) => (
            <div className="my-4 overflow-x-auto rounded-md border border-border-dark">
              <table
                {...props}
                className="w-full border-collapse font-mono text-xs"
              />
            </div>
          ),
          thead: (props) => (
            <thead {...props} className="bg-base-black/50 text-combustion" />
          ),
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
              className="text-lox underline decoration-dotted underline-offset-2 hover:text-combustion"
            />
          ),
          hr: (props) => (
            <hr
              {...props}
              className="my-8 border-0 border-t border-border-dark"
            />
          ),
          strong: (props) => (
            <strong {...props} className="font-bold text-warm-white" />
          ),
          em: (props) => <em {...props} className="italic text-lox" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
