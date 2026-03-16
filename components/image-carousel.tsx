"use client";

import { useState } from "react";
import Image from "next/image";

type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageCarouselProps = {
  items: CarouselImage[];
  aspectClass?: string;
};

export function ImageCarousel({ items, aspectClass = "aspect-[16/10]" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const next = () => setIndex((current) => (current + 1) % items.length);

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item) => (
            <figure key={item.src} className="min-w-full p-3">
              <div className={`relative overflow-hidden rounded-xl border border-neutral-200 ${aspectClass}`}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
              </div>
              {item.caption ? <figcaption className="pt-2 text-center text-xs text-neutral-600">{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900"
        >
          Previous
        </button>
        {items.map((item, dotIndex) => (
          <button
            key={`${item.src}-dot`}
            type="button"
            aria-label={`Show image ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
            className={`h-2.5 w-2.5 rounded-full transition ${dotIndex === index ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-500"}`}
          />
        ))}
        <button
          type="button"
          onClick={next}
          className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900"
        >
          Next
        </button>
      </div>
    </section>
  );
}
