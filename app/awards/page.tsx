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
    <section className="max-w-4xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-neutral-500">
          {awardShowcase.title}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{awardShowcase.subtitle}</h1>
        <p className="leading-7 text-neutral-700">{awardShowcase.summary}</p>
      </header>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Why This Matters</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-neutral-700">
          {awardShowcase.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Award Gallery</h2>
        <p className="text-sm leading-6 text-neutral-700">
          Curated visuals from the Humantech context, shown one at a time for clarity.
        </p>
        <ImageCarousel items={awardShowcase.media} />
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Reference Files</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={awardShowcase.paperUrl}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500"
          >
            Open Gold Prize Paper Source (DOCX)
          </a>
          <a
            href={siteConfig.documents.vtvlReport}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500"
          >
            Open VTVL Report (PDF)
          </a>
        </div>
      </section>
    </section>
  );
}
