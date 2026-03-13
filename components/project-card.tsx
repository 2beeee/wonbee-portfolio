import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-neutral-900">{project.title}</h3>
        <span className="text-xs text-neutral-500">{project.yearOrStatus}</span>
      </div>
      <p className="mb-3 text-sm leading-6 text-neutral-700">{project.summary}</p>
      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-600">
            {tag}
          </li>
        ))}
      </ul>
      <Link
        href={`/projects/${project.slug}`}
        className="text-sm font-medium text-neutral-700 underline-offset-4 group-hover:text-neutral-900 group-hover:underline"
      >
        View details
      </Link>
    </article>
  );
}
