import type { Metadata } from "next";
import Link from "next/link";
import { ReturnLink } from "@/components/return-link";
import { documents } from "@/data/documents";

export const metadata: Metadata = {
  title: "Technical Documents",
  description: "Full technical reports and presentations supporting the engineering work in Wonbee Park's portfolio.",
  alternates: {
    canonical: "/documents"
  }
};

export default function DocumentsPage() {
  return (
    <section className="space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="max-w-4xl space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Supporting Evidence</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Technical Documents</h1>
        <p className="leading-7 text-text-secondary">
          Complete reports and presentations that provide the full technical context behind selected portfolio work.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {documents.map((document) => (
          <Link
            key={document.slug}
            href={`/documents/${document.slug}`}
            className="group rounded-xl border border-border-dark bg-surface p-5 transition hover:border-combustion/40 sm:p-6"
          >
            <article className="space-y-4">
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-combustion">
                  {document.eyebrow}
                </p>
                <h2 className="text-lg font-semibold text-warm-white transition group-hover:text-combustion">
                  {document.title}
                </h2>
              </div>
              <p className="text-sm leading-6 text-text-secondary">{document.description}</p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-text-muted">
                <span className="rounded border border-border-dark px-2 py-1">{document.pageCount} pages</span>
                <span className="rounded border border-border-dark px-2 py-1">{document.fileSize}</span>
              </div>
              <p className="font-mono text-xs tracking-wider text-text-secondary transition group-hover:text-lox">
                Open document viewer &rarr;
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
