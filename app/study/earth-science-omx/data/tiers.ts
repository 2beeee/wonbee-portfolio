export type Tier = "S" | "A" | "B";

export const tierOrder: Tier[] = ["S", "A", "B"];

export const tierMeta: Record<
  Tier,
  {
    label: string;
    accent: string;
    chipClass: string;
    description: string;
    reviewRule: string;
  }
> = {
  S: {
    label: "TIER S",
    accent: "점수 직결 / 반드시 정복",
    chipClass: "border-combustion/40 bg-combustion/10 text-combustion",
    description: "선생님 학습자료 중심 + 문제집 반복 + 그래프/도표/계산이 겹친 핵심",
    reviewRule: "오늘 밤 2회, 내일 아침 1회 재점검"
  },
  A: {
    label: "TIER A",
    accent: "핵심만 압축",
    chipClass: "border-lox/40 bg-lox/10 text-lox",
    description: "출제 가능성은 높지만 S를 끝낸 뒤 압축 회독으로 점수 회수 가능한 영역",
    reviewRule: "오늘 밤 1회 훑고, 아침엔 공식·함정만"
  },
  B: {
    label: "TIER B",
    accent: "시간 남으면",
    chipClass: "border-border-dark bg-white/5 text-text-secondary",
    description: "자료는 확인했지만 제한 시간 대비 기대 점수가 낮은 영역",
    reviewRule: "S/A 끝내고 5분 남을 때만"
  }
};

export const tierSummary = [
  {
    tier: "S" as Tier,
    title: "그래프·도표 + 선생님 handout 중심",
    evidence: [
      "교과서 차례상 1단원 전체(14~87p)와 2단원 앞부분(88~111p)가 시험 범위",
      "학습자료 1~40p가 정확히 위 범위를 압축 정리",
      "메가 해설 021~352, 완자 해설 003~338에서 수온·염분·밀도 / 중위도 저기압 / ENSO / 지층 해석이 반복"
    ],
    killShot: "이 티어를 다 맞히면 2.5시간 공부치고 가장 높은 점수 기대값."
  },
  {
    tier: "A" as Tier,
    title: "자주 나오지만 암기형 비중이 더 큰 묶음",
    evidence: [
      "악기상, 기후 변화, 화석·지질 시대는 문제집 반복은 많지만 S만큼 계산/도표 중심은 아님",
      "짧은 표 정리로 회수 가능한 문항이 많음"
    ],
    killShot: "S 끝낸 뒤 빠르게 훑으면 객관식 오답 2~3개를 줄일 수 있음."
  },
  {
    tier: "B" as Tier,
    title: "버려도 되는 것은 아니지만 우선순위 최하",
    evidence: [
      "해양 관측 방식, 용존 기체 세부, 퇴적암 분류 세부는 단독 깊은 문항 비중이 낮음",
      "핵심 관계식·대표 함정만 알고 넘어가도 손실이 제한적"
    ],
    killShot: "남는 시간이 5분 미만이면 과감히 스킵."
  }
];
