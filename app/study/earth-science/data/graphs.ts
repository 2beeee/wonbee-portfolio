export type GraphHotspot = {
  x: number;
  y: number;
  label: string;
  note: string;
};

export type Graph = {
  id: string;
  title: string;
  unit: string;
  description: string;
  hotspots: GraphHotspot[];
  viewBox: string;
};

export const graphs: Graph[] = [
  {
    id: "G1",
    title: "연직 수온 분포 곡선",
    unit: "Ⅰ.1",
    description: "가로=수온(°C), 세로=수심(m, 아래로 증가). 3층 구조.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 180,
        y: 60,
        label: "혼합층",
        note: "0~200m, 수온 거의 일정. 바람이 강할수록 두껍다."
      },
      {
        x: 110,
        y: 120,
        label: "수온약층",
        note: "수온이 급격히 감소. 대류가 억제된 안정한 층."
      },
      {
        x: 80,
        y: 220,
        label: "심해층",
        note: "수심 1~2km 이하, 수온 2~4°C로 거의 균일."
      }
    ]
  },
  {
    id: "G2",
    title: "T-S도 (수온-염분도)",
    unit: "Ⅰ.1",
    description: "가로=염분(psu), 세로=수온(°C). 등밀도선은 우하향.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 80,
        y: 60,
        label: "저염·고온 수괴",
        note: "밀도 낮음 (열대 표층)"
      },
      {
        x: 230,
        y: 80,
        label: "고염·고온 수괴",
        note: "아열대 해역. 증발 왕성 → 염분↑."
      },
      {
        x: 90,
        y: 210,
        label: "저염·저온",
        note: "극지 표층. 융빙수 영향."
      },
      {
        x: 240,
        y: 220,
        label: "고염·저온 (최고밀도)",
        note: "북대서양 심층수·남극저층수가 이 영역."
      }
    ]
  },
  {
    id: "G3",
    title: "용존 O₂·CO₂ 수직 분포",
    unit: "Ⅰ.1",
    description: "O₂는 표층 최대·1000m 최소, CO₂는 단조 증가.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 230,
        y: 40,
        label: "O₂ 표층 최대",
        note: "광합성 + 대기 교환."
      },
      {
        x: 80,
        y: 130,
        label: "O₂ 1000m 최소",
        note: "호흡·분해로 소비, 공급 없음."
      },
      {
        x: 110,
        y: 230,
        label: "O₂ 심층 약간 회복",
        note: "고위도 침강수가 산소 운반."
      },
      {
        x: 240,
        y: 230,
        label: "CO₂ 심층 최대",
        note: "분해산물 누적, 저온 고압."
      }
    ]
  },
  {
    id: "G4",
    title: "태풍 위험반원/가항반원",
    unit: "Ⅰ.4",
    description: "진행방향 기준 오른쪽 위험, 왼쪽 가항.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 200,
        y: 130,
        label: "위험반원 (오른쪽)",
        note: "풍속 합, 풍향 시계방향 회전. 바람·비 강함."
      },
      {
        x: 100,
        y: 130,
        label: "가항반원 (왼쪽)",
        note: "풍속 차, 풍향 반시계방향 회전. 상대적으로 안전."
      },
      {
        x: 150,
        y: 40,
        label: "진행 방향",
        note: "태풍 중심이 이동하는 방향. 화살표 기준으로 좌우 판별."
      },
      {
        x: 150,
        y: 130,
        label: "태풍 눈",
        note: "하강기류, 맑고 약한 바람. 눈벽에서 최대풍속."
      }
    ]
  },
  {
    id: "G5",
    title: "엘니뇨 vs 평상시 — 태평양 단면",
    unit: "Ⅰ.6",
    description: "평상시 서태평양 상승·동태평양 하강 (워커 순환). 엘니뇨 시 약화·역전.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 230,
        y: 60,
        label: "평상시 서태평양 강수",
        note: "상승기류 → 저기압 → 강수 많음."
      },
      {
        x: 70,
        y: 60,
        label: "평상시 동태평양 건조",
        note: "하강기류 → 고기압 → 건조."
      },
      {
        x: 70,
        y: 200,
        label: "평상시 연안 용승",
        note: "무역풍이 강해 해수 발산 → 심해수 상승. 영양염↑, 어획↑."
      },
      {
        x: 160,
        y: 140,
        label: "엘니뇨 시 변화",
        note: "무역풍 약화 → 동태평양 수온↑·용승↓·강수↑, 서태평양 강수↓."
      }
    ]
  },
  {
    id: "G6",
    title: "한랭·온난 전선 단면도",
    unit: "Ⅰ.3",
    description: "한랭전선은 급경사·적운형, 온난전선은 완만·층운형.",
    viewBox: "0 0 300 260",
    hotspots: [
      {
        x: 80,
        y: 100,
        label: "한랭전선",
        note: "찬 공기가 따뜻한 공기를 밀어올림. 적운형 구름·소나기."
      },
      {
        x: 220,
        y: 140,
        label: "온난전선",
        note: "따뜻한 공기가 찬 공기 위로 타고 오름. 층운형 구름·지속적 약한 비."
      },
      {
        x: 80,
        y: 180,
        label: "한랭전선 뒤 강수 구역",
        note: "좁고 강한 강수대. 통과 후 북서풍·기온 하강."
      },
      {
        x: 220,
        y: 60,
        label: "온난전선 앞 강수 구역",
        note: "앞쪽으로 넓은 강수대. 통과 전 권운(Ci)부터 순서대로 출현."
      }
    ]
  }
];

export const graphsById = new Map(graphs.map((g) => [g.id, g]));
