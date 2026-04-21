export type Tier = "S" | "A" | "B";

export const TIER_INFO: Record<Tier, { label: string; desc: string; color: string; weight: string }> = {
  S: {
    label: "TIER S",
    desc: "필독 — 풀카드 완전 암기",
    color: "#FF6B2B",
    weight: "60%",
  },
  A: {
    label: "TIER A",
    desc: "압축 카드 — 핵심만",
    color: "#00D4FF",
    weight: "30%",
  },
  B: {
    label: "TIER B",
    desc: "한줄 요약 — 시간 남으면",
    color: "#888888",
    weight: "10%",
  },
};
