import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { MediaFrame } from "@/components/media-frame";
import { tedxShowcase } from "@/data/showcase";

export const metadata: Metadata = {
  title: "TEDx",
  description: "TEDx speaking and technical communication portfolio materials for Wonbee Park."
};

export default function TedxPage() {
  return (
    <section className="max-w-5xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Public Speaking</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">TEDx</h1>
        <p className="max-w-3xl leading-7 text-text-secondary">{tedxShowcase.summary}</p>
        <a
          href={tedxShowcase.talkUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
        >
          Watch TEDx Talk (starts at 1:19:30)
        </a>
      </header>

      <section className="scroll-animate grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tedxShowcase.media.map((item, index) => (
          <MediaFrame
            key={item.src}
            media={{ ...item, type: "image", orientation: "landscape" }}
            compact
            priority={index === 0}
          />
        ))}
      </section>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">International Community Exchange</h2>
        <p className="text-sm leading-6 text-text-secondary">
          Collaboration and conversation with global rocketry communities are a meaningful part of long-term growth.
        </p>
        <MediaFrame
          media={{ type: "image", src: tedxShowcase.communityImage.src, alt: tedxShowcase.communityImage.alt, orientation: "landscape" }}
          compact
        />
      </section>
    </section>
  );
}
