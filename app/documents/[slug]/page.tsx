import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReturnLink } from "@/components/return-link";
import { documents, getDocumentBySlug } from "@/data/documents";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return documents.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    return { title: "Document Not Found" };
  }

  const pageUrl = `/documents/${document.slug}`;

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: document.title,
      description: document.description,
      url: pageUrl,
      type: "article"
    }
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    notFound();
  }

  const documentDetails = [
    { label: "Document", value: document.documentType },
    { label: "Author", value: document.author },
    { label: "Length", value: `${document.pageCount} pages` },
    { label: "File size", value: document.fileSize }
  ];

  return (
    <article className="space-y-8">
      <ReturnLink href={document.backHref} label={document.backLabel} />

      <header className="scroll-animate space-y-5 rounded-xl border border-border-dark bg-surface p-6 sm:p-8">
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">{document.eyebrow}</p>
          <h1 className="text-3xl font-bold tracking-tight text-warm-white sm:text-4xl">{document.title}</h1>
          <p className="max-w-3xl leading-7 text-text-secondary">{document.description}</p>
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
            href={document.pdfPath}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-lox bg-lox/10 px-4 py-2 font-mono text-xs font-medium text-lox transition hover:bg-lox/20"
          >
            Open PDF in New Tab
          </a>
          <a
            href={document.pdfPath}
            download={document.downloadName}
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
            href={document.pdfPath}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-lox underline underline-offset-4 transition hover:text-combustion"
          >
            Full screen
          </a>
        </div>
        <iframe
          src={`${document.pdfPath}#page=1&view=Fit`}
          title={`${document.title} PDF`}
          className="h-[88dvh] min-h-[720px] max-h-[1100px] w-full bg-white"
        />
        <p className="border-t border-border-dark px-4 py-3 text-xs leading-5 text-text-muted sm:px-6">
          The viewer is set to fit one complete page. If it is unavailable on your browser, use &quot;Open PDF in New
          Tab&quot; or &quot;Download PDF&quot; above.
        </p>
      </section>

      <div className="flex flex-wrap gap-4 pb-1">
        <Link href="/documents" className="font-mono text-xs text-text-muted transition hover:text-lox">
          Browse all documents
        </Link>
        {document.backHref !== "/documents" ? (
          <Link href={document.backHref} className="font-mono text-xs text-text-muted transition hover:text-combustion">
            {document.backLabel.replace("Back to ", "View ")}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
