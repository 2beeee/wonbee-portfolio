import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

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

  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-neutral-500">{project.yearOrStatus}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="leading-7 text-neutral-700">{project.summary}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-600">
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <section className="space-y-6">
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
          <h2 className="text-lg font-semibold">Result / Current Status</h2>
          <p className="leading-7 text-neutral-700">{project.result}</p>
        </div>
      </section>
    </article>
  );
}
