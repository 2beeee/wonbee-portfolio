export type Tier = "S" | "A" | "B";

export const tierMeta: Record<
  Tier,
  { label: string; color: string; description: string }
> = {
  S: {
    label: "Tier S",
    color: "#FF6B2B",
    description: "필기·유인물·학평에서 반복된 반드시 잡을 축"
  },
  A: {
    label: "Tier A",
    color: "#00D4FF",
    description: "교과서 메인 작품. 핵심만 압축"
  },
  B: {
    label: "Tier B",
    color: "#A0A0A0",
    description: "비교·보조 작품. 한 줄만 챙기고 버릴 수 있음"
  }
};

export const tierTimePlan = {
  S: "밤 기준 체감 70% 이상. 3작품 + 핵심 상징/구조 완전 암기",
  A: "밤 기준 체감 25% 전후. 정의·상징·갈래 키워드만",
  B: "밤 기준 체감 5% 이하. 1줄 요약만 보고 넘어가기"
} as const;
