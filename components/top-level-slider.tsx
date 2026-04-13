"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TopLevelPanel = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  mediaSrc?: string;
  mediaAlt?: string;
  eyebrow?: string;
};

type TopLevelSliderProps = {
  panels: TopLevelPanel[];
};

export function TopLevelSlider({ panels }: TopLevelSliderProps) {
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setIndex((prev) => Math.min(panels.length - 1, prev + 1));

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border-dark bg-surface">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {panels.map((panel) => (
            <article key={panel.id} className="min-w-full p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-4">
                  {panel.eyebrow ? (
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">
                      {panel.eyebrow}
                    </p>
                  ) : null}
                  <h2 className="text-2xl font-semibold tracking-tight text-warm-white sm:text-3xl">
                    {panel.title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                    {panel.description}
                  </p>
                  <Link
                    href={panel.href}
                    className="inline-flex rounded-full border border-border-dark bg-surface-light px-4 py-2 font-mono text-xs tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
                  >
                    {panel.cta}
                  </Link>
                </div>
                <div className="overflow-hidden rounded-lg border border-border-dark">
                  {panel.mediaSrc ? (
                    <div className="relative aspect-[16/10] bg-surface-light">
                      <Image
                        src={panel.mediaSrc}
                        alt={panel.mediaAlt ?? panel.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center text-xs text-text-muted">
                      Curated portfolio section
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {panels.map((panel, dotIndex) => (
            <button
              key={panel.id}
              type="button"
              aria-label={`Go to ${panel.title}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-2 w-2 rounded-full transition ${
                index === dotIndex ? "bg-combustion" : "bg-border-dark hover:bg-border-hover"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="rounded border border-border-dark px-3 py-1.5 font-mono text-[10px] text-text-muted transition disabled:opacity-30 hover:border-border-hover hover:text-text-secondary"
          >
            PREV
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={index === panels.length - 1}
            className="rounded border border-border-dark px-3 py-1.5 font-mono text-[10px] text-text-muted transition disabled:opacity-30 hover:border-border-hover hover:text-text-secondary"
          >
            NEXT
          </button>
        </div>
      </div>
    </section>
  );
}
