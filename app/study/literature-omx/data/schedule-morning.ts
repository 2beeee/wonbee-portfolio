import type { TimelineBlock } from "./schedule-night";

export const morningSchedule: TimelineBlock[] = [
  {
    id: "morning-01",
    start: "0:00",
    minutes: 8,
    label: "자경 / 도산십이곡 재점화",
    unit: "S 재압축",
    focus: "S",
    accent: "#FF6B2B",
    targetId: "work-jagyeong",
    items: [
      "자경 비유 3세트 다시 말하기",
      "도산십이곡 언지/언학 + 핵심 상징"
    ]
  },
  {
    id: "morning-02",
    start: "0:08",
    minutes: 7,
    label: "무진기행 상징축만 확인",
    unit: "S 재압축",
    focus: "S",
    accent: "#FF6B2B",
    targetId: "work-mujin",
    items: [
      "무진=도피+자기대면",
      "안개/사이렌/전보/편지 찢기"
    ]
  },
  {
    id: "morning-03",
    start: "0:15",
    minutes: 10,
    label: "함정 선지 재확인",
    unit: "패턴북",
    focus: "함정",
    accent: "#00D4FF",
    targetId: "pattern-symbol",
    items: [
      "화자/대상 혼동",
      "상징 대응 틀리기",
      "갈래 특징 바꿔치기"
    ]
  },
  {
    id: "morning-04",
    start: "0:25",
    minutes: 5,
    label: "핀 목록 마지막 점검",
    unit: "아침 큐",
    focus: "핀",
    accent: "#00D4FF",
    targetId: "pinned-section",
    items: [
      "밤에 막힌 카드만 본다",
      "새로운 작품은 시작하지 않는다"
    ]
  }
];
