export interface Block {
  id: string;
  startMin: number;
  durationMin: number;
  title: string;
  desc: string;
  workIds?: string[];
  patternIds?: string[];
  type: "warmup" | "tier-s" | "tier-a" | "pattern" | "drill" | "review" | "break";
}

export const NIGHT_BLOCKS: Block[] = [
  {
    id: "N-01",
    startMin: 0,
    durationMin: 5,
    title: "🚀 오프닝 — 시험범위·전략 확인",
    desc: "시험: 4/22(수) 1교시 08:20~09:10 / 객관식 100점. 전략: TIER S 60% · TIER A 30% · TIER B 10%.",
    type: "warmup",
  },
  {
    id: "N-02",
    startMin: 5,
    durationMin: 12,
    title: "TIER S — 자경 (박인로) 풀카드",
    desc: "🔥 학력평가 명시 작품. 갈래(연시조), 작가(박인로=누항사), 핵심 주제(수신제가·효제충신) 완전 암기.",
    workIds: ["S-01"],
    type: "tier-s",
  },
  {
    id: "N-03",
    startMin: 17,
    durationMin: 18,
    title: "TIER S — 도산십이곡 (이황) 풀카드",
    desc: "⭐⭐⭐ 최강 신호. 전6곡 言志 / 후6곡 言學 / 만고상청 / 청산·유수 / 피미일인=임금. 12수 전체 분류 완벽 암기.",
    workIds: ["S-02"],
    type: "tier-s",
  },
  {
    id: "N-04",
    startMin: 35,
    durationMin: 13,
    title: "TIER S — 만복사저포기 (김시습) 풀카드",
    desc: "교과서 8쪽. 금오신화·전기 소설·명혼·시 삽입·생육신 작가 맥락. 전지적 작가 시점.",
    workIds: ["S-03"],
    type: "tier-s",
  },
  {
    id: "N-05",
    startMin: 48,
    durationMin: 5,
    title: "🌬️ 잠깐 쉬어가기",
    desc: "물 한잔, 어깨 풀기. 5분만.",
    type: "break",
  },
  {
    id: "N-06",
    startMin: 53,
    durationMin: 13,
    title: "TIER S — 흥보가 (판소리) 풀카드",
    desc: "판소리 5장단(진양조→휘모리), 창/아니리 구분, 매품팔이의 사회적 의미.",
    workIds: ["S-04"],
    type: "tier-s",
  },
  {
    id: "N-07",
    startMin: 66,
    durationMin: 12,
    title: "TIER S — 무진기행 (김승옥) 풀카드",
    desc: "1인칭 주인공, 안개=체념, 윤희중의 분신들(박/조/하인숙), 회귀 구조.",
    workIds: ["S-05"],
    type: "tier-s",
  },
  {
    id: "N-08",
    startMin: 78,
    durationMin: 18,
    title: "TIER A — 압축 카드 10작품 훑기",
    desc: "작가 맥락·핵심 시어·1줄 주제만. 마음의 달(역설), 꽃-낙화 비교, 이옥설(유추), 찬기파랑가, 서경별곡, 시조 3편, 사설시조, 상춘곡-누항사 비교.",
    workIds: ["A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07", "A-08", "A-09", "A-10"],
    type: "tier-a",
  },
  {
    id: "N-09",
    startMin: 96,
    durationMin: 15,
    title: "유형북 — 풀이 알고리즘 학습",
    desc: "유형 1·2·3 (화자 정서 / 시어 의미 / 표현상 특징) 풀이 5단계 + 함정 패턴 암기. 시험에서 70% 비중.",
    patternIds: ["P-01", "P-02", "P-03"],
    type: "pattern",
  },
  {
    id: "N-10",
    startMin: 111,
    durationMin: 5,
    title: "🌬️ 두 번째 휴식",
    desc: "잠깐 일어나서 스트레칭. 5분.",
    type: "break",
  },
  {
    id: "N-11",
    startMin: 116,
    durationMin: 4,
    title: "🎯 클로징 — 모르는 작품 체크 + 핀 정리",
    desc: "헷갈리는 작품·시어를 '내일 아침으로 핀' 처리. 내일 아침 30분에서 다시 확인.",
    type: "review",
  },
];
