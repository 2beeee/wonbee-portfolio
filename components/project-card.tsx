import Link from "next/link";
import { getProjectCategory, type Project } from "@/data/projects";
import { MediaFrame } from "@/components/media-frame";

export function ProjectCard({ project }: { project: Project }) {
  const category = getProjectCategory(project.categoryId);
  const cover = project.media?.[0];

  return (
    <article className="group rounded-2xl border border-neutral-200 bg-white/92 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-md sm:p-5">
      {cover && cover.type === "image" ? (
        <div className="mb-4">
          <MediaFrame media={cover} compact />
        </div>
      ) : null}

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-neutral-500">{category.title}</p>
          <h3 className="text-base font-semibold text-neutral-900">{project.title}</h3>
        </div>
        <span className="whitespace-nowrap text-xs text-neutral-500">{project.yearOrStatus}</span>
      </div>

      <p className="mb-3 text-sm leading-6 text-neutral-700">{project.summary}</p>

      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-neutral-300 px-2 py-1 text-xs text-neutral-700">
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href={`/projects/${project.slug}`}
        className="text-sm font-medium text-neutral-700 underline-offset-4 transition group-hover:text-neutral-900 group-hover:underline"
      >
        Open project details
      </Link>
    </article>
  );
}
