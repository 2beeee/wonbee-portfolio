import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { MediaFrame } from "@/components/media-frame";
import { getFeaturedProjects, getProjectBySlug, getProjectsByCategory, projectCategories } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 3);
  const kimchiProject = getProjectBySlug("kimchi-2-5kn-lander-program");
  const earlyRocketProject = getProjectBySlug("70n-gox-ethanol-liquid-rocket");
  const fabricationProject = getProjectBySlug("tig-welding-and-fabrication-practice");
  const tedxProject = getProjectBySlug("tedx-talk-and-public-communication");
  const recapProject = getProjectBySlug("annual-recap-reels");

  return (
    <div className="space-y-20">
      <section className="animate-fade-up rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm sm:p-9">
        <div className="space-y-6">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-neutral-500">{siteConfig.role}</p>
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Engineering work built with hands-on rigor, system-level judgment, and test-backed execution.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg">{siteConfig.intro}</p>
          <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">{siteConfig.positioning}</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <article className="rounded-2xl border border-neutral-200 bg-neutral-900 p-5 text-neutral-100">
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-neutral-300">
              Distinction
            </p>
            <h2 className="mt-2 text-lg font-semibold">Samsung Humantech Paper Awards - 32nd Gold Prize</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Awarded for PINTOSWIRL injector research applied to small liquid rocket engine development.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={siteConfig.documents.humantechPaper}
                className="rounded-full border border-neutral-500 px-3 py-1.5 transition hover:border-neutral-200 hover:text-white"
              >
                Open Paper Source
              </a>
              <a
                href={siteConfig.documents.vtvlReport}
                className="rounded-full border border-neutral-500 px-3 py-1.5 transition hover:border-neutral-200 hover:text-white"
              >
                VTVL Reference Report
              </a>
            </div>
          </article>

          <article className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900">Trajectory Snapshot</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-700">
              <li>2024: 70 N-class GOX/Ethanol engine build and test milestone</li>
              <li>2025: 2.5 kN-class LOX/Ethanol lander-oriented propulsion planning</li>
              <li>Research depth: VTVL GNC platform and award-winning injector paper</li>
            </ul>
          </article>
        </div>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Core technical keywords">
          {siteConfig.keywords.map((keyword) => (
            <li key={keyword} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-700">
              {keyword}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700">
            View Projects
          </Link>
          <Link href="/resume" className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-500">
            Resume
          </Link>
          <Link href="/contact" className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-500">
            Contact
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-600">
          <a href="#flagship" className="underline underline-offset-4 hover:text-neutral-900">
            Jump to Flagship
          </a>
          <a href="#fabrication" className="underline underline-offset-4 hover:text-neutral-900">
            Jump to Fabrication
          </a>
          <a href="#communication" className="underline underline-offset-4 hover:text-neutral-900">
            Jump to Communication
          </a>
        </div>
      </section>

      <section className="space-y-5" id="categories">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900">Capability Categories</h2>
          <Link href="/projects" className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">
            Open full archive
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectCategories.map((category) => (
            <Link
              key={category.id}
              href={`/projects#${category.id}`}
              className="rounded-2xl border border-neutral-200 bg-white/92 p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-400 hover:shadow-md"
            >
              <p className="mb-2 text-sm font-semibold text-neutral-900">{category.title}</p>
              <p className="text-sm leading-6 text-neutral-700">{category.summary}</p>
              <p className="mt-3 text-xs text-neutral-500">{getProjectsByCategory(category.id).length} related efforts</p>
            </Link>
          ))}
        </div>
      </section>

      {kimchiProject && earlyRocketProject ? (
        <section className="space-y-5" id="flagship">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-neutral-900">Propulsion Progression</h2>
            <Link href={`/projects/${kimchiProject.slug}`} className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">
              Explore flagship project
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="text-base font-semibold text-neutral-900">{kimchiProject.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{kimchiProject.summary}</p>
              <div className="mt-4 grid gap-3">
                {kimchiProject.media?.map((media) => (
                  <MediaFrame key={media.src} media={media} compact />
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="text-base font-semibold text-neutral-900">{earlyRocketProject.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{earlyRocketProject.progression}</p>
              <div className="mt-4 grid gap-3">
                {earlyRocketProject.media?.map((media) => (
                  <MediaFrame key={media.src} media={media} compact />
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {fabricationProject ? (
        <section className="space-y-5" id="fabrication">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-neutral-900">Fabrication and Practical Build Skills</h2>
            <Link href={`/projects/${fabricationProject.slug}`} className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">
              View fabrication detail
            </Link>
          </div>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="max-w-3xl text-sm leading-6 text-neutral-700">{fabricationProject.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fabricationProject.media?.map((media) => (
                <MediaFrame key={media.src} media={media} compact />
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {tedxProject && recapProject ? (
        <section className="space-y-5" id="communication">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-neutral-900">Communication and Public Sharing</h2>
            <a
              href={siteConfig.links.tedxTalk}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
            >
              Watch TEDx (1:19:30)
            </a>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="text-base font-semibold text-neutral-900">{tedxProject.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{tedxProject.summary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {tedxProject.media?.map((media, index) => (
                  <MediaFrame key={media.src} media={media} compact priority={index === 0} />
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="text-base font-semibold text-neutral-900">{recapProject.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{recapProject.summary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recapProject.media?.map((media) => (
                  <MediaFrame key={media.src} media={media} compact />
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900">Selected Detailed Projects</h2>
          <Link href="/projects" className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
