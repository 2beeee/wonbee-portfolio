import type { StudyBlock } from "./schedule-night";

export const scheduleMorning: StudyBlock[] = [
  {
    id: "morning-01",
    start: "00:00",
    end: "00:10",
    minutes: 10,
    title: "공식·단위·선생님 포인트",
    summary: "S티어 공식, 단위, 함정 한 번 더 잠금.",
    jumpId: "formula-salinity",
    focusLabels: ["염분", "밀도", "반감기", "선생님 강조 문장"]
  },
  {
    id: "morning-02",
    start: "00:10",
    end: "00:20",
    minutes: 10,
    title: "빈출 그래프 재확인",
    summary: "보자마자 읽는 순서를 몸에 남긴다.",
    jumpId: "graph-thermocline-density",
    focusLabels: ["연직 프로파일", "T-S도", "태풍", "ENSO"]
  },
  {
    id: "morning-03",
    start: "00:20",
    end: "00:30",
    minutes: 10,
    title: "핀·오답·함정 패턴",
    summary: "밤에 찍어 둔 것만 본다. 새 내용 금지.",
    jumpId: "morning-pin-board",
    focusLabels: ["핀 복습", "함정 패턴", "보기 ㄱㄴㄷ 점검"]
  }
];
