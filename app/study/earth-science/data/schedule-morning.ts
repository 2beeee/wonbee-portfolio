import type { Block } from "./schedule-night";

export const morningSchedule: Block[] = [
  {
    id: "M01",
    label: "공식·숫자 속성 복창",
    minutes: 6,
    start: "00:00",
    unit: "REVIEW",
    tier: "S",
    items: [
      "밀란코비치 주기 3개 (41k·26k·100k)",
      "반감기 비율 표 1:1·1:3·1:7",
      "태풍 기준 (26.5°C, 17m/s)",
      "에크만 90° 법칙"
    ],
    formulaIds: ["F1", "F3", "F4", "F5", "F7", "F8", "F10"]
  },
  {
    id: "M02",
    label: "비교표 3장 재확인",
    minutes: 8,
    start: "00:06",
    unit: "REVIEW",
    tier: "S",
    items: [
      "한랭 vs 온난 전선 표",
      "난류 vs 한류 표",
      "엘니뇨 vs 라니냐 표"
    ],
    conceptIds: ["S5", "S9", "S16"],
    patternIds: ["P04", "P09"]
  },
  {
    id: "M03",
    label: "그래프 하이라이트 — 단면도 시각 복습",
    minutes: 6,
    start: "00:14",
    unit: "REVIEW",
    tier: "S",
    items: [
      "연직 수온 3층 그래프",
      "T-S도 등밀도선",
      "태풍 위험반원/가항반원",
      "엘니뇨 태평양 단면"
    ],
    graphIds: ["G1", "G2", "G4", "G5"]
  },
  {
    id: "M04",
    label: "함정 패턴 5개 소리내어 읽기",
    minutes: 5,
    start: "00:20",
    unit: "REVIEW",
    tier: "S",
    items: [
      "온난전선도 풍향 시계방향",
      "한류 염분 낮음",
      "해양과 빙하 δ¹⁸O 부호 반대",
      "적외영상에서 낮은 구름 어두움",
      "방추충=고생대 페름기 (신생대 아님)"
    ]
  },
  {
    id: "M05",
    label: "내가 핀한 것 집중 복습",
    minutes: 5,
    start: "00:25",
    unit: "PIN",
    tier: "MIXED",
    items: ["어젯밤 Pin한 불안 항목들만 빠르게 재학습"]
  }
];

export const morningTotalMinutes = morningSchedule.reduce((s, b) => s + b.minutes, 0);
