import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CampaignGallery } from "@/components/campaign-gallery";
import { ReturnLink } from "@/components/return-link";
import {
  campaignCategories,
  campaignHero,
  campaignMedia,
  type CampaignMediaItem,
} from "@/data/race2space-campaign";

export const metadata: Metadata = {
  title: "Race2Space 2026 Engineering Campaign",
  description:
    "A photo-led engineering record of the Kimchi Engine campaign, from design review and manufacturing to eight hot-fire tests in the United Kingdom.",
  openGraph: {
    title: "Race2Space 2026 Engineering Campaign",
    description:
      "Design, manufacture, field integration, and Test 8 of the LOX/IPA Kimchi Engine.",
    url: "https://wonbee.kr/projects/race2space-2026-engineering-campaign",
    images: [
      {
        url: "https://wonbee.kr/assets/race2space-2026/images/39-campaign-image.webp",
        width: 3833,
        height: 2159,
        alt: "Kimchi Engine exhaust plume during Race2Space Test 8",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Race2Space 2026 Engineering Campaign",
    description: "A photo-led record of the Kimchi Engine design-build-test campaign.",
    images: ["https://wonbee.kr/assets/race2space-2026/images/39-campaign-image.webp"],
  },
};

const mediaById = new Map(campaignMedia.map((item) => [item.id, item]));

function getImage(id: string) {
  const item = mediaById.get(id);
  if (!item || item.type !== "image") {
    throw new Error(`Campaign image not found: ${id}`);
  }
  return item;
}

function EditorialImage({
  item,
  className = "aspect-[16/10]",
  priority = false,
}: {
  item: CampaignMediaItem;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className="space-y-2">
      <div className={`relative overflow-hidden rounded-xl border border-border-dark bg-surface-light ${className}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <figcaption className="font-mono text-[10px] leading-5 text-text-muted">{item.caption}</figcaption>
    </figure>
  );
}

const campaignTimeline = [
  {
    date: "05 JAN 2026",
    title: "PDR submitted",
    detail: "Initial 1.0–2.5 kN regenerative-cooling concept and development direction defined.",
  },
  {
    date: "APR 2026",
    title: "CDR configuration fixed",
    detail: "The test engine converged on a smaller 1.3 kN design point and a revised injector architecture.",
  },
  {
    date: "JUN 2026",
    title: "Inconel hardware completed",
    detail: "Two-part additively manufactured hardware moved through post-processing, assembly, and verification.",
  },
  {
    date: "12–15 JUN",
    title: "Domestic readiness campaign",
    detail: "Igniter and controls testing exposed a power-margin and communications weakness before main-engine firing.",
  },
  {
    date: "19 JUN",
    title: "Bristol technical exchange",
    detail: "Student teams compared propulsion hardware, packaging choices, and lessons learned face to face.",
  },
  {
    date: "22 JUN",
    title: "Race2Space Test 8",
    detail: "The campaign closed with sustained LOX/IPA combustion and a stable data window for performance analysis.",
  },
];

const measuredResults = [
  { value: "14.05 ± 0.18", unit: "bar(g)", label: "Chamber pressure" },
  { value: "1194 ± 33", unit: "N", label: "Measured thrust" },
  { value: "0.701", unit: "kg/s", label: "Total mass flow" },
  { value: "13.46", unit: "s", label: "Pressure response" },
];

export default function Race2SpaceEngineeringCampaignPage() {
  const earlyConcept = getImage("media-56");
  const finalCad = getImage("media-03");
  const coolingChannels = getImage("media-02");
  const waterFlow = getImage("media-36");
  const hydroTest = getImage("media-38");
  const domesticControls = getImage("media-49");
  const finalAssembly = getImage("media-22");
  const bristolExchange = getImage("media-30");
  const fieldIntegration = getImage("media-09");
  const postTest = getImage("media-13");

  return (
    <article className="space-y-16">
      <ReturnLink href="/projects" label="Back to Liquid Propulsion" />

      <header className="scroll-animate relative min-h-[34rem] overflow-hidden rounded-2xl border border-border-dark bg-surface sm:min-h-[40rem]">
        <Image
          src={campaignHero.src}
          alt={campaignHero.alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1152px"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.76)_0%,rgba(10,10,10,0.30)_65%,rgba(10,10,10,0.12)_100%),linear-gradient(180deg,rgba(10,10,10,0.06)_0%,rgba(10,10,10,0.18)_52%,rgba(10,10,10,0.78)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 space-y-5 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-combustion/40 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-combustion backdrop-blur-sm">
              Race2Space 2026
            </span>
            <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-warm-white backdrop-blur-sm">
              Engineering Campaign Report
            </span>
          </div>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-bold tracking-[-0.035em] text-warm-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl">
              Design. Build. Integrate. Fire.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-lg sm:leading-8">
              A six-month record of the Kimchi Engine—from design review and additively manufactured hardware in Korea
              to eight test iterations at a professional propulsion facility in the United Kingdom.
            </p>
          </div>
        </div>
      </header>

      <section className="scroll-animate grid gap-px overflow-hidden rounded-xl border border-border-dark bg-border-dark sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "8", label: "Test iterations" },
          { value: "1.19 kN", label: "Measured Test 8 thrust" },
          { value: "13.46 s", label: "Chamber-pressure response" },
          { value: "57", label: "Campaign media records" },
        ].map((metric) => (
          <div key={metric.label} className="bg-surface p-5 sm:p-6">
            <p className="font-mono text-2xl font-medium text-warm-white">{metric.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">{metric.label}</p>
          </div>
        ))}
      </section>

      <section className="scroll-animate grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Campaign in brief</p>
          <h2 className="text-3xl font-semibold tracking-tight text-warm-white sm:text-4xl">
            The result matters because every preceding system had to work together.
          </h2>
          <div className="space-y-4 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            <p>
              Race2Space is centered on propulsion-system verification rather than launching a complete vehicle. Teams
              pass preliminary and critical design reviews, close safety and facility interfaces, and then integrate
              their own hardware with a professionally operated test cell.
            </p>
            <p>
              Kimchi Propulsion Systems brought a pressure-fed LOX/IPA engine with regenerative cooling and a two-part
              additively manufactured architecture. The campaign connected analytical work, real manufacturing limits,
              domestic preparation, field integration, repeated inspection, and data-backed decisions between tests.
            </p>
          </div>
        </div>

        <aside className="space-y-5 border-l-2 border-combustion/60 bg-gradient-to-r from-combustion/10 to-transparent p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-combustion">My contribution</p>
          <ul className="space-y-3 text-sm leading-6 text-text-secondary">
            {[
              "Initial PDR engine concept and early development direction",
              "Team leadership, manufacturing support, and interface coordination",
              "Domestic test preparation and igniter development",
              "UK field integration and between-test problem solving",
              "Post-campaign data reduction and performance analysis",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lox" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-border-dark pt-4 text-xs leading-6 text-text-muted">
            Attribution boundary: a teammate who later joined the project completed the detailed final CDR engine
            design. Airborne Engineering personnel operated the facility and firing control.
          </p>
        </aside>
      </section>

      <section className="scroll-animate space-y-7">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">Campaign path</p>
          <h2 className="text-3xl font-semibold tracking-tight text-warm-white">From PDR to Test 8</h2>
          <p className="leading-7 text-text-secondary">
            Each gate narrowed the gap between an engine concept and hardware that could safely connect to a real test
            facility.
          </p>
        </div>

        <ol className="relative grid gap-4 before:absolute before:bottom-5 before:left-[0.72rem] before:top-5 before:w-px before:bg-border-dark lg:grid-cols-3 lg:before:hidden">
          {campaignTimeline.map((stage, index) => (
            <li key={stage.title} className="relative pl-9 lg:border-t lg:border-border-dark lg:px-1 lg:pt-6">
              <span className="absolute left-1 top-4 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-combustion bg-base-black lg:-top-2 lg:left-1">
                <span className="h-1.5 w-1.5 rounded-full bg-combustion" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-combustion">
                {String(index + 1).padStart(2, "0")} / {stage.date}
              </p>
              <h3 className="mt-2 text-base font-semibold text-warm-white">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="scroll-animate space-y-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">01 / Design evolution</p>
            <h2 className="text-3xl font-semibold tracking-tight text-warm-white">A concept that changed as the constraints became real</h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              The PDR concept proposed a 1.0–2.5 kN engine with a broad operating range and a 103-element coaxial-shear
              injector. As the VTVL objective, manufacturing schedule, and facility interfaces became concrete, the CDR
              configuration converged on a smaller 1.3 kN design point with a different injector architecture.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <EditorialImage item={earlyConcept} />
            <EditorialImage item={finalCad} />
          </div>
        </div>

        <div className="grid gap-8 border-t border-border-dark pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
            <EditorialImage item={coolingChannels} className="aspect-[4/5]" />
            <div className="grid gap-4">
              <EditorialImage item={waterFlow} />
              <EditorialImage item={hydroTest} />
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">02 / Manufacture & verify</p>
            <h2 className="text-3xl font-semibold tracking-tight text-warm-white">Internal geometry had to remain inspectable and testable</h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              The final architecture placed 62 regenerative-cooling channels inside the chamber and nozzle wall and
              separated the injector from the chamber/nozzle body. Metal powder-bed fusion made the internal passages
              possible; the two-part structure preserved access for post-processing, inspection, assembly, water-flow
              checks, and a 50 bar hydrostatic leak test.
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-t border-border-dark pt-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">03 / Learn before firing</p>
            <h2 className="text-3xl font-semibold tracking-tight text-warm-white">The domestic attempt revealed a systems problem, not a combustion result</h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              The Korean pre-test campaign was sequenced to verify the igniter before attempting the main engine. During
              the igniter test, insufficient controller power margin interrupted communications, so the main-engine run
              was stopped. The useful lesson was precise: power capacity, communication stability, and sequencing had to
              be treated as part of the propulsion system.
            </p>
          </div>
          <EditorialImage item={domesticControls} />
        </div>

        <div className="grid gap-8 border-t border-border-dark pt-8 lg:grid-cols-2">
          <EditorialImage item={bristolExchange} />
          <div className="space-y-4 lg:pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">04 / Technical exchange</p>
            <h2 className="text-3xl font-semibold tracking-tight text-warm-white">Compare real hardware, not only slides</h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              In Bristol, both teams placed injectors, chambers, and vehicle hardware on the table and compared design
              choices directly. The visit connected the Kimchi campaign with other approaches to cooling, injector
              geometry, tank packaging, and student-team iteration.
            </p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border-dark pt-8 sm:grid-cols-2">
          <EditorialImage item={finalAssembly} className="aspect-[4/5] sm:aspect-[16/10]" />
          <EditorialImage item={fieldIntegration} />
        </div>
      </section>

      <section className="scroll-animate overflow-hidden border-y border-border-dark py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="space-y-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Campaign outcome</p>
            <h2 className="text-4xl font-semibold tracking-tight text-warm-white">Test 8 produced the stable window needed for analysis.</h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              The stored data shows roughly 13 seconds of chamber-pressure response. From T0+4.0 to 12.5 seconds,
              chamber pressure and thrust remained comparatively steady, allowing pressure, thrust, and mass flow to be
              evaluated on the same time axis. The ± values below describe temporal variation in that window, not full
              sensor uncertainty.
            </p>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-dark bg-border-dark">
              {measuredResults.map((result) => (
                <div key={result.label} className="bg-surface p-4">
                  <p className="font-mono text-lg font-medium text-warm-white sm:text-xl">
                    {result.value} <span className="text-xs text-lox">{result.unit}</span>
                  </p>
                  <p className="mt-1 text-xs text-text-muted">{result.label}</p>
                </div>
              ))}
            </div>
          </div>
          <EditorialImage item={postTest} className="aspect-[4/3]" />
        </div>
      </section>

      <section className="space-y-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">Complete visual record</p>
            <h2 id="campaign-gallery-title" className="text-3xl font-semibold tracking-tight text-warm-white sm:text-4xl">
              The full campaign album
            </h2>
            <p className="leading-7 text-text-secondary">
              Every supplied photograph and video is included below. Filter by campaign stage, then open any image for a
              full-screen view.
            </p>
          </div>
          <p className="font-mono text-xs text-text-muted">56 photographs · 1 video · 6 stages</p>
        </div>
        <CampaignGallery categories={campaignCategories} items={campaignMedia} />
      </section>

      <section className="scroll-animate space-y-6 rounded-xl border border-border-dark bg-surface p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Technical record</p>
          <h2 className="text-2xl font-semibold text-warm-white">Continue into the engineering documents</h2>
          <p className="text-sm leading-7 text-text-secondary">
            The album captures the campaign as it happened. The documents below preserve the design basis, the complete
            report, and the data-led comparison of Tests 1–8.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/documents/race2space-2026-engineering-campaign-report",
              eyebrow: "Campaign report",
              label: "Read the PDF edition",
            },
            {
              href: "/documents/kimchi-engine-critical-design-review",
              eyebrow: "Design record",
              label: "Open the complete CDR",
            },
            {
              href: "/documents/race2space-2026-hot-fire-test-analysis",
              eyebrow: "Test record",
              label: "Review Tests 1–8",
            },
          ].map((document) => (
            <Link
              key={document.href}
              href={document.href}
              className="group rounded-lg border border-border-dark bg-surface-light p-4 hover:border-combustion/50"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">{document.eyebrow}</p>
              <p className="mt-2 text-sm font-medium text-warm-white group-hover:text-combustion">{document.label} →</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-dark pt-6">
        <p className="max-w-3xl text-xs leading-6 text-text-muted">
          Media and campaign records: Kimchi Propulsion Systems, June 2026. Performance values were recalculated from the
          recorded Test 8 dataset.
        </p>
        <Link href="/projects" className="font-mono text-xs text-text-muted hover:text-combustion">
          Return to Liquid Propulsion →
        </Link>
      </div>
    </article>
  );
}
