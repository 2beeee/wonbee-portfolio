"use client";

export type Mode = "night" | "morning";

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] p-1">
      <button
        onClick={() => onChange("night")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
          mode === "night"
            ? "bg-[#FF6B2B] text-[#0A0A0A]"
            : "text-[#888] hover:text-[#F5F0E8]"
        }`}
      >
        🌙 NIGHT · 2시간
      </button>
      <button
        onClick={() => onChange("morning")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
          mode === "morning"
            ? "bg-[#00D4FF] text-[#0A0A0A]"
            : "text-[#888] hover:text-[#F5F0E8]"
        }`}
      >
        🌅 MORNING · 30분
      </button>
    </div>
  );
}
