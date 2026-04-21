"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/study/cn";
import type { GraphSpec } from "../data/graphs";

type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  body: string;
};

type EnsoState = "normal" | "elnino" | "lanina";

export function GraphInteractive({
  graph,
  pinned,
  onTogglePin
}: {
  graph: GraphSpec;
  pinned: boolean;
  onTogglePin: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [ensoState, setEnsoState] = useState<EnsoState>("normal");

  const hotspots = useMemo(() => getHotspots(graph.id, ensoState), [graph.id, ensoState]);
  const active = hotspots.find((spot) => spot.id === activeId) ?? hotspots[0];

  return (
    <article id={`graph-${graph.id}`} className="rounded-3xl border border-border-dark bg-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-combustion">{graph.unit}</div>
          <h3 className="text-xl font-semibold text-warm-white">{graph.title}</h3>
          <p className="text-sm leading-6 text-text-secondary">{graph.summary}</p>
        </div>
        <button
          type="button"
          onClick={() => onTogglePin(graph.id)}
          className={cn(
            "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition",
            pinned
              ? "border-combustion/40 bg-combustion/10 text-combustion"
              : "border-border-dark bg-base-black text-text-secondary hover:text-warm-white"
          )}
        >
          {pinned ? "아침 핀됨" : "아침에 볼 것"}
        </button>
      </div>

      {graph.id === "enso-panels" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { id: "normal" as EnsoState, label: "평상시" },
            { id: "elnino" as EnsoState, label: "엘니뇨" },
            { id: "lanina" as EnsoState, label: "라니냐" }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setEnsoState(item.id);
                setActiveId("");
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition",
                ensoState === item.id
                  ? "border-lox/40 bg-lox/10 text-lox"
                  : "border-border-dark bg-base-black text-text-secondary"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border-dark bg-base-black p-4">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {renderGraph(graph.id, ensoState)}
            {hotspots.map((spot) => (
              <g
                key={spot.id}
                onMouseEnter={() => setActiveId(spot.id)}
                onFocus={() => setActiveId(spot.id)}
              >
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r={active?.id === spot.id ? 2.8 : 2.2}
                  className="fill-combustion transition"
                />
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r={active?.id === spot.id ? 5.5 : 4.5}
                  fill="transparent"
                  stroke={active?.id === spot.id ? "#FF6B2B" : "rgba(255,255,255,0.2)"}
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border-dark bg-surface-light p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-lox">{active.title}</div>
            <p className="mt-2 text-sm leading-7 text-text-secondary">{active.body}</p>
          </div>
          <div className="rounded-2xl border border-border-dark bg-base-black p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Hover 포인트</div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
              {hotspots.map((spot) => (
                <li key={spot.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(spot.id)}
                    onFocus={() => setActiveId(spot.id)}
                    className={cn(
                      "text-left transition",
                      active?.id === spot.id ? "text-warm-white" : "text-text-secondary"
                    )}
                  >
                    • {spot.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderGraph(id: string, ensoState: EnsoState) {
  if (id === "thermocline-density") {
    return (
      <>
        <rect x="8" y="8" width="84" height="84" rx="4" fill="#111111" stroke="rgba(255,255,255,0.15)" />
        <line x1="18" y1="12" x2="18" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <line x1="18" y1="12" x2="88" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <text x="21" y="16" fill="#A0A0A0" fontSize="4">0 m</text>
        <text x="70" y="10" fill="#FF6B2B" fontSize="4">수온</text>
        <text x="75" y="18" fill="#00D4FF" fontSize="4">밀도</text>
        <path d="M28 18 C34 18, 36 20, 40 22 S48 30, 48 46 S50 66, 52 84" fill="none" stroke="#FF6B2B" strokeWidth="1.8" />
        <path d="M24 18 C26 18, 28 18, 29 18 S32 22, 34 34 S42 58, 58 84" fill="none" stroke="#00D4FF" strokeWidth="1.8" />
        <line x1="18" y1="28" x2="88" y2="28" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
        <line x1="18" y1="48" x2="88" y2="48" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
        <text x="60" y="26" fill="#F5F0E8" fontSize="4">혼합층</text>
        <text x="58" y="46" fill="#F5F0E8" fontSize="4">수온 약층</text>
        <text x="64" y="78" fill="#F5F0E8" fontSize="4">심해층</text>
      </>
    );
  }

  if (id === "ts-diagram") {
    return (
      <>
        <rect x="8" y="8" width="84" height="84" rx="4" fill="#111111" stroke="rgba(255,255,255,0.15)" />
        <line x1="18" y1="12" x2="18" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <line x1="18" y1="88" x2="88" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <text x="77" y="95" fill="#A0A0A0" fontSize="4">염분</text>
        <text x="5" y="18" fill="#A0A0A0" fontSize="4" transform="rotate(-90 5 18)">수온</text>
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M18 ${78 - index * 12} C 32 ${70 - index * 12}, 54 ${54 - index * 10}, 88 ${18 + index * 6}`}
            fill="none"
            stroke="rgba(0,212,255,0.6)"
            strokeWidth="0.8"
          />
        ))}
        <path d="M34 30 L66 62" stroke="#FFB347" strokeWidth="3" strokeDasharray="4 3" />
        <polygon points="66,62 61,60 63,55" fill="#FFB347" />
        <circle cx="40" cy="55" r="2.2" fill="#FF6B2B" />
        <circle cx="68" cy="32" r="2.2" fill="#FF6B2B" />
        <text x="38" y="61" fill="#F5F0E8" fontSize="4">A</text>
        <text x="70" y="37" fill="#F5F0E8" fontSize="4">B</text>
        <text x="48" y="50" fill="#FFB347" fontSize="4">밀도 증가</text>
      </>
    );
  }

  if (id === "typhoon-profile") {
    return (
      <>
        <rect x="8" y="8" width="84" height="84" rx="4" fill="#111111" stroke="rgba(255,255,255,0.15)" />
        <line x1="16" y1="18" x2="16" y2="84" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <line x1="16" y1="84" x2="88" y2="84" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <text x="20" y="18" fill="#A0A0A0" fontSize="4">중심</text>
        <text x="57" y="92" fill="#A0A0A0" fontSize="4">중심에서 거리</text>
        <path d="M20 36 C30 30, 38 22, 48 18 C58 22, 66 30, 76 36" fill="none" stroke="#00D4FF" strokeWidth="1.8" />
        <path d="M20 58 C30 54, 38 42, 48 76 C58 42, 66 54, 76 58" fill="none" stroke="#FF6B2B" strokeWidth="1.8" />
        <line x1="48" y1="18" x2="48" y2="76" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 2" />
        <text x="56" y="25" fill="#00D4FF" fontSize="4">풍속</text>
        <text x="58" y="77" fill="#FF6B2B" fontSize="4">기압</text>
        <text x="45" y="14" fill="#F5F0E8" fontSize="4">눈</text>
        <text x="24" y="28" fill="#F5F0E8" fontSize="4">눈벽</text>
        <text x="65" y="28" fill="#F5F0E8" fontSize="4">눈벽</text>
      </>
    );
  }

  return (
    <>
      <rect x="8" y="8" width="84" height="84" rx="4" fill="#111111" stroke="rgba(255,255,255,0.15)" />
      <rect x="15" y="24" width="70" height="42" rx="4" fill="#0F2233" />
      <rect x="15" y="24" width="18" height="42" fill="#2E4153" />
      <text x="18" y="22" fill="#A0A0A0" fontSize="4">서태평양</text>
      <text x="68" y="22" fill="#A0A0A0" fontSize="4">동태평양</text>
      {ensoState === "normal" && (
        <>
          <path d="M16 50 C32 40, 52 48, 84 30" fill="none" stroke="#FFB347" strokeWidth="3" />
          <path d="M18 34 C34 34, 44 38, 52 44" fill="none" stroke="#FF6B2B" strokeWidth="1.5" />
          <path d="M64 56 C68 48, 72 40, 74 34" fill="none" stroke="#00D4FF" strokeWidth="2" />
          <text x="24" y="30" fill="#F5F0E8" fontSize="4">warm pool</text>
          <text x="66" y="60" fill="#F5F0E8" fontSize="4">용승</text>
        </>
      )}
      {ensoState === "elnino" && (
        <>
          <path d="M16 42 C36 40, 56 42, 84 40" fill="none" stroke="#FFB347" strokeWidth="3" />
          <path d="M18 38 C38 38, 58 38, 78 38" fill="none" stroke="#FF6B2B" strokeWidth="1.5" />
          <text x="22" y="30" fill="#F5F0E8" fontSize="4">약한 무역풍</text>
          <text x="58" y="52" fill="#F5F0E8" fontSize="4">용승 약화</text>
        </>
      )}
      {ensoState === "lanina" && (
        <>
          <path d="M16 56 C34 42, 54 48, 84 22" fill="none" stroke="#FFB347" strokeWidth="3" />
          <path d="M18 30 C34 30, 44 34, 50 42" fill="none" stroke="#FF6B2B" strokeWidth="1.5" />
          <path d="M66 60 C70 50, 74 38, 76 28" fill="none" stroke="#00D4FF" strokeWidth="2.2" />
          <text x="20" y="28" fill="#F5F0E8" fontSize="4">강한 무역풍</text>
          <text x="60" y="66" fill="#F5F0E8" fontSize="4">용승 강화</text>
        </>
      )}
    </>
  );
}

function getHotspots(id: string, ensoState: EnsoState): Hotspot[] {
  if (id === "thermocline-density") {
    return [
      {
        id: "mixing-layer",
        x: 62,
        y: 28,
        title: "혼합층",
        body: "바람 혼합 때문에 깊이에 따른 수온 변화가 거의 없는 층. 바람이 강할수록 두꺼워진다."
      },
      {
        id: "thermocline",
        x: 55,
        y: 48,
        title: "수온 약층",
        body: "수온이 가장 급격히 감소하는 층. 그래프 기울기가 가장 큰 구간이다."
      },
      {
        id: "deep-water",
        x: 70,
        y: 74,
        title: "심해층",
        body: "태양 에너지 영향이 거의 없어서 수온이 낮고 변화가 작다."
      },
      {
        id: "density-rise",
        x: 54,
        y: 63,
        title: "밀도 증가",
        body: "수심이 깊어질수록 수온이 낮아지고 수압이 높아져 밀도는 대체로 증가한다."
      }
    ];
  }

  if (id === "ts-diagram") {
    return [
      {
        id: "salinity-axis",
        x: 74,
        y: 88,
        title: "가로축 = 염분",
        body: "오른쪽으로 갈수록 고염분. 같은 수온이면 오른쪽 점이 더 고밀도다."
      },
      {
        id: "temperature-axis",
        x: 18,
        y: 22,
        title: "세로축 = 수온",
        body: "아래로 갈수록 저수온. 오른쪽 아래 방향이 고밀도 영역이다."
      },
      {
        id: "density-lines",
        x: 52,
        y: 40,
        title: "등밀도선",
        body: "같은 밀도의 점을 잇는 선. 두 점이 같은 선 위면 밀도가 같다."
      },
      {
        id: "density-arrow",
        x: 64,
        y: 58,
        title: "밀도 증가 방향",
        body: "오른쪽 아래로 갈수록 고염분·저수온이라 밀도가 커진다."
      }
    ];
  }

  if (id === "typhoon-profile") {
    return [
      {
        id: "eye",
        x: 48,
        y: 76,
        title: "태풍의 눈",
        body: "중심 기압은 최저지만 바람은 약하다. 하강 기류가 나타난다."
      },
      {
        id: "eyewall",
        x: 28,
        y: 34,
        title: "눈벽",
        body: "강한 상승 기류와 집중 호우, 최대 풍속이 나타나는 핵심 구간."
      },
      {
        id: "wind-max",
        x: 48,
        y: 18,
        title: "풍속 최대는 중심 X",
        body: "풍속 그래프는 중심이 아니라 눈벽 부근에서 최고값을 가진다."
      },
      {
        id: "pressure-min",
        x: 48,
        y: 76,
        title: "기압 최저",
        body: "중심에서 가장 낮다. 기압 최저와 풍속 최대 위치를 분리해서 기억."
      }
    ];
  }

  const map: Record<EnsoState, Hotspot[]> = {
    normal: [
      {
        id: "normal-trade",
        x: 28,
        y: 34,
        title: "평상시 무역풍",
        body: "서쪽으로 부는 무역풍이 표층 해수를 서태평양으로 밀어 warm pool을 만든다."
      },
      {
        id: "normal-upwelling",
        x: 72,
        y: 58,
        title: "동태평양 용승",
        body: "서쪽으로 밀려난 표층수를 채우기 위해 차가운 심층수가 상승한다."
      },
      {
        id: "normal-slope",
        x: 60,
        y: 40,
        title: "해수면·수온 약층 경사",
        body: "서태평양이 높고 동태평양이 낮다. 경사가 유지될수록 평상시 상태."
      }
    ],
    elnino: [
      {
        id: "elnino-trade",
        x: 28,
        y: 30,
        title: "무역풍 약화",
        body: "무역풍이 약해지면 warm pool이 동쪽으로 퍼지고 해수면 경사가 완만해진다."
      },
      {
        id: "elnino-warm-east",
        x: 70,
        y: 40,
        title: "동태평양 수온 상승",
        body: "용승이 약해져 차가운 물 공급이 줄고 동태평양 수온이 올라간다."
      },
      {
        id: "elnino-upwelling",
        x: 66,
        y: 56,
        title: "용승 약화",
        body: "동태평양 연안과 적도 동부 용승이 줄어든다."
      }
    ],
    lanina: [
      {
        id: "lanina-trade",
        x: 28,
        y: 28,
        title: "무역풍 강화",
        body: "평상시보다 더 강한 무역풍이 표층 해수를 서쪽으로 강하게 밀어낸다."
      },
      {
        id: "lanina-cold-east",
        x: 72,
        y: 54,
        title: "동태평양 수온 하강",
        body: "용승이 강화되어 동태평양 표층 수온이 더 낮아진다."
      },
      {
        id: "lanina-slope",
        x: 60,
        y: 34,
        title: "더 큰 경사",
        body: "서태평양 warm pool이 더 쌓여 해수면·수온 약층의 동서 차가 커진다."
      }
    ]
  };

  return map[ensoState];
}
