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
    <section className="max-w-4xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Profile</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Resume</h1>
        <p className="leading-7 text-text-secondary">
          Systems-oriented engineer focused on propulsion, controls, instrumentation, and field-ready design-build-test
          execution.
        </p>
      </header>

      <section className="scroll-animate relative overflow-hidden rounded-xl border border-border-dark bg-surface p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-combustion/5 via-transparent to-transparent" />
        <div className="relative space-y-3">
          <h2 className="text-lg font-semibold text-warm-white">Selected Distinction</h2>
          <p className="leading-7 text-text-secondary">
            <span className="font-medium text-combustion">Samsung Humantech Paper Awards (32nd) - Gold Prize.</span>{" "}
            Awarded for injector-focused liquid rocket research centered on the PINTOSWIRL concept.
          </p>
          <a
            href={siteConfig.documents.humantechPaper}
            className="inline-flex rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
          >
            Open Award-winning Paper Source
          </a>
        </div>
      </section>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Core Capabilities</h2>
        <ul className="space-y-3">
          {[
            "Propulsion system framing, injector/chamber trade studies, and phased hot-fire planning",
            "Control-oriented modeling and GNC experimentation for VTVL-like dynamics",
            "DAQ and instrumentation architecture for repeatable and trustworthy test data",
            "Cross-domain integration across mechanical, electrical, and software boundaries",
            "Fabrication-aware design with practical TIG welding and build-quality considerations",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-text-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-combustion" />
              <span className="text-sm leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Documents</h2>
        <ul className="space-y-2">
          <li>
            <a href={siteConfig.documents.vtvlReport} className="text-sm text-lox underline underline-offset-4 transition hover:text-combustion">
              VTVL Reference Report (PDF)
            </a>
          </li>
          <li>
            <a href={siteConfig.documents.humantechPaper} className="text-sm text-lox underline underline-offset-4 transition hover:text-combustion">
              Humantech Gold Prize Paper Source (DOCX)
            </a>
          </li>
        </ul>
      </section>

      <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Detailed CV</h2>
        {siteConfig.links.resumePdf ? (
          <a
            href={siteConfig.links.resumePdf}
            className="inline-flex rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
            target="_blank"
            rel="noreferrer"
          >
            Open PDF Resume
          </a>
        ) : (
          <p className="leading-7 text-text-secondary">
            A detailed PDF resume is available on request. Contact via{" "}
            <a href={siteConfig.links.email} className="text-lox underline underline-offset-4 transition hover:text-combustion">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        )}
      </section>
    </section>
  );
}
