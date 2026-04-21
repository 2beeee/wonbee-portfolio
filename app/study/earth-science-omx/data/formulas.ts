import type { Tier } from "./tiers";

export type FormulaData = {
  id: string;
  title: string;
  tier: Tier;
  expression: string;
  unit: string;
  whenToUse: string;
  example: string;
  note: string;
  drillKind?: "salinity" | "half-life";
};

export const formulas: FormulaData[] = [
  {
    id: "salinity",
    title: "염분 단위 변환",
    tier: "S",
    expression: "염류 질량(g) = 염분(psu) × 해수 질량(kg)",
    unit: "g",
    whenToUse: "30 psu, 35 psu 같은 수치가 나오면 바로 적용",
    example: "2 kg 해수, 염분 35 psu → 70 g",
    note: "psu는 거의 g/kg처럼 읽어도 된다",
    drillKind: "salinity"
  },
  {
    id: "density-rule",
    title: "해수 밀도 판단식",
    tier: "S",
    expression: "수온↓ / 염분↑ / 수압↑ → 밀도↑",
    unit: "g/cm³(정성 판단)",
    whenToUse: "T-S도, 연직 분포, 계절 비교 문제",
    example: "같은 수온이면 염분 높은 해수가 더 무겁다",
    note: "시험에서는 정확한 수치보다 방향 판정이 핵심"
  },
  {
    id: "half-life",
    title: "반감기 계산",
    tier: "S",
    expression: "남은 양 = 처음 양 × (1/2)^n / 경과 시간 = 반감기 × n",
    unit: "g, 년",
    whenToUse: "모원소/생성물 비율과 반감기가 제시될 때",
    example: "1/8 남음 → 3번 반감기",
    note: "1/2, 1/4, 1/8, 1/16을 반감기 횟수와 바로 연결",
    drillKind: "half-life"
  },
  {
    id: "radiative-balance",
    title: "복사 평형",
    tier: "A",
    expression: "흡수되는 복사 에너지 = 방출되는 복사 에너지",
    unit: "정성 관계",
    whenToUse: "지구 열수지, 온실 효과, 반사율 문제",
    example: "하향 복사 증가 → 더 높은 지표 온도에서 새 평형",
    note: "공식보다 화살표 흐름을 읽는 문제가 많다"
  }
];
