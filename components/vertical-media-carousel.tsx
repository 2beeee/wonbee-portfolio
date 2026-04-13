"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShowcaseMedia } from "@/data/showcase";

type VerticalMediaCarouselProps = {
  items: ShowcaseMedia[];
};

export function VerticalMediaCarousel({ items }: VerticalMediaCarouselProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const next = () => setIndex((current) => (current + 1) % items.length);

  return (
    <section className="space-y-4">
      <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-border-dark bg-surface">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {items.map((item) => (
            <figure key={item.src} className="min-w-full p-3">
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-border-dark bg-black">
                {item.type === "video" ? (
                  <video className="h-full w-full object-cover" src={item.src} autoPlay loop muted playsInline preload="metadata" />
                ) : (
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover" />
                )}
              </div>
              {item.caption ? (
                <figcaption className="pt-2 text-center font-mono text-[10px] text-text-muted">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          className="rounded-lg border border-border-dark px-5 py-2.5 font-mono text-xs text-text-muted transition hover:border-border-hover hover:text-text-secondary"
        >
          PREV
        </button>
        {items.map((item, dotIndex) => (
          <button
            key={`${item.src}-dot`}
            type="button"
            aria-label={`Show media ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
            className={`h-3 w-3 rounded-full transition ${
              dotIndex === index ? "bg-combustion" : "bg-border-dark hover:bg-border-hover"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={next}
          className="rounded-lg border border-border-dark px-5 py-2.5 font-mono text-xs text-text-muted transition hover:border-border-hover hover:text-text-secondary"
        >
          NEXT
        </button>
      </div>
    </section>
  );
}
