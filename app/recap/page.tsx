import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { recapYears } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Recap Archive",
  description: "Yearly recap archive of Wonbee Park's engineering journey, ordered from latest year to earlier years."
};

export default function RecapPage() {
  return (
    <section className="max-w-5xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Archive</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Recap Archive</h1>
        <p className="max-w-3xl leading-7 text-text-secondary">
          A yearly visual timeline. Latest year appears first, with older years continuing as you scroll down.
        </p>
      </header>

      {/* Masonry-style cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {recapYears.map((entry, i) => (
          <article
            key={entry.year}
            className={`scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6 card-glow ${
              i === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-combustion">{entry.year}</p>
              <h2 className="text-xl font-semibold text-warm-white">{entry.title}</h2>
              <p className="text-sm leading-6 text-text-secondary">{entry.summary}</p>
            </div>
            <div className={`mx-auto overflow-hidden rounded-lg border border-border-dark bg-black ${i === 0 ? "max-w-lg" : "max-w-sm"}`}>
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={entry.video} />
            </div>
          </article>
        ))}
      </div>

      <section className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <h2 className="text-lg font-semibold text-warm-white">Failure Notes (UK RC Flight Tests)</h2>
        <p className="text-sm leading-6 text-text-secondary">
          Not every test succeeds. These short clips are kept to document iteration reality and reinforce disciplined
          learning from unsuccessful attempts.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-border-dark bg-black">
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src="/assets/videos/recaps/rc-failure-1.mp4" />
            </div>
            <p className="font-mono text-[10px] text-text-muted">UK RC flight failure clip 1.</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-border-dark bg-black">
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src="/assets/videos/recaps/rc-failure-2.mp4" />
            </div>
            <p className="font-mono text-[10px] text-text-muted">UK RC flight failure clip 2.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
