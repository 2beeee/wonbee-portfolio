import type { Metadata } from "next";
import Link from "next/link";
import { ReturnLink } from "@/components/return-link";

const documentUrl = "/assets/docs/kimchi-engine-critical-design-review.pdf";

export const metadata: Metadata = {
  title: "Kimchi Engine Critical Design Review",
  description:
    "Full 30-page Critical Design Review for the Kimchi Engine pressure-fed LOX/Ethanol lander propulsion program.",
  alternates: {
    canonical: "/documents/kimchi-engine-critical-design-review"
  },
  openGraph: {
    title: "Kimchi Engine Critical Design Review",
    description:
      "Full technical document for the Kimchi Engine pressure-fed LOX/Ethanol lander propulsion program.",
    url: "/documents/kimchi-engine-critical-design-review",
    type: "article"
  }
};

const documentDetails = [
  { label: "Document", value: "Critical Design Review" },
  { label: "Author", value: "Kimchi Team" },
  { label: "Length", value: "30 pages" },
  { label: "File size", value: "5.94 MiB" }
];

export default function KimchiEngineCriticalDesignReviewPage() {
  return (
    <article className="space-y-8">
      <ReturnLink href="/projects/kimchi-2-5kn-lander-program" label="Back to Kimchi Project" />

      <header className="scroll-animate space-y-5 rounded-xl border border-border-dark bg-surface p-6 sm:p-8">
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">
            Technical Document · Project Kimchi
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-warm-white sm:text-4xl">
            Kimchi Engine Critical Design Review
          </h1>
          <p className="max-w-3xl leading-7 text-text-secondary">
            The complete technical review for the pressure-fed LOX/Ethanol lander propulsion program, provided as
            supporting evidence alongside the condensed application material.
          </p>
        </div>

        <dl className="grid gap-3 border-y border-border-dark py-4 sm:grid-cols-2 lg:grid-cols-4">
          {documentDetails.map((detail) => (
            <div key={detail.label}>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{detail.label}</dt>
              <dd className="mt-1 text-sm text-warm-white">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <a
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-lox bg-lox/10 px-4 py-2 font-mono text-xs font-medium text-lox transition hover:bg-lox/20"
          >
            Open PDF in New Tab
          </a>
          <a
            href={documentUrl}
            download="kimchi-engine-critical-design-review.pdf"
            className="rounded border border-border-hover px-4 py-2 font-mono text-xs font-medium text-text-secondary transition hover:border-combustion hover:text-combustion"
          >
            Download PDF
          </a>
        </div>
      </header>

      <section className="scroll-animate overflow-hidden rounded-xl border border-border-dark bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-border-dark px-4 py-3 sm:px-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-warm-white">Document Viewer</h2>
          <a
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-lox underline underline-offset-4 transition hover:text-combustion"
          >
            Full screen
          </a>
        </div>
        <iframe
          src={`${documentUrl}#view=FitH`}
          title="Kimchi Engine Critical Design Review PDF"
          className="h-[75vh] min-h-[560px] w-full bg-white"
        />
        <p className="border-t border-border-dark px-4 py-3 text-xs leading-5 text-text-muted sm:px-6">
          If the embedded viewer is unavailable on your browser, use “Open PDF in New Tab” or “Download PDF” above.
        </p>
      </section>

      <div className="pb-1">
        <Link
          href="/projects/kimchi-2-5kn-lander-program"
          className="font-mono text-xs text-text-muted transition hover:text-lox"
        >
          View Project Kimchi
        </Link>
      </div>
    </article>
  );
}
