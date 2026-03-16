import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Wonbee Park: propulsion-focused builder with practical systems execution, fabrication experience, and research-backed engineering growth."
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="leading-7 text-neutral-700">
          I focus on engineering work that must survive real constraints: schedule pressure, uncertain hardware behavior,
          and the need to make correct decisions with incomplete information.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Execution Discipline</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            I define requirements early, narrow risk through staged tests, and keep technical decisions traceable.
          </p>
        </article>
        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Hands-on Growth</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            My path started from practical making and now extends into propulsion architecture, GNC, and integrated test
            systems.
          </p>
        </article>
        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Pressure-ready Judgment</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            I stay calm under uncertainty, prioritize what matters, and convert failed assumptions into better next
            iterations.
          </p>
        </article>
      </section>

      <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Current Focus</h2>
        <p className="leading-7 text-neutral-700">
          Current work centers on LOX/Ethanol propulsion, VTVL control experimentation, and instrumentation systems that
          make every test cycle more informative.
        </p>
        <p className="leading-7 text-neutral-700">
          A major milestone in this trajectory was the{" "}
          <a href={siteConfig.documents.humantechPaper} className="underline underline-offset-4 hover:text-neutral-900">
            Samsung Humantech Gold Prize paper
          </a>
          , which reinforced the value of combining deep analysis with build/test practicality.
        </p>
      </section>
    </article>
  );
}
