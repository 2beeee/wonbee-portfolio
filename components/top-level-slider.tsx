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
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 shadow-sm">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {panels.map((panel) => (
            <article key={panel.id} className="min-w-full p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-4">
                  {panel.eyebrow ? (
                    <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-neutral-500">{panel.eyebrow}</p>
                  ) : null}
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{panel.title}</h2>
                  <p className="max-w-2xl text-sm leading-7 text-neutral-700 sm:text-base">{panel.description}</p>
                  <Link
                    href={panel.href}
                    className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500 hover:text-neutral-900"
                  >
                    {panel.cta}
                  </Link>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-2">
                  {panel.mediaSrc ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image src={panel.mediaSrc} alt={panel.mediaAlt ?? panel.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-neutral-300 text-sm text-neutral-500">
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
              className={`h-2.5 w-2.5 rounded-full transition ${index === dotIndex ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-500"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-neutral-500 hover:text-neutral-900"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={index === panels.length - 1}
            className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-neutral-500 hover:text-neutral-900"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
