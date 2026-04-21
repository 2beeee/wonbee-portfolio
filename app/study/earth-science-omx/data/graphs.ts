import type { Tier } from "./tiers";

export type GraphSpec = {
  id: string;
  title: string;
  tier: Tier;
  unit: string;
  summary: string;
};

export const graphs: GraphSpec[] = [
  {
    id: "thermocline-density",
    title: "연직 수온·밀도 프로파일",
    tier: "S",
    unit: "해수 성질",
    summary: "혼합층-수온 약층-심해층과 밀도 증가를 동시에 외우는 그래프."
  },
  {
    id: "ts-diagram",
    title: "수온 염분도(T-S도)",
    tier: "S",
    unit: "해수 성질 / 수괴",
    summary: "점 위치와 등밀도선으로 상대 밀도를 판정하는 핵심 그래프."
  },
  {
    id: "typhoon-profile",
    title: "태풍 중심 거리-기압·풍속",
    tier: "S",
    unit: "태풍",
    summary: "기압 최저와 풍속 최대 위치가 다름을 시각적으로 기억."
  },
  {
    id: "enso-panels",
    title: "평상시·엘니뇨·라니냐 단면",
    tier: "S",
    unit: "ENSO",
    summary: "무역풍, 용승, warm pool, 워커 순환 위치를 세 장으로 비교."
  }
];
