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
        <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
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

      <header className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-neutral-500">{category.title}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="leading-7 text-neutral-700">{project.summary}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
          <span className="rounded-full border border-neutral-300 px-2 py-1">{project.yearOrStatus}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-neutral-300 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {project.media && project.media.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Media</h2>
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

      <section className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Role</h2>
          <p className="leading-7 text-neutral-700">{project.role}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Challenge</h2>
          <p className="leading-7 text-neutral-700">{project.challenge}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Approach</h2>
          <p className="leading-7 text-neutral-700">{project.approach}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Result</h2>
          <p className="leading-7 text-neutral-700">{project.result}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Progression Context</h2>
          <p className="leading-7 text-neutral-700">{project.progression}</p>
        </div>
      </section>

      {project.milestones && project.milestones.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Key Technical Markers</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {project.milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.links && project.links.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">References and Media Links</h2>
          <ul className="space-y-2 text-sm text-neutral-700">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="underline underline-offset-4 hover:text-neutral-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.sourceMaterial && project.sourceMaterial.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Source Material Used</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {project.sourceMaterial.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Related Efforts in This Category</h2>
          <ul className="space-y-2 text-sm text-neutral-700">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/projects/${item.slug}`} className="underline underline-offset-4 hover:text-neutral-900">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 pb-1">
        <Link href="/" className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
          Return to Home
        </Link>
        <Link href="/contact" className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
          Contact
        </Link>
      </div>
    </article>
  );
}
