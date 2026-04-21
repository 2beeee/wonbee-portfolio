export type Block = {
  id: string;
  label: string;
  minutes: number;
  start: string;
  unit: string;
  tier: "S" | "A" | "B" | "MIXED";
  items: string[];
  conceptIds?: string[];
  patternIds?: string[];
  graphIds?: string[];
  formulaIds?: string[];
};

export const nightSchedule: Block[] = [
  {
    id: "N01",
    label: "Ⅰ.1 해수 성질 — 그래프 3종 정복",
    minutes: 15,
    start: "00:00",
    unit: "Ⅰ.1",
    tier: "S",
    items: [
      "연직 수온 분포 그래프 + 혼합층 두께 규칙",
      "T-S도 해석 (등밀도선·수괴 혼합)",
      "용존 O₂/CO₂ 수직 곡선",
      "난류 vs 한류 비교표 암기"
    ],
    conceptIds: ["S1", "S2", "S3", "S4", "S5"],
    graphIds: ["G1", "G2", "G3"],
    patternIds: ["P01", "P02", "P03"]
  },
  {
    id: "N02",
    label: "Ⅰ.2 해양 순환 — 이름 암기 + 컨베이어",
    minutes: 8,
    start: "00:15",
    unit: "Ⅰ.2",
    tier: "S",
    items: [
      "표층 순환 4해류 이름 (북태평양 시계방향)",
      "심층 순환 3수괴 (저층·심층·중층수)",
      "컨베이어 벨트 순환 경로 + 기후 역설"
    ],
    conceptIds: ["S6", "S7", "S8"]
  },
  {
    id: "N03",
    label: "Ⅰ.3 기압·날씨 — 전선 비교표 + 위성영상",
    minutes: 18,
    start: "00:23",
    unit: "Ⅰ.3",
    tier: "S",
    items: [
      "한랭/온난 전선 비교표 (기울기·구름·강수·풍향)",
      "저기압 통과 시 풍향 변화 규칙 (시계/반시계)",
      "가시·적외·수증기 영상 식별 알고리즘"
    ],
    conceptIds: ["S9", "S10", "S11"],
    graphIds: ["G6"],
    patternIds: ["P04", "P05", "P06"]
  },
  {
    id: "N04",
    label: "Ⅰ.4 태풍 — 구조 + 위험반원",
    minutes: 12,
    start: "00:41",
    unit: "Ⅰ.4",
    tier: "S",
    items: [
      "태풍 발생 조건 (수온 26.5°C, 풍속 17m/s)",
      "눈·눈벽·나선형 구조",
      "위험반원(시계) vs 가항반원(반시계)",
      "한반도 접근 시 경로별 피해"
    ],
    conceptIds: ["S12", "S13"],
    graphIds: ["G4"],
    patternIds: ["P07"]
  },
  {
    id: "N05",
    label: "Ⅰ.6 대기-해양 — 엘니뇨·에크만 마스터",
    minutes: 18,
    start: "00:53",
    unit: "Ⅰ.6",
    tier: "S",
    items: [
      "에크만 수송 90° 법칙 (북/남반구)",
      "연안 용승 원리 + 페루 연안",
      "엘니뇨 vs 라니냐 비교표 완전 암기",
      "워커 순환 평상/엘니뇨 변화"
    ],
    conceptIds: ["S14", "S15", "S16", "S17"],
    graphIds: ["G5"],
    patternIds: ["P08", "P09"]
  },
  {
    id: "N06",
    label: "Ⅰ.7 기후변화 — 밀란코비치 숫자 꽂기",
    minutes: 7,
    start: "01:11",
    unit: "Ⅰ.7",
    tier: "S",
    items: [
      "자전축 기울기 4.1만년 (22.1~24.5°)",
      "세차운동 2.6만년",
      "이심률 10만년",
      "온실기체 순위 (수증기>CO₂>CH₄>N₂O)"
    ],
    conceptIds: ["S18", "S19"],
    patternIds: ["P10"]
  },
  {
    id: "N07",
    label: "— 휴식 / 물 / 자세 교정 —",
    minutes: 5,
    start: "01:18",
    unit: "BREAK",
    tier: "MIXED",
    items: ["눈 피로 풀기", "물 마시기", "스트레칭"]
  },
  {
    id: "N08",
    label: "Ⅱ.1 지사학 — 5대 법칙 + 부정합 + 반감기",
    minutes: 18,
    start: "01:23",
    unit: "Ⅱ.1",
    tier: "S",
    items: [
      "5대 법칙 (수평/누중/관입/부정합/동물군천이)",
      "부정합 3종 + 형성 4단계 (퇴적→융기→침식→재퇴적)",
      "반감기 표 (1:1·1:3·1:7·1:15) → 숫자로 외우기",
      "지질 단면도 해석 연습 3문제"
    ],
    conceptIds: ["S20", "S21", "S22", "S23", "S24"],
    patternIds: ["P11", "P12"]
  },
  {
    id: "N09",
    label: "Ⅱ.2 퇴적·지질시대 — 표준화석 + 동위원소",
    minutes: 15,
    start: "01:41",
    unit: "Ⅱ.2",
    tier: "S",
    items: [
      "4대 퇴적구조 + 역전 판단",
      "표준화석 시대 매칭 (고생/중생/신생)",
      "시상화석 vs 표준화석 구분",
      "산소동위원소 해양 vs 빙하 부호"
    ],
    conceptIds: ["S25", "S26", "S27", "S28"],
    patternIds: ["P13", "P14", "P15"]
  },
  {
    id: "N10",
    label: "TIER A 훑기 (여유 있을 때)",
    minutes: 12,
    start: "01:56",
    unit: "MIXED",
    tier: "A",
    items: [
      "중위도 저기압 발생 5단계",
      "뇌우 3단계",
      "폭설 2유형 (서해안·영동)",
      "속성작용 + 퇴적암 3종",
      "선캄브리아~신생대 생물 변화"
    ],
    conceptIds: ["A3", "A5", "A7", "A13", "A14", "A17"]
  },
  {
    id: "N11",
    label: "플래시카드 자가테스트 + 핀 정리",
    minutes: 12,
    start: "02:08",
    unit: "REVIEW",
    tier: "MIXED",
    items: [
      "공식 카드 12장 말로 답하기",
      "유형별 함정 패턴 3번씩 소리내어 읽기",
      "내일 아침용 '핀' 목록 확정"
    ],
    formulaIds: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11"]
  }
];

export const nightTotalMinutes = nightSchedule.reduce((s, b) => s + b.minutes, 0);
