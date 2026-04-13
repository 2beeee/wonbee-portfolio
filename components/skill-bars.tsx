"use client";

import { useEffect, useRef, useState } from "react";

type Skill = {
  name: string;
  level: number;
  domain: string;
  color: "combustion" | "lox";
};

const skills: Skill[] = [
  { name: "Propulsion Systems", level: 85, domain: "Core Engineering", color: "combustion" },
  { name: "TIG Welding & Fabrication", level: 80, domain: "Core Engineering", color: "combustion" },
  { name: "Injector Design & Analysis", level: 78, domain: "Core Engineering", color: "combustion" },
  { name: "DAQ & Instrumentation", level: 75, domain: "Systems", color: "lox" },
  { name: "GNC / Control Systems", level: 65, domain: "Systems", color: "lox" },
  { name: "CAD & Mechanical Design", level: 72, domain: "Systems", color: "lox" },
  { name: "Test Operations", level: 82, domain: "Execution", color: "combustion" },
  { name: "Technical Communication", level: 80, domain: "Execution", color: "combustion" },
];

const domains = ["Core Engineering", "Systems", "Execution"] as const;

export function SkillBars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6 rounded-xl border border-border-dark bg-surface p-6">
      <h2 className="text-lg font-semibold text-warm-white">Capability Map</h2>

      {domains.map((domain) => (
        <div key={domain} className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{domain}</p>
          <div className="space-y-2.5">
            {skills
              .filter((s) => s.domain === domain)
              .map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-text-secondary">{skill.name}</span>
                    <span className="font-mono text-[10px] text-text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border-dark">
                    <div
                      className={`h-full rounded-full ${
                        skill.color === "combustion"
                          ? "bg-gradient-to-r from-combustion/80 to-combustion"
                          : "bg-gradient-to-r from-lox/80 to-lox"
                      }`}
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                        transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
                        transitionDelay: "200ms",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
