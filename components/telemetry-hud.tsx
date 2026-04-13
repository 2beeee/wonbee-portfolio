"use client";

import { useEffect, useState } from "react";

type TelemetryItem = {
  label: string;
  unit: string;
  nominal: number;
  variance: number;
  decimals: number;
};

const telemetryData: TelemetryItem[] = [
  { label: "CHAMBER P", unit: "bar", nominal: 7.2, variance: 0.3, decimals: 1 },
  { label: "OX FLOW", unit: "g/s", nominal: 28.4, variance: 1.2, decimals: 1 },
  { label: "THRUST", unit: "N", nominal: 70.0, variance: 2.5, decimals: 1 },
  { label: "MET", unit: "s", nominal: 0, variance: 0, decimals: 1 },
];

function noisyValue(nominal: number, variance: number): number {
  return nominal + (Math.random() - 0.5) * 2 * variance;
}

export function TelemetryHud() {
  const [values, setValues] = useState<number[]>(() =>
    telemetryData.map((d) => (d.label === "MET" ? 0 : noisyValue(d.nominal, d.variance)))
  );

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setValues(
        telemetryData.map((d) =>
          d.label === "MET" ? elapsed : noisyValue(d.nominal, d.variance)
        )
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
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
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-glow-pulse" />
        <span className="font-mono text-[9px] text-text-muted">NOMINAL</span>
      </div>
    </div>
  );
}
