"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CampaignCategory = {
  id: string;
  label: string;
  count: number;
};

type CampaignGalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
  category: string;
  width: number;
  height: number;
};

type CampaignGalleryProps = {
  categories: CampaignCategory[];
  items: CampaignGalleryItem[];
};

const allCategoryId = "all";

function formatFallbackLabel(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getTileLayout(item: CampaignGalleryItem, index: number) {
  const ratio = item.width / Math.max(item.height, 1);
  const isTall = ratio < 0.8;
  const isFeature = index % 11 === 0;

  return {
    colClass: isFeature ? "sm:col-span-2" : "",
    rowSpan: isTall ? 5 : isFeature ? 4 : 3,
  };
}

export function CampaignGallery({ categories, items }: CampaignGalleryProps) {
  const [activeCategory, setActiveCategory] = useState(allCategoryId);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const dialogTitleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const countsByCategory = useMemo(
    () =>
      items.reduce<Record<string, number>>((counts, item) => {
        counts[item.category] = (counts[item.category] ?? 0) + 1;
        return counts;
      }, {}),
    [items],
  );

  const mergedCategories = useMemo(() => {
    const knownCategoryIds = new Set(categories.map((category) => category.id));
    const result = categories.map((category) => ({
      ...category,
      count: countsByCategory[category.id] ?? category.count,
    }));

    for (const item of items) {
      if (!knownCategoryIds.has(item.category)) {
        knownCategoryIds.add(item.category);
        result.push({
          id: item.category,
          label: formatFallbackLabel(item.category),
          count: countsByCategory[item.category] ?? 0,
        });
      }
    }

    return result;
  }, [categories, countsByCategory, items]);

  const categoryLabelById = useMemo(
    () =>
      Object.fromEntries(mergedCategories.map((category) => [category.id, category.label])) as Record<
        string,
        string
      >,
    [mergedCategories],
  );

  const filteredItems = useMemo(
    () =>
      activeCategory === allCategoryId
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  const filteredImages = useMemo(
    () => filteredItems.filter((item) => item.type === "image"),
    [filteredItems],
  );

  const activeImageIndex = useMemo(
    () => (activeImageId === null ? -1 : filteredImages.findIndex((item) => item.id === activeImageId)),
    [activeImageId, filteredImages],
  );

  const activeImage = activeImageIndex >= 0 ? filteredImages[activeImageIndex] : null;
  const isLightboxOpen = activeImage !== null;

  const closeLightbox = useCallback(() => setActiveImageId(null), []);

  const goToImage = useCallback(
    (offset: number) => {
      if (activeImageIndex < 0 || filteredImages.length === 0) {
        return;
      }

      const nextIndex = (activeImageIndex + offset + filteredImages.length) % filteredImages.length;
      setActiveImageId(filteredImages[nextIndex]?.id ?? null);
    },
    [activeImageIndex, filteredImages],
  );

  useEffect(() => {
    if (activeImageId && !filteredImages.some((item) => item.id === activeImageId)) {
      setActiveImageId(null);
    }
  }, [activeImageId, filteredImages]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const overlay = overlayRef.current;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== overlay,
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      hadInert: element.hasAttribute("inert"),
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, hadInert, ariaHidden }) => {
        if (!hadInert) {
          element.removeAttribute("inert");
        }
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
      lastTriggerRef.current?.focus();
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowRight" && filteredImages.length > 1) {
        event.preventDefault();
        goToImage(1);
      } else if (event.key === "ArrowLeft" && filteredImages.length > 1) {
        event.preventDefault();
        goToImage(-1);
      } else if (event.key === "Tab") {
        const focusableElements = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.offsetWidth > 0 || element.offsetHeight > 0);

        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);
        if (!firstElement || !lastElement) {
          event.preventDefault();
        } else if (event.shiftKey && (document.activeElement === firstElement || !dialogRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && (document.activeElement === lastElement || !dialogRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, filteredImages.length, goToImage, isLightboxOpen]);

  return (
    <section className="space-y-6" aria-labelledby="campaign-gallery-title">
      <div className="flex flex-wrap gap-2" aria-label="Filter campaign gallery">
        <button
          type="button"
          onClick={() => setActiveCategory(allCategoryId)}
          aria-pressed={activeCategory === allCategoryId}
          className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
            activeCategory === allCategoryId
              ? "border-combustion bg-combustion/10 text-combustion"
              : "border-border-dark text-text-muted hover:border-border-hover hover:text-warm-white"
          }`}
        >
          All media ({items.length})
        </button>

        {mergedCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
              activeCategory === category.id
                ? "border-lox bg-lox/10 text-lox"
                : "border-border-dark text-text-muted hover:border-border-hover hover:text-warm-white"
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      <div className="grid auto-rows-[5.5rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:[grid-auto-flow:dense] xl:grid-cols-3 xl:auto-rows-[6rem]">
        {filteredItems.map((item, index) => {
          const layout = getTileLayout(item, index);

          return (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-xl border border-border-dark bg-surface ${layout.colClass}`}
              style={{ gridRow: `span ${layout.rowSpan} / span ${layout.rowSpan}` }}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3">
                <span className="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-warm-white backdrop-blur-sm">
                  {categoryLabelById[item.category] ?? formatFallbackLabel(item.category)}
                </span>
                <span className="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-secondary backdrop-blur-sm">
                  {item.type}
                </span>
              </div>

              {item.type === "image" ? (
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Open image: ${item.caption}`}
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget;
                    setActiveImageId(item.id);
                  }}
                  className="relative block h-full w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-lox"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 34vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-medium leading-6 text-warm-white">{item.caption}</p>
                  </div>
                </button>
              ) : (
                <figure className="relative h-full w-full">
                  <video
                    className="h-full w-full bg-black object-cover"
                    src={item.src}
                    aria-label={item.alt}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12">
                    <p className="text-sm font-medium leading-6 text-warm-white">{item.caption}</p>
                  </figcaption>
                </figure>
              )}
            </article>
          );
        })}
      </div>

      {activeImage && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={overlayRef}
              className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
              role="presentation"
              onClick={closeLightbox}
            >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="flex min-h-full items-center justify-center p-3 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex h-[min(92vh,56rem)] w-full max-w-6xl flex-col gap-4 rounded-2xl border border-border-hover bg-[#050505] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-combustion">
                    {categoryLabelById[activeImage.category] ?? formatFallbackLabel(activeImage.category)}
                  </p>
                  <h3 id={dialogTitleId} className="truncate text-base font-semibold text-warm-white sm:text-lg">
                    {activeImage.caption}
                  </h3>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  className="shrink-0 rounded-full border border-border-dark px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted hover:border-border-hover hover:text-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-lox"
                  aria-label="Close full-screen gallery"
                >
                  Close
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-border-dark bg-black">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />

                {filteredImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => goToImage(-1)}
                      aria-label="Show previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/65 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-warm-white backdrop-blur-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lox"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => goToImage(1)}
                      aria-label="Show next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/65 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-warm-white backdrop-blur-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lox"
                    >
                      Next
                    </button>
                  </>
                ) : null}
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-border-dark pt-3">
                <p className="max-w-3xl text-xs leading-5 text-text-secondary sm:text-sm">{activeImage.alt}</p>
                <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                  {activeImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
