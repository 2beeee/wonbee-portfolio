import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/media-frame";
import { ReturnLink } from "@/components/return-link";
import { getProjectBySlug, getProjectCategory, getProjectsByCategory, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://wonbee.kr/projects/${project.slug}`
    }
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const category = getProjectCategory(project.categoryId);
  const isSeventyNewtonProject = project.slug === "70n-gox-ethanol-liquid-rocket";
  const related = getProjectsByCategory(project.categoryId)
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className="max-w-5xl space-y-8">
      <ReturnLink href="/projects" label="Back to Projects" />

      {isSeventyNewtonProject ? (
        <section className="scroll-animate overflow-hidden rounded-xl border border-border-dark">
          <video
            className="h-full w-full object-cover"
            src="/assets/videos/rocket-70n/rocket-70n-showoff.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </section>
      ) : null}

      <header className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">{category.title}</p>
        <h1 className="text-3xl font-bold tracking-tight text-warm-white">{project.title}</h1>
        <p className="leading-7 text-text-secondary">{project.summary}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-border-dark px-2 py-0.5 font-mono text-[10px] text-lox">
            {project.yearOrStatus}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="rounded border border-border-dark px-2 py-0.5 font-mono text-[10px] text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {project.media && project.media.length > 0 ? (
        <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">Media</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.media.map((item, index) => (
              <MediaFrame
                key={item.src}
                media={item}
                className={item.orientation === "portrait" && index === 0 ? "sm:row-span-2" : ""}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="scroll-animate rounded-xl border border-border-dark bg-surface p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: "Role", content: project.role },
            { title: "Challenge", content: project.challenge },
            { title: "Approach", content: project.approach },
            { title: "Result", content: project.result },
          ].map((block) => (
            <div key={block.title} className="space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-combustion">{block.title}</h2>
              <p className="text-sm leading-7 text-text-secondary">{block.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2 border-t border-border-dark pt-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-combustion">Progression Context</h2>
          <p className="text-sm leading-7 text-text-secondary">{project.progression}</p>
        </div>
      </section>

      {project.milestones && project.milestones.length > 0 ? (
        <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">Key Technical Markers</h2>
          <ul className="space-y-2">
            {project.milestones.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lox" />
                <span className="text-sm leading-6">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.links && project.links.length > 0 ? (
        <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">References and Media Links</h2>
          <ul className="space-y-2">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="text-sm text-lox underline underline-offset-4 transition hover:text-combustion"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.sourceMaterial && project.sourceMaterial.length > 0 ? (
        <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">Source Material Used</h2>
          <ul className="space-y-2">
            {project.sourceMaterial.map((source) => (
              <li key={source} className="flex items-start gap-3 text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border-hover" />
                <span className="text-sm leading-6">{source}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="scroll-animate space-y-3 rounded-xl border border-border-dark bg-surface p-6">
          <h2 className="text-lg font-semibold text-warm-white">Related Efforts</h2>
          <ul className="space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/projects/${item.slug}`} className="text-sm text-lox underline underline-offset-4 transition hover:text-combustion">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 pb-1">
        <Link href="/" className="font-mono text-xs text-text-muted transition hover:text-combustion">
          Return to Home
        </Link>
        <Link href="/contact" className="font-mono text-xs text-text-muted transition hover:text-lox">
          Contact
        </Link>
      </div>
    </article>
  );
}
