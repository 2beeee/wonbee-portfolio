import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { recapYears } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Recap Archive",
  description: "Yearly recap archive of Wonbee Park's engineering journey, ordered from latest year to earlier years."
};

export default function RecapPage() {
  return (
    <section className="max-w-5xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Recap Archive</h1>
        <p className="max-w-3xl leading-7 text-neutral-700">
          A yearly visual timeline. Latest year appears first, with older years continuing as you scroll down.
        </p>
      </header>

      <div className="space-y-8">
        {recapYears.map((entry) => (
          <article key={entry.year} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="space-y-1">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-neutral-500">{entry.year}</p>
              <h2 className="text-xl font-semibold text-neutral-900">{entry.title}</h2>
              <p className="text-sm leading-6 text-neutral-700">{entry.summary}</p>
            </div>
            <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900">
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={entry.video} />
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Failure Notes (UK RC Flight Tests)</h2>
        <p className="text-sm leading-6 text-neutral-700">
          Not every test succeeds. These short clips are kept to document iteration reality and reinforce disciplined
          learning from unsuccessful attempts.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900">
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src="/assets/videos/recaps/rc-failure-1.mp4" />
            </div>
            <p className="text-xs text-neutral-600">UK RC flight failure clip 1.</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900">
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" src="/assets/videos/recaps/rc-failure-2.mp4" />
            </div>
            <p className="text-xs text-neutral-600">UK RC flight failure clip 2.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
