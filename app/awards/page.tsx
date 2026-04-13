import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { ImageCarousel } from "@/components/image-carousel";
import { awardShowcase } from "@/data/showcase";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Samsung Humantech Paper Awards",
  description: "Samsung Humantech Gold Prize project context and reference material."
};

export default function AwardsPage() {
  return (
    <section className="max-w-5xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      {/* Dramatic full-bleed header */}
      <header className="scroll-animate relative overflow-hidden rounded-xl border border-border-dark bg-surface p-8 sm:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-combustion/10 via-transparent to-lox/5" />
        <div className="relative space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">
            {awardShowcase.title}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-warm-white sm:text-5xl lg:text-6xl">
            {awardShowcase.subtitle}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-text-secondary">{awardShowcase.summary}</p>
        </div>
      </header>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Why This Matters</h2>
        <ul className="space-y-3">
          {awardShowcase.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-text-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-combustion" />
              <span className="text-sm leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Award Gallery</h2>
        <p className="text-sm leading-6 text-text-secondary">
          Curated visuals from the Humantech context, shown one at a time for clarity.
        </p>
        <ImageCarousel items={awardShowcase.media} />
      </section>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Reference Files</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={awardShowcase.paperUrl}
            className="rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
          >
            Open Gold Prize Paper Source (DOCX)
          </a>
          <a
            href={siteConfig.documents.vtvlReport}
            className="rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-lox/50 hover:text-lox"
          >
            Open VTVL Report (PDF)
          </a>
        </div>
      </section>
    </section>
  );
}
