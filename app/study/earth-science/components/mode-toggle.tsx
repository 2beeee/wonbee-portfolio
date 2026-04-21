"use client";

export type Mode = "night" | "morning";

export function ModeToggle({
  mode,
  onChange,
  nightMinutes,
  morningMinutes
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  nightMinutes: number;
  morningMinutes: number;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border-dark bg-surface p-1">
      <button
        type="button"
        onClick={() => onChange("night")}
        className={`group rounded-md px-3 py-2 text-left transition ${
          mode === "night"
            ? "border border-combustion/40 bg-combustion/15"
            : "border border-transparent hover:bg-surface-light"
        }`}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
          PHASE · 01
        </p>
        <p
          className={`font-mono text-sm ${
            mode === "night" ? "text-combustion" : "text-warm-white"
          }`}
        >
          밤샘 · {nightMinutes}분
        </p>
      </button>
      <button
        type="button"
        onClick={() => onChange("morning")}
        className={`group rounded-md px-3 py-2 text-left transition ${
          mode === "morning"
            ? "border border-lox/40 bg-lox/15"
            : "border border-transparent hover:bg-surface-light"
        }`}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
          PHASE · 02
        </p>
        <p
          className={`font-mono text-sm ${
            mode === "morning" ? "text-lox" : "text-warm-white"
          }`}
        >
          아침 · {morningMinutes}분
        </p>
      </button>
    </div>
  );
}
