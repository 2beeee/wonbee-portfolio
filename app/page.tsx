import Link from "next/link";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-neutral-500">Engineering Portfolio</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{siteConfig.name}</h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg">{siteConfig.intro}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Core technical keywords">
          {siteConfig.keywords.map((keyword) => (
            <li key={keyword} className="rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-700">
              {keyword}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700">
            View Projects
          </Link>
          <Link href="/resume" className="rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500">
            Resume
          </Link>
          <Link href="/contact" className="rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-500">
            Contact
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900">Featured Projects</h2>
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
