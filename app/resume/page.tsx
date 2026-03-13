import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Concise summary of technical capabilities, work focus, and activities."
};

export default function ResumePage() {
  return (
    <section className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p className="leading-7 text-neutral-700">
          Systems-oriented engineer with hands-on experience across propulsion experiments, control simulation, and test
          electronics integration.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Technical Capabilities</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-neutral-700">
          <li>System decomposition, requirement-driven design, and technical trade studies</li>
          <li>Dynamic modeling and control-oriented simulation workflows</li>
          <li>Instrumentation planning, DAQ setup, and test-data interpretation</li>
          <li>Cross-domain prototyping across mechanical, electrical, and software boundaries</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Awards / Activities</h2>
        <p className="leading-7 text-neutral-700">
          Add your specific awards, research activities, and leadership records here.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">PDF</h2>
        <p className="leading-7 text-neutral-700">A downloadable PDF link can be added after final formatting: <span className="font-[var(--font-mono)]">#</span></p>
      </section>
    </section>
  );
}
