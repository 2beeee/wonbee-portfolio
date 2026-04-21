export interface TimelineBlock {
  id: string;
  start: string;
  minutes: number;
  label: string;
  unit: string;
  focus: string;
  accent: string;
  targetId: string;
  items: string[];
}

export const nightSchedule: TimelineBlock[] = [
  {
    id: "night-01",
    start: "0:00",
    minutes: 10,
    label: "시험 범위 / 티어 브리핑",
    unit: "오리엔테이션",
    focus: "S 우선",
    accent: "#FF6B2B",
    targetId: "scope-brief",
    items: [
      "4/22(수) 08:20 시작, 객관식 100점",
      "교과서 10~17·26~32·58~65·160~204 + 유인물",
      "오늘은 S 깊게 / B는 과감히 버리기"
    ]
  },
  {
    id: "night-02",
    start: "0:10",
    minutes: 16,
    label: "자경 정복",
    unit: "유인물 / 3월 학평",
    focus: "S",
    accent: "#FF6B2B",
    targetId: "work-jagyeong",
    items: [
      "명경·명덕 / 성의관·팔덕문 / 제세주·사공 3세트",
      "보기 문제 함정: 비유 대상 바꿔치기",
      "자기 성찰 + 세태 비판 + 경세제민"
    ]
  },
  {
    id: "night-03",
    start: "0:26",
    minutes: 18,
    label: "도산십이곡 압축 암기",
    unit: "필기 / 연시조",
    focus: "S",
    accent: "#FF6B2B",
    targetId: "work-dosan",
    items: [
      "1~6 언지 / 7~12 언학 큰 구조",
      "피미일인·교교백구·만권생애·만고상청",
      "설의·대구·자연 예찬과 학문 수양"
    ]
  },
  {
    id: "night-04",
    start: "0:44",
    minutes: 16,
    label: "무진기행 핵심 축 고정",
    unit: "활동지 / 유인물",
    focus: "S",
    accent: "#FF6B2B",
    targetId: "work-mujin",
    items: [
      "무진/안개/사이렌/전보 상징",
      "윤희중-하인숙-조-박 관계도",
      "결말 = 해방이 아니라 현실 복귀"
    ]
  },
  {
    id: "night-05",
    start: "1:00",
    minutes: 20,
    label: "A 작품 초고속 스캔",
    unit: "교과서 메인",
    focus: "A",
    accent: "#00D4FF",
    targetId: "work-nuhangsa",
    items: [
      "누항사 / 마음의 달 / 꽃 / 이옥설",
      "찬기파랑가 / 서경별곡 / 시조 3편",
      "상춘곡 / 만복사저포기 / 흥보가"
    ]
  },
  {
    id: "night-06",
    start: "1:20",
    minutes: 15,
    label: "유형 드릴 1차",
    unit: "패턴북",
    focus: "S",
    accent: "#00D4FF",
    targetId: "pattern-attitude",
    items: [
      "화자 정서 / 시어 상징 / 표현법",
      "작품 간 비교보다 먼저 작품 내부 단서",
      "보기 활용 문제는 비유 대응부터"
    ]
  },
  {
    id: "night-07",
    start: "1:35",
    minutes: 15,
    label: "유형 드릴 2차",
    unit: "패턴북",
    focus: "S",
    accent: "#00D4FF",
    targetId: "pattern-genre",
    items: [
      "갈래 특징 / 문학사 의의 / 고전 풀이",
      "무진기행 시점·공간 / 흥보가 장단",
      "고전시가 함정 단어만 따로 확인"
    ]
  },
  {
    id: "night-08",
    start: "1:50",
    minutes: 10,
    label: "오답·약점 핀 박기",
    unit: "마감",
    focus: "아침용",
    accent: "#FF6B2B",
    targetId: "pinned-section",
    items: [
      "헷갈린 카드/유형만 핀",
      "아침 30분은 핀 + S만 본다",
      "B는 미련 없이 버린다"
    ]
  }
];
