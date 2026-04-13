import type { Metadata } from "next";
import Image from "next/image";
import { ReturnLink } from "@/components/return-link";
import { personalMoments } from "@/data/showcase";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Wonbee Park: propulsion-focused builder with practical systems execution, fabrication experience, and research-backed engineering growth."
};

export default function AboutPage() {
  return (
    <article className="max-w-5xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">About</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">About</h1>
        <p className="max-w-3xl leading-7 text-text-secondary">
          I focus on engineering work that must survive real constraints: schedule pressure, uncertain hardware behavior,
          and the need to make correct decisions with incomplete information.
        </p>
      </header>

      {/* Two-column editorial layout */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left — main content */}
        <div className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Execution Discipline", text: "I define requirements early, narrow risk through staged tests, and keep technical decisions traceable." },
              { title: "Hands-on Growth", text: "My path started from practical making and now extends into propulsion architecture, GNC, and integrated test systems." },
              { title: "Pressure-ready Judgment", text: "I stay calm under uncertainty, prioritize what matters, and convert failed assumptions into better next iterations." },
            ].map((card) => (
              <article key={card.title} className="scroll-animate rounded-xl border border-border-dark bg-surface p-5 card-glow">
                <h2 className="font-mono text-xs font-medium tracking-wider text-combustion">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
            <h2 className="text-lg font-semibold text-warm-white">Current Focus</h2>
            <p className="leading-7 text-text-secondary">
              Current work centers on LOX/Ethanol propulsion, VTVL control experimentation, and instrumentation systems that
              make every test cycle more informative.
            </p>
            <p className="leading-7 text-text-secondary">
              A major milestone in this trajectory was the{" "}
              <a href={siteConfig.documents.humantechPaper} className="text-lox underline underline-offset-4 transition hover:text-combustion">
                Samsung Humantech Gold Prize paper
              </a>
              , which reinforced the value of combining deep analysis with build/test practicality.
            </p>
            <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-lg border border-border-dark">
              <Image src={personalMoments[0].src} alt={personalMoments[0].alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
            </div>
          </section>
        </div>

        {/* Right — timeline */}
        <aside className="scroll-animate-right space-y-6">
          <div className="accent-line-left pl-5 space-y-6">
            {[
              { year: "2023", event: "Automotive turbocharger gas turbine build", detail: "First high-energy hardware milestone" },
              { year: "2024", event: "70 N GOX/Ethanol liquid rocket", detail: "Foundational propulsion baseline established" },
              { year: "2025", event: "Kimchi Project 2.5 kN lander scope", detail: "Mission-framed propulsion program" },
              { year: "2025", event: "Samsung Humantech Gold Prize", detail: "PINTOSWIRL injector research recognition" },
              { year: "2025", event: "VTVL GNC demonstrator", detail: "Control architecture & test-method rigor" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-combustion">{item.year}</p>
                <p className="text-sm font-medium text-warm-white">{item.event}</p>
                <p className="text-xs text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Small Human Notes</h2>
        <p className="text-sm leading-6 text-text-secondary">
          A few quiet childhood snapshots are included intentionally as context for how practical curiosity started early.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {personalMoments.slice(2, 5).map((item) => (
            <div key={item.src} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border-dark">
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
