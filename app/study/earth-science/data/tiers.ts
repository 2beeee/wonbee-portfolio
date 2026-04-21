export type Tier = "S" | "A" | "B";

export const tierMeta: Record<Tier, { label: string; color: string; desc: string }> = {
  S: {
    label: "TIER S",
    color: "#FF6B2B",
    desc: "반드시 맞힌다 · 선생님 강조 + 문제집 반복 + 그래프 빈출"
  },
  A: {
    label: "TIER A",
    color: "#00D4FF",
    desc: "여유 있을 때 · 2~3점 배점 · 표 외우면 해결"
  },
  B: {
    label: "TIER B",
    color: "#A0A0A0",
    desc: "버리기 직전 · 1점 · 시간 남을 때만"
  }
};
