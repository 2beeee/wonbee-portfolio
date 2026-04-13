import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { siteConfig } from "@/data/site";

const sections = [
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
    <div className="space-y-20">
      <Hero
        name={siteConfig.name}
        role={siteConfig.role}
        intro={siteConfig.intro}
        positioning={siteConfig.positioning}
      />

      {/* Featured sections — vertical scroll */}
      <div className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-combustion/40 to-transparent" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Featured Sections</p>
          <div className="h-px flex-1 bg-gradient-to-l from-lox/40 to-transparent" />
        </div>

        {sections.map((section, i) => (
          <article
            key={section.id}
            className="scroll-animate rounded-xl border border-border-dark bg-surface p-6 sm:p-8 card-glow"
          >
            <div className={`grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={`space-y-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">
                  {section.eyebrow}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-warm-white sm:text-3xl">
                  {section.title}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                  {section.description}
                </p>
                <Link
                  href={section.href}
                  className="inline-flex rounded-lg border border-border-dark bg-surface-light px-6 py-3 font-mono text-sm tracking-wider text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
                >
                  {section.cta}
                </Link>
              </div>
              <div className={`overflow-hidden rounded-lg border border-border-dark ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[16/10] bg-surface-light">
                  <Image
                    src={section.mediaSrc}
                    alt={section.mediaAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Additional sections */}
      <section className="scroll-animate rounded-xl border border-border-dark bg-surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Additional sections</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="rounded-lg border border-border-dark px-5 py-2.5 font-mono text-sm text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
            >
              Skills
            </Link>
            <Link
              href="/recap"
              className="rounded-lg border border-border-dark px-5 py-2.5 font-mono text-sm text-text-secondary transition hover:border-combustion/50 hover:text-combustion"
            >
              Recap Archive
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border-dark px-5 py-2.5 font-mono text-sm text-text-secondary transition hover:border-lox/50 hover:text-lox"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
