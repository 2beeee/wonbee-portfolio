import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume summary for Wonbee Park: propulsion projects, design-build-test execution, fabrication capability, and Samsung Humantech Gold distinction."
};

export default function ResumePage() {
  return (
    <section className="max-w-4xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <p className="leading-7 text-neutral-700">
          Systems-oriented engineer focused on propulsion, controls, instrumentation, and field-ready design-build-test
          execution.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Selected Distinction</h2>
        <p className="leading-7 text-neutral-700">
          <span className="font-medium text-neutral-900">Samsung Humantech Paper Awards (32nd) - Gold Prize.</span>{" "}
          Awarded for injector-focused liquid rocket research centered on the PINTOSWIRL concept.
        </p>
        <a
          href={siteConfig.documents.humantechPaper}
          className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500"
        >
          Open Award-winning Paper Source
        </a>
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Core Capabilities</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-neutral-700">
          <li>Propulsion system framing, injector/chamber trade studies, and phased hot-fire planning</li>
          <li>Control-oriented modeling and GNC experimentation for VTVL-like dynamics</li>
          <li>DAQ and instrumentation architecture for repeatable and trustworthy test data</li>
          <li>Cross-domain integration across mechanical, electrical, and software boundaries</li>
          <li>Fabrication-aware design with practical TIG welding and build-quality considerations</li>
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Documents</h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li>
            <a href={siteConfig.documents.vtvlReport} className="underline underline-offset-4 hover:text-neutral-900">
              VTVL Reference Report (PDF)
            </a>
          </li>
          <li>
            <a href={siteConfig.documents.humantechPaper} className="underline underline-offset-4 hover:text-neutral-900">
              Humantech Gold Prize Paper Source (DOCX)
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Detailed CV</h2>
        {siteConfig.links.resumePdf ? (
          <a
            href={siteConfig.links.resumePdf}
            className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500"
            target="_blank"
            rel="noreferrer"
          >
            Open PDF Resume
          </a>
        ) : (
          <p className="leading-7 text-neutral-700">
            A detailed PDF resume is available on request. Contact via{" "}
            <a href={siteConfig.links.email} className="underline underline-offset-4 hover:text-neutral-900">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        )}
      </section>
    </section>
  );
}
