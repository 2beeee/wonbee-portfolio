"use client";

import { useEffect, useState, useRef } from "react";

type TelemetryItem = {
  label: string;
  unit: string;
  nominal: number;
  idle: number;
  variance: number;
  decimals: number;
};

const telemetryData: TelemetryItem[] = [
  { label: "CHAMBER P", unit: "bar", nominal: 7.2, idle: 0.0, variance: 0.3, decimals: 1 },
  { label: "OX FLOW", unit: "g/s", nominal: 28.4, idle: 0.0, variance: 1.2, decimals: 1 },
  { label: "THRUST", unit: "N", nominal: 70.0, idle: 0.0, variance: 2.5, decimals: 1 },
  { label: "MET", unit: "s", nominal: 0, idle: 0, variance: 0, decimals: 1 },
];

/*
 * Video phase mapping:
 *   0.00 – 0.08  Pre-ignition (idle, values at zero)
 *   0.08 – 0.15  Ignition ramp-up (values climb to nominal)
 *   0.15 – 0.70  Steady burn (nominal + noise)
 *   0.70 – 0.80  Cutoff / tail-off (values drop)
 *   0.80 – 1.00  Post-cutoff (idle, values at zero)
 *
 * These are approximate — adjust the thresholds if the video timing differs.
 */

function getPhaseMultiplier(phase: number): number {
  if (phase < 0.08) return 0;
  if (phase < 0.15) {
    // ramp up from 0 to 1
    return (phase - 0.08) / 0.07;
  }
  if (phase < 0.70) return 1;
  if (phase < 0.80) {
    // tail off from 1 to 0
    return 1 - (phase - 0.70) / 0.10;
  }
  return 0;
}

function getEngineState(phase: number): { label: string; color: string } {
  if (phase < 0.08) return { label: "PRE-IGNITION", color: "text-text-muted" };
  if (phase < 0.15) return { label: "IGNITION", color: "text-yellow-400" };
  if (phase < 0.70) return { label: "NOMINAL", color: "text-green-500" };
  if (phase < 0.80) return { label: "CUTOFF", color: "text-yellow-400" };
  return { label: "SHUTDOWN", color: "text-text-muted" };
}

function noisyValue(nominal: number, variance: number, multiplier: number): number {
  if (multiplier <= 0) return 0;
  const base = nominal * multiplier;
  const noise = (Math.random() - 0.5) * 2 * variance * multiplier;
  return base + noise;
}

type TelemetryHudProps = {
  videoPhase: number;
  videoDuration: number;
};

export function TelemetryHud({ videoPhase, videoDuration }: TelemetryHudProps) {
  const [values, setValues] = useState<number[]>(() =>
    telemetryData.map(() => 0)
  );
  const metStartRef = useRef<number | null>(null);
  const lastPhaseRef = useRef(0);

  useEffect(() => {
    // Detect video loop reset
    if (videoPhase < lastPhaseRef.current - 0.5) {
      metStartRef.current = null;
    }
    lastPhaseRef.current = videoPhase;

    const multiplier = getPhaseMultiplier(videoPhase);

    // Track MET from ignition start
    if (multiplier > 0 && metStartRef.current === null) {
      metStartRef.current = videoPhase;
    }
    if (multiplier <= 0) {
      metStartRef.current = null;
    }

    const met =
      metStartRef.current !== null && videoDuration > 0
        ? (videoPhase - metStartRef.current) * videoDuration
        : 0;

    setValues(
      telemetryData.map((d) => {
        if (d.label === "MET") return Math.max(0, met);
        return noisyValue(d.nominal, d.variance, multiplier);
      })
    );
  }, [videoPhase, videoDuration]);

  const engineState = getEngineState(videoPhase);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {telemetryData.map((item, i) => (
          <div key={item.label} className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </span>
            <span className="hud-value font-mono text-xs text-combustion">
              {values[i].toFixed(item.decimals)}
            </span>
            <span className="font-mono text-[9px] text-text-muted">{item.unit}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            engineState.label === "NOMINAL"
              ? "bg-green-500 animate-glow-pulse"
              : engineState.label === "IGNITION" || engineState.label === "CUTOFF"
              ? "bg-yellow-400"
              : "bg-text-muted"
          }`}
        />
        <span className={`font-mono text-[9px] ${engineState.color}`}>
          {engineState.label}
        </span>
      </div>
    </div>
  );
}
