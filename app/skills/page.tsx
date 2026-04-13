import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ReturnLink } from "@/components/return-link";
import { VerticalMediaCarousel } from "@/components/vertical-media-carousel";
import { SkillBars } from "@/components/skill-bars";
import { skillsShowcase } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Skills",
  description: "Hands-on capability layer including TIG welding, machining familiarity, and fabrication-focused execution."
};

export default function SkillsPage() {
  return (
    <section className="max-w-5xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Capabilities</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Skills</h1>
        <p className="max-w-3xl leading-7 text-text-secondary">{skillsShowcase.overview}</p>
      </header>

      {/* Skill bars */}
      <SkillBars />

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">Practical Capability Layer</h2>
          <ul className="space-y-2">
            {skillsShowcase.capabilityItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-combustion" />
                <span className="text-sm leading-6">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-6 text-text-muted">
            These skills are intentionally separated from project listings to show practical execution capability as its own
            layer.
          </p>
          <Link href="/projects" className="inline-flex font-mono text-xs text-lox transition hover:text-combustion">
            Go to Liquid Propulsion Projects &rarr;
          </Link>
        </article>

        <article className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">TIG Gallery</h2>
          <p className="text-sm leading-6 text-text-secondary">
            Uniform portrait framing with one-by-one horizontal navigation. The TIG clip runs as a muted looping visual for
            smooth viewing.
          </p>
          <VerticalMediaCarousel items={skillsShowcase.tigGallery} />
        </article>
      </section>

      <section className="scroll-animate grid gap-5 rounded-xl border border-border-dark bg-surface p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="space-y-3">
          <h2 className="text-lg font-semibold text-warm-white">Early Mechanical Exposure</h2>
          <p className="text-sm leading-6 text-text-secondary">
            Practical mechanical exposure started early through direct car maintenance support, which shaped comfort with
            tools, troubleshooting, and physical systems.
          </p>
          <div className="relative aspect-[9/16] max-w-xs overflow-hidden rounded-lg border border-border-dark">
            <Image
              src={skillsShowcase.earlyMechanical.image.src}
              alt={skillsShowcase.earlyMechanical.image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 340px"
              className="object-cover"
            />
          </div>
        </article>
        <article className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-combustion">Early Car Work</h3>
          <div className="relative aspect-[9/16] max-w-xs overflow-hidden rounded-lg border border-border-dark">
            <video
              className="h-full w-full object-cover"
              src={skillsShowcase.earlyMechanical.video.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <p className="font-mono text-[10px] text-text-muted">Short loop from practical maintenance time.</p>
        </article>
      </section>
    </section>
  );
}
