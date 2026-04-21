import type { Tier } from "./tiers";

export type Formula = {
  id: string;
  tier: Tier;
  front: string;
  back: string;
  unit: string;
};

export const formulas: Formula[] = [
  {
    id: "F1",
    tier: "S",
    unit: "Ⅰ.1",
    front: "해수 밀도 결정 3요소 순서",
    back: "수온 > 염분 > 수압 (수압은 거의 일정)"
  },
  {
    id: "F2",
    tier: "S",
    unit: "Ⅰ.1",
    front: "염분 결정 식",
    back: "염분 ↑ ∝ (증발량 E – 강수량 P)"
  },
  {
    id: "F3",
    tier: "S",
    unit: "Ⅰ.4",
    front: "태풍 기준 풍속",
    back: "최대풍속 17 m/s 이상 & 수온 26.5°C 이상"
  },
  {
    id: "F4",
    tier: "S",
    unit: "Ⅰ.6",
    front: "에크만 수송 방향",
    back: "북반구: 바람 오른쪽 90° / 남반구: 왼쪽 90°"
  },
  {
    id: "F5",
    tier: "S",
    unit: "Ⅰ.7",
    front: "밀란코비치 세 요소와 주기",
    back: "자전축 기울기 41,000년 · 세차운동 26,000년 · 이심률 100,000년"
  },
  {
    id: "F6",
    tier: "S",
    unit: "Ⅰ.7",
    front: "자전축 기울기 변화 범위",
    back: "22.1° ~ 24.5°"
  },
  {
    id: "F7",
    tier: "S",
    unit: "Ⅱ.1",
    front: "방사성동위원소 감소식",
    back: "N = N₀ × (1/2)^n,  n = 경과시간 / 반감기"
  },
  {
    id: "F8",
    tier: "S",
    unit: "Ⅱ.1",
    front: "모원소 : 자원소 → 반감기 수",
    back: "1:1 → 1반감기 / 1:3 → 2 / 1:7 → 3 / 1:15 → 4"
  },
  {
    id: "F9",
    tier: "S",
    unit: "Ⅰ.3",
    front: "저기압 통과 풍향 변화 규칙 (북반구)",
    back: "중심 북쪽 통과 → 시계방향 / 남쪽 통과 → 반시계방향"
  },
  {
    id: "F10",
    tier: "S",
    unit: "Ⅰ.4",
    front: "태풍 반원 방향",
    back: "진행방향 오른쪽=위험반원(풍속 합·시계) / 왼쪽=가항반원(풍속 차·반시계)"
  },
  {
    id: "F11",
    tier: "S",
    unit: "Ⅱ.2",
    front: "산소동위원소 해석 부호",
    back: "해양 δ¹⁸O ↑ = 빙기 / 빙하 δ¹⁸O ↑ = 간빙기"
  },
  {
    id: "F12",
    tier: "A",
    unit: "Ⅰ.1",
    front: "표층수 용존기체 경향",
    back: "저온일수록 용해도↑ → 고위도 > 저위도"
  },
  {
    id: "F13",
    tier: "A",
    unit: "Ⅱ.2",
    front: "대멸종 횟수",
    back: "총 5회 (최대=고생대 페름기말, 공룡=백악기말)"
  }
];
