"use client";

import { useState } from "react";
import type { Graph, GraphHotspot } from "../data/graphs";

export function GraphInteractive({ graph }: { graph: Graph }) {
  const [hovered, setHovered] = useState<GraphHotspot | null>(null);

  return (
    <figure className="rounded-lg border border-border-dark bg-surface p-4">
      <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
            GRAPH · {graph.id} · {graph.unit}
          </p>
          <h3 className="font-mono text-sm text-warm-white">{graph.title}</h3>
        </div>
        <p className="font-mono text-[10px] text-text-secondary">
          {graph.description}
        </p>
      </figcaption>

      <div className="grid gap-3 sm:grid-cols-[300px_1fr]">
        <svg
          viewBox={graph.viewBox}
          className="h-[260px] w-full rounded-md border border-border-dark bg-base-black"
        >
          <GraphBody id={graph.id} />
          {graph.hotspots.map((h, i) => (
            <g
              key={i}
              onMouseEnter={() => setHovered(h)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(h)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="cursor-help focus:outline-none"
            >
              <circle
                cx={h.x}
                cy={h.y}
                r="8"
                fill={hovered === h ? "#FF6B2B" : "#00D4FF"}
                fillOpacity={hovered === h ? 0.9 : 0.6}
                stroke={hovered === h ? "#FF6B2B" : "#00D4FF"}
                strokeWidth="1.5"
              />
              <text
                x={h.x}
                y={h.y + 3}
                textAnchor="middle"
                className="font-mono text-[9px]"
                fill="#0A0A0A"
                fontWeight="700"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        <div className="min-h-[120px] rounded-md border border-border-dark bg-base-black/60 p-3">
          {hovered ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-combustion">
                HOTSPOT · {graph.hotspots.indexOf(hovered) + 1}
              </p>
              <p className="mt-1 font-mono text-sm text-warm-white">
                {hovered.label}
              </p>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                {hovered.note}
              </p>
            </>
          ) : (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                INSTRUCTIONS
              </p>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                점 위에 마우스를 올리거나 포커스하면 설명이 나옵니다. 시험
                직전엔 번호만 보고 의미를 말로 답해봅니다.
              </p>
              <ul className="mt-2 space-y-0.5">
                {graph.hotspots.map((h, i) => (
                  <li
                    key={i}
                    className="font-mono text-[10px] text-text-muted"
                  >
                    ① {i + 1} — {h.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </figure>
  );
}

function GraphBody({ id }: { id: string }) {
  switch (id) {
    case "G1":
      // 연직 수온 분포: x=수온(0-30°C), y=수심(0-260m → SVG y 0-260 변환)
      return (
        <>
          {/* 축 */}
          <line x1="30" y1="20" x2="30" y2="240" stroke="#3A3A3A" />
          <line x1="30" y1="240" x2="290" y2="240" stroke="#3A3A3A" />
          <text x="290" y="255" textAnchor="end" fill="#666" fontSize="9">
            수온(°C) →
          </text>
          <text x="20" y="20" textAnchor="end" fill="#666" fontSize="9">
            수심 ↓
          </text>
          {/* 혼합층 — 수평 직선 */}
          <line x1="220" y1="30" x2="220" y2="90" stroke="#FF6B2B" strokeWidth="2" />
          {/* 수온약층 — 기울어진 선 */}
          <line x1="220" y1="90" x2="60" y2="180" stroke="#FF6B2B" strokeWidth="2" />
          {/* 심해층 */}
          <line x1="60" y1="180" x2="55" y2="240" stroke="#FF6B2B" strokeWidth="2" />
          {/* 참조선 */}
          <line x1="30" y1="90" x2="290" y2="90" stroke="#2A2A2A" strokeDasharray="3 3" />
          <line x1="30" y1="180" x2="290" y2="180" stroke="#2A2A2A" strokeDasharray="3 3" />
        </>
      );
    case "G2":
      // T-S도: x=염분 30-38, y=수온 0-30
      return (
        <>
          <line x1="30" y1="20" x2="30" y2="240" stroke="#3A3A3A" />
          <line x1="30" y1="240" x2="290" y2="240" stroke="#3A3A3A" />
          <text x="290" y="255" textAnchor="end" fill="#666" fontSize="9">
            염분(psu) →
          </text>
          <text x="20" y="20" textAnchor="end" fill="#666" fontSize="9">
            수온(°C) ↑
          </text>
          {/* 등밀도선 3개 (우하향 대각선) */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={40 + i * 40}
              y1="40"
              x2="290"
              y2={140 + i * 50}
              stroke="#2A2A2A"
              strokeDasharray="2 3"
            />
          ))}
          {/* 레이블 */}
          <text x="210" y="50" fill="#666" fontSize="8">
            σ=24
          </text>
          <text x="260" y="170" fill="#666" fontSize="8">
            σ=27
          </text>
        </>
      );
    case "G3":
      // 용존기체 — O2 곡선과 CO2 곡선
      return (
        <>
          <line x1="30" y1="20" x2="30" y2="240" stroke="#3A3A3A" />
          <line x1="30" y1="240" x2="290" y2="240" stroke="#3A3A3A" />
          <text x="290" y="255" textAnchor="end" fill="#666" fontSize="9">
            농도 →
          </text>
          <text x="20" y="20" textAnchor="end" fill="#666" fontSize="9">
            수심 ↓
          </text>
          {/* O2 곡선: 표층 최대 → 1000m 최소 → 심층 회복 */}
          <path
            d="M 230 40 Q 90 130 110 200 T 150 235"
            stroke="#00D4FF"
            strokeWidth="2"
            fill="none"
          />
          {/* CO2 곡선: 표층 최소 → 단조 증가 */}
          <path
            d="M 60 40 Q 120 130 240 230"
            stroke="#FF6B2B"
            strokeWidth="2"
            fill="none"
          />
          <text x="245" y="45" fill="#00D4FF" fontSize="9">
            O₂
          </text>
          <text x="245" y="230" fill="#FF6B2B" fontSize="9">
            CO₂
          </text>
        </>
      );
    case "G4":
      // 태풍 구조: 원 + 진행 화살표
      return (
        <>
          <circle cx="150" cy="130" r="100" stroke="#3A3A3A" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          <circle cx="150" cy="130" r="20" stroke="#A0A0A0" strokeWidth="1" fill="#1A1A1A" />
          <line x1="150" y1="230" x2="150" y2="30" stroke="#666" strokeDasharray="2 3" />
          {/* 진행 화살표 */}
          <line x1="150" y1="60" x2="150" y2="20" stroke="#FF6B2B" strokeWidth="2" />
          <polygon points="150,15 145,25 155,25" fill="#FF6B2B" />
          {/* 위험반원 배경 */}
          <path
            d="M 150 30 A 100 100 0 0 1 150 230 L 150 130 Z"
            fill="#FF6B2B"
            fillOpacity="0.08"
          />
          {/* 가항반원 배경 */}
          <path
            d="M 150 30 A 100 100 0 0 0 150 230 L 150 130 Z"
            fill="#00D4FF"
            fillOpacity="0.08"
          />
          <text x="20" y="250" fill="#666" fontSize="8">
            진행방향 ↑ 기준
          </text>
        </>
      );
    case "G5":
      // 태평양 단면: 왼쪽=서태평양(인도네시아), 오른쪽=동태평양(페루)
      return (
        <>
          {/* 해수면 */}
          <line x1="20" y1="60" x2="280" y2="60" stroke="#00D4FF" strokeWidth="1.5" />
          {/* 해저 */}
          <path d="M 20 240 L 280 240" stroke="#666" strokeWidth="1" />
          {/* 수온약층 (평상시: 서쪽 깊고 동쪽 얕음) */}
          <path
            d="M 20 160 Q 150 120 280 80"
            stroke="#FF6B2B"
            strokeWidth="2"
            fill="none"
          />
          <text x="25" y="75" fill="#00D4FF" fontSize="8">
            서태평양 (인도네시아)
          </text>
          <text x="200" y="75" fill="#666" fontSize="8">
            동태평양 (페루)
          </text>
          {/* 무역풍 화살표 (동→서) */}
          <line x1="260" y1="45" x2="50" y2="45" stroke="#F5F0E8" strokeWidth="1" />
          <polygon points="45,45 55,41 55,49" fill="#F5F0E8" />
          <text x="140" y="40" fill="#F5F0E8" fontSize="8">
            무역풍 (평상시)
          </text>
          {/* 워커순환 화살표들 */}
          <path d="M 40 60 Q 40 30 50 30" stroke="#00D4FF" strokeWidth="1" fill="none" />
          <path d="M 260 30 Q 260 60 250 60" stroke="#00D4FF" strokeWidth="1" fill="none" />
          {/* 용승 */}
          <line x1="260" y1="200" x2="260" y2="80" stroke="#00D4FF" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="260,75 256,85 264,85" fill="#00D4FF" />
        </>
      );
    case "G6":
      // 전선 단면도
      return (
        <>
          <line x1="20" y1="230" x2="280" y2="230" stroke="#666" strokeWidth="1" />
          {/* 한랭전선 (왼쪽, 급경사) */}
          <path d="M 30 230 L 110 60" stroke="#00D4FF" strokeWidth="2" />
          {/* 온난전선 (오른쪽, 완만) */}
          <path d="M 140 230 L 280 100" stroke="#FF6B2B" strokeWidth="2" />
          {/* 찬 공기 영역 */}
          <path
            d="M 30 230 L 110 60 L 20 60 L 20 230 Z"
            fill="#00D4FF"
            fillOpacity="0.08"
          />
          <path
            d="M 140 230 L 280 100 L 280 230 Z"
            fill="#00D4FF"
            fillOpacity="0.05"
          />
          {/* 적운형 구름 (한랭전선 위) */}
          <circle cx="95" cy="55" r="10" fill="#F5F0E8" fillOpacity="0.4" />
          <circle cx="80" cy="70" r="8" fill="#F5F0E8" fillOpacity="0.4" />
          {/* 층운형 구름 (온난전선 위) */}
          <rect x="180" y="110" width="100" height="6" fill="#F5F0E8" fillOpacity="0.3" />
          <rect x="200" y="90" width="80" height="4" fill="#F5F0E8" fillOpacity="0.3" />
          <text x="50" y="45" fill="#00D4FF" fontSize="8">
            한랭
          </text>
          <text x="240" y="85" fill="#FF6B2B" fontSize="8">
            온난
          </text>
        </>
      );
    default:
      return null;
  }
}
