import Link from "next/link";
import { TopLevelSlider } from "@/components/top-level-slider";
import { siteConfig } from "@/data/site";

const topPanels = [
  {
    id: "about",
    eyebrow: "About / Introduction",
    title: "Engineering growth shaped by real build constraints",
    description:
      "A focused introduction to how Wonbee approaches design, test, and decision-making under practical pressure.",
    href: "/about",
    cta: "Open About",
    mediaSrc: "/assets/images/rocket-70n/rocket-70n-1.jpg",
    mediaAlt: "Propulsion hardware photograph"
  },
  {
    id: "tedx",
    eyebrow: "TEDx",
    title: "Technical communication beyond the lab",
    description:
      "Talk delivery and public-facing communication that translate engineering ideas with clarity and credibility.",
    href: "/tedx",
    cta: "Explore TEDx",
    mediaSrc: "/assets/images/tedx/tedx-stage-1.png",
    mediaAlt: "TEDx stage session"
  },
  {
    id: "award",
    eyebrow: "Samsung Humantech Paper Awards",
    title: "32nd Gold Prize recognition",
    description:
      "Award-winning injector research (PINTOSWIRL) that connects analytical rigor with practical propulsion development.",
    href: "/awards",
    cta: "View Award Details",
    mediaSrc: "/assets/images/humantech/humantech-1.jpg",
    mediaAlt: "Humantech award visual"
  },
  {
    id: "propulsion",
    eyebrow: "Liquid Propulsion",
    title: "From 70 N milestone to 2.5 kN-class lander scope",
    description:
      "A deep technical section covering Kimchi Project, the 70 N GOX/Ethanol engine, and related propulsion support work.",
    href: "/projects",
    cta: "Open Liquid Propulsion",
    mediaSrc: "/assets/images/kimchi/kimchi-project-1.png",
    mediaAlt: "Kimchi Project propulsion visual"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="animate-fade-up space-y-5">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-neutral-500">{siteConfig.role}</p>
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">{siteConfig.name}</h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg">{siteConfig.intro}</p>
        <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">{siteConfig.positioning}</p>
      </section>

      <TopLevelSlider panels={topPanels} />

      <section className="rounded-2xl border border-neutral-200 bg-white/88 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-700">Additional sections</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/skills" className="rounded-full border border-neutral-300 px-3 py-1.5 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900">
              Skills
            </Link>
            <Link href="/recap" className="rounded-full border border-neutral-300 px-3 py-1.5 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900">
              Recap Archive
            </Link>
            <Link href="/contact" className="rounded-full border border-neutral-300 px-3 py-1.5 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
