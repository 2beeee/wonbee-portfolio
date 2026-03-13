import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Wonbee Park: systems-focused engineering across propulsion, controls, electronics, and prototyping."
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="leading-7 text-neutral-700">
        I work on engineering problems that require end-to-end ownership: defining requirements, building analysis models,
        implementing hardware/software, and validating outcomes through tests.
      </p>
      <p className="leading-7 text-neutral-700">
        My focus areas are propulsion, control, electronics, systems engineering, and practical making/building. I prefer
        workflows where assumptions are explicit, measurements are traceable, and iteration is grounded in evidence.
      </p>
      <p className="leading-7 text-neutral-700">
        The projects here reflect that approach: scoped experiments, clear tradeoffs, and incremental development toward
        robust systems.
      </p>
    </article>
  );
}
