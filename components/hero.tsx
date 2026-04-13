"use client";

import { useEffect, useState } from "react";
import { ParticleField } from "./particle-field";
import { TelemetryHud } from "./telemetry-hud";

type HeroProps = {
  name: string;
  role: string;
  intro: string;
  positioning: string;
};

export function Hero({ name, role, intro, positioning }: HeroProps) {
  const [revealed, setRevealed] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const [roleText, setRoleText] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect for role
  useEffect(() => {
    if (!revealed) return;
    const delay = setTimeout(() => {
      setRoleVisible(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setRoleText(role.slice(0, i));
        if (i >= role.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, name.length * 60 + 400);
    return () => clearTimeout(delay);
  }, [revealed, name, role]);

  const chars = name.split("");
  const contentReady = roleText.length >= role.length;

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden -mx-4 -mt-10 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 sm:-mt-12">
      {/* Particle background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base-black/50 via-transparent to-base-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl space-y-6 py-20">
        {/* Name — character reveal */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          {chars.map((char, i) => (
            <span
              key={i}
              className="char-reveal"
              style={{
                animationDelay: revealed ? `${i * 55}ms` : "0ms",
                animationPlayState: revealed ? "running" : "paused",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Role — typewriter */}
        <div className="h-8">
          {roleVisible && (
            <p className={`font-mono text-sm uppercase tracking-[0.25em] text-lox ${roleText.length < role.length ? "typewriter-cursor" : ""}`}>
              {roleText}
            </p>
          )}
        </div>

        {/* Intro text */}
        <div
          className="max-w-3xl space-y-3 transition-all duration-700"
          style={{
            opacity: contentReady ? 1 : 0,
            transform: contentReady ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <p className="text-base leading-7 text-warm-white/90 sm:text-lg">{intro}</p>
          <p className="text-sm leading-7 text-text-secondary sm:text-base">{positioning}</p>
        </div>

        {/* Telemetry HUD + Video */}
        <div
          className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] transition-all duration-700"
          style={{
            opacity: contentReady ? 1 : 0,
            transform: contentReady ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Video */}
          <div className="overflow-hidden rounded-lg border border-border-dark bg-black">
            <video
              className="h-full w-full object-cover"
              src="/assets/videos/rocket-70n/rocket-70n-test.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>

          {/* HUD panel */}
          <div className="flex flex-col justify-center rounded-lg border border-border-dark bg-surface/60 px-5 py-4 backdrop-blur-sm">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
              Live Telemetry — 70 N GOX/Ethanol Engine
            </p>
            <TelemetryHud />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-text-muted to-transparent animate-glow-pulse" />
      </div>
    </section>
  );
}
