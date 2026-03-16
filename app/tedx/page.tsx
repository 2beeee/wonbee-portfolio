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
    <section className="max-w-5xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">TEDx</h1>
        <p className="max-w-3xl leading-7 text-neutral-700">{tedxShowcase.summary}</p>
        <a
          href={tedxShowcase.talkUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500"
        >
          Watch TEDx Talk (starts at 1:19:30)
        </a>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tedxShowcase.media.map((item, index) => (
          <MediaFrame
            key={item.src}
            media={{ ...item, type: "image", orientation: "landscape" }}
            compact
            priority={index === 0}
          />
        ))}
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">International Community Exchange</h2>
        <p className="text-sm leading-6 text-neutral-700">
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
