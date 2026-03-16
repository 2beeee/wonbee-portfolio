import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ReturnLink } from "@/components/return-link";
import { VerticalMediaCarousel } from "@/components/vertical-media-carousel";
import { skillsShowcase } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Skills",
  description: "Hands-on capability layer including TIG welding, machining familiarity, and fabrication-focused execution."
};

export default function SkillsPage() {
  return (
    <section className="max-w-5xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
        <p className="max-w-3xl leading-7 text-neutral-700">{skillsShowcase.overview}</p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Practical Capability Layer</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {skillsShowcase.capabilityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm leading-6 text-neutral-700">
            These skills are intentionally separated from project listings to show practical execution capability as its own
            layer.
          </p>
          <Link href="/projects" className="inline-flex text-sm text-neutral-700 underline underline-offset-4 hover:text-neutral-900">
            Go to Liquid Propulsion Projects
          </Link>
        </article>

        <article className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">TIG Gallery</h2>
          <p className="text-sm leading-6 text-neutral-700">
            Uniform portrait framing with one-by-one horizontal navigation. The TIG clip runs as a muted looping visual for
            smooth viewing.
          </p>
          <VerticalMediaCarousel items={skillsShowcase.tigGallery} />
        </article>
      </section>

      <section className="grid gap-5 rounded-2xl border border-neutral-200 bg-white p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="space-y-3">
          <h2 className="text-lg font-semibold">Early Mechanical Exposure</h2>
          <p className="text-sm leading-6 text-neutral-700">
            Practical mechanical exposure started early through direct car maintenance support, which shaped comfort with
            tools, troubleshooting, and physical systems.
          </p>
          <div className="relative aspect-[9/16] max-w-xs overflow-hidden rounded-xl border border-neutral-200">
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
          <h3 className="text-sm font-semibold text-neutral-900">Early Car Work</h3>
          <div className="relative aspect-[9/16] max-w-xs overflow-hidden rounded-xl border border-neutral-200">
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
          <p className="text-xs text-neutral-600">Short loop from practical maintenance time.</p>
        </article>
      </section>
    </section>
  );
}
