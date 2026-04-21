export type StudyBlock = {
  id: string;
  start: string;
  end: string;
  minutes: number;
  title: string;
  summary: string;
  jumpId: string;
  focusLabels: string[];
};

export const scheduleNight: StudyBlock[] = [
  {
    id: "night-01",
    start: "00:00",
    end: "00:10",
    minutes: 10,
    title: "시험 범위 잠금",
    summary: "범위·배점·TIER 기준을 먼저 잠가서 헛공부를 차단.",
    jumpId: "scope-brief",
    focusLabels: ["범위 확인", "자료 인벤토리", "TIER 요약"]
  },
  {
    id: "night-02",
    start: "00:10",
    end: "00:55",
    minutes: 45,
    title: "TIER S 개념 정복",
    summary: "해수 성질 → 해양 순환 → 날씨 시스템 → 태풍/ENSO 순서.",
    jumpId: "concept-ocean-core",
    focusLabels: ["S-01 해수 성질", "S-02 해양 순환", "S-03 날씨", "S-04 태풍", "S-05 ENSO"]
  },
  {
    id: "night-03",
    start: "00:55",
    end: "01:35",
    minutes: 40,
    title: "유형북 + 문제 감각",
    summary: "그래프/일기도/지층 단면 풀이 알고리즘을 반복.",
    jumpId: "pattern-graph-ocean",
    focusLabels: ["그래프형", "전선·일기도형", "지층 단면형", "반감기형"]
  },
  {
    id: "night-04",
    start: "01:35",
    end: "01:55",
    minutes: 20,
    title: "그래프·도표 집중 훈련",
    summary: "수온 프로파일, T-S도, 태풍 곡선, ENSO 단면만 2회전.",
    jumpId: "graph-thermocline-density",
    focusLabels: ["연직 프로파일", "T-S도", "태풍", "ENSO"]
  },
  {
    id: "night-05",
    start: "01:55",
    end: "02:00",
    minutes: 5,
    title: "내일 아침용 핀 찍기",
    summary: "헷갈린 카드/유형/그래프만 골라 아침 30분에 자동 편성.",
    jumpId: "morning-pin-board",
    focusLabels: ["핀 체크", "오답 한 줄 메모"]
  }
];
