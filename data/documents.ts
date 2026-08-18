export type PortfolioDocument = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  documentType: string;
  author: string;
  pageCount: number;
  fileSize: string;
  pdfPath: string;
  downloadName: string;
  backHref: string;
  backLabel: string;
};

export const documents: PortfolioDocument[] = [
  {
    slug: "kimchi-engine-critical-design-review",
    title: "Kimchi Engine Critical Design Review",
    description:
      "The complete technical review for the pressure-fed LOX/Ethanol lander propulsion program, provided as supporting evidence alongside the condensed application material.",
    eyebrow: "Technical Document - Project Kimchi",
    documentType: "Critical Design Review",
    author: "Kimchi Team",
    pageCount: 30,
    fileSize: "5.94 MiB",
    pdfPath: "/assets/docs/kimchi-engine-critical-design-review.pdf",
    downloadName: "kimchi-engine-critical-design-review.pdf",
    backHref: "/projects/kimchi-2-5kn-lander-program",
    backLabel: "Back to Kimchi Project"
  },
  {
    slug: "innospace-presentation",
    title: "Presentation for INNOSPACE",
    description:
      "A technical presentation covering propulsion, solid-rocket, and GNC research experience and the engineering work behind each program.",
    eyebrow: "Technical Presentation",
    documentType: "Presentation",
    author: "Wonbee Park",
    pageCount: 26,
    fileSize: "9.28 MiB",
    pdfPath: "/assets/docs/innospace-presentation.pdf",
    downloadName: "innospace-presentation.pdf",
    backHref: "/documents",
    backLabel: "Back to Documents"
  },
  {
    slug: "vtvl-autonomous-research-report",
    title: "EDF-Based VTVL and GNC Research Report",
    description:
      "The complete autonomous research report on the development of an EDF-based VTVL demonstrator and its low-cost, extensible GNC architecture.",
    eyebrow: "Research Report - VTVL / GNC",
    documentType: "Autonomous Research Report",
    author: "Wonbee Park and research team",
    pageCount: 72,
    fileSize: "7.13 MiB",
    pdfPath: "/assets/docs/vtvl-reference-report.pdf",
    downloadName: "edf-vtvl-gnc-research-report.pdf",
    backHref: "/projects/vtvl-edf-gnc-demonstrator",
    backLabel: "Back to VTVL Project"
  }
];

export function getDocumentBySlug(slug: string): PortfolioDocument | undefined {
  return documents.find((document) => document.slug === slug);
}
